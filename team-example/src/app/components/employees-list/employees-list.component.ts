import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute, Params} from "@angular/router";
import { Employee} from "../../models/employee";
import { EmployeesListService } from "./employees-list.service";

export interface EmployeesList extends Employee{
  age: number;
  options: string;
}

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})

export class EmployeesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'user_name', 'hire_date', 'options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ELEMENT_DATA: EmployeesList[] = [];
  dataSource;
  constructor(private _route : ActivatedRoute, private _router: Router, private _emService:EmployeesListService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this._emService.get().subscribe(response => {
      console.log(response);
      if (!response.error) {
        response.data.forEach(val => {
          val.age = this.getAge(val.dob);
          val.options = '';
        });
        this.ELEMENT_DATA = response.data;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      } else {

      }
    }, err => {
      console.log(err);
    })
  }

  getAge(date) {
    let today = new Date();
    let birthday = new Date(date);
    let old = today.getFullYear() - birthday.getFullYear();
    let m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      old--;
    }
    return old;
  }

  deleteEmploye(id: string | number){
    this._emService.delete(id).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




}
