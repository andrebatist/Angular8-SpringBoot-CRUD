import { Component, OnInit } from '@angular/core';
import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  submitted = false;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.newEmployee();
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  async save() {
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => console.log(data), error => console.log(error));
    await this.delay(1000);
    this.employee = new Employee();
    this.goToList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  private goToList() {
    this.router.navigate(['/employees']);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
