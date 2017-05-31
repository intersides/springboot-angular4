import {Component, OnInit, ViewChild} from '@angular/core';
import {Item} from "./Item";
import { ItemsService } from "./items.service";
import { ItemFormComponent } from "./item-add-component";

import { SnackBarMessageComponent} from "./common/snack-bar-component";

import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app',
  providers:[ItemsService],
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


    <item-form (onException)="onException($event)" (onItemAdded)="onItemAdded($event)">new form here...</item-form>

    <div class="itemListContainer">

      <h3 class="listHeader">{{items.length > 0 ? items.length: 'Empty'}} item{{items.length > 1 ? 's' : ''}} in the list:</h3>

      <md-card *ngFor="let item of items" class="itemCard">

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
            <button md-raised-button md-button (click)="onItemSelect(item.id)">SELECT</button>
            <button md-button class="deleteItemBtn" (click)="onItemRemove(item.id)">DELETE</button>
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
export class AppComponent implements OnInit{
  title : string;
  item : Item = new Item();
  items: Item[] = [];

  devMode:boolean;

  constructor(private itemsService:ItemsService, public snackBar: MdSnackBar){
    this.title = "Item List Editor";
    this.devMode = false;
  }

  @ViewChild(ItemFormComponent)
  private itemFormComponent: ItemFormComponent;

  //NOTE:deprecated. The item is always retrieved from the server
  private getItemIndexFromId(id: string): any {

    for(let i = 0; i < this.items.length; i++){
      if(this.items[i].id == id){
        return this.items[i];
      }
    }

    return null;

  }

  setDevMode(event){
    this.devMode = event.checked;
    this.itemFormComponent.onDevModeToggle(this.devMode);
  }

  onItemAdded(event:Item){
    console.log("onItemAdded event received by app.component", event);

    this.refreshList();
  }

  onException(error:any){
    this.openSnackBar(error,"alert");
  }

  onItemSelect(id:string){

    this.itemsService.getItem(id).then((item)=>{
      this.item = item;
      this.itemFormComponent.onSelected(this.item);
    }).catch((exc)=>{
      this.openSnackBar("could not find item with id "+id, "alert");
    });

  }

  onItemRemove(id:string){
    this.itemsService.deleteItem(id).then((removedItem:Item)=>{
      this.refreshList();
    })
      .catch((exception)=>{
        console.error(exception);
      });
  }

  ngOnInit(){
    this.refreshList();
  }

  refreshList(){
    this.itemsService.fetchItems().then((items)=>{
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

    })
      .catch((exception)=>{
        this.openSnackBar(exception, "alert");
      });
  }

  openSnackBar(msg, type) {

    let currentSnackBar = this.snackBar.openFromComponent(SnackBarMessageComponent,{
      duration: 3000
    });
    currentSnackBar.instance.message = msg;
    currentSnackBar.instance.type = type;
  }

}
