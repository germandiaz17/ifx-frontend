import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetEntidadesService {
  private apiUrl = 'http://localhost:3000/api/users'; 

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/entidades`);
  }

  createEntidades(newEntidad: {nombre: string, direccion:string}): Observable<any>{
    return this.http.post(`${this.apiUrl}/createEntidades`, newEntidad);
  }

  updateEntidad(entidadData:  {nombre: string, direccion:string, id:number}): Observable<any>{
    return this.http.put(`${this.apiUrl}/updateEntidades`, entidadData);
  }
}
