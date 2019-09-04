import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get('http://127.0.0.1:5000/product')
  }

  postProducts(data){
    return this.http.post('http://127.0.0.1:5000/product',data)
  }
}
