/**
 * Created by marcofalsitta on 26.05.17.
 */

import { UtilityService } from "./utils/utility.service";


interface IItem {
  id?: string;
  name : string;
  description: string;
  creationDate?:number; //timestamps
}

export class Item{
  id:string=null;
  name:string=null;
  description:string=null;
  creationDate:number = new Date().getTime();
  isLocked:boolean=false;

  constructor(iITem?:IItem){
    this.id = UtilityService.getInstance().generateUUID();

    if(iITem){
      if(iITem.id){
        this.id = iITem.id;
      }
      this.name = iITem.name;
      this.description = iITem.description;
      if(iITem.creationDate){
        this.creationDate = iITem.creationDate;
      }
    }
    this.isLocked = false;
  }

  get diagnostic(){
    return JSON.stringify(this, null, "\t");
  }

}
