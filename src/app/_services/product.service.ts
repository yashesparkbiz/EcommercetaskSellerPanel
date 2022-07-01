import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../_interfaces/products';
import { Product } from '../_models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  addProduct(body: Products){
    debugger
    return this.http.post<any>("https://localhost:7180/Product/add-product", JSON.stringify(body), { headers: this.headers });
  }

  getProductsByUserId(user_Id:number) : Observable<Array<Product>>{
    debugger
    return this.http.get<Array<Product>>("https://localhost:7180/Product/get-products-byUserid/"+user_Id, { headers: this.headers });
  }
}