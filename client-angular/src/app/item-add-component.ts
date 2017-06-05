/**
 * Created by marcofalsitta on 27.05.17.
 */

import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Subject} from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";

import {MessageService, ObservableType} from "./MessageService";

import {Item} from "./Item";

@Component({
  selector:"item-form",
  templateUrl:"./item-add-component.html"
})
export class ItemFormComponent{

  public model:Item;
  private submitted:boolean;
  lockId:boolean = true;
  isUpdate:boolean = false;
  idAtSelectionTime:string;
  devMode:boolean=false;

  subscription_httpServiceRequest:Subscription;
  subscription_httpServiceResponse:Subscription;

  websocketMessageRecivedSubscriber:Subscription;
  websocketMessageSendingSubscriber:Subscription;

  constructor(private messageService:MessageService){
    this.model = new Item();
    this.submitted = false;

    this.subscription_httpServiceRequest = this.messageService.getSubscription(ObservableType.HTTP_SERVICE_REQUEST).share().subscribe(message=>{
      console.log("HTTP_SERVICE_REQUEST", message);
    });

    this.subscription_httpServiceResponse = this.messageService.getSubscription(ObservableType.HTTP_SERVICE_RESPONSE).share().subscribe(message=>{
      console.log("HTTP_SERVICE_RESPONSE", message);
      this.onHttpServiceResponse(message);
    });

    this.websocketMessageSendingSubscriber = this.messageService.getSubscription(ObservableType.WEB_SOCKET_MESSAGE_SENDING).share().subscribe(message=>{
      console.log("WEB_SOCKET_MESSAGE_SENDING", message);
    });


    this.websocketMessageRecivedSubscriber = this.messageService.getSubscription(ObservableType.WEB_SOCKET_MESSAGE_RECEIVED).share().subscribe(message=>{
      console.log("WEB_SOCKET_MESSAGE_RECEIVED", message);
    });

  }

  onHttpServiceResponse(msg){
    console.info("onHttpServiceResponse", msg);

    switch(msg.type){

      case "onItemReceived":{
        this.onSelected(msg.data);
      }break;

      //TODO:clear the current info if the removed item correspond to the currently edited one.
      // case "onItemDeleted":{}break;

      default:{
        console.warn("default case triggered for message ", msg.type, msg);
      }break;
    }

  }

  onSubmit(){
    this.submitted = true;

    if(this.isUpdate){

      this.messageService.dispatchHttpServiceRequest({
        type:"updateItem",
        data:this.model
      });

    }
    else{

      this.messageService.dispatchHttpServiceRequest({
        type:"addItem",
        data:this.model
      });


    }
  }

  onSelected(selectedItem:Item){
    this.model = new Item(selectedItem);
    this.idAtSelectionTime = this.model.id;
    this.isUpdate = true;
    this.setEditMode();
  }

  onDevModeToggle(devMode:boolean){
    this.devMode = devMode;
  }

  public onLockToggle(event){
    this.lockId = !this.lockId;
  }

  onKeyUp(event, isId:boolean=false){
    if(isId == true){
      this.model.id = event.target.value;
    }

    if(typeof this.idAtSelectionTime !== "undefined"){
      this.isUpdate = this.model.id == this.idAtSelectionTime;
      this.setEditMode();
    }

  }

  setEditMode(){
    console.error("edit mode", this.isUpdate, this.idAtSelectionTime, this.model.id);

    if(this.isUpdate == true){
      this.messageService.dispatchWSSendMsg({
        type:"onEditItemStarted",
        // data:this.model
        itemId:this.idAtSelectionTime ? this.idAtSelectionTime : this.model.id
      });
    }
    else{
      this.messageService.dispatchWSSendMsg({
        type:"onEditItemEnded",
        itemId:this.idAtSelectionTime ? this.idAtSelectionTime : this.model.id
      });
    }


  }

  resetForm(){
    this.model = new Item();
    this.isUpdate = false;
    this.setEditMode();
  }


}
