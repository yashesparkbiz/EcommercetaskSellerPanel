import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategories } from '../_models/sub-categories.model';

@Injectable({
  providedIn: 'root'
})

export class SubcategoryService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }
  getbycategoryid(categoryid:number) : Observable<Array<SubCategories>> {
    return this.http.get<Array<SubCategories>>("https://localhost:7180/ProductSubCategory/get-product-subcategorybycategoryid/"+categoryid, { headers: this.headers });
  }
}
