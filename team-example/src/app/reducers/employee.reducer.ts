import { Action } from '@ngrx/store'
import { Employee } from "../models/employee";
import * as EmployeeActions from './../actions/employee.actions';

export function employeeReducer(state : Employee[] = [], action: EmployeeActions.Actions){
  switch(action.type){
    case EmployeeActions.ADD_EMPLOYEE :
      return [...state, action.payload];
    case EmployeeActions.ADD_EMPLOYEES :
      return action.payload;
    case EmployeeActions.REMOVE_EMPLOYEE:
      return state.filter(val => val._id !== action.payload);
    default:
      return state;
  }
}
