import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {IProduct} from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api = environment.apiUrl;
  token = localStorage.getItem('authToken')

  constructor(private _httpClient: HttpClient) { }

  list(): Observable<Array<IProduct>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.get<Array<IProduct>>(`${this.api}products`, {headers});
  }

  find(id: number): Observable<IProduct> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.get<IProduct>(`${this.api}products/${id}`, {headers});
  }
}
