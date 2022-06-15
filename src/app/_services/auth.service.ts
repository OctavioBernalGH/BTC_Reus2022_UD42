import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const APIAUTH = 'https://jmm-spring-api-h2-angular.herokuapp.com/';
const HTTPOPTIONS = {
  headers: new HttpHeaders({ contentType: 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      APIAUTH + 'singIn',
      {
        username,
        password,
      },

      HTTPOPTIONS
    );
  }

  register(username: string, email:string, password: string): Observable<any>{
    return this.http.post(APIAUTH + 'signup',{
      username,
      email,
      password
    }, HTTPOPTIONS);
  }

}
