import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../../shared/base.service";
import { Employee } from "../../models/employee";

@Injectable()
export class EmployeesListService extends BaseService<Employee>{
  constructor(public _http:HttpClient){
    super(_http, 'employee')
  }
}
