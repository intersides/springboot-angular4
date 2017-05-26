/**
 * Created by marcofalsitta on 26.05.17.
 */

import { Injectable }   from "@angular/core";
import { ITEMS }        from "./mock-items"

@Injectable()
export class ItemsService{
    getItems(){
        return ITEMS;
    }
}