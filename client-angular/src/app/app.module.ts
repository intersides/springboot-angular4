import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { ItemFormComponent }  from './item-add-component';
import { ItemsService} from './items.service'

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ItemsService],
  declarations: [ AppComponent, ItemFormComponent ],
  bootstrap:    [ AppComponent]
})
export class AppModule { }
