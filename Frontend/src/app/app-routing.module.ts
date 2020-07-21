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


const routes: Routes = [{

  path: '',
  component: DefaultComponent,
  children: [{
    path: 'home',
    component: DashboardComponent
  }, {
    path: 'posts',
    component: PostsComponent
  },
  { path: 'userprofile', component: ProfileComponent },

{path:'client',component:ClientComponent,children:[
  {path:'addclient',component:AddClientsComponent},
  {path:'editclient',component:EditClientsComponent},
  {path:'viewclient',component:ViewclientsComponent},
  {path:'viewDetail',component:ViewDetailComponent}
]},
{path:'user',component:UserManageComponent,children:[
  {path:'adduser',component:AddUsersComponent},
  {path:'editUser',component:EditusersComponent},
  {path:'viewUsers',component:ViewusersComponent}
]},

{path:'packageMange',component:PackManageComponent,children:[
  {path:'addPacks',component:AddPackageComponent},
  {path:'editPacks',component:UpdatePackageComponent},
  {path:'ViewPacks',component:ViewPackageComponent}
]},




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
