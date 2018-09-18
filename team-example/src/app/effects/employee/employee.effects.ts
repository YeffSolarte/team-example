import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as EmployeeActions from './../../actions/employee.actions';
import { EmployeesListService} from "../../components/employees-list/employees-list.service";
import { switchMap, map, catchError } from 'rxjs/operators';
import {Employee} from "../../models/employee";

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private _emService: EmployeesListService,
  ) { }

  @Effect()
  getEmployees$ = this.actions$
    .ofType(EmployeeActions.GET_EMPLOYEES)
    .pipe(
      switchMap(payload => {
        console.log(payload);
        return this._emService
          .get().pipe(
            map(response => {
              return new EmployeeActions.GetEmployeesSuccess(response.data);
            })
          )

      })
    );

  // @Effect()
  // deleteEmployee$ = this.actions$
  //   .ofType(EmployeeActions.REMOVE_EMPLOYEE)
  //   .pipe(
  //     switchMap(payload => {
  //       console.log(payload);
  //       return this._emService
  //         .get().pipe(
  //           map(response => {
  //             return new EmployeeActions.GetEmployeesSuccess(response.data);
  //           })
  //         )
  //
  //     })
  //   );

  // @Effect()
  // addEmployee$ = this.actions$
  //   .ofType(EmployeeActions.ADD_EMPLOYEE)
  //   .pipe(
  //     switchMap(employee => {
  //       return this._emService
  //         .get().pipe(
  //           map(response => {
  //             return new EmployeeActions.GetEmployeesSuccess(response.data);
  //           })
  //         )
  //
  //     })
  //   );

}
