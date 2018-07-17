import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from "@angular/http";

import { AppComponent } from './app.component';


/*--------------------- Modules externes------------*/ 
import { AccordionModule } from 'ngx-bootstrap';
import {NgPipesModule} from 'ngx-pipes';
import { TabsModule } from 'ngx-bootstrap';

/*--------------------- Modules externes------------*/ 
import { TntService } from './services/tnt.service';
import { WizallService } from './services/wizall.service';
import { TigocashService } from './services/tigocash.service';
import { PostcastService } from './services/postcast.service';
import { EmoneyService } from './services/emoney.service';
import { OrangemoneyService } from './services/orangemoney.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    NgPipesModule,
    HttpModule
  ],
  providers: [TntService,WizallService,TigocashService,PostcastService,EmoneyService,OrangemoneyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
