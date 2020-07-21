import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import {ApiCallService} from '../app/apiCalls/api-call.service';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { MatDividerModule, MatToolbarModule,
   MatIconModule, MatButtonModule, MatMenuModule, MatListModule, MatCardModule, MatFormFieldModule, MatSelectModule ,MatExpansionModule} from '@angular/material';
    import { FlexLayoutModule } from '@angular/flex-layout';
   import { MaterialModule } from './material/material.module';
import { ViewclientsComponent } from './clientsManage/viewclients/viewclients.component';
import { EditClientsComponent } from './clientsManage/edit-clients/edit-clients.component';
import { AddClientsComponent } from './clientsManage/add-clients/add-clients.component';
import { AddUsersComponent } from './userManage/add-users/add-users.component';
import { EditusersComponent } from './userManage/editusers/editusers.component';
import { ViewusersComponent } from './userManage/viewusers/viewusers.component';
import { ViewPackageComponent } from './PackageManage/view-package/view-package.component';
import { AddPackageComponent } from './PackageManage/add-package/add-package.component';
import { UpdatePackageComponent } from './PackageManage/update-package/update-package.component';
import { ClientComponent } from './clientsManage/client/client.component';
import { UserManageComponent } from './userManage/user-manage/user-manage.component';
import { PackManageComponent } from './PackageManage/pack-manage/pack-manage.component';
import { MDBBootstrapModule,WavesModule, TableModule ,IconsModule  } from 'angular-bootstrap-md';
import { ViewDetailComponent } from './clientsManage/view-detail/view-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    ProfileComponent,
    ViewclientsComponent,
    EditClientsComponent,
    AddClientsComponent,
    AddUsersComponent,
    EditusersComponent,
    ViewusersComponent,
    ViewPackageComponent,
    AddPackageComponent,
    UpdatePackageComponent,
    ClientComponent,
    UserManageComponent,
    PackManageComponent,
    ViewDetailComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    HttpClientModule,
    FormsModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MaterialModule,
    MDBBootstrapModule,
    WavesModule,TableModule,IconsModule,


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, ApiCallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
