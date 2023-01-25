import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css'],
})
export class EmpListComponent implements OnInit {
  employeeList: any = [];
  searchText: any;
  loading: boolean = false;
  // notFound: boolean = false;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getEmployeeList();
  }

  async getEmployeeList() {
    this.loading = true;
    await this.employeeService.getEmployee().then(
      (res: any) => {
        this.employeeList = res;
        this.loading = false;

        // if (this.employeeList.length == 0) {
        //   this.notFound = true;
        //   this.getEmpList();
        // }
        console.log('this.employeeList', this.employeeList);
      },
      (err: any) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  editEmployee(id: any) {
    this.router.navigate(['edit-emp', { id: id }]);
    this.getEmployeeList();
  }

  deleteEmployee(id: any, index: any) {
    confirm('Are you want to delete this record?');

    this.employeeList.splice(index, 1);
    this.loading = true;
    this.employeeService.deleteEmployee(id).then(
      (res: any) => {
        this.getEmployeeList();
        this.loading = true;
        this.toastr.error('Employee deleted');
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
