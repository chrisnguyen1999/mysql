import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-sale-bill',
  templateUrl: './sale-bill.component.html',
  styleUrls: ['./sale-bill.component.css']
})
export class SaleBillComponent implements OnInit {

  page: any;
  limit: any;
  billArray: any[] = [];
  total: any;
  constructor(private testService: TestService) { }

  ngOnInit(): void {
    var self =this;
    this.limit = 5;
    this.page = 1;
    let data = {
      page: this.page,
      limit: this.limit
    }
    this.testService.getSaleBill(data)
      .subscribe(function(res) {
        if(res.status == "success") {
          self.billArray = res.data;
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
    this.testService.getSaleBill(data)
      .subscribe(function(res) {
        if(res.status == "success") {
          self.billArray = res.data;
          self.total = Object.values(res.total[0])[0];
        }
      })
  }

}
