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

  create(product: IProduct): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.post<any>(`${this.api}products`, product, {headers});
  }

  update(id: number, product: IProduct): Observable<number> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.put<number>(`${this.api}products/${id}`, product, {headers});
  }
}
