import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './socket.service';
declare var componentHandler: any;

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  providers: [SocketService]
})
export class AppComponent {
  messages = [];
  connection;
  message;
  
  constructor(private socketService: SocketService) {}

}
