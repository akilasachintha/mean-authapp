import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(
    private http: HttpClient,
    
    ) { }

  registerUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/register', user, {headers: headers});
  }
}
