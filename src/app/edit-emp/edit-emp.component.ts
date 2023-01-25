import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css'],
})
export class EditEmpComponent implements OnInit {
  getId: any;
  empWithId: any;
  employee: any;
  loading: boolean = false;

  constructor(
    private empService: EmployeeService,
    private route: ActivatedRoute,
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

    this.getId = this.route.snapshot.params['id'];
    console.log('getId', this.getId);

    this.loading = true;
    this.empService.getEmployeeById(this.getId).then(
      (res: any) => {
        this.empWithId = res;

        (this.employee.name = res.name),
          (this.employee.email = res.email),
          (this.employee.number = res.number),
          (this.employee.gender = res.gender),
          (this.employee.isMarried = res.isMarried == 'Yes' ? true : false),
          console.log('this.empWithId', this.empWithId);
        this.loading = false;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  submitEmp() {
    if (
      this.employee.name == '' ||
      this.employee.email == '' ||
      this.employee.naumber == '' ||
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
    this.empService.editEmployee(this.getId, payLoad).then(
      (res: any) => {
        console.log('editEmployee', res);
        this.loading = false;
        this.router.navigate(['employees']);
        this.toastr.success('Employee edited successfully');
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
