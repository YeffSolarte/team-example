import { Component, OnInit } from '@angular/core';
import { map, startWith, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeesListService} from "../employees-list/employees-list.service";
import {Employee} from "../../models/employee";
const moment = _moment;


@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css'],
  providers : [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class EmployeesFormComponent implements OnInit {
  maxDate = this.getMaxDate();
  filteredOptions: Observable<any[]>;
  jobTitles = {
    services : [
      'Host',
      'Tuttofare',
      'Waitress',
      'Dining room manager'
    ],
    kitchen : [
      'Chef',
      'Sous Chef',
      'Dishwasher',
      'Cook',
    ]
  };
  employeeForm =  this.fb.group({
    _id : [''],
    name: ['', Validators.required],
    dob: [moment(this.getMaxDate()), Validators.required],
    country: ['', Validators.required],
    user_name: ['', Validators.required, this.userNameValidator],
    hire_date: [moment(new Date()), Validators.required],
    status: [true],
    job_title: ['', Validators.required],
    tip_rate: ['']
  });
  // });

  constructor(private fb: FormBuilder,
              private _route : ActivatedRoute,
              private _router: Router,
              private _emService:EmployeesListService) {
    this.filteredOptions = this.employeeForm.valueChanges
      .pipe(
        startWith(null),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(val => {
          if(!val) return [];
          if(!val.country) return [];
          return this.filterCountries(val.country)
        })
      );
  }

  ngOnInit() {

  }

  onSubmit(){
    if(this.employeeForm.valid){
      let assign = this.employeeForm.value;
      let employee = new Employee(assign.id, assign.name, assign.dob, assign.country,assign.user_name,assign.hire_date, assign.status, assign.job_title, assign.tip_rate);
      if(!employee._id){
        this._emService.create(employee).subscribe(response => {
          console.log(response);
          if(!response.error){
            this._emService.openDialog("Employee Created");
            this.employeeForm.reset();
            this._router.navigate(['/']);
          } else {
            this._emService.openDialog("We have a problem");
          }

        }, error => {

        })
      } else {
        this._emService.update(employee, '_id').subscribe(response => {
          console.log(response);
          if(!response.error){
            this._emService.openDialog("Employee Modified");
            this.employeeForm.reset();
            this._router.navigate(['/']);
          } else {
            this._emService.openDialog("We have a problem");
          }
        }, error => {

        })
      }
    } else {
      this._emService.openDialog("Invalid Form");
    }
  }

  userNameValidator(control: FormControl):Promise<any> {
    return new Promise(((resolve, reject) => {
      let email = control.value;
      const URL_REGEXP = /[!@#$%^&*(),.?\":{}|<>]/g;
      if (email) {
        const contain = URL_REGEXP.test(control.value);
        if (contain) {
          return resolve({userNameInvalid : true})
        }
      }
      return resolve(null);
    }))
  }

  filterCountries(val: string): Observable<any[]> {
    return this._emService.getUsers(val)
      .pipe(
        map(response => response.filter(option => {
          return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
        }))
      )
  }

  changeArea(){
    this.employeeForm.patchValue({
      job_title: '',
    });
  }

  backFunction(){
    this._router.navigate(['/'])
  }

  getMaxDate(){
    let dateToday = new Date();
    dateToday.setFullYear(dateToday.getFullYear() - 18);
    return new Date(dateToday);
  }

}
