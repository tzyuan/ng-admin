/*
 * @Author: 曹雪原
 * @since: 2020-12-14 11:15:55
 * @lastTime: 2020-12-14 13:19:33
 * @LastAuthor: 曹雪原
 * @FilePath: /ng项目模板/src/app/modules/passport-module/passport-module-routing.module.ts
 * @message:
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full', data: { title: '登录' } },
  { path: 'login', component: LoginComponent, data: { title: '登录' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportModuleRoutingModule { }
