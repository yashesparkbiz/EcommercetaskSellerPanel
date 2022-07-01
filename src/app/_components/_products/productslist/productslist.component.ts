import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/_models/product.model';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.css']
})
export class ProductslistComponent implements OnInit {
  productlistdata!:Product[];
  constructor(private productService: ProductService, private router:Router) { }

  ngOnInit(): void {
    debugger
    if(localStorage.getItem('token') == "" || localStorage.getItem('token') == undefined)
    {
      this.router.navigate(['/login']);
    }
    else{
      debugger
      var user_Id: number = (Number)(localStorage.getItem('id')?.toString());
      this.productService.getProductsByUserId(user_Id).subscribe(res => {
        this.productlistdata = res;
      })
    }
  }
}