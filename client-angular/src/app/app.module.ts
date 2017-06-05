import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

//adding animation module to be used with material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdSlideToggleModule, MdInputModule, MdGridListModule, MdListModule, MdSnackBarModule} from '@angular/material'

import { AppComponent }  from './app.component';
import { ItemFormComponent }  from './item-add-component';
import { ItemsService} from './items.service';
import { MessageService} from './MessageService';
import { SnackBarMessageComponent} from "./common/snack-bar-component";

import { StompService } from 'ng2-stomp-service';



@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    //materials modules
    MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdSlideToggleModule, MdInputModule, MdGridListModule, MdListModule, MdSnackBarModule
  ],
  providers: [ItemsService, MessageService, StompService],
  declarations: [ AppComponent, ItemFormComponent, SnackBarMessageComponent ],
  bootstrap:    [ AppComponent],
  entryComponents: [SnackBarMessageComponent]

})
export class AppModule { }
