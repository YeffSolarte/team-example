import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//components
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeesFormComponent } from './components/employees-form/employees-form.component';
import {ConfirmationGuard} from "./guards/confirmation.guard";

const appRoutes : Routes = [
  {
    path : '',
    component : EmployeesListComponent
  },
  {
    path : 'form',
    component : EmployeesFormComponent,
    canDeactivate : [ConfirmationGuard]
  }
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
