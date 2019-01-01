import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user/user.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'http://localhost:59894/users/';

  constructor(private http: HttpClient) { }

  login(loginPayload): Observable<any>{
    return this.http.post<any>('http://localhost:59894/' + 'token/generate-token', loginPayload)
  }

  getUsers(): Observable<any>{
    return this.http.get(this.baseUrl); 
  }

  getUserById(id: number): Observable<any>{
    return this.http.get(this.baseUrl + id);
  }

  checkUserByEmail(username: string): Observable<any>{
    return this.http.post<any>(this.baseUrl + "/registering/username", username); 
  }

  createUser(user: User): Observable<any>{
    return this.http.post(this.baseUrl, user);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.baseUrl, user);
  }

  deleteUser(id: number){
    return this.http.delete(this.baseUrl + id);
  }
}
