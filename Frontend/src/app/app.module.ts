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
import { UploaddigprofileComponent } from './cards/uploaddigprofile/uploaddigprofile.component';
import { BulkprofileCreateComponent } from './clientsManage/bulkprofile-create/bulkprofile-create.component';
import { ApkuploadsComponent } from './apkupload/apkuploads/apkuploads.component';
import { ViewapksComponent } from './apkupload/viewapks/viewapks.component';
import { SmspackagelistComponent } from './billing/smspackagelist/smspackagelist.component';
import { PaymentdetailsupdateComponent } from './billing/paymentdetailsupdate/paymentdetailsupdate.component';
import { BillingComponent } from './billing/billing/billing.component';
import { BuypremiumplansComponent } from './billing/buypremiumplans/buypremiumplans.component';

import { FilterPipe} from './clientsManage/viewclients/filter.pipe';
import { PlanexpirytrackingComponent } from './Analytics/planexpirytracking/planexpirytracking.component';
import { RegistrationtrackingComponent } from './Analytics/registrationtracking/registrationtracking.component';
import { CampaignManagementComponent } from './campaign/campaign-management/campaign-management.component';
import { AddpushnotificationComponent } from './campaign/addpushnotification/addpushnotification.component';
import { ViewpremiumplansComponent } from './PackageManage/viewpremiumplans/viewpremiumplans.component';
import { PacktabsComponent } from './PackageManage/packtabs/packtabs.component';
import { UpdatepremiumplanComponent } from './PackageManage/updatepremiumplan/updatepremiumplan.component';
import { PushnotifyComponent } from './campaign/pushnotify/pushnotify.component';
import { NotifytemplatesComponent } from './campaign/notifytemplates/notifytemplates.component';
import { SendnotificationComponent } from './campaign/sendnotification/sendnotification.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ViewapkdownloadComponent } from './viewapkdownload/viewapkdownload.component';
import { ViewusersfeedbackComponent } from './viewusersfeedback/viewusersfeedback.component';
import { DwnldapksendsmsComponent } from './dwnldapksendsms/dwnldapksendsms.component';
import { SendpushnotificationComponent } from './Analytics/sendpushnotification/sendpushnotification.component';

@NgModule({
  declarations: [
    FilterPipe,
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
    UploaddigprofileComponent,
    BulkprofileCreateComponent,
    ApkuploadsComponent,
    ViewapksComponent,
    SmspackagelistComponent,
    PaymentdetailsupdateComponent,
    BillingComponent,
    BuypremiumplansComponent,
    PlanexpirytrackingComponent,
    RegistrationtrackingComponent,
    CampaignManagementComponent,
    AddpushnotificationComponent,
    ViewpremiumplansComponent,
    PacktabsComponent,
    UpdatepremiumplanComponent,
    PushnotifyComponent,
    NotifytemplatesComponent,
    SendnotificationComponent,
    ChangepasswordComponent,
    ViewapkdownloadComponent,
    ViewusersfeedbackComponent,
    DwnldapksendsmsComponent,
    SendpushnotificationComponent,






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
