import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import {IUser} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = environment.apiUrl;
  token = localStorage.getItem('authToken')

  constructor(private _http: HttpClient) { }

  auth(email: string, password: string): Observable<any> {
    return this._http.post(`${this.api}auth`, { email, password });
  }

  list(): Observable<Array<IUser>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._http.get<Array<IUser>>(`${this.api}users`, {headers});
  }

  find(id: number): Observable<IUser> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._http.get<IUser>(`${this.api}users/${id}`, {headers});
  }

  create(user: IUser): Observable<number> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._http.post<number>(`${this.api}users`, user, {headers});
  }

  update(id: number, user: IUser): Observable<number> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._http.put<number>(`${this.api}users/${id}`, user, {headers});
  }

  delete(id: number): Observable<number> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._http.delete<number>(`${this.api}users/${id}`, {headers});
  }
}
