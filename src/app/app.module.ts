import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormModalModule } from './components/form-modal/form-modal.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListEmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [FormModalComponent]
})
export class AppModule { }
