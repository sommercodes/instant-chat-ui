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

import { DialogService } from './dialog.service';
import { MdDialogModule, MdButtonModule  } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import "hammerjs";
import { ImportComponent } from './login/import/import.component';
import { SignupDialogComponent } from './login/signup-dialog/signup-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    ImportComponent,
    SignupDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,  
    HttpModule,     
    ReactiveFormsModule,
    MaterialModule,
    MdDialogModule,
    MdButtonModule,
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
  entryComponents: [
    SignupDialogComponent,
  ],
  providers: [AuthGuard, LoginGuard, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
