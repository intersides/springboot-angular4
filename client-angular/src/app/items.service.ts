/**
 * Created by marcofalsitta on 26.05.17.
 */

import {Component, Injectable}   from "@angular/core";
import {Item} from "./Item";
import {Http, RequestOptions, Headers} from "@angular/http";

import {MessageService, ObservableType} from "./MessageService";


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class ItemsService{


  private host = "/marcofalsitta";
  private http:Http;
  private wsIsOpen = false;
  private _wsSessionId = null;

  subscription_webSocketService:Subscription;
  subscription_httpServicesRequest:Subscription;
  // connectionChangesSubscription:Subscription;

  private ws:WebSocket;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private messageService: MessageService, http:Http){
    this.http = http;

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

    this.webSocketConnect();
    this.registerWSHandlers();
  }

  webSocketConnect(){
    try{
      this.ws = new WebSocket("ws://localhost:8080/marcofalsitta/itemAppWS");
    }
    catch(exc){
      console.error(exc);
    }

  }


  get wsSessionId(): any {
    return this._wsSessionId;
  }

  set wsSessionId(value: any) {
    this._wsSessionId = value;
  }


  private wsMessageDispatcher(message) {

    if (typeof message.type == "undefined") {
      console.error("wrong message constructor");
    }
    else {

      switch (message.type) {
        case "onOpen": {
          console.log("onOpen received... start heartbeat");
          this.startHeartbeat(5);
        }
          break;

        case "onEditItemStarted": {
          console.log("onEditItemStarted received, send message to server for broadcasting", message);
          this.ws.send(JSON.stringify({type: "onEditItemStarted", itemId: message.itemId, userId:this.wsSessionId}));
        }break;

        case "onEditItemEnded": {
          console.log("onEditItemEnded received, send message to server for broadcasting", message);
          this.ws.send(JSON.stringify({type: "onEditItemEnded", itemId: message.itemId, userId:this.wsSessionId}));
        }break;



        case "onMessage": {
          let data = null;

          if (typeof message['wsEvent'] !== "undefined") {
            try {
              data = JSON.parse(message['wsEvent'].data);
            }
            catch (exc) {
              console.error("cannot parse data in wsEvent", message['wsEvent'].data);
              console.error(exc);
            }
          }

          if (data) {
            this.dispatchWSMessages(data);
          }

        }
          break;

        default: {
          console.warn("no handler for '%s' message type ", message.type);
        }
          break;
      }

    }
  }

  dispatchWSMessages(wsData){
    switch(wsData.type){

      case "onFreezeItemEditing":{
        this.messageService.dispatchUiMessage({
          type:"onUserBeginEditingItem",
          data:wsData.data
        })
      }break;

      case "onUnfreezeItemEditing":{
        this.messageService.dispatchUiMessage({
          type:"onUserStoppedEditingItem",
          data:wsData.data
        })
      }break;

      case "onConnectionEstablished":{
        console.info("sessionId:", wsData.data.sessionId);

        this.messageService.broadcastConnectionChangesEvent({
          type:"onConnectionEstablished",
          sessionId:wsData.data.sessionId,
        });

      }break;



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

  registerWSHandlers(){

    this.ws.onopen =  event =>{
      this.wsIsOpen = true;
      this.messageService.dispatchWSSendMsg({type:"onOpen", wsEvent:event});
    };

    this.ws.onmessage = event =>{
      this.messageService.dispatchWSSendMsg({type:"onMessage", wsEvent:event});
    };

    this.ws.onclose = event =>{
      this.wsIsOpen = false;
      console.error("closed", event);
    };

    this.ws.onerror = event =>{
      console.error("ws error ", event);
    };


  }

  startHeartbeat(seconds:number){
    setInterval(()=>{
      console.log("\u2665");

      if(!this.wsIsOpen){
        console.log("try to reconnect to websocket...");
        this.webSocketConnect();
      }
      else{
        if(this.ws.readyState == 1){
          this.ws.send(JSON.stringify({type:"onHeartBeat"}));
        }

      }
    }, seconds*1000);
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

    this.http.delete(this.host+"/item", options)
      .subscribe(
        response=>{
          console.log(response.json().msg);
          this.messageService.dispatchHttpServiceResponse({
            type: "onItemDeleted",
            data: response.json().data
          });
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
