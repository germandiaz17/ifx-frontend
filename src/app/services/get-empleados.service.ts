import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetEmpleadosService {

  private apiUrl = 'http://localhost:3000/api/users'; 

  constructor(private http: HttpClient) { }

  getEmpleados(idEntidad: string): Observable<any> {
    const url = `${this.apiUrl}/empleados?id=${idEntidad}`;
    return this.http.get<any>(url);
  }

  createEmpleados(newEntidad: {nombre: string, email:string, cargo:string, entidad_id:number}): Observable<any>{
    return this.http.post(`${this.apiUrl}/createEmpleados`, newEntidad);
  }

  updateEmpleados(entidadData:  {nombre: string, email:string, cargo:string, id:number}): Observable<any>{
    return this.http.put(`${this.apiUrl}/updateEmpleados`, entidadData);
  }
}
