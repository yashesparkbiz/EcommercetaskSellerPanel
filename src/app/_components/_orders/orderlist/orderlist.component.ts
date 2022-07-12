import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orderdetail } from 'src/app/_models/orderdetail';
import { OrderdetailsService } from 'src/app/_services/orderdetails.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  orderdata!:ordermodel[];
  
  constructor(private router: Router, private orderdetailsService:OrderdetailsService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == "" || localStorage.getItem('token') == undefined) {
      this.router.navigate(['/login']);
    }
    else {
      debugger
      var user_Id: number = (Number)(localStorage.getItem('id')?.toString());
      this.orderdetailsService.getbyuserid(user_Id).subscribe(res => {
        this.orderdata = res;
      })
    }
  }
}

export class ordermodel {
  id!: number;
  product_Name!: string;
  quantity!: number;
  order_Id!: number;
  status!: string;
  price!: number;
  product_Subcategory_Id!:number; 
}

