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

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl); 
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(this.baseUrl + id);
  }

  checkUserByEmail(username: string): Observable<any>{
    return this.http.post<any>(this.baseUrl + "/registering/username", username); 
  }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(this.baseUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl, user);
  }

  deleteUser(id: number){
    return this.http.delete(this.baseUrl + id);
  }
}
