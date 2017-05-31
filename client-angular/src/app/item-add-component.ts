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
  devMode:boolean=false;

  @Input() parentSubject:Subject<any>;

  @Output() onItemAdded = new EventEmitter<Item>();
  @Output() onItemRemoved = new EventEmitter<Item>();
  @Output() onException = new EventEmitter<any>();


  constructor(private itemsService:ItemsService){
    this.model = new Item();
    this.submitted = false;
  }

  onSubmit(){
    this.submitted = true;

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
        this.resetForm();
      })
        .catch(error=>{
          this.onException.emit(error);
        })

    }
  }

  onSelected(selectedItem:Item){
    this.model = new Item(selectedItem);
    this.idAtSelectionTime = this.model.id;
    this.isUpdate = true;
  }

  onDevModeToggle(devMode:boolean){
    this.devMode = devMode;
  }

  public onLockToggle(event){
    this.lockId = !this.lockId;
    // this.isUpdate = !this.lockId;
  }

  onKeyUp(event, isId:boolean=false){
    if(isId == true){
      this.model.id = event.target.value;
    }

    if(typeof this.idAtSelectionTime !== "undefined"){
      this.isUpdate = this.model.id == this.idAtSelectionTime;
    }

  }

  resetForm(){
    this.model = new Item();
    this.isUpdate = false;
  }


}
