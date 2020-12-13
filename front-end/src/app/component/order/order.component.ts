import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  suppliers: any[] = [];
  selectedSupplier: any;
  merchandiseArray: any[] = [];
  totalPrice: any;
  amount: any;
  detail: any[] = [];

  constructor( private testService: TestService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    var self = this;
    self.totalPrice = 0;
    self.amount = 0;
    this.testService.getSuppliers()
      .subscribe(function(res) {
        if(res.status == "success") {
          self.suppliers = res.data;
        }
        else {
          self.suppliers = [];
        }
      })

  }

  chooseSupplier() {
    var self = this;
    this.testService.getMerchandise(this.selectedSupplier)
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
    console.log(this.merchandiseArray)
    for(let i=0; i<this.merchandiseArray.length; i++) {
      if(this.merchandiseArray[i].checked == true) {
        this.amount += parseInt((<HTMLInputElement>document.getElementById(this.merchandiseArray[i].merchandiseId)).value ? (<HTMLInputElement>document.getElementById(this.merchandiseArray[i].merchandiseId)).value: "0");
        this.totalPrice += this.merchandiseArray[i].price * parseInt((<HTMLInputElement>document.getElementById(this.merchandiseArray[i].merchandiseId)).value ? (<HTMLInputElement>document.getElementById(this.merchandiseArray[i].merchandiseId)).value : "0");
        this.detail.push({name_merchandise: this.merchandiseArray[i].name_merchandise,
          amount: (<HTMLInputElement>document.getElementById(this.merchandiseArray[i].merchandiseId)).value ? (<HTMLInputElement>document.getElementById(this.merchandiseArray[i].merchandiseId)).value : 0,
          price: this.merchandiseArray[i].price * parseInt((<HTMLInputElement>document.getElementById(this.merchandiseArray[i].merchandiseId)).value ? (<HTMLInputElement>document.getElementById(this.merchandiseArray[i].merchandiseId)).value : "0")
        })
      }
    }
    let data = {
      supplierId: this.selectedSupplier,
      staffId: "",
      total_price: this.totalPrice,
      amount: this.amount,
      detail: this.detail
    }
    console.log(data)
    this.testService.order(data)
      .subscribe(function(res) {
        console.log(res)
        if(res.status == "success") {
          self.totalPrice = 0;
          self.amount = 0;
          self.detail = [];
          self.toastr.success(res.message)
          self._router.navigate(['/order/bill'])
        }
        else {
          self.toastr.error("Unknown error")
          console.log(res)
        }
      })
  }

}
