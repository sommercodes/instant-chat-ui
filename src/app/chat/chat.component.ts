import { Component, OnInit, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
import { SocketService } from '../socket.service';
import { LoginService } from '../login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router'; 
import {MdInputModule, MdToolbarModule, MdCardModule, MdButtonModule, MdSidenavModule, MdSidenav, MdListModule} from '@angular/material';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [SocketService, LoginService],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
      if (event.target.innerWidth < 700) {
          this.sidenav.close();
      } 
      else if (event.target.innerWidth >= 700){
          this.sidenav.open();
      }
  }
  jwtHelper: JwtHelper = new JwtHelper();
  complexForm : FormGroup;
  chatConnection;
  userConnection;
  user: string;
  messages: any[];
  users: any[];
  usersOnline: any[];
  token: string;
  messages2: string[];
  sidenavOpen: boolean

  // We are passing an instance of the FormBuilder to our constructor
  constructor(fb: FormBuilder, private loginService: LoginService, private socketService: SocketService, private router: Router){
    this.complexForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'msg' : ['']
    });
    this.messages = [];
    this.users = [];
    this.usersOnline = [];
    this.token = localStorage.getItem('token');
    this.user = this.jwtHelper.decodeToken(this.token)._doc.name;
    this.messages = ['test', 'test','test','test','test','test','test','test','test','test','test', 'test','test','test','test','test','test','test','test','test'];
    this.sidenavOpen = true;

  }
  ngOnInit() {
    this.chatConnection = this.socketService.getMessages().subscribe(message => {
      this.messages.push(message);
      console.log(this.messages);
    });
    this.socketService.getUserJoined().subscribe(user => {
      this.usersOnline.push(user);
    });
    this.socketService.userLeft().subscribe(user => {
      let index = this.usersOnline.indexOf(user, 0);
      if (index > -1) {
        this.usersOnline.splice(index, 1);
      }
    });

    this.socketService.getUsersInit().subscribe(users => {
      this.users = users;
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].online) {
          this.usersOnline.push(this.users[i].name);
        }
      }
    });
  }

  logout(){
    this.loginService.logout(this.user)
      .subscribe(
        data => {
          this.socketService.logout(this.user);
          this.router.navigate(['/']);
          localStorage.removeItem('token');          
        });
  }

  sendMsg(value: any):void{
    this.socketService.sendMsg(value.msg, this.user);
  }

  toggleSidenavIcon() {
    this.sidenavOpen = !this.sidenavOpen;
  }

}
