import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private apiUrl =
    'https://67d0ea93825945773eb24739.mockapi.io/api/v1/getAllJobs';
  empleados: Empleado[] = [];

  constructor(private http: HttpClient) {}

  getPuestos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarEmpleado(empleado: Empleado) {
    this.empleados.push({ ...empleado, id: this.empleados.length + 1 });
  }

  getEmpleados(): Empleado[] {
    return this.empleados;
  }
}
