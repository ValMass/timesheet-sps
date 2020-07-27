import { NgModule } from '@angular/core';
import { Routes, RouterModule , Resolve } from '@angular/router';
import { TimesheetPageComponent } from './component/timesheet-page/timesheet-page.component';
import { UserprofilePageComponent } from './component/userprofile-page/userprofile-page.component';
import { UserlistPageComponent } from './component/userlist-page/userlist-page.component';
import { OfficelistPageComponent } from './component/officelist-page/officelist-page.component';
import { CustomerOfficelistPageComponent } from './component/customer-office/customerofficelist-page/customerofficelist-page.component';
import { from } from 'rxjs';

//resolver Block

import { UserAnagraphicResolverService } from '@app/services/user-anagraphic-resolver.service';
import { UserListResolverService } from '@app/services/user-list-resolver.service';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { TimesheetResolverService } from './services/timesheet-resolver.service';
import { AuthGuard } from './_helper/auth.guard';
import { UserDetailPageComponent } from './component/user-detail-page/user-detail-page.component';
import { OfficeListResolverService } from '@app/services/office-list-resolver.service';
import { CustomerOfficeListResolverService } from '@app/services/customer-office-list-resolver.service';
import { UserDetailResolverService } from './services/user-detail-resolver.service';
import { CustomerPageComponent } from './component/customer-page/customer-page.component';
import { CustomerListResolverService } from './services/customer-list-resolver.service';
import { TimesheetComponentComponent } from './component/timesheet-component/timesheet-component.component';
import { ContractModule } from './modules/contract/contract.module';
import { ContractComponent } from './modules/contract/contract.component';



const routes: Routes = [
  { path: '', component: TimesheetPageComponent, canActivate: [AuthGuard]},
  { path: 'login-page', component: LoginPageComponent  },
  { path: 'timesheet-page', component: TimesheetComponentComponent,  canActivate: [AuthGuard]  },
  { path: 'userprofile', component: UserprofilePageComponent , resolve: { user: UserAnagraphicResolverService }, canActivate: [AuthGuard] },
  { path: 'userlist', component: UserlistPageComponent , resolve: { userlist: UserListResolverService }, canActivate: [AuthGuard]},
  { path: 'officelist', component: OfficelistPageComponent , resolve: { officelist: OfficeListResolverService }, canActivate: [AuthGuard]},
  {
    path: 'customerlist',
    component: CustomerPageComponent ,
    resolve: { customerlist: CustomerListResolverService },
    canActivate: [AuthGuard]
  },

  {
    path: 'customerofficelist',
    component: CustomerOfficelistPageComponent ,
    resolve: { customerofficelist: CustomerOfficeListResolverService },
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    component: UserDetailPageComponent,
    resolve: {
      user: UserDetailResolverService
    }
  },
  { path: 'customer-offices',
    loadChildren: () => import('./modules/customer-offices/customer-offices.module').then(m => m.CustomerOfficesModule) },
  { path: 'offices',
    loadChildren: () => import('./modules/offices/offices.module').then(m => m.OfficesModule) },
  //{ path: 'contract', loadChildren: () => import('./modules/contract/contract.module').then(m => m.ContractModule) }
  {
    path: 'contract',
    component: ContractComponent ,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
