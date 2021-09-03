import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseURL: string = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  getEmployeeData(): Observable<any> {
    return this.httpClient.get(this.baseURL + "getEmployeeDetails");
  }
}
