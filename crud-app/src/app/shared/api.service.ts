import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'http://localhost:59894/users/';

  constructor(private http: HttpClient) { }

  login(loginPayload): Observable<ApiResponse>{
    return this.http.post<ApiResponse>('http://localhost:59894/' + 'token/generate-token', loginPayload)
  }

  getUsers(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl); 
  }

  getUserById(id: number): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl + id);
  }

  createUser(user: User): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseUrl, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl, user);
  }

  deleteUser(id: number){
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }
}
