/*
 * @Author: 曹雪原
 * @since: 2020-08-24 08:53:58
 * @lastTime: 2020-12-15 10:29:34
 * @LastAuthor: 曹雪原
 * @FilePath: /ng项目模板/src/app/modules/modules-routing.module.ts
 * @message:
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { AuthGuard, ModuleActivate } from '../core/auth/auth.guard';
import { HomeComponent } from '../home/home.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home', component: HomeComponent, data: { breadcrumb: '首页' }, canActivate: [ModuleActivate]
      },
      {
        path: 'system', loadChildren: () => import('./system-module/system-module.module').then(mod => mod.SystemModule),
        data: { breadcrumb: '系统管理' }, canActivate: [ModuleActivate]
      },
      {
        path: '', component: HomeComponent, data: { breadcrumb: '首页' }, canActivate: [ModuleActivate], pathMatch: 'full'
      }
    ]
  },
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: '', loadChildren: () => import('./passport-module/passport-module.module').then(mod => mod.PassportModuleModule), pathMatch: 'full', data: { title: '登录' } },
      { path: 'login', loadChildren: () => import('./passport-module/passport-module.module').then(mod => mod.PassportModuleModule), data: { title: '登录' } }
    ]
    // children: [
    //   {
    //     path: '', loadChildren: () => import('./passport-module/passport-module.module').then(mod => mod.PassportModuleModule),
    //     pathMatch: 'full', data: { title: '登录' }
    //   },
    //   {
    //     path: 'passport', loadChildren: () => import('./passport-module/passport-module.module').then(mod => mod.PassportModuleModule),
    //     data: { breadcrumb: '登录' }
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ModulesRoutingModule { }
