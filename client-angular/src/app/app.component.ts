import { Component, OnInit } from '@angular/core';
import {Item} from "./Item";
import { ItemsService } from "./items.service";

@Component({
  selector: 'my-app',
  providers:[ItemsService],
  template: `
    <h1>{{title}}</h1>
    <h2>Chosen technology is :{{item.name}}</h2>
    <p>Technologies:</p>
    <ul class="list-group">
      <li *ngFor="let item of items" class="list-group-item">
        <span class="name">{{item.name}} </span>
        <span class="description">{{item.description}} </span>
        <code>{{item.id}}</code>
        <button class="btn" (click)="onItemClick(item.id)"> select me</button>
        <button class="btn btn-danger" (click)="onItemRemove(item.id)"> remove me</button>
      </li>
    </ul>
    <!--<p *ngIf="items.length > 3">There are many technologies!</p>-->
    <div>
      <input (keyup)="onKeyUp($event)" (keyup.enter)="onKeyEnter($event)" class="form-control" >
      <p>{{insertedValues}}</p>
    </div>


    <item-form (onItemAdded)="onItemAdded($event)">new form here...</item-form>

  `
})
export class AppComponent implements OnInit{
  title : string;
  item : Item = new Item();
  items: Item[] = [];
  insertedValues:string;

  constructor(private itemsService:ItemsService){
    this.title = "Fluance - Test";
  }

  onItemClick(id:string){

    let selectedItem = this.getItemIndexFromId(id);
    if(selectedItem != null){
      this.item = selectedItem;
    }
    else{
      alert("could not find item form id"+id);
    }
  }



  private getItemIndexFromId(id: string): any {

    for(let i = 0; i < this.items.length; i++){
      if(this.items[i].id == id){
        return this.items[i];
      }
    }

    return null;

  }

  onKeyUp(event:any){
    this.insertedValues = event.target.value;
  }

  onKeyEnter(event:any){
    console.log(`sending ${this.insertedValues}`);
  }

  onItemAdded(event:Item){
    console.warn("test event binding", event);
    this.refreshList();
  }

  onItemRemove(id:string){
    this.itemsService.deleteItem(id).then((removedItem:Item)=>{
      console.info("removed item ", removedItem);
      this.refreshList();
    });
  }

  ngOnInit(){
    this.refreshList();
  }

  refreshList(){
    this.itemsService.fetchItems().then((items)=>{
      //reorder items
      items.sort((a, b)=>{
        return a.creationDate - b.creationDate;
      });

      this.items = items;
      this.item = this.items[0];
    })
  }

}
