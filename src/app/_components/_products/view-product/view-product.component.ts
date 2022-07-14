import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/_models/product.model';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  public id!: number;
  Productdata!: Product;
  constructor(private route: ActivatedRoute, private productService: ProductService, private router:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == "" || localStorage.getItem('token') == undefined) {
      this.router.navigate(['/login']);
    }
    else {
      this.route.params.subscribe((params: Params) => { this.id = params['id']; });
      this.getProductById(this.id);
    }
  }

  getProductById(id: number) {
    debugger
    this.productService.getProductById(id).subscribe(res => {
      this.Productdata = res;
    });
  }

  public createImgPath = (serverPath: string) => { 
    return `https://localhost:7180/${serverPath}`; 
  }
}
