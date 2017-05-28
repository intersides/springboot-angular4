/**
 * Created by marcofalsitta on 26.05.17.
 */

import {EventEmitter, Injectable, Output}   from "@angular/core";
import { ITEMS }        from "./mock-items"
import {Item} from "./Item";
import {Http} from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ItemsService{

  private host = "";
  private http:Http;

  constructor(http:Http){
    this.http = http;
  }

  fetchItems(): Promise<Item[]>{
    return this.http.get(this.host+"/items")
      .toPromise()
      .then(response => {
        return response.json() as Item[];
      })
      .catch(this.handleError);
  }

  addItem(item:Item){
  let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put(this.host+"/item", item, headers).toPromise()
      .then(response =>{
        return response.json();
      })
      .catch(this.handleError);
  }

  deleteItem(itemId:string){
    return this.http.delete(this.host+"/item"+"/"+itemId).toPromise()
      .then(response =>{
        return response.json();
      })
      .catch(this.handleError);
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
