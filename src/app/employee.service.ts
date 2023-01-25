import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  async getEmployee() {
    return this.http.get(`http://localhost:3000/empList`).toPromise();
  }

  async saveEmployee(data: any) {
    return this.http.post(`http://localhost:3000/empList`, data).toPromise();
  }

  async deleteEmployee(id: any) {
    return this.http.delete(`http://localhost:3000/empList/${id}`).toPromise();
  }

  async getEmployeeById(id: any) {
    return this.http.get(`http://localhost:3000/empList/${id}`).toPromise();
  }

  async editEmployee(id: any, data: any) {
    return this.http
      .put(`http://localhost:3000/empList/${id}`, data)
      .toPromise();
  }
}
