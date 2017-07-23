import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket; // The client instance of socket.io
  apiURL = environment.apiURL;

  // Constructor with an injection of ToastService
  constructor(private http: Http) {
    this.socket = io(this.apiURL);
  }

  sendMsg(msg: string, user: string) {
    this.socket.emit('new message', {msg: msg, user: user});
  }

  newUser(user: string) {
    this.socket.emit('user joined', {user: user});
  }

  logout(user: string) {
    this.socket.emit('user left', {user: user});
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);   
      });
      return () => {
        this.socket.disconnect();
      }; 
    })    
    return observable;
  } 

  getUserJoined() {
    let observable = new Observable(observer => {
      this.socket.on('user joined', (data) => {
        observer.next(data.user);   
      });
      return () => {
        this.socket.disconnect();
      }; 
    })    
    return observable;
  }

  userLeft() {
    let observable = new Observable(observer => {
      this.socket.on('user left', (data) => {
        observer.next(data.user);   
      });
      return () => {
        this.socket.disconnect();
      }; 
    })    
    return observable;
  }  

  getUsersInit() {
    let authToken = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiURL + '/api/users', options)
    .map((res:Response) => res.json());
  }
}