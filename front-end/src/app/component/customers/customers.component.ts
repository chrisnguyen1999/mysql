import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  page: any;
  limit: any;
  customerArray: any[] = [];
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
    this.testService.getCustomer(data)
      .subscribe(function(res) {
        console.log(res)
        if(res.status == "success") {
          self.customerArray = res.data;
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
    this.testService.getCustomer(data)
      .subscribe(function(res) {
        if(res.status == "success") {
          self.customerArray = res.data;
          self.total = Object.values(res.total[0])[0];
        }
      })
  }

}
