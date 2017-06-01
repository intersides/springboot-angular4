/**
 * Created by marcofalsitta on 01.06.17.
 * InterSides.net
 *
 */

import { WebAPI } from "./web-api";
import {inject} from 'aurelia-framework';

@inject(WebAPI)
export class ContactList{
  constructor(api){
    this.api = api;
    this.contacts = [];
    this.selectedId = null;
  }

  //part of Aurelia life cycle
  created(){
    this.api.getContactList().then(contacts => this.contacts = contacts);
  }

  select(contact){
    this.selectedId = contact.id;
    return true;
  }
}
