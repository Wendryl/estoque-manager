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

  find(id: number): Observable<ICompany> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.get<ICompany>(`${this.api}companies/${id}`, {headers});
  }

  create(company: ICompany): Observable<number> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.post<number>(`${this.api}companies`, company, {headers});
  }

  update(id: number, company: ICompany): Observable<number> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    })

    return this._httpClient.put<number>(`${this.api}companies/${id}`, company, {headers});
  }
}
