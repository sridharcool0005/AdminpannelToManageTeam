import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
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
import { AnalyticComponent } from './Analytics/analytic/analytic.component';
import { UsageAnalysisComponent } from './Analytics/usage-analysis/usage-analysis.component';
import { SalesAnalysisComponent } from './Analytics/sales-analysis/sales-analysis.component';
import { PurchaseAnalysisComponent } from './Analytics/purchase-analysis/purchase-analysis.component';
import { UsageDetailedComponent } from './Analytics/usage-detailed/usage-detailed.component';
import { PurchaseDetailedComponent } from './Analytics/purchase-detailed/purchase-detailed.component';
import { HelpdeskComponent } from './helpdesk/helpdesk/helpdesk.component';
import { UpdateticketComponent } from './helpdesk/updateticket/updateticket.component';
import { ViewhelpdeskComponent } from './helpdesk/viewhelpdesk/viewhelpdesk.component';
import { ViewtemplatesComponent } from './Templates/viewtemplates/viewtemplates.component';
import { AddTemplatesComponent } from './Templates/add-templates/add-templates.component';
import { AddtemplateTypeComponent } from './Templates/addtemplate-type/addtemplate-type.component';
import { TemplatesComponent } from './Templates/templates/templates.component';
import { ViewsystemtemplatesComponent } from './Templates/viewsystemtemplates/viewsystemtemplates.component';
import { ViewcardsComponent } from './cards/viewcards/viewcards.component';
import { UploadcardsComponent } from './cards/uploadcards/uploadcards.component';
import { CardsComponent } from './cards/cards/cards.component';


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
    AnalyticComponent,
    UsageAnalysisComponent,
    SalesAnalysisComponent,
    PurchaseAnalysisComponent,
    UsageDetailedComponent,
    PurchaseDetailedComponent,
    HelpdeskComponent,
    UpdateticketComponent,
    ViewhelpdeskComponent,
    ViewtemplatesComponent,
    AddTemplatesComponent,
    AddtemplateTypeComponent,
    TemplatesComponent,
    ViewsystemtemplatesComponent,
    ViewcardsComponent,
    UploadcardsComponent,
    CardsComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
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
