import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeesFormComponent } from './components/employees-form/employees-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatButtonToggleModule, MatSlideToggleModule, MatAutocompleteModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatButtonModule , MatNativeDateModule, MatDatepickerModule, MatSelectModule, MatIconModule } from '@angular/material';
import { EmployeesListService } from "./components/employees-list/employees-list.service";
import { MyDialogComponent} from "./shared/my-dialog/my-dialog.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';
import { employeeReducer } from "./reducers/employee.reducer";
import * as effects from './effects';
import {ConfirmationGuard} from "./guards/confirmation.guard";


@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployeesFormComponent,
    MyDialogComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      employee : employeeReducer
    }),
    EffectsModule.forRoot(effects.effects)
  ],
  entryComponents : [MyDialogComponent],
  providers: [
    appRoutingProviders,
    ConfirmationGuard,
    EmployeesListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
