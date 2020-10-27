import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ClientComponent } from './clientsManage/client/client.component';
import { AddClientsComponent } from './clientsManage/add-clients/add-clients.component';
import { EditClientsComponent } from './clientsManage/edit-clients/edit-clients.component';
import { ViewclientsComponent } from './clientsManage/viewclients/viewclients.component';
import { UserManageComponent } from './userManage/user-manage/user-manage.component';
import { AddUsersComponent } from './userManage/add-users/add-users.component';
import { EditusersComponent } from './userManage/editusers/editusers.component';
import { ViewusersComponent } from './userManage/viewusers/viewusers.component';
import { PackManageComponent } from './PackageManage/pack-manage/pack-manage.component';
import { AddPackageComponent } from './PackageManage/add-package/add-package.component';
import { UpdatePackageComponent } from './PackageManage/update-package/update-package.component';
import { ViewPackageComponent } from './PackageManage/view-package/view-package.component';
import { ViewDetailComponent } from './clientsManage/view-detail/view-detail.component';
import { AnalyticComponent } from './Analytics/analytic/analytic.component';
import { PurchaseAnalysisComponent } from './Analytics/purchase-analysis/purchase-analysis.component';
import { SalesAnalysisComponent } from './Analytics/sales-analysis/sales-analysis.component';
import { UsageDetailedComponent } from './Analytics/usage-detailed/usage-detailed.component';
import { PurchaseDetailedComponent } from './Analytics/purchase-detailed/purchase-detailed.component';
import { HelpdeskComponent } from './helpdesk/helpdesk/helpdesk.component';
import { ViewhelpdeskComponent } from './helpdesk/viewhelpdesk/viewhelpdesk.component';
import { UpdateticketComponent } from './helpdesk/updateticket/updateticket.component';
import { TemplatesComponent } from './Templates/templates/templates.component';
import { ViewtemplatesComponent } from './Templates/viewtemplates/viewtemplates.component';
import { AddTemplatesComponent } from './Templates/add-templates/add-templates.component';
import { AddtemplateTypeComponent } from './Templates/addtemplate-type/addtemplate-type.component';
import { ViewsystemtemplatesComponent } from './Templates/viewsystemtemplates/viewsystemtemplates.component';
import { CardsComponent } from './cards/cards/cards.component';
import { ViewcardsComponent } from './cards/viewcards/viewcards.component';
import { UploadcardsComponent } from './cards/uploadcards/uploadcards.component';
import { UploaddigprofileComponent } from './cards/uploaddigprofile/uploaddigprofile.component';
import { BulkprofileCreateComponent } from './clientsManage/bulkprofile-create/bulkprofile-create.component';
import { ApkuploadsComponent } from './apkupload/apkuploads/apkuploads.component';
import { ViewapksComponent } from './apkupload/viewapks/viewapks.component';
import { BillingComponent } from './billing/billing/billing.component';
import { SmspackagelistComponent } from './billing/smspackagelist/smspackagelist.component';
import { PaymentdetailsupdateComponent } from './billing/paymentdetailsupdate/paymentdetailsupdate.component';
import { CampaignManagementComponent } from './campaign/campaign-management/campaign-management.component';
import { AddpushnotificationComponent } from './campaign/addpushnotification/addpushnotification.component';
import { PacktabsComponent } from './PackageManage/packtabs/packtabs.component';
import { UpdatepremiumplanComponent } from './PackageManage/updatepremiumplan/updatepremiumplan.component';
import { PushnotifyComponent } from './campaign/pushnotify/pushnotify.component';
import { NotifytemplatesComponent } from './campaign/notifytemplates/notifytemplates.component';
import { SendnotificationComponent } from './campaign/sendnotification/sendnotification.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ViewapkdownloadComponent } from './viewapkdownload/viewapkdownload.component';
import { DwnldapksendsmsComponent } from './dwnldapksendsms/dwnldapksendsms.component';
import { ViewusersfeedbackComponent } from './viewusersfeedback/viewusersfeedback.component';
import { SendpushnotificationComponent } from './Analytics/sendpushnotification/sendpushnotification.component';


