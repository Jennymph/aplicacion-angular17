import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-empleado-list',
  standalone: true,
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.scss'],
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule], // Agregar CommonModule aquí
})
export class EmpleadoListComponent implements OnInit {
  empleadoForm!: FormGroup;
  empleados: any[] = [];
  puestos: any[] = [];
  mostrarFormulario: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      puesto: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      salario: ['', Validators.required],
      edad: [''],
    });

    this.obtenerPuestos();
  }

  obtenerPuestos() {
    this.http
      .get<any[]>(
        'https://67d0ea93825945773eb24739.mockapi.io/api/v1/getAllJobs'
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.puestos = data;
        },
        (error) => {
          console.error('Error al obtener los puestos:', error);
        }
      );
  }

  agregarEmpleado() {
    if (this.empleadoForm.valid) {
      const nuevoEmpleado = {
        id: this.empleados.length + 1,
        ...this.empleadoForm.value,
      };
      this.empleados.push(nuevoEmpleado);
      this.empleadoForm.reset();
      this.mostrarFormulario = false; // ✅ Ocultamos el formulario después de agregar
    }
  }
}
