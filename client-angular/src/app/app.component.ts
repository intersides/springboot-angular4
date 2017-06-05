import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import {MdSnackBar} from '@angular/material';

//services
import {MessageService, ObservableType} from "./MessageService";
import { ItemsService } from "./items.service";

import {Item} from "./Item";
import { ItemFormComponent } from "./item-add-component";

//material components
import { SnackBarMessageComponent} from "./common/snack-bar-component";

@Component({
  selector: 'app',
  entryComponents: [
    SnackBarMessageComponent
  ],
  template: `    
    <md-toolbar color="primary">

      <span>{{title}}</span>

      <span class="toolbar-spacer"></span>

      <button md-icon-button [mdMenuTriggerFor]="menu">
        <md-icon>more_vert</md-icon>
      </button>

    </md-toolbar>
    <md-menu #menu="mdMenu">
      <button md-menu-item>
        <md-icon>settings</md-icon>
        <span>Settings</span>
      </button>
      <button md-menu-item>
        <md-icon>help</md-icon>
        <span>Help</span>
      </button>
    </md-menu>
    <item-form (onException)="onException($event)">new form here...</item-form>
    <div class="itemListContainer">

      <h3 class="listHeader">{{items.length > 0 ? items.length: 'Empty'}} item{{items.length > 1 ? 's' : ''}} in the list:</h3>

      <md-card *ngFor="let item of items" class="itemCard" [attr.data-editlock]="item.isLocked" >

        <span class="in-editing-message" [hidden]="!item.isLocked">
            items is being edited by another user
        </span>
        
        <md-card-header>

          <div md-card-avatar class="example-header-image"></div>
          <md-card-title>{{item.name}}</md-card-title>
          <md-card-subtitle *ngIf="devMode">{{item.id}}</md-card-subtitle>
          <md-card-content>
            <p>
              {{item.description}}
            </p>
          </md-card-content>

          <span class="toolbar-spacer"></span>

          <md-card-actions>
            <button md-raised-button md-button (click)="onItemSelect(item.id)" disabled="{{item.isLocked ? true : false}}" >SELECT</button>
            <button md-button class="deleteItemBtn" (click)="onItemRemove(item.id)" disabled="{{item.isLocked ? true : false}}" >DELETE</button>
          </md-card-actions>

        </md-card-header>

      </md-card>

    </div>
    <md-slide-toggle
      class="example-margin"
      [color]="color"
      [checked]="checked"
      [disabled]="disabled"
      (change)="setDevMode($event)"
    >
      debug mode
    </md-slide-toggle>
  `
})
export class AppComponent implements OnInit, OnDestroy{
  title : string;
  item : Item = new Item();
  items: Item[] = [];

  subscription_httpServiceResponse:Subscription;
  subscription_httpServicesRequest:Subscription;
  subscription_httpServiceError:Subscription;
  uiMessageSubscription:Subscription;
  connectionChangesSubscription:Subscription;


  devMode:boolean;

  constructor(private itemsService:ItemsService,  private messageService:MessageService, public snackBar: MdSnackBar){
    this.title = "Item List Editor";
    this.devMode = false;

    this.subscription_httpServiceResponse = this.messageService.getSubscription(ObservableType.HTTP_SERVICE_RESPONSE).share().subscribe(message=>{
      console.log("HTTP_SERVICE_RESPONSE", message);
      this.httpServiceMessageDispatcher(message);
    });

    this.subscription_httpServicesRequest = this.messageService.getSubscription(ObservableType.HTTP_SERVICE_REQUEST).subscribe(message=>{
      console.log("HTTP_SERVICE_REQUEST", message);
      this.httpServiceMessageDispatcher(message);
    });

    this.subscription_httpServiceError = this.messageService.getSubscription(ObservableType.HTTP_SERVICE_ERROR).subscribe(errorMsg=>{
      this.httpErrorDispatcher(errorMsg);
    });

    this.uiMessageSubscription = this.messageService.getSubscription(ObservableType.UI_CHANGES).subscribe(msg=>{
      this.uiChangesDispatcher(msg);
    });

    //registering for messages to provide requests actions
    this.connectionChangesSubscription = this.messageService.getSubscription(ObservableType.CONNECTION_CHANGES).subscribe(message=>{
      this.connectionChangesDispatcher(message);
    });

  }

  @ViewChild(ItemFormComponent)
  private itemFormComponent: ItemFormComponent;

  private connectionChangesDispatcher(message){
    console.log("connectionChangesDispatcher", message);
    switch(message.type){

      // case "onConnectionEstablished":{
      //   console.warn("onConnectionEstablished sessionId", message.sessionId);
      //   this.itemsService.wsSessionId = message.sessionId;
      //
      // }break;

      default:{
        console.warn("no case for %s", message.type);
      }break;
    }
  }


