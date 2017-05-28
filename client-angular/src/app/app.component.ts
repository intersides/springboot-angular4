import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Item} from "./Item";
import { ItemsService } from "./items.service";
import { ItemFormComponent } from "./item-add-component";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'my-app',
  providers:[ItemsService],
  template: `
    <div class="container">

      <div>
        <h1>{{title}}</h1>

        <h3>{{items.length > 0 ? items.length: 'Empty'}} item{{items.length > 1 ? 's' : ''}} in the list:</h3>
        <ul class="list-group">
          <li *ngFor="let item of items" class="list-group-item">
            <span class="name">{{item.name}} </span>
            <span class="description">{{item.description}} </span>
            <code>{{item.id}}</code>
            <button class="btn" (click)="onItemSelect(item.id)"> select me</button>
            <button class="btn btn-danger" (click)="onItemRemove(item.id)"> remove me</button>
          </li>
        </ul>
        <!--<p *ngIf="items.length > 3">There are many items!</p>-->
        <div>
          <input (keyup)="onKeyUp($event)" (keyup.enter)="onKeyEnter($event)" class="form-control">
          <p>{{insertedValues}}</p>
        </div>

      </div>


      <div class="container" style="max-width: 500px;">
        <item-form (onItemAdded)="onItemAdded($event)">new form here...</item-form>
      </div>


    </div>

  `
})
export class AppComponent implements OnInit{
  title : string;
  item : Item = new Item();
  items: Item[] = [];
  insertedValues:string;

  parentSubject:Subject<any> = new Subject();

  constructor(private itemsService:ItemsService){
    this.title = "Fluance - Test";
  }

  @ViewChild(ItemFormComponent)
  private itemFormComponent: ItemFormComponent;

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

  onItemSelect(id:string){
    let selectedItem = this.getItemIndexFromId(id);
    if(selectedItem != null){
      this.item = selectedItem;
      // this.parentSubject.next('some value');
      this.itemFormComponent.onSelected(selectedItem);

    }
    else{
      alert("could not find item form id"+id);
    }
  }

  onItemRemove(id:string){
    this.itemsService.deleteItem(id).then((removedItem:Item)=>{
      console.info("removed item ", removedItem);
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
      items.sort((a, b)=>{
        return a.creationDate - b.creationDate;
      });

      this.items = items;
      this.item = this.items[0];
    })
      .catch((exception)=>{
      console.error(exception);
    });
  }

}
