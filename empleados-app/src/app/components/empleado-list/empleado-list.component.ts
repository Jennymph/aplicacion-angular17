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
  empleadoSeleccionado: any = null;

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
      .subscribe((data) => {
        this.puestos = data;
      });
  }

  agregarEmpleado() {
    if (this.empleadoForm.valid) {
      const nuevoEmpleado = {
        id: this.empleados.length + 1,
        ...this.empleadoForm.value,
      };
      this.empleados.push(nuevoEmpleado);
      this.empleadoForm.reset();
      this.mostrarFormulario = false; // Ocultamos el formulario después de agregar
    }
  }

  editarEmpleado(empleado: any) {
    this.empleadoSeleccionado = empleado;
    this.empleadoForm.setValue({
      nombre: empleado.nombre,
      puesto: empleado.puesto,
      fechaIngreso: empleado.fechaIngreso,
      salario: empleado.salario,
      edad: empleado.edad || '',
    });
    this.mostrarFormulario = true; //  Mostramos el formulario al editar
  }

  // Función para guardar los cambios en un empleado
  actualizarEmpleado() {
    if (this.empleadoForm.valid && this.empleadoSeleccionado) {
      const empleadoIndex = this.empleados.findIndex(
        (e) => e.id === this.empleadoSeleccionado.id
      );
      if (empleadoIndex !== -1) {
        this.empleados[empleadoIndex] = {
          ...this.empleados[empleadoIndex],
          ...this.empleadoForm.value,
        };
        this.cancelarEdicion(); // Cancelamos la edición después de guardar
      }
    }
  }

  eliminarEmpleado(id: number) {
    this.empleados = this.empleados.filter((empleado) => empleado.id !== id);
  }

  // Función para cancelar la edición
  cancelarEdicion() {
    this.empleadoForm.reset();
    this.mostrarFormulario = false;
    this.empleadoSeleccionado = null; // Limpiar el empleado seleccionado
  }
}
