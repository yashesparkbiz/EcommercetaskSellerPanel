import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Categories } from 'src/app/_models/categories.model';
import { Product } from 'src/app/_models/product.model';
import { SubCategories } from 'src/app/_models/sub-categories.model';
import { CategoriesService } from 'src/app/_services/categories.service';
import { ProductService } from 'src/app/_services/product.service';
import { SubcategoryService } from 'src/app/_services/subcategory.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  public id!: number;
  updateProductForm!: FormGroup;
  subcategoriesdata!: SubCategories[];
  categoriesdata!: Observable<Categories[]>;
  Productdata!: Product;
  isUpdate!: boolean;
  constructor(private subcategoriesService: SubcategoryService, private categoriesService: CategoriesService, private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == "" || localStorage.getItem('token') == undefined) {
      this.router.navigate(['/login']);
    }
    else {
      this.updateProductForm = new FormGroup({
        product_Name: new FormControl(''),
        description: new FormControl(''),
        brand: new FormControl(''),
        price: new FormControl(''),
        product_Subcategory_Id: new FormControl(''),
        quantity: new FormControl(''),
        image: new FormControl('')
      });
      this.getcategorydata();
      this.route.params.subscribe((params: Params) => { this.id = params['id']; });
      this.getProductById(this.id);
    }
  }

  getProductById(id: number) {
    debugger
    this.productService.getProductById(id).subscribe(res => {
      this.Productdata = res;
      this.fillForm(this.Productdata);
    });
  }

  getcategoryId(subcategoryId: number) {
    debugger
    this.categoriesService.getcategoryId(subcategoryId).subscribe(res => {
      (<HTMLInputElement>document.getElementById("ddlCategory")).value = res.toString();
      this.getSubCategorydata(res);
    });
  }

  fillForm(data: Product) {
    debugger
    this.updateProductForm.controls["product_Name"].setValue(data.product_Name);
    this.updateProductForm.controls["description"].setValue(data.description);
    this.updateProductForm.controls["brand"].setValue(data.brand);
    this.updateProductForm.controls["price"].setValue(data.price.toString());
    this.updateProductForm.controls["quantity"].setValue(data.quantity.toString());
    this.getcategoryId(this.Productdata.product_Subcategory_Id);
  }

  changeCategory(e: any) {
    var categoryid = e.target.value;
    this.getSubCategorydata((Number)(categoryid));
  }

  getcategorydata() {
    this.categoriesdata = this.categoriesService.get();
  }

  getSubCategorydata(categoryid: number) {
    debugger
    this.subcategoriesService.getbycategoryid(categoryid).subscribe(res => {
      this.subcategoriesdata = res;
    });
  }

  updateProduct(data: any) {
    debugger
    alert(JSON.stringify(data));
    if (data != undefined || data != null || data.product_Name != "") {
      const productdata: Product =
      {
        id: (Number)(this.id),
        product_Name: data.product_Name,
        description: data.description,
        brand: data.brand,
        price: (Number)(data.price),
        product_Subcategory_Id: (Number)(data.product_Subcategory_Id),
        quantity: (Number)(data.quantity),
        image: "6.jpg",
        is_Active: true,
        user_Id: (Number)(localStorage.getItem('id')?.toString())
      }
      this.productService.updateProduct(productdata).subscribe(res => {
        this.isUpdate = res;
        if (this.isUpdate == true) {
          alert("Product updated successfully");
          this.router.navigate(['/productslist']);
        }
      });
    }
  }
}