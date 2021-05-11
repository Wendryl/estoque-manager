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

  find(id: number): Observable<ICategory> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.get<ICategory>(`${this.api}categories/${id}`, {headers});
  }

  create(category: ICategory): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.post<any>(`${this.api}categories`, category, {headers});
  }

  update(id: number, category: ICategory): Observable<number> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.put<number>(`${this.api}categories/${id}`, category, {headers});
  }

  delete(id: number): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.delete(`${this.api}categories/${id}`, {headers});
  }
}
