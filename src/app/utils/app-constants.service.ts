import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConstantsService {

  constructor() { }

  getApiUrl(module?: string): string {
    return (module == null) ? environment.apiUrl : environment.apiUrl + module;
  }

  getApiHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
  }
}
