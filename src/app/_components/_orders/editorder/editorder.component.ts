import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Order, Orderdetail } from 'src/app/_models/orderdetail';
import { Product } from 'src/app/_models/product.model';
import { OrderdetailsService } from 'src/app/_services/orderdetails.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-editorder',
  templateUrl: './editorder.component.html',
  styleUrls: ['./editorder.component.css']
})
export class EditorderComponent implements OnInit {
  orderdetailsdata!:Order;
  public id!: number;
  updateOrderForm!:FormGroup;
  isUpdate!:boolean;
  product!:Product;
  constructor(private router: Router, private orderdetailsService:OrderdetailsService, private route:ActivatedRoute, private productService:ProductService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == "" || localStorage.getItem('token') == undefined) {
      this.router.navigate(['/login']);
    }
    else {
      this.updateOrderForm = new FormGroup({
        product_Id: new FormControl(''),
        status: new FormControl(''),
      });
       this.route.params.subscribe((params: Params) => { this.id = params['id']; })
       this.getorderdetailsbyid(this.id);
    }
  }

  getorderdetailsbyid(id:number){
    this.orderdetailsService.getbyid(id).subscribe(res => {this.orderdetailsdata = res; this.fillform(res);});
  }

  fillform(data:Order)
  {
    this.updateOrderForm.controls["product_Id"].setValue(data.product_Id);
    this.updateOrderForm.controls["status"].setValue(data.status);
  }

  async updateOrder(data:any){
    debugger
    if (data != undefined || data != null || data.status != ""){
      if(data.status == "delivered"){
        await this.productService.getProductById(data.product_Id).subscribe(res => {
          this.product = res;
          this.updateProduct(res, this.orderdetailsdata.quantity);
        })
      }
      const orderdata :Order ={
        id: this.orderdetailsdata.id,
        product_Id: data.product_Id,
        quantity: this.orderdetailsdata.quantity,
        order_Id: this.orderdetailsdata.order_Id,
        status: data.status,
        discount_Id: this.orderdetailsdata.discount_Id
      }
      this.orderdetailsService.update(orderdata).subscribe(res => {
        this.isUpdate = res;
        if (this.isUpdate == true) {
          alert("Order updated successfully");
          this.router.navigate(['/orderlist']);
        }
      });
    }
  }

  async updateProduct(data:Product, quantity:number){
    debugger
    var qty = data.quantity - quantity;
    const productdata: Product =
      {
        id: data.id,
        product_Name: data.product_Name,
        description: data.description,
        brand: data.brand,
        price: (Number)(data.price),
        product_Subcategory_Id: (Number)(data.product_Subcategory_Id),
        quantity: qty,
        image: data.image,
        is_Active: data.is_Active,
        user_Id: data.user_Id
      }

      await this.productService.updateProduct(productdata).subscribe(res => {
        this.isUpdate = res;
        if (this.isUpdate == true) {
          alert("Product updated successfully");
        }
      });
  }
}