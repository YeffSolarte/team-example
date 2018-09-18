// Section 1
import { Action } from '@ngrx/store'
import { Employee } from "../models/employee";

export const ADD_EMPLOYEE = '[EMPLOYEE] Add';
export const ADD_EMPLOYEE_SUCCESS = '[EMPLOYEE] Add Success';
export const ADD_EMPLOYEE_FAIL = '[EMPLOYEE] Add Fail';
export const GET_EMPLOYEES = '[EMPLOYEE] Get List';
export const GET_EMPLOYEES_SUCCESS = '[EMPLOYEE] Get List Success';
export const GET_EMPLOYEES_FAIL = '[EMPLOYEE] Get List Fail';
export const UPDATE_EMPLOYEES = '[EMPLOYEE] Update';
export const UPDATE_EMPLOYEES_SUCCESS = '[EMPLOYEE] Update Success';
export const UPDATE_EMPLOYEES_FAIL = '[EMPLOYEE] Update Fail';
export const REMOVE_EMPLOYEE = '[EMPLOYEE] Remove';
export const REMOVE_EMPLOYEE_SUCCESS = '[EMPLOYEE] Remove Success';
export const REMOVE_EMPLOYEE_FAIL = '[EMPLOYEE] Remove Fail';

export class AddEmployee implements Action {
  readonly type = ADD_EMPLOYEE;
  constructor(public payload : Employee){

  }
}

export class AddEmployeeSuccess implements Action {
  readonly type = ADD_EMPLOYEE_SUCCESS;
  constructor(public payload : Employee){

  }
}

export class AddEmployeeFail implements Action {
  readonly type = ADD_EMPLOYEE_FAIL;
  constructor(public payload : any){

  }
}

export class GetEmployeesSuccess implements Action {
  readonly type = GET_EMPLOYEES_SUCCESS;
  constructor(public payload : Employee[]){

  }
}

export class GetEmployeesFail implements Action {
  readonly type = GET_EMPLOYEES_FAIL;
  constructor(public payload :any){

  }
}

export class UpdateEmployee implements Action {
  readonly type = UPDATE_EMPLOYEES;
  constructor(public payload : Employee){

  }
}

export class UpdateEmployeeSuccess implements Action {
  readonly type = UPDATE_EMPLOYEES_SUCCESS;
  constructor(public payload : Employee){

  }
}

export class UpdateEmployeeFail implements Action {
  readonly type = UPDATE_EMPLOYEES_FAIL;
  constructor(public payload : any){

  }
}

export class GetEmployees implements Action {
  readonly type = GET_EMPLOYEES;
}

export class RemoveEmployee implements Action {
  readonly type = REMOVE_EMPLOYEE;
  constructor(public payload : string | number){

  }
}

export class RemoveEmployeeSuccess implements Action {
  readonly type = REMOVE_EMPLOYEE_SUCCESS;
  constructor(public payload : string | number){

  }
}

export class RemoveEmployeeFail implements Action {
  readonly type = REMOVE_EMPLOYEE_FAIL;
  constructor(public payload : any){

  }
}

export type Actions = AddEmployee |
  RemoveEmployee |
  AddEmployeeSuccess |
  AddEmployeeFail |
  UpdateEmployeeSuccess |
  UpdateEmployeeFail |
  GetEmployees |
  RemoveEmployeeSuccess |
  RemoveEmployeeFail |
  UpdateEmployee |
  GetEmployeesFail |
  GetEmployeesSuccess;
