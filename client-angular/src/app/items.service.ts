/**
 * Created by marcofalsitta on 26.05.17.
 */

import {EventEmitter, Injectable, Output}   from "@angular/core";
import { ITEMS }        from "./mock-items"
import {Item} from "./Item";
import {Http, RequestOptions, Headers, RequestMethod} from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ItemsService{

  private host = "";
  private http:Http;

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(http:Http){
    this.http = http;


  }

  private prepareRequest(){

  }

  fetchItems(): Promise<Item[]>{

    let options = new RequestOptions({
      headers:this.headers
    });

    return this.http.get(this.host+"/items", options)
      .toPromise()
      .then(response => {
        console.log(response.json().msg);
        return response.json().data as Item[];
      })
      .catch(this.handleError);
  }

  getItem(itemId): Promise<Item>{

    let options = new RequestOptions({
      headers:this.headers
    });

    return this.http.post(this.host+"/item", {id:itemId}, options).toPromise()
      .then(response =>{
        console.log(response.json().msg);
        return response.json().data;
      })
      .catch(this.handleError);
  }

  addItem(item:Item){

    return this.http.put(this.host+"/item", item, this.headers).toPromise()
      .then(response =>{
        console.log(response.json().msg);
        return response.json().data;
      })
      .catch(this.handleError);
  }

  updateItem(item:Item){

    return this.http.patch(this.host+"/item", item, this.headers).toPromise()
      .then(response =>{
        console.log(response.json().msg);
        return response.json().data;
      })
      .catch(this.handleError);
  }

  deleteItem(itemId:string){

    let options = new RequestOptions({
      headers:this.headers,
      body:{id:itemId}
    });

    return this.http.delete(this.host+"/item", options).toPromise()
      .then(response =>{
        console.log(response.json().msg);
        return response.json().data;
      })
      .catch(error=>{
        return this.handleError(error);
      });
  }



  private handleError(error: any) {
    console.error('An error occurred', error);
    if(typeof error['_body'] == "string"){
      try{
        let errorObj = JSON.parse(error['_body']);
        console.error(errorObj["msg"]);
        return Promise.reject(errorObj["msg"]);

      }
      catch(jsonParseError){
        console.error("could not parse:", error['_body']);
      }

    }
    else{
      console.error("trapped error is malformes, does not contains _body part");
    }
  }

}
