import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  ibgeApi = environment.ibgeApi;

  constructor(private _httpClient: HttpClient) { }

  listUfs(): Observable<any> {
    return this._httpClient.get(`${this.ibgeApi}estados?orderBy=nome`);
  }

  listCities(uf: string): Observable<any> {
    return this._httpClient.get(`${this.ibgeApi}estados/${uf}/municipios`);
  }
}
