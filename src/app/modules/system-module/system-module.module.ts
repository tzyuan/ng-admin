/*
 * @Author: 曹雪原
 * @since: 2020-08-25 11:33:44
 * @lastTime: 2020-08-25 11:34:51
 * @LastAuthor: 曹雪原
 * @文件相对于项目的路径: /tpc-manage/src/app/modules/system-module/system-module.module.ts
 * @message:
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemModuleRoutingModule } from './system-module-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    SystemModuleRoutingModule
  ]
})
export class SystemModule { }
