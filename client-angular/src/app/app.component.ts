import { Component } from '@angular/core';
import {Item} from "./Item";

import { ItemsService } from "./items.service";

import {ITEMS} from "./mock-items"

@Component({
    selector: 'my-app',
    providers:[ItemsService],
    template: `
        <h1>{{title}}</h1>
        <h2>Chosen technology is :{{item.name}}</h2>
        <p>Technologies:</p>
        <ul class="list-group">
            <li *ngFor="let item of items" class="list-group-item">
                <span>{{item.name}}</span>
                <button class="btn" (click)="onItemClick(item.id)"> select me</button>
            </li>
        </ul>
        <p *ngIf="items.length > 3">There are many technologies!</p>
        <div>
            <input (keyup)="onKeyUp($event)" (keyup.enter)="onKeyEnter($event)" class="form-control" >
            <p>{{insertedValues}}</p>
        </div>


        <item-form>new form here...</item-form>
        
    `
})
export class AppComponent {
    title : string;
    item : Item;
    items: Item[];
    insertedValues:string;

    constructor(itemsService:ItemsService){
        this.title = "Fluance - Test";
        this.items = itemsService.getItems();
        this.item = this.items[0];
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

}


@Component({
    selector:"item-form",
    templateUrl:"./item-form-component.html"
})
export class ItemFormComponent{

    public model:Item;
    private submitted:boolean;

    constructor(){
        this.model = new Item();
        this.submitted = false;
    }

    onSubmit(){
        this.submitted = true;
        console.log("submtting...", this.submitted);
    }

    newItem() {
        this.model = new Item();
    }

    get diagnostic(){
        return JSON.stringify(this.model, null, "\t");
    }


}