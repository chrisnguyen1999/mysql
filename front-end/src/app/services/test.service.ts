import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  API_URL = `${environment.apiUrl}`;
	constructor(private http: HttpClient) {
	}

  getSuppliers(): Observable<any>{
    const url = `${this.API_URL}/getSuppliers`;
    return this.http.get(url);
  }

  getMerchandise(supplierId: any): Observable<any>{
    const url = `${this.API_URL}/getMerchandise/${supplierId}`;
    return this.http.get(url);
  }

  order(data: any): Observable<any>{
    const url = `${this.API_URL}/order`;
    return this.http.post(url, data);
  }

  getOrderBill(data: any): Observable<any>{
    const url = `${this.API_URL}/getOrderBill`;
    return this.http.get(url, {params: data});
  }

  getProduct(data: any): Observable<any>{
    const url = `${this.API_URL}/getProduct`;
    return this.http.get(url, {params: data});
  }

  removeProduct(productId: any): Observable<any>{
    const url = `${this.API_URL}/removeProduct`;
    return this.http.post(url, productId);
  }

  editProduct(data: any): Observable<any>{
    console.log(data);
    const url = `${this.API_URL}/editProduct`;
    return this.http.post(url, data);
  }

  getBranch(): Observable<any>{
    const url = `${this.API_URL}/getBranch`;
    return this.http.get(url);
  }

  getProductByBranch(branch: any): Observable<any>{
    const url = `${this.API_URL}/getProductByBranch/${branch}`;
    return this.http.get(url);
  }

  buy(data: any): Observable<any>{
    const url = `${this.API_URL}/buy`;
    return this.http.post(url, data);
  }

  getCustomer(data: any): Observable<any>{
    const url = `${this.API_URL}/getCustomer`;
    return this.http.get(url, {params: data});
  }

  getSaleBill(data: any): Observable<any>{
    const url = `${this.API_URL}/getSaleBill`;
    return this.http.get(url, {params: data});
  }
}
