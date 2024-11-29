import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private typeUser: string = '';

  constructor() { }

  setTypeUser(value: string): void {
    this.typeUser = value;
  }

  getTypeUser(): string {
    return this.typeUser;
  }
}
