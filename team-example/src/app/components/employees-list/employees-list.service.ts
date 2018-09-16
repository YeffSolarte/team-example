import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../../shared/base.service";
import { Employee } from "../../models/employee";
import {Observable} from "rxjs";
import {MatDialog} from '@angular/material';

@Injectable()
export class EmployeesListService extends BaseService<Employee>{
  constructor(public _http:HttpClient, public dialog: MatDialog){
    super(_http, 'employee', dialog)
  }

  getUsers(val: string): Observable<any[]> {
    return this._http.get<any>(`https://restcountries.eu/rest/v2/name/${val}`)
  }
}
