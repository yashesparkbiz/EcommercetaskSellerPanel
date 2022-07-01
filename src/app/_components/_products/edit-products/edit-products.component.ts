import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/_models/categories.model';
import { SubCategories } from 'src/app/_models/sub-categories.model';
import { CategoriesService } from 'src/app/_services/categories.service';
import { SubcategoryService } from 'src/app/_services/subcategory.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  updateProductForm!:FormGroup;
  subcategoriesdata!: Observable<SubCategories[]>;
  categoriesdata!: Observable<Categories[]>;
  constructor(private subcategoriesService: SubcategoryService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
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
  }

  changeCategory(e: any) {
    var categoryid = e.target.value;
    this.getSubCategorydata((Number)(categoryid));
  }

  async getcategorydata() {
    this.categoriesdata = this.categoriesService.get();
  }

  async getSubCategorydata(categoryid: number) {
    this.subcategoriesdata = this.subcategoriesService.getbycategoryid(categoryid);
  }

  updateProduct(data:any)
  {
    
  }
}