import { Component, OnInit } from '@angular/core';
import { map, startWith, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {Observable} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {EmployeesListService} from "../employees-list/employees-list.service";
import {Employee} from "../../models/employee";
import { Store} from "@ngrx/store";
import { AppState} from "../../app.state";
import * as EmployeeActions from './../../actions/employee.actions';
import { CanComponentDeactivate } from './../../guards/confirmation.guard';

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
export class EmployeesFormComponent implements OnInit, CanComponentDeactivate {
  maxDate = this.getMaxDate();
  filteredOptions: Observable<any[]>;
  hero$: Observable<any[]>;
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
  viewing : boolean = false;
  selectedId : string = '';
  groupA : string = 'services';
  employeeForm =  this.fb.group({
    _id : [''],
    name: ["", Validators.required],
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
              private store : Store<AppState>,
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
    let id = this._route.snapshot.paramMap.get('id'), action = this._route.snapshot.paramMap.get('action');
    if(!id) return;
    this.selectedId = id;
    if(action === 'view') {
      this.viewing = true;
      this.employeeForm.disable();
    }
    this._emService.get(id).subscribe(response => {
      console.log(response);
      if(!response.error){
        let kitchen = this.jobTitles.kitchen.find(val => val === response.data.job_title);
        this.employeeForm.patchValue({
          _id : response.data._id,
          name : response.data.name,
          dob : new Date(response.data.dob),
          hire_date : new Date(response.data.hire_date),
          job_title : response.data.job_title,
          country : response.data.country,
          status : response.data.status,
          tip_rate : response.data.tip_rate,
          user_name : response.data.user_name
        });
        this.groupA = kitchen ? 'kitchen' : 'services';
      } else {

      }

    }, error => {

    })
    this.onChanges();
  }

  onChanges(): void {
    this.employeeForm.get('job_title').valueChanges.subscribe(val => {
      this.employeeForm.patchValue({
        tip_rate: '',
      });
    });
  }

  onSubmit(){
    if(this.employeeForm.valid){
      let assign = this.employeeForm.value;
      let employee = new Employee(assign._id, assign.name, this.dateString(assign.dob), assign.country,assign.user_name, this.dateString(assign.hire_date), assign.status, assign.job_title, this._emService.getAge(assign.dob), "", assign.tip_rate);
      if(!employee._id){
        this._emService.create(employee).subscribe(response => {
          console.log(response);
          if(!response.error){
            employee._id = response.data._id;
            this._emService.openDialog("Employee Created");
            this.employeeForm.reset();
            this.store.dispatch(new EmployeeActions.AddEmployee(employee));
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
            this.store.dispatch(new EmployeeActions.UpdateEmployee(employee));
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

  confirm () {
    if(this.employeeForm.dirty) return confirm("Do you want to go out and miss the writing?");
    else return true;
  }

  dateString (date: Date){
    let d = new Date(date);
    return ("0"+(d.getMonth()+1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear();
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

  changeArea(value){
    this.groupA = value;
    this.employeeForm.patchValue({
      job_title: '',
      tip_rate: '',
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
