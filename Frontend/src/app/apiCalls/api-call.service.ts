import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  constructor(private http: HttpClient) { }

  // HttpMethods

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  getEmployeeDetails(data) {
    return this.http.post(environment.apiBaseUrl + '/getEmployess', data);
  }

createEmployee(data) {
  return this.http.post(environment.apiBaseUrl + '/createEmployee', data);
}

editEmployee(data) {
  return this.http.put(environment.apiBaseUrl + '/updateEmployee', data);
}

employeeDetails(data) {
  return this.http.post(environment.apiBaseUrl + '/employeeDetails', data);
}

deleteEmployee(data) {
  return this.http.post(environment.apiBaseUrl + '/deleteEmployee', data);
}

  // Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }


  getUserPayload() {
    let token = this.getToken();
    if (token) {
      let userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    let userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    }
    else {
      return false;
    }
  }
}
