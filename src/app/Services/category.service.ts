import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ICategory} from '../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  api = environment.apiUrl;
  token = localStorage.getItem('authToken')

  constructor(private _httpClient: HttpClient) { }

  list(): Observable<Array<ICategory>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.get<Array<ICategory>>(`${this.api}categories`, {headers});
  }
}
