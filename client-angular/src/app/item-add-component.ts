/**
 * Created by marcofalsitta on 27.05.17.
 */

import {Component, EventEmitter, Output} from "@angular/core";
import {Item} from "./Item";
import {ItemsService} from "./items.service"


@Component({
  selector:"item-form",
  providers:[ItemsService],
  templateUrl:"./item-add-component.html"
})
export class ItemFormComponent{

  public model:Item;
  private submitted:boolean;

  @Output() onItemAdded = new EventEmitter<Item>();
  @Output() onItemRemoved = new EventEmitter<Item>();


  constructor(private itemsService:ItemsService){
    this.model = new Item();
    this.submitted = false;
  }

  onSubmit(){
    this.submitted = true;
    console.log("submitting...", this.submitted);
    this.itemsService.addItem(this.model).then((item)=>{
      console.log(item);
      this.onItemAdded.emit(item);
    })
  }

  newItem() {
    this.model = new Item();
  }

}
