import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserPageComponent } from '../admin/components/user-page/user-page.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    UserPageComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
