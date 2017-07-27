import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {
  apiURL = environment.apiURL;

  constructor (
    private http: Http
  ) {}

  login(username: string, password: string) {
    return this.http.post(this.apiURL + '/api/login', {name: username, password: password})
    .map((res:Response) => res.json());
  }

  createUser(username: string, password: string) {
    return this.http.post(this.apiURL + '/api/user', {name: username, password: password})
    .map((res:Response) => res.json());
  }


  logout(username: string) {
    let authToken = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);
    console.log('logging out');

    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiURL + '/api/logout',{name: username}, options)
    .map((res:Response) => res.json());
  }

}
