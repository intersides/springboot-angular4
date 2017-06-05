/**
 * Created by marcofalsitta on 26.05.17.
 */

import {Component, Injectable}   from "@angular/core";
import {Item} from "./Item";
import {Http, RequestOptions, Headers} from "@angular/http";

import {MessageService, ObservableType} from "./MessageService";

import { StompService } from 'ng2-stomp-service';


// private subscription : any;

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class ItemsService{

  private host = "/marcofalsitta";
  private http:Http;
  private wsIsOpen = false;
  private _wsSessionId:string = null;

  subscription_webSocketService:Subscription;
  subscription_httpServicesRequest:Subscription;
  // connectionChangesSubscription:Subscription;

  private ws:WebSocket;
  private headers = new Headers({'Content-Type': 'application/json'});

  private onFreezeItemEditingSubscription:any;
  private onUnfreezeItemSubscription:any;
  private itemsListModifiedSubscription:any;

  constructor(private messageService: MessageService, http:Http, private stomp:StompService){
    this.http = http;

    //configuration
    stomp.configure({
      host:'/marcofalsitta/ws-tunnel',
      debug:true,
      queue:{'init':false}
    });

    //start connection
    stomp.startConnect().then((arg) => {
      stomp.done('init');

      console.warn("******");
      this.wsSessionId = stomp['socket']['_server'];
      console.warn("websocket session id:", this.wsSessionId);
      console.warn("******");

      this.onFreezeItemEditingSubscription = stomp.subscribe('/topic/onFreezeItemEditing', data=>{
        this.dispatchWSMessages(data);
      });

      this.onUnfreezeItemSubscription = stomp.subscribe('/topic/onUnfreezeItemEditing', data=>{
        this.dispatchWSMessages(data);
      });

      this.itemsListModifiedSubscription = stomp.subscribe('/topic/onRefreshItemList', data=>{
        console.warn("list changed could be triggered for onItemAdded or onItemRemove");
        this.dispatchWSMessages(data);
      });

      //unsubscribe
      // this.subscription.unsubscribe();

      //disconnect
      // stomp.disconnect().then(() => {
      //   console.log( 'Connection closed' )
      // })

    });


    this.subscription_webSocketService = this.messageService.getSubscription(ObservableType.WEB_SOCKET_MESSAGE_SENDING).subscribe(message=>{
      this.wsMessageDispatcher(message);
    });

    //registering for messages to provide requests actions
    this.subscription_httpServicesRequest = this.messageService.getSubscription(ObservableType.HTTP_SERVICE_REQUEST).subscribe(message=>{
      this.httpRequestDispatcher(message);
    });

    //registering for messages to provide requests actions
    // this.connectionChangesSubscription = this.messageService.getSubscription(ObservableType.CONNECTION_CHANGES).subscribe(message=>{
    //   this.connectionChangesDispatcher(message);
    // });

  }

  //response
  response(data){
    console.log(data);
  }



  get wsSessionId(): string {
    return this._wsSessionId;
  }

  set wsSessionId(value: string) {
    this._wsSessionId = value;
  }


  private wsMessageDispatcher(message) {

    if (typeof message.type == "undefined") {
      console.error("wrong message constructor");
    }
    else {

      switch (message.type) {

        case "onEditItemStarted": {
          console.log("onEditItemStarted received, send message to server for broadcasting", message);

          this.stomp.send('/app/onEditItemStarted',
              {'type': 'onEditItemStarted', 'itemId': message.itemId, 'clientId':this.wsSessionId});

        }break;

        case "onEditItemEnded": {
          console.log("onEditItemEnded received, send message to server for broadcasting", message);

          this.stomp.send('/app/onEditItemEnded',
            {'type': 'onEditItemEnded', 'itemId': message.itemId, 'clientId':this.wsSessionId});

        }break;


        default: {
          console.warn("no handler for '%s' message type ", message.type);
        }
          break;
      }

    }

  }

  dispatchWSMessages(wsData){
    console.log(wsData);

    switch(wsData.type){

      case "onFreezeItemEditing":{
        this.messageService.dispatchUiMessage({
          type:"onUserBeginEditingItem",
          itemId:wsData.itemId,
          clientId:wsData.clientId
        })
      }break;

      case "onUnfreezeItemEditing":{
        this.messageService.dispatchUiMessage({
          type:"onUserStoppedEditingItem",
          itemId:wsData.itemId,
          clientId:wsData.clientId
        })
      }break;

      case "onItemAdded":{
        this.messageService.dispatchUiMessage({
          type:"onUserAddedItem",
          itemId:wsData.itemId,
          clientId:wsData.clientId
        })
      }break;

      case "onItemRemoved":{
        this.messageService.dispatchUiMessage({
          type:"onUserRemovedItem",
          itemId:wsData.itemId,
          clientId:wsData.clientId
        })
      }break;

      // case "onConnectionEstablished":{
      //   console.info("sessionId:", wsData.data.sessionId);
      //
      //   this.messageService.broadcastConnectionChangesEvent({
      //     type:"onConnectionEstablished",
      //     sessionId:wsData.data.sessionId,
      //   });
      //
      // }break;


      default:{
        console.warn("no case to parse for message type ", wsData.type);
      }break;

    }
  //
  }

  httpRequestDispatcher(request){

    switch(request.type){

      case "fetchItems":{
        this.fetchItems();
      }break;

      case "getItem":{
        this.getItem(request.data);
      }break;

      case "addItem":{
        this.addItem(request.data);
      }break;

      case "updateItem":{
        this.updateItem(request.data);
      }break;

      case "removeItem":{
        this.deleteItem(request.data);
      }break;


      default:{
        console.warn("*** request type '%s' is not considered  ***", request.type)
      }break;
    }
  }

  fetchItems(){

    let options = new RequestOptions({
      headers:this.headers
    });

    this.http.get(this.host+"/items", options)
      .subscribe(
        response=>{
          console.log(response.json().msg);

          this.messageService.dispatchHttpServiceResponse({
            type: "onItemsFetched",
            data: response.json().data as Item[]
          });

        }, error=>{
          this.handleError(error, "Cannot retrieve items from server.");
        });

  }

  getItem(itemId){

    let options = new RequestOptions({
      headers:this.headers
    });

    this.http.post(this.host+"/item", {id:itemId}, options)
      .subscribe(
        response=>{
          console.log(response.json().msg);

          this.messageService.dispatchHttpServiceResponse({
            type: "onItemReceived",
            data: response.json().data
          });

        }, error=>{
          this.handleError(error, "Cannot receive item from server.");
        });

  }

  addItem(item:Item){

    this.http.put(this.host+"/item", item, this.headers)
      .subscribe(
        response =>{
          console.log(response.json().msg);
          this.messageService.dispatchHttpServiceResponse({
            type: "onItemAdded",
            data: response.json().data as Item
          });
          //broadcast event to other user throught webSocket server
          this.stomp.send('/app/onItemsListChanged',
            {'type': 'onItemAdded', 'itemId': item.id, 'clientId':this.wsSessionId});

        },error=>{
          this.handleError(error, "Could not add item.");
        });
  }

  updateItem(item){
    this.http.patch(this.host+"/item", item, this.headers)
      .subscribe(
        response=>{
          console.log(response.json().msg);

          this.messageService.dispatchHttpServiceResponse({
            type: "onItemUpdated",
            data: response.json().data
          });

        }, error=>{
          this.handleError(error, "Cannot retrieve items from server.");
        });

  }

  deleteItem(itemId){

    let options = new RequestOptions({
      headers:this.headers,
      body:{id:itemId}
    });

    //NOTE: DELETE item Rest
    this.http.delete(this.host+"/item", options)
      .subscribe(
        response=>{
          console.log(response.json().msg);
          this.messageService.dispatchHttpServiceResponse({
            type: "onItemDeleted",
            data: response.json().data
          });

          //broadcast event to other user throught webSocket server
          this.stomp.send('/app/onItemsListChanged',
            {'type': 'onItemRemoved', 'itemId': itemId, 'clientId':this.wsSessionId});


        }, error=>{
          this.handleError(error, "Cannot delete item from server.");
        });

  }

  private handleError(error: any, note?:string) {
    console.error('An error occurred', error);
    if(typeof error['_body'] == "string"){
      try{
        let errorObj = JSON.parse(error['_body']);

        let message = "An error ocurred.";
        if(note){
          message += " "+note;
        }
        if(errorObj["message"]){
          message += " "+errorObj["message"];
        }
        this.messageService.dispatchHttpServiceError(message);

      }
      catch(jsonParseError){
        console.error("could not parse:", error['_body']);
      }

    }
    else{
      console.error("trapped error is malformed, does not contains _body part");
    }
  }

}
