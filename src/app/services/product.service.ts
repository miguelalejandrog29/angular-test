import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstantsService } from '../utils/app-constants.service';
import { Observable, filter, map } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private constants: AppConstantsService) { }

  get(limit: string = '', order: string = ''): Observable<Product[]> {
    return this.httpClient
      .get<any>(
        this.constants.getApiUrl('products'),
        {
          headers: this.constants.getApiHeaders(),
          params: limit != '' && parseInt(limit) > 0 ? new HttpParams().set('limit', limit).set('sort', order) : new HttpParams().set('sort', order)
        }
      );
  }
}
