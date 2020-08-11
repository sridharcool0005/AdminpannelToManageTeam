import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  selectedUser: User = {
    mobile_number: '',
    email_id: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  constructor(private http: HttpClient) { }

  // HttpMethods

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/signup', user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  getuserdata() {
    return this.http.get(environment.apiBaseUrl + '/getuserdata');
  }

  getClients(){
    return this.http.get(environment.apiBaseUrl + '/getClients');
  }

  getuserDetails(data){
    return this.http.post(environment.apiBaseUrl + '/getuserDetails',data);
  }

  updateclientData(data){
    return this.http.put(environment.apiBaseUrl + '/updateclientData',data);
  }

  deleteclient(data){
    return this.http.post(environment.apiBaseUrl + '/deleteclient',data);
  }

  getAllPackages(){
    return this.http.get(environment.apiBaseUrl + '/getAllPackages');
  }

  addPackages(data){
    return this.http.post(environment.apiBaseUrl + '/addPackages',data);
  }

  getPackageDetails(data){
    return this.http.post(environment.apiBaseUrl + '/getPackageDetails',data);
  }
  updatePackage(data){
    return this.http.put(environment.apiBaseUrl + '/updatePackage',data);
  }

  deletePackage(data){
    return this.http.post(environment.apiBaseUrl + '/deletePackage',data);
  }

  getpurchaseData(){
    return this.http.get(environment.apiBaseUrl + '/getpurchaseData');
  }

  getpurchaseDetailed(data){
    return this.http.post(environment.apiBaseUrl + '/getpurchaseDetailed',data);
  }

  getSalesData(data){
    return this.http.post(environment.apiBaseUrl + '/getSalesData',data);
  }

  getpurchaseDataByDate(data){
    return this.http.post(environment.apiBaseUrl + '/getpurchaseDataByDate',data);
  }

  updatePaymentStatus(data){
    return this.http.put(environment.apiBaseUrl + '/updatePaymentStatus',data);
  }

  sendSMS(data){
    return this.http.post(environment.apiBaseUrl + '/sendSMS',data);
  }

  activationEmail(data){
    return this.http.post(environment.apiBaseUrl + '/activationEmail',data);
  }

  addnewClient(data){
    return this.http.post(environment.apiBaseUrl + '/addnewClient',data);
  }

  getAllTickets(){
    return this.http.get(environment.apiBaseUrl + '/getAllTickets');
  }

  getDataByQuery(data){
    return this.http.post(environment.apiBaseUrl + '/getDataByQuery',data);
  }

  updateticketstatus(data){
    return this.http.put(environment.apiBaseUrl + '/updateticketstatus',data);
  }

  addtemplateType(event_code: string,display_name:string, profileImage: File): Observable<any> {
    const formData: any = new FormData();
    formData.append('event_code', event_code);
    formData.append('avatar', profileImage);
    formData.append('display_name', display_name);

    return this.http.post<User>(environment.apiBaseUrl +  '/addTemplateType', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  addnewTemplate(data){
    return this.http.post(environment.apiBaseUrl + '/addnewTemplate',data);
  }
  getAllTemplateTypes(){
    return this.http.get(environment.apiBaseUrl + '/getAllTemplateTypes');
  }

  getevents(){
    return this.http.get(environment.apiBaseUrl + '/getevents');
  }

  getsmsTemplates(data){
    return this.http.post(environment.apiBaseUrl + '/getsmsTemplates',data);
  }

  uploadtemplates(data){
    return this.http.post(environment.apiBaseUrl + '/uploadtemplates',data)
  }



  uploadCards(title: string, profileImage: File): Observable<any> {
    const formData: any = new FormData();
    formData.append('title', title);
    formData.append('avatar', profileImage);
    return this.http.post<User>(environment.apiBaseUrl +  '/uploadcard', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getAllCards(){
    return this.http.get(environment.apiBaseUrl + '/getAllCards');
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
