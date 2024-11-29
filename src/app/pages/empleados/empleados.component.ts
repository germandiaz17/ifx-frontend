import { Component } from '@angular/core';
import { GetEmpleadosService } from '../../services/get-empleados.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ CommonModule, FormsModule, NavbarComponent ],
  templateUrl: './empleados.component.html'
})
export class EmpleadosComponent {
  empleados: any[] = []
  empleadoId!:string
  deleteEmpleadoVariable: any[] = []
  isEditing: boolean = false
  newNameEmpleado: string = ''
  newEmail: string = ''
  newCargo: string = ''
  identificadorEmpleado!: number
    typeUser: string = ''

  constructor(private empleadoService: GetEmpleadosService, private route: ActivatedRoute, private sharedService: SharedService) {}

  ngOnInit() {
    this.empleadoId = String(this.route.snapshot.paramMap.get('id'));
    this.loadEmpleados(this.empleadoId)
    this.typeUser = this.sharedService.getTypeUser();
  }

  loadEmpleados(id: string) {
    this.empleadoService.getEmpleados(id).subscribe(
      (data) => {
        this.empleados = data;
      },
      (error) => {
        console.error('Error loading empleados:', error);
      }
    );
  }


  registerNewEmpleado(form: NgForm) {
    if (form.valid) {
      if(!this.isEditing) {
        const empleadoRegister = {nombre:this.newNameEmpleado, email: this.newEmail, cargo: this.newCargo, entidad_id: parseInt(this.empleadoId)};
        this.empleadoService.createEmpleados(empleadoRegister).subscribe(
          (response) => {
            alert('Empleado creado con exito')
            this.newNameEmpleado = ''
            this.newEmail = ''
            this.newCargo = ''
          },
          (error) => {
            alert('Error al intentar registrar el nuevo empleado');
          }
        );
      }else {
        const updateEmpleado = {nombre:this.newNameEmpleado, email: this.newEmail, cargo: this.newCargo, id:this.identificadorEmpleado};
        this.empleadoService.updateEmpleados(updateEmpleado).subscribe(
          (response) => {
            alert('empleado actualizado con exito')
            this.newNameEmpleado = ''
            this.newEmail = ''
            this.newCargo = ''
            this.isEditing = !this.isEditing
          },
          (error) => {
            alert('Error al intentar actualizar el empleado');
          }
        );
      }
    } else {
      alert('No has completado los campos requeridos.');
    }
  }

  changeModeEditing(empleadoId:number) {
    const position = this.empleados.find(e => e.id === empleadoId)
    this.isEditing = !this.isEditing
    this.newNameEmpleado = position.nombre
    this.newEmail = position.email
    this.newCargo = position.cargo
    this.identificadorEmpleado = empleadoId
  }

  deleteEntidad(empleadoId:number) {
    this.deleteEmpleadoVariable = this.empleados.filter(e => e.id !== empleadoId)
    this.empleados = this.deleteEmpleadoVariable
  }
}
