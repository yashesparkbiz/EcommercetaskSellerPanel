import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categories } from 'src/app/_models/categories.model';
import { CategoriesService } from 'src/app/_services/categories.service';
import { SubcategoryService } from 'src/app/_services/subcategory.service';
import { SubCategories } from 'src/app/_models/sub-categories.model';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/_services/product.service';
import { Products } from 'src/app/_interfaces/products';
import { Router } from '@angular/router';
import { DiscountService } from 'src/app/_services/discount.service';
import { Discount } from 'src/app/_interfaces/discount';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})

export class AddproductsComponent implements OnInit {
  
  categoriesdata!: Observable<Categories[]>;
  subcategoriesdata!: Observable<SubCategories[]>;
  addProductForm!: FormGroup;
  SelSubCategoryId: string = "0";
  SelCategoryId: string = "0";
  response!: {dbPath: ''};

  constructor( private categoriesService: CategoriesService, private subcategoriesService: SubcategoryService, private productService: ProductService,
    private router: Router, private discountService:DiscountService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == "" || localStorage.getItem('token') == undefined) {
      this.router.navigate(['/login']);
    }
    else {
      this.addProductForm = new FormGroup({
        product_Name: new FormControl(''),
        description: new FormControl(''),
        brand: new FormControl(''),
        price: new FormControl(''),
        product_Subcategory_Id: new FormControl(''),
        quantity: new FormControl(''),
        image: new FormControl('')
      });
      this.getcategorydata();
    }
  }

  changeCategory(e: any) {
    var categoryid = e.target.value;
    this.getSubCategorydata((Number)(categoryid));
  }

  async getSubCategorydata(categoryid: number) {
    this.subcategoriesdata = this.subcategoriesService.getbycategoryid(categoryid);
  }

  async getcategorydata() {
    this.categoriesdata = this.categoriesService.get();
  }

  addProduct(data: any) {
    debugger
    if (data != undefined || data != null || data.product_Name != "") {
      const productdata: Products = {
        in: {
          id: 0,
          product_Name: data.product_Name,
          description: data.description,
          brand: data.brand,
          price: data.price,
          product_Subcategory_Id: data.product_Subcategory_Id,
          quantity: data.quantity,
          image: this.response.dbPath,
          is_Active: true,
          user_Id: (Number)(localStorage.getItem('id')?.toString())
        }
      }
      this.productService.addProduct(productdata).subscribe(res => {
        this.adddiscount(res);
      });
    }
  }

  adddiscount(product_Id:number){
    if(product_Id >0)
    {
      const discountdata: Discount = {
        in: {
          id: 0,
          product_Id: product_Id,
          type: "regular",
          value: "10",
          is_Active: true
        }
      }
      this.discountService.adddiscount(discountdata).subscribe(res => {
          if(res > 0)
          {
            this.router.navigate(['/productslist']);
          }
      });
    }
  }

  uploadFinished = (event: any) => { 
    this.response = event; 
  }
}