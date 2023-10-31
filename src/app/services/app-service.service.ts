import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  url: string = 'http://localhost:3000/';
  toggle = new BehaviorSubject(false);
  constructor(public http: HttpClient, private router: Router) {}
  /**
   * GET HAEDER
   * @return httpHeaders
   */
  getHeader() {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Accept', 'application/json');
    httpHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    return httpHeaders;
  }
  getAuthHeader() {
    let token = localStorage.getItem('Auth-token');

    let httpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: 'Bearer ' + token,
    });
    return httpHeaders;
  }

  /**
   * Method will call without login
   * @param email
   * @param pwd
   * @return httpResponse
   */
  callAPI(body: object, type: String, url: string): Observable<any> {
    let headers: HttpHeaders = this.getHeader();
    let options = {
      headers: headers,
    };
    if (type == 'POST') {
      return this.http.post(url, body, options);
    } else if (type == 'PUT') {
      return this.http.put(url, body, options);
    } else if (type == 'DELETE') {
      return this.http.delete(url, options);
    } else {
      return this.http.get(url, options);
    }
  }
  /**
   * Method will call with login
   * @param email
   * @param pwd
   * @return httpResponse
   */
  callAuthAPI(body: object, type: String, url: string): Observable<any> {
    let token = localStorage.getItem('Auth-user');
    if (!token) {
      this.router.navigate(['/authentication/login']);
    }
    let headers: HttpHeaders = this.getAuthHeader();
    console.log(headers);

    let options = {
      headers: headers,
    };
    if (type == 'POST') {
      return this.http.post(url, body, options);
    } else if (type == 'PUT') {
      return this.http.put(url, body, options);
    } else if (type == 'DELETE') {
      return this.http.delete(url, options);
    } else {
      return this.http.get(url, options);
    }
  }

  callAPIwithFile(body: object, type: String, url: string): Observable<any> {
    let token = localStorage.getItem('Auth-user');
    if (!token) {
      this.router.navigate(['/authentication/login']);
    }

    let options = {};
    if (type == 'POST') {
      return this.http.post(url, body, options);
    } else if (type == 'PUT') {
      return this.http.put(url, body, options);
    } else if (type == 'DELETE') {
      return this.http.delete(url, options);
    } else {
      return this.http.get(url, options);
    }
  }

  customAPI(
    header: any,
    body: object,
    type: String,
    url: string
  ): Observable<any> {
    let headers: HttpHeaders = header;
    let options = {
      headers: headers,
    };
    if (type == 'POST') {
      return this.http.post(url, body, options);
    } else if (type == 'PUT') {
      return this.http.put(url, body, options);
    } else if (type == 'DELETE') {
      return this.http.delete(url, options);
    } else {
      return this.http.get(url, options);
    }
  }
}
