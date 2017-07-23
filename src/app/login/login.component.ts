import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router'; 
import { SocketService } from '../socket.service';
import { JwtHelper } from 'angular2-jwt';
import {MdInputModule} from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService, SocketService ]
})
export class LoginComponent {
  jwtHelper: JwtHelper = new JwtHelper();
  private token: string;

  // The FormGroup object as you may remember from the simple form example exposes various API’s for dealing with forms. Here we are creating a new object and setting its type to FormGroup
  complexForm : FormGroup;

  // We are passing an instance of the FormBuilder to our constructor
  constructor(private socketService: SocketService, fb: FormBuilder, private LoginService: LoginService, private router: Router){
    this.complexForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'username' : ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  // Again we’ll implement our form submit function that will just console.log the results of our form
  login(value: any):void{
    console.log(value);
    this.LoginService.login(value.username, value.password)
      .subscribe(
        data => {
          if(data.success === true){
            console.log(data);
            this.token = data.token;
            localStorage.setItem('token', this.token);
            let user = this.jwtHelper.decodeToken(this.token)._doc.name;
            this.socketService.newUser(user);
            this.complexForm.reset();
            this.router.navigate(['/chat']);
           
          } else {
            console.log("wrong creds");
          }
        });

  }

}
