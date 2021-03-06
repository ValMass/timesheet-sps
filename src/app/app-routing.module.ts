import { NgModule } from '@angular/core';
import { Routes, RouterModule , Resolve } from '@angular/router';
import { UserprofilePageComponent } from './component/userprofile-page/userprofile-page.component';
import { from } from 'rxjs';

// resolver Block

import { UserAnagraphicResolverService } from '@app/services/user-anagraphic-resolver.service';
import { UserListResolverService } from '@app/services/user-list-resolver.service';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { TimesheetResolverService } from './services/timesheet-resolver.service';
import { AuthGuard } from './_helper/auth.guard';
import { OfficeListResolverService } from '@app/services/office-list-resolver.service';
import { CustomerOfficeListResolverService } from '@app/services/customer-office-list-resolver.service';
import { UserDetailResolverService } from './services/user-detail-resolver.service';
import { CustomerListResolverService } from './services/customer-list-resolver.service';
import { UserlistListComponent } from './component/userlist-list/userlist-list.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { OfficesComponent } from './modules/offices/offices.component';
import { OfficeDetailComponent } from './modules/offices/office-detail/office-detail.component';
import { UserAdminService } from './modules/user-admin/services/user-admin.service';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { CustListComponent } from './modules/home-page/widget/cust-list/cust-list.component';
import { HomeGuard } from './_helper/home.guard';



const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    resolve:{
      userlist: UserListResolverService,
      customerlist: CustomerListResolverService
    },
    canActivate: [HomeGuard],
  },
  { path: 'login-page', component: LoginPageComponent  },
  { path: 'userprofile', component: UserprofilePageComponent , resolve: { user: UserAnagraphicResolverService }, canActivate: [AuthGuard] },
  {
    path: 'userlist',
    component: UserlistListComponent ,
    resolve: { userlist: UserListResolverService },
    canActivate: [AuthGuard]
  },
  {
    path: 'userlist/detail/:id',
    component: UserDetailComponent,
    resolve: {
      user: UserDetailResolverService
    }
  },
  {
    path: 'officelist',
    component: OfficesComponent  ,
    resolve: {
      officelist: OfficeListResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'officelist/office-detail/:id',
    component: OfficeDetailComponent,
    resolve: {
      officelist: OfficeListResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./modules/customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'contracts',
    loadChildren: () =>
      import('./modules/contracts/contracts.module').then(m => m.ContractsModule)
  },
  /*{
    path: 'timesheet/:id',
    component: NewTimesheetComponentComponent,
    resolve: {
      customer: TimesheetResolverService
    }
  },*/
  { path: 'timesheet',
    loadChildren: () => import('./modules/timesheet/timesheet.module').then(m => m.TimesheetModule)
  },

  { path: 'customer-offices',
    loadChildren: () => import('./modules/customer-offices/customer-offices.module').then(m => m.CustomerOfficesModule)
  },
  {
    path: 'offices',
    loadChildren: () => import('./modules/offices/offices.module').then(m => m.OfficesModule)
  },
  {
    path: 'home-page',
    loadChildren: () => import('./modules/home-page/home-page.module').then(m=> m.HomePageModule),
    resolve:
    {
      userlist: UserListResolverService,
      customerlist: CustomerListResolverService
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'user-admin', loadChildren: () => import('./modules/user-admin/user-admin.module').then(m => m.UserAdminModule),
    resolve: {
      userlist: UserAdminService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'user-anag', loadChildren: () => import('./modules/user-anag/user-anag.module').then(m => m.UserAnagModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'distances',
    loadChildren: () => import('./modules/distances/distances.module').then(m => m.DistancesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home-page-user', loadChildren: () => import('./modules/home-page-user/home-page-user.module').then(m => m.HomePageUserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'internal-activities', loadChildren: () => import('./modules/internal-activities/internal-activities.module').then(m => m.InternalActivitiesModule) },
  {
    path: '**',
    component: NotFoundComponent,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
