import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ICompany} from '../Models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  api = environment.apiUrl;
  token = localStorage.getItem('authToken')

  constructor(private _httpClient: HttpClient) { }

  list(): Observable<Array<ICompany>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.get<Array<ICompany>>(`${this.api}companies`, {headers});
  }
}
