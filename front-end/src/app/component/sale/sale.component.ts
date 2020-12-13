import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  branch: any[] = [];
  selectedBranch: any;
  merchandiseArray: any[] = [];
  totalPrice: any;
  amount: any;
  detail: any[] = [];

  constructor( private testService: TestService,private _router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    var self = this;
    self.totalPrice = 0;
    self.amount = 0;
    this.testService.getBranch()
      .subscribe(function(res) {
        if(res.status == "success") {
          self.branch = res.data;
        }
        else {
          self.branch = [];
        }
      })

  }

  chooseSupplier() {
    var self = this;
    this.testService.getProductByBranch(this.selectedBranch)
      .subscribe(function(res) {
        if(res.status == "success") {
          self.merchandiseArray = res.data;
        }
        else {
          self.merchandiseArray = [];
        }
      })
  }

  checked(check, i) {
    if(check == true) {
      this.merchandiseArray[i].checked = true;
    }
    else {
      this.merchandiseArray[i].checked = false;
    }
  }

  order() {
    var self = this;
    for(let i=0; i<this.merchandiseArray.length; i++) {
      if(this.merchandiseArray[i].checked == true) {
        this.amount += parseInt((<HTMLInputElement>document.getElementById(this.merchandiseArray[i].productId)).value ? (<HTMLInputElement>document.getElementById(this.merchandiseArray[i].productId)).value : "0");
        this.totalPrice += this.merchandiseArray[i].sale_price * parseInt((<HTMLInputElement>document.getElementById(this.merchandiseArray[i].productId)).value ? (<HTMLInputElement>document.getElementById(this.merchandiseArray[i].productId)).value : "0");
        this.detail.push({productId: this.merchandiseArray[i].productId,
          amount: (<HTMLInputElement>document.getElementById(this.merchandiseArray[i].productId)).value ? (<HTMLInputElement>document.getElementById(this.merchandiseArray[i].productId)).value : 0,
          beforeAmount: this.merchandiseArray[i].amount
        })
      }
    }
    let data = {
      staffId: "",
      total_price: this.totalPrice,
      amount: this.amount,
      payment_method: (<HTMLInputElement>document.getElementById("payment_method")).value,
      customerName: (<HTMLInputElement>document.getElementById("customerName")).value,
      address: (<HTMLInputElement>document.getElementById("address")).value,
      phone_number: (<HTMLInputElement>document.getElementById("phone_number")).value,
      email: (<HTMLInputElement>document.getElementById("email")).value,
      dob: (<HTMLInputElement>document.getElementById("dob")).value,
      detail: this.detail
    }

    this.testService.buy(data)
      .subscribe(function(res) {
        console.log(res)
        if(res.status == "success") {
          self.totalPrice = 0;
          self.amount = 0;
          self.detail = [];
          self.toastr.success(res.message)
          self._router.navigate(['/product/bill'])
        }
        else {
          console.log(res)
        }
      })
  }

}
