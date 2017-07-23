import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from "@angular/material";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'
import { ChatComponent } from './chat/chat.component'
import { AuthGuard } from './auth.guard'
import { LoginGuard } from './login.guard'


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import "hammerjs";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,  
    HttpModule,     
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent,
        canActivate: [ LoginGuard ]
      },
      {
        path: 'chat',
        component: ChatComponent,
        canActivate: [ AuthGuard ]
      }
    ])
  ],
  providers: [AuthGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