  uiChangesDispatcher(msg){

    console.info("UI_CHANGES:", msg);

    switch(msg.type){

      case "onUserBeginEditingItem":{

        console.info("UI_CHANGES:", msg.itemId, msg.clientId);
        let itemId = msg.itemId;
        let item = this.getItemById(itemId);
        if(!item){
          console.error("could not find item with id", msg.itemId);
        }
        else {
          //lock item if the operation belongs to a different user than us.
          let userId = msg.clientId;
          if(this.itemsService.wsSessionId !== userId){
            item.isLocked = true;
          }
        }

      }break;

      case "onUserStoppedEditingItem":{

        console.info("UI_CHANGES:", msg.itemId, msg.clientId);

        let itemId = msg.itemId;
        let item = this.getItemById(itemId);
        if(!item){
          console.error("could not find item with id", itemId);
        }
        else {
          //lock item if the operation belongs to a different user than us.
          let userId = msg.clientId;
          if(this.itemsService.wsSessionId !== userId){
            item.isLocked = false;
          }
        }

      }break;


      case "onUserRemovedItem":{
        console.info("UI_CHANGES:", msg.itemId, msg.clientId);

        let itemId = msg.itemId;

        //lock item if the operation belongs to a different user than us.
        let userId = msg.clientId;
        if(this.itemsService.wsSessionId !== userId){

          let message = "Another user has added an item in the list. The items list will be refreshed";
          this.openSnackBar(message, "info");

          setTimeout(()=>{
            this.refreshList();
          }, 3000);

        }
      }break;


      case "onUserAddedItem":{
        console.info("UI_CHANGES:", msg.itemId, msg.clientId);

        //lock item if the operation belongs to a different user than us.
        let userId = msg.clientId;
        if(this.itemsService.wsSessionId !== userId){

          let message = "Another user has added an item in the list. The items list will be refreshed";
          this.openSnackBar(message, "info");

          setTimeout(()=>{
            this.refreshList();
          }, 3000);

        }

      }break;

        // onUserUpdatedItem
      case "onUserUpdatedItem":{
        console.info("UI_CHANGES:", msg);

        let itemId = msg.itemId;
        let item = this.getItemById(itemId);
        if(!item){
          console.error("could not find item with id", itemId);
        }
        else {
          //lock item if the operation belongs to a different user than us.
          let userId = msg.clientId;
          if(this.itemsService.wsSessionId !== userId){
            this.itemsService.getItemPromise(itemId).then(_item=>{
              //set the existing item with the retrieved item
              // item=_item;
              item.id = _item.id;
              item.name = _item.name;
              item.description = _item.description;

              //flash on changes.

            })
              .catch(exc=>{
                console.error("error in getting item promise", exc);
              });
          }
        }


      }break;

      default:{
        console.warn("untrapped case for %s", msg.type);
      }break;
    }

  };

  httpErrorDispatcher(errMsg){
    this.openSnackBar(errMsg,"alert");
  }

  httpServiceMessageDispatcher(msg:any){
    console.warn("onHttpServiceMessage:", msg);

    switch(msg.type){

      case "onItemsFetched":{
        this.drawList(msg.data);
      }break;

      case "onItemUpdated":
      case "onItemAdded":
      case "onItemDeleted":{
        this.refreshList();
      }break;

      default:{
        console.warn("default case triggered for message ", msg.type, msg);
      }break;
    }

  }

  setDevMode(event){
    this.devMode = event.checked;
    this.itemFormComponent.onDevModeToggle(this.devMode);
  }

  onItemAdded(event:Item){
    alert("****");
    console.log("onItemAdded event received by app.component", event);
    this.refreshList();
  }

  onException(error:any){
    this.openSnackBar(error,"alert");
  }

  onItemSelect(id:string){
    this.messageService.dispatchHttpServiceRequest({type:"getItem", data:id});
  }

  onItemRemove(id:string){
    this.messageService.dispatchHttpServiceRequest({type:"removeItem", data:id});
  }

  ngOnInit(){
    this.refreshList();
  }

  ngOnDestroy() {
    console.error("ngOnDestroy called");
    // unsubscribe to ensure no memory leaks
    this.subscription_httpServiceResponse.unsubscribe();
    this.subscription_httpServicesRequest.unsubscribe();
    this.subscription_httpServiceError.unsubscribe();
  }

  private getItemById(itemId){
    for(let i = 0; i < this.items.length; i++){
      if(this.items[i].id === itemId){
        return this.items[i];
      }
    }
    return null;
  }

  drawList(items){
    //reorder items
    if(!items){
      this.openSnackBar("could not fetch items from server", "alert");
      items = [];
    }

    if(items.length > 0){

      items.sort((a, b)=>{
        return a.creationDate - b.creationDate;
      });

    }
    this.items = items;
    this.item = this.items[0];
  }

  refreshList(){
    this.messageService.dispatchHttpServiceRequest({type:"fetchItems"});
  }

  openSnackBar(msg, type) {
    let currentSnackBar = this.snackBar.openFromComponent(SnackBarMessageComponent,{
      duration: 3000
    });
    currentSnackBar.instance.message = msg;
    currentSnackBar.instance.type = type;
  }

}