const routes: Routes = [{

  path: '',
  component: DefaultComponent,canActivate: [AuthGuard],
  children: [{
    path: 'home',
    component: DashboardComponent,
  }, {
    path: 'posts',
    component: PostsComponent
  },
  {path:'changepassword', component:ChangepasswordComponent},
  { path: 'userprofile', component: ProfileComponent },

{path:'client',component:ClientComponent,children:[
  {path:'addclient',component:AddClientsComponent},
  {path:'editclient/:client_id',component:EditClientsComponent},
  {path:'viewclient',component:ViewclientsComponent},
  {path:'viewDetail/:client_id',component:ViewDetailComponent},
  {path:'createprofile', component:BulkprofileCreateComponent}
]},
{path:'user',component:UserManageComponent,children:[
  {path:'adduser',component:AddUsersComponent},
  {path:'editUser',component:EditusersComponent},
  {path:'viewUsers',component:ViewusersComponent}
]},

{path:'packageMange',component:PackManageComponent,children:[
  {path:'addPacks',component:AddPackageComponent},
  {path:'editPacks/:package_id',component:UpdatePackageComponent},
  {path:'ViewPacks',component:ViewPackageComponent},
  {path:'editpremiumPlan/:package_id',component:UpdatepremiumplanComponent}
]},

{path:'packagemanagement', component:PacktabsComponent},
{path:'viewdownloadapklist',component:ViewapkdownloadComponent},
{path:'downloadapksendsms/:mobilenumber',component:DwnldapksendsmsComponent},
{path:'viewusersfeedback',component:ViewusersfeedbackComponent},
{path:'sendpushnotification',component:SendpushnotificationComponent},

{path:'analytics',component:AnalyticComponent,children:[
  {path:'purchaseAnalysis',component:PurchaseAnalysisComponent},
  {path:'salesAnalysis',component:SalesAnalysisComponent},
  {path:'usageAnalysis',component:SalesAnalysisComponent},
]},

{path:'helpdesk',component:HelpdeskComponent,children:[
  {path:'viewhelpdesk',component:ViewhelpdeskComponent},
  {path:'updateticket',component:UpdateticketComponent}
]},
{
path:'templates',component:TemplatesComponent,children:[
  {path:'viewTemplates',component:ViewtemplatesComponent},
  {path:'addTemplateType',component:AddtemplateTypeComponent},
  {path:'addTemplates', component:AddTemplatesComponent},
{path:'viewsystemtemplates/:event_code',component:ViewsystemtemplatesComponent}
]
},

{path:'card', component:CardsComponent,children:[
  {path:'viewcards', component:ViewcardsComponent},
  {path:'uploadcards',component:UploadcardsComponent},
  {path:'uploaddigiProfiles',component:UploaddigprofileComponent}
]},

{path:'billing',component:BillingComponent,children:[
  {path:'smspackagelist',component:SmspackagelistComponent},
  ]},
{path:'paymentdetails/:package_id/:package_price/:package_gst_rate', component:PaymentdetailsupdateComponent},
{path:'apkUpload',component:ApkuploadsComponent},
{path:'viewapklist',component:ViewapksComponent},
{path:'campaignManage', component:CampaignManagementComponent},
{path:'addpushnotify',component:AddpushnotificationComponent},
{path:'pushnotify',component:PushnotifyComponent},
{path:'viewnotifyTemplates',component:NotifytemplatesComponent},
{path:'sendnotify',component:SendnotificationComponent},
{path:'ViewUsageDetailed', component:UsageDetailedComponent},
{path:'viewPurchaseDetailed/:package_id/:order_id',component:PurchaseDetailedComponent},
 ],
},
{
  path: 'signup', component: UserComponent,
  children: [{ path: '', component: SignUpComponent }]
},
{
  path: 'login', component: UserComponent,
  children: [{ path: '', component: SignInComponent }]
},
{
  path: '', redirectTo: '/login', pathMatch: 'full'
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
