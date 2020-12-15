/*
 * @Author: 曹雪原
 * @since: 2020-12-14 11:19:06
 * @lastTime: 2020-12-15 09:54:03
 * @LastAuthor: 曹雪原
 * @FilePath: /ng项目模板/src/app/modules/passport-module/login/login.component.ts
 * @message:
 */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(
    private cookies: CookiesService,
    private http: HttpClient,
    private common: CommonService,
    private fb: FormBuilder,
    private router: Router
  ) { }
  loginForm = this.fb.group({
    name: [null, Validators.required],
    pwd: [null, Validators.required],
  });

  loading = false;
  doLogin = () => {
    this.common.formValid(this.loginForm);
    if (this.loginForm.valid) {
      this.cookies.clearAll();
      window.localStorage.clear();
      window.sessionStorage.clear();
      this.cookies.setCookie('name', '测试用户');
      this.router.navigateByUrl('');
    }
  }
  ngOnInit() {
    const name = this.cookies.getCookie('userName');
    if (name) {
    }
  }

}
