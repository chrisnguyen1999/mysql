import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  page: any;
  limit: any;
  productArray: any[] = [];
  total: any;
  constructor(private testService: TestService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    var self =this;
    this.limit = 5;
    this.page = 1;
    let data = {
      page: this.page,
      limit: this.limit
    }
    this.testService.getProduct(data)
      .subscribe(function(res) {
        console.log(res)
        if(res.status == "success") {
          self.productArray = res.data;
          self.total = Object.values(res.total[0])[0];
        }
      })
  }

  pageChanged($event) {
    var self = this;
    this.page = $event;
    let data = {
      page: this.page,
      limit: this.limit
    }
    this.testService.getProduct(data)
      .subscribe(function(res) {
        if(res.status == "success") {
          self.productArray = res.data;
          self.total = Object.values(res.total[0])[0];
        }
      })
  }

  deleteProduct(productId, index) {
    var self = this;
    if(confirm("Do you want to remove this product?")) {
      this.testService.removeProduct({productId: productId})
        .subscribe(function(res) {
          if(res.status == "success") {
            self.toastr.success(res.message)
            self.productArray.splice(index, 1);
          }
        })
    }
  }

  editProduct(productId, index) {
    (<HTMLInputElement>document.getElementById("productname")).value = this.productArray[index].product_name ? this.productArray[index].product_name : "Unknown";
    (<HTMLInputElement>document.getElementById("branch")).innerHTML  = this.productArray[index].branch ? this.productArray[index].branch : "Unknown";
    (<HTMLInputElement>document.getElementById("amount")).innerHTML  = this.productArray[index].amount ? this.productArray[index].amount : "Unknown";
    (<HTMLInputElement>document.getElementById("saleprice")).value = this.productArray[index].sale_price ? this.productArray[index].sale_price: "0";
    (<HTMLInputElement>document.getElementById("offer")).value = this.productArray[index].offer ? this.productArray[index].offer : "10%";
    (<HTMLInputElement>document.getElementById("warranty")).value = this.productArray[index].warranty_period ? this.productArray[index].warranty_period : "6months";
    (<HTMLInputElement>document.getElementById("button")).dataset.id = productId;
    (<HTMLInputElement>document.getElementById("button")).dataset.index = index;
  }

  submit($event) {
    var self =this;
    let index = $event.target.dataset.index;
    let data = {
      productId: $event.target.dataset.id,
      product_name: (<HTMLInputElement>document.getElementById("productname")).value,
      offer: (<HTMLInputElement>document.getElementById("offer")).value,
      warranty_period: (<HTMLInputElement>document.getElementById("warranty")).value,
      sale_price: (<HTMLInputElement>document.getElementById("saleprice")).value
    }
    this.testService.editProduct(data)
      .subscribe(function(res) {
        if(res.status == "success") {
          console.log(res.message)
          self.toastr.success(res.message)
          self.productArray.splice(index, 1, res.data[0]);
        }
      })
  }

}
