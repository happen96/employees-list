import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employees.service';
import { FormModalService } from '../form-modal/form-modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';
import { HEADERS_LABELS, MODAL_IDS, PHONE_REGEX_PATTERN } from '../../constants/app.constants';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.scss']
})
export class ListEmployeesComponent implements OnInit {

  headerLabels = HEADERS_LABELS;
  modalIds = MODAL_IDS;

  form: FormGroup;
  listEmployees: Employee[];
  selectedEmployee: any;
  actionEdit = 'edit';
  actionAdd = 'add';
  phoneValidationPattern = PHONE_REGEX_PATTERN;

  constructor(
    private employeesService: EmployeesService,
    private modalService: FormModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.setListToStore();
    this.setSelectedEmployees();
    this.createForm();
  }

  private getEmployees(): void {
    this.listEmployees = this.employeesService.getListEmployees();
  }

  private setListToStore(): void {
    if (!this.isAvailableList()) {
      this.employeesService.setListToLocaleStorage();
      this.getEmployees();
    }
  }

  private setSelectedEmployees(): void {
    if (this.isAvailableList()) {
      this.listEmployees.map((employee) => {
        if (employee.available) {
          this.selectedEmployee = employee;
        }
      });
    }
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
    this.form.get('id').patchValue(this.listEmployees.length + 1);
  }

  private updateEmployee(): void {
    const result: Employee[] = this.listEmployees.map((employee) => {
      if (employee.id === this.selectedEmployee.id) {
        employee = this.form.value;
      }
      return employee;
    });
    this.employeesService.updateEmployee(result);
  }

  private updateStateOfSelected(): any {
    const resultArr: Employee[] = this.listEmployees.map((employee: Employee) => {
      if (this.selectedEmployee) {
        if (employee.id === this.selectedEmployee.id) {
          employee = this.selectedEmployee;
        }
      } else {
        employee.available = false;
      }
      return employee;
    });
    this.employeesService.updateEmployee(resultArr);
  }

  selectEmployee(element, employeeId): void {
    this.listEmployees.map((employee) => {
      employee.id === employeeId && element.target.checked
        ? (employee.available = true, this.selectedEmployee = employee)
        : (employee.available = false);

      if (!element.target.checked) {
        this.selectedEmployee = null;
      }
    });
    this.updateStateOfSelected();
  }

  deleteEmployee(): void {
    this.listEmployees.map((employee, index) => {
      if (employee.id === this.selectedEmployee.id) {
        this.employeesService.deleteEmployee(this.selectedEmployee);
        this.listEmployees.splice(index, 1);
        this.selectedEmployee = null;
      }
    });
  }

  returnAction(modalId): string {
    const action = modalId.split('-');
    return action[action.length - 1];
  }

  createForm(): void {
    this.form = this.fb.group({
      id: '',
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['',  [Validators.required, Validators.minLength(2)]],
      login: ['',  [Validators.required, Validators.minLength(3)]],
      phone: ['', Validators.pattern(this.phoneValidationPattern)],
      workPhone: ['', Validators.pattern(this.phoneValidationPattern)],
      workEmail: ['', Validators.required],
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

  clearForm(): void {
    this.form.reset();
    this.createForm();
  }

  openModal(id: string): void {
    if (this.returnAction(id) === this.actionEdit) {
      this.updateForm();
    }
    if (this.returnAction(id) === this.actionAdd) {
      this.clearForm();
    }
    this.modalService.open(id);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

  isAvailableList(): any {
    return this.listEmployees && this.listEmployees.length;
  }

  get employeeId(): number {
    return this.form.get('id').value;
  }
}
