import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  api = environment.apiUrl;
  token = localStorage.getItem('authToken')

  constructor(private _httpClient: HttpClient) { }

  list(): Observable<Array<IProduct>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.get<Array<IProduct>>(`${this.api}sales`, {headers});
  }

  find(id: number): Observable<IProduct> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.get<IProduct>(`${this.api}sales/${id}`, {headers});
  }

  create(product: IProduct): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.post<any>(`${this.api}sales`, product, {headers});
  }
}
