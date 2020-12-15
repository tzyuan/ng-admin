/*
 * @Author: 曹雪原
 * @since: 2020-08-24 10:08:23
 * @lastTime: 2020-12-14 11:34:58
 * @LastAuthor: 曹雪原
 * @文件相对于项目的路径: /ng项目模板/src/app/layout/passport/passport.component.ts
 * @message:
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss']
})
export class LayoutPassportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('LayoutPassportComponent');
  }

}
