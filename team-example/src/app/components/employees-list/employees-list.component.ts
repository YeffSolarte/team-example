import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute} from "@angular/router";
import { EmployeesListService } from "./employees-list.service";
import { Observable } from "rxjs";
import { Store} from "@ngrx/store";
import { AppState} from "../../app.state";
import * as EmployeeActions from './../../actions/employee.actions';
import {Employee} from "../../models/employee";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})

export class EmployeesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'user_name', 'hire_date', 'options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  employees : Observable<any>;
  dataSource;
  constructor(private _route : ActivatedRoute,
              private _router: Router,
              private store : Store<AppState>,
              private _emService:EmployeesListService) {
    this.employees = store.select('employee');
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.employees.subscribe(response => {
      if(!response.length){
        this._emService.get().subscribe(response => {
          if (!response.error) {
            response.data.forEach(val => {
              val.age = this._emService.getAge(val.dob);
              val.options = '';
            });
            this.store.dispatch(new EmployeeActions.AddEmployees(response.data));
          } else {

          }
        }, err => {
          console.log(err);
        })
      } else {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    });

  }

  deleteEmploye(entity: Employee){
    this._emService.delete(entity._id).subscribe(response => {
      if(!response.error){
        this._emService.openDialog("Employee Deleted");
        this.store.dispatch(new EmployeeActions.RemoveEmployee(entity._id));
      } else {
        this._emService.openDialog("We Have a Problem");
      }
    }, error => {
      console.log(error);
      this._emService.openDialog("We Have a Problem");
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
