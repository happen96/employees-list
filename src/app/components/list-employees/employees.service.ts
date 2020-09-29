import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee';
import { LIST_EMPLOYEES } from '../../constants/app-list-employees';

@Injectable({ providedIn: 'root' })
export class EmployeesService {

  employees: Employee[] = [];
  LS = localStorage;

  constructor() {}

  setListToLocaleStorage(): void {
    const listEmployees: Employee[] = LIST_EMPLOYEES;
    this.LS.setItem('listEmployees', JSON.stringify(listEmployees));
  }

  getListEmployees(): Employee[] {
    return JSON.parse(this.LS.getItem('listEmployees'));
  }

  addNewEmployee(employee: Employee): void {
    const listEmployees: Employee[] = this.getListEmployees();
    listEmployees.push(employee);
    this.LS.setItem('listEmployees', JSON.stringify(listEmployees));
  }

  updateEmployee(employees: Employee[]): void {
    this.LS.setItem('listEmployees', JSON.stringify(employees));
  }

  deleteEmployee(employees: Employee[]): void {
    this.LS.setItem('listEmployees', JSON.stringify(employees));
  }

}
