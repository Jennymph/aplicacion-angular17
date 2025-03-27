import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmpleadoListComponent } from './components/empleado-list/empleado-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, EmpleadoListComponent, NavbarComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
