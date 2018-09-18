import { Action } from '@ngrx/store'
import { Employee } from "../models/employee";
import * as EmployeeActions from './../actions/employee.actions';

export function employeeReducer(state : Employee[] = [], action: EmployeeActions.Actions){
  switch(action.type){
    case EmployeeActions.ADD_EMPLOYEE_SUCCESS:
      return [...state, action.payload];
    case EmployeeActions.GET_EMPLOYEES_SUCCESS:
      return action.payload;
    case EmployeeActions.UPDATE_EMPLOYEES_SUCCESS:
      let result = state.filter(val => val._id !== action.payload._id);
      return [...result, action.payload];
    case EmployeeActions.REMOVE_EMPLOYEE_SUCCESS:
      return state.filter(val => val._id !== action.payload);
    default:
      return state;
  }
}
