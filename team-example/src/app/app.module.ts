import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeesFormComponent } from './components/employees-form/employees-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { EmployeesListService } from "./components/employees-list/employees-list.service";

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployeesFormComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    appRoutingProviders,
    EmployeesListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
