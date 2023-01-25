import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-emp',
  templateUrl: './create-emp.component.html',
  styleUrls: ['./create-emp.component.css'],
})
export class CreateEmpComponent implements OnInit {
  employee: any = {};
  loading: boolean = false;
  constructor(
    private empService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.employee = {
      name: '',
      email: '',
      number: '',
      gender: null,
      isMarried: false,
    };
  }

  submitEmp() {
    if (
      this.employee.name == '' ||
      this.employee.email == '' ||
      this.employee.number == '' ||
      this.employee.gender == null
    ) {
      this.toastr.info('Select all fields');
      return;
    }
    let payLoad = {
      name: this.employee.name,
      email: this.employee.email,
      number: this.employee.number,
      gender: this.employee.gender,
      isMarried: (this.employee.isMarried =
        this.employee.isMarried == true ? 'Yes' : 'No'),
    };
    this.loading = true;
    this.empService.saveEmployee(payLoad).then(
      (res: any) => {
        console.log('res', res);
        this.loading = false;
        this.router.navigate(['employees']);
        this.toastr.success('Employee created successfully');
      },
      (err: any) => {
        console.log(err);
        this.loading = false;
      }
    );
  }
}
