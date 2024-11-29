import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { Router } from '@angular/router';
import { GetEntidadesService } from '../../services/get-entidades.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  entidades: any[] = [];
  deleteEntidadVariable: any[] = []
  isEditing: boolean = false
  newNameEntidad: string = ''
  newDireccion: string = ''
  identificadorEntidad!: number
  typeUser: string = ''

  constructor(private router: Router, private entidadService: GetEntidadesService, private sharedService: SharedService) {}

  ngOnInit() {
    this.loadEntidades()
    this.typeUser = this.sharedService.getTypeUser();
  }


  loadEntidades() {
    this.entidadService.getCompanies().subscribe(
      (data) => {
        this.entidades = data;
      },
      (error) => {
        console.error('Error loading entidades:', error);
      }
    );
  }

  selectEntidad(entidad:any) {
    this.router.navigate(['/empleados', entidad.id]);
  }


  registerNewEntidad(form: NgForm) {
    if (form.valid) {
      if(!this.isEditing) {
        const entidadRegister = {nombre:this.newNameEntidad, direccion: this.newDireccion};
        this.entidadService.createEntidades(entidadRegister).subscribe(
          (response) => {
            alert('entidad creada con exito')
            this.newNameEntidad = ''
            this.newDireccion = ''
          },
          (error) => {
            alert('Error al intentar registrar la nueva entidad');
          }
        );
      }else {
        const updateEntidad = {nombre:this.newNameEntidad, direccion: this.newDireccion, id:this.identificadorEntidad};
        this.entidadService.updateEntidad(updateEntidad).subscribe(
          (response) => {
            alert('Entidad actualizada con exito')
            this.newNameEntidad = ''
            this.newDireccion = ''
            this.isEditing = !this.isEditing
          },
          (error) => {
            alert('Error al intentar actualizar nueva entidad');
          }
        );
      }
    } else {
      alert('No has completado los campos requeridos.');
    }
  }

  changeModeEditing(entidadId:number) {
    const position = this.entidades.find(e => e.id === entidadId)
    this.isEditing = !this.isEditing
    this.newNameEntidad = position.nombre
    this.newDireccion = position.direccion
    this.identificadorEntidad = entidadId
  }

  deleteEntidad(entidadId:number) {
    this.deleteEntidadVariable = this.entidades.filter(e => e.id !== entidadId)
    this.entidades = this.deleteEntidadVariable
  }
}
