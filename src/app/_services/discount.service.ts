import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Discount } from '../_interfaces/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  adddiscount(body:Discount)
  {
    return this.http.post("https://localhost:7180/Discount/add-discount", JSON.stringify(body), {headers: this.headers});
  }
}
