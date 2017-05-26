/**
 * Created by marcofalsitta on 26.05.17.
 */

import { UtilityService } from "./utils/utility.service";


interface IItem {
    id?: string;
    name : string;
    description: string;
    creationTimestamp?:Date;
}

export class Item{
    id:string=null;
    name:string=null;
    description:string=null;
    creationTimestamp:Date=new Date();

    constructor(iITem?:IItem){
        this.id = UtilityService.getInstance().generateUUID();

        if(iITem){
            if(iITem.id){
                this.id = iITem.id;
            }
            this.name = iITem.name;
            this.description = iITem.description;
            if(iITem.creationTimestamp){
                this.creationTimestamp = iITem.creationTimestamp;
            }
        }
    }

}