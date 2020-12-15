# ng-admin项目模板
### 项目结构
```
|- app
    |- code
        |- auth                 // 路由守卫
        |- http-interceptors    // http拦截器
    |- layout                   // 布局
    |- modules                  // 功能模块
    |- shared                   // 共享模块
        |- pipe                 // 管道
        |- service              // 服务
        |- components           // 自定义组件
        |- helper               // 自定义工具
|- assets                       // 静态资源
|- environments                 // 环境配置
```
    
#### 路由守卫配置
默认为如果cookie中没有name，则拦截并跳转到登陆页  
修改方法参照官方文档 [防止未经授权的访问](https://www.angular.cn/guide/router#preventing-unauthorized-access)
```
canActivate(
next: ActivatedRouteSnapshot,
state: RouterStateSnapshot): boolean {
const name = this.cookies.getCookie('name');
if (name) {
  return true;
}
this.router.navigateByUrl('/passport/login');
return false;
}
```

#### http拦截器设置

##### request
默认header中自带token
```
let httpHeaders = new HttpHeaders();
if (this.cookies.getCookie('token')) {
    httpHeaders = new HttpHeaders()
        .set('token', this.cookies.getCookie('token'));
}
```

##### response
默认响应对象格式
```
{
    code: 200,
    data: {},
    msg: ""
}
```
响应处理方法
```
private handleData(ev: HttpResponseBase)
```

#### 环境配置
##### 开发环境
environment.ts 文件中配置开发环境变量  
对应build语句 
```
npm run build 
```
##### 生产环境
environment.prod.ts 文件中配置生产环境变量
```
npm run prod
```