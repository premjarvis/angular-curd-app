import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
baseurl = environment.baseUrl

  constructor(private http : HttpClient) { }


  postEmployee(data : any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseurl + "api/employee/create_emp", data, httpOptions)
  }



  getEmployee() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>( this.baseurl + "api/employee/show_emp", httpOptions)
  }



  putEmployee(data : any, id : number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>( this.baseurl + "api/employee/update_emp/" +id, data, httpOptions)
  }



  deleteEmployee(id : number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete( this.baseurl + "api/employee/delete_emp/" +id, httpOptions)
  }
}
