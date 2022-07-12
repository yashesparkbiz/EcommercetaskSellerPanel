import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ordermodel } from '../_components/_orders/orderlist/orderlist.component';
import { Order, Orderdetail } from '../_models/orderdetail';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {
  private headers!: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }
  getbyuserid(userid:number): Observable<Array<ordermodel>>{
    return this.http.get<Array<ordermodel>>("https://localhost:7180/OrderDetails/get-all-orderdetails-forseller/"+userid,{headers:this.headers});
  }

  getbyid(id:number): Observable<Orderdetail>{
    debugger
    return this.http.get<Orderdetail>("https://localhost:7180/OrderDetails/get-orderdetailsbyid/"+id,{headers:this.headers});
  }

  update(body:Order){
    return this.http.put<boolean>("https://localhost:7180/OrderDetails/update-orderdetails",JSON.stringify(body),{headers:this.headers});
  }
}