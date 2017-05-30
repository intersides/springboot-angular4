/**
 * Created by marcofalsitta on 27.05.17.
 */

import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Item} from "./Item";
import {ItemsService} from "./items.service"
import {Subject} from "rxjs/Subject";


@Component({
  selector:"item-form",
  providers:[ItemsService],
  templateUrl:"./item-add-component.html"
})
export class ItemFormComponent {

  public model:Item;
  private submitted:boolean;
  lockId:boolean = true;
  isUpdate:boolean = false;
  idAtSelectionTime:string;

  @Input() parentSubject:Subject<any>;

  @Output() onItemAdded = new EventEmitter<Item>();
  @Output() onItemRemoved = new EventEmitter<Item>();


  constructor(private itemsService:ItemsService){
    this.model = new Item();
    this.submitted = false;
  }

  onSubmit(){
    this.submitted = true;
    console.log("submitting...", this.submitted);

    if(this.isUpdate){
      this.itemsService.updateItem(this.model)
        .then((item)=>{
          console.log("updated", item);
          this.onItemAdded.emit(item);
      })
        .catch(error=>{
          console.error(error);
      })
    }
    else{
      this.itemsService.addItem(this.model).then((item)=>{
        console.log("added",item);
        this.onItemAdded.emit(item);
      })
        .catch(error=>{
          console.error(error);
        })

    }
  }

  onSelected(selectedItem:Item){
    this.model = new Item(selectedItem);
    this.idAtSelectionTime = this.model.id;
    this.isUpdate = true;
  }

  public onLockToggle(event){
    console.log("onLockToggle()");
    this.lockId = !this.lockId;

    // this.isUpdate = !this.lockId;

  }

  onKeyUp(event, isId:boolean=false){
    if(isId == true){
      this.model.id = event.target.value;

    }


    if(typeof this.idAtSelectionTime !== "undefined"){

      console.info(this.model.id);
      console.warn(this.idAtSelectionTime);
      console.log("___");

      this.isUpdate = this.model.id == this.idAtSelectionTime;

    }

  }

  resetForm(){
    this.model = new Item();
    this.isUpdate = false;
  }


}
