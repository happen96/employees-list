import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employees.service';
import { HEADERS_LABELS } from '../../constants/app-header-labels';
import { FormModalService } from '../form-modal/form-modal.service';
import { MODAL_IDS } from '../../constants/app-modal-Ids';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styles: [`tr.trow:nth-child(odd) {background-color: rgba(84,163,255, .1);}`]
})
export class ListEmployeesComponent implements OnInit {

  headerLabels = HEADERS_LABELS;
  modalIds = MODAL_IDS;

  form: FormGroup;
  listEmployees: Employee[];
  selectedEmployee: any;
  actionEdit = 'edit';

  constructor(
    private employeesService: EmployeesService,
    private modalService: FormModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setListToStore();
    this.getEmployees();
    this.createForm();
  }

  private setListToStore(): void {
    this.employeesService.setListToLocaleStorage();
  }

  private getEmployees(): void {
    this.listEmployees = this.employeesService.getListEmployees();
  }

  private addNewEmployee(modalId): void {
    if (this.form.valid ) {
      if (!this.employeeId) {
        this.creatEmployeeId();
        this.employeesService.addNewEmployee(this.form.value);
      } else {
        this.updateEmployee();
      }
      this.getEmployees();
      this.closeModal(modalId);
    }
  }

  private creatEmployeeId(): void {
    this.form.get('id').patchValue(this.listEmployees.length);
  }

  private updateEmployee(): void {
    this.listEmployees.map((employee) => {
      if (employee.id === this.selectedEmployee) {
        employee = this.form.value;
      }
    });
    this.employeesService.updateEmployee(this.listEmployees);
  }

  selectEmployee(element, employeeId): void {
    this.listEmployees.map((employee) => {
      employee.id === employeeId && element.target.checked
        ? employee.available = true
        : employee.available = false;

      element.target.checked
        ? this.selectedEmployee = employee
        : this.selectedEmployee = null;
    });
  }

  returnAction(modalId): string {
    const action = modalId.split('-');
    return action[action.length - 1];
  }

  createForm(): void {
    this.form = this.fb.group({
      id: '',
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      login: ['', Validators.required],
      phone: ['', Validators.required],
      workPhone: '',
      workEmail: '',
      email: ['', Validators.required],
      workLocation: ['', Validators.required],
      company: '',
      role: ['', Validators.required],
      hourlyRate: ['', Validators.required],
      available: false
    });
  }

  updateForm(): void {
    this.form = this.fb.group({
      id: this.selectedEmployee.id,
      firstName: this.selectedEmployee.firstName,
      lastName: this.selectedEmployee.lastName,
      login: this.selectedEmployee.login,
      phone: this.selectedEmployee.phone,
      workPhone: this.selectedEmployee.workPhone,
      workEmail: this.selectedEmployee.workEmail,
      email: this.selectedEmployee.email,
      workLocation: this.selectedEmployee.workLocation,
      company: this.selectedEmployee.company,
      role: this.selectedEmployee.role,
      hourlyRate: this.selectedEmployee.hourlyRate,
      available: this.selectedEmployee.available
    });
  }

  deleteEmployee(): void {
    this.listEmployees.map((employee, index) => {
      if (employee.id === this.selectedEmployee.id) {
        this.employeesService.deleteEmployee(this.selectedEmployee);
        this.listEmployees.splice(index, 1);
      }
    });
  }

  openModal(id: string): void {
    this.modalService.open(id);
    if (this.returnAction(id) === this.actionEdit) {
      this.updateForm();
    }
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

  get employeeId(): number {
    return this.form.get('id').value;
  }
}
