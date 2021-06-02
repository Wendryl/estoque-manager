import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ISale} from '../Models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  api = environment.apiUrl;
  token = localStorage.getItem('authToken')

  constructor(private _httpClient: HttpClient) { }

  list(): Observable<Array<ISale>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.get<Array<ISale>>(`${this.api}sales`, {headers});
  }

  find(id: number): Observable<ISale> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.get<ISale>(`${this.api}sales/${id}`, {headers});
  }

  create(product: ISale): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.post<any>(`${this.api}sales`, product, {headers});
  }
}
