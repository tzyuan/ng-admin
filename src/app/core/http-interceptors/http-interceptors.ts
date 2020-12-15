/*
 * @Date: 2019-05-30 11:32:20
 * @LastAuthor: 曹雪原
 * @lastTime: 2020-12-15 11:27:57
 */
import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponseBase, HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { Observable, of, throwError, observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { environment } from 'src/environments/environment';
import { CookiesService } from 'src/app/shared/services/cookies/cookies.service';
import { Router } from '@angular/router';
import { isUndefined } from 'util';

interface Response {
    code: number;
    data: any;
    msg: string;
}
const CODEMESSAGE = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

/** Pass untouched request through to the next request handler. */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    constructor(
        private injector: Injector,
        private cookies: CookiesService,
        private router: Router
    ) { }

    private get notification(): NzNotificationService {
        return this.injector.get(NzNotificationService);
    }
    private get msg(): NzMessageService {
        return this.injector.get(NzMessageService);
    }
    private get modal(): NzModalService {
        return this.injector.get(NzModalService);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Response>> {
        let URL = req.url;
        if (!URL.startsWith('https://') && !URL.startsWith('http://')) {
            URL = environment.SERVER_URL + URL;
        }

        // 此处修改header参数
        let httpHeaders = new HttpHeaders();
        if (this.cookies.getCookie('token')) {
            httpHeaders = new HttpHeaders()
                .set('token', this.cookies.getCookie('token'));
        }
        const newReq = req.clone({ url: URL, headers: httpHeaders });
        return next.handle(newReq).pipe(
            mergeMap((event: any) => {
                // 允许统一对请求错误处理
                if (event instanceof HttpResponseBase) {
                    const handleData = this.handleData(event);
                    return handleData;
                }
                // 若一切都正常，则后续操作
                return of(event);
            }),
            catchError((err: HttpErrorResponse) => {
                this.modal.error({ nzTitle: '系统错误', nzContent: err.message });
                return throwError(err.error);
            }),
        );
    }


    // 数据处理方法
    private handleData(ev: HttpResponseBase): Observable<any> {
        switch (ev.status) {
            case 200:
                if (ev instanceof HttpResponse) {
                    const body: Response = ev.body;
                    if (body && body.code === 200) {
                        return of(new HttpResponse(Object.assign({ body: body.data })));
                    } else {
                        if (body.code === 401) {
                            this.msg.error('登陆过期');
                            this.router.navigateByUrl('/passport/login');
                            return throwError({});
                        } else {
                            this.msg.error(body.msg);
                            return throwError({ error: body.msg });
                        }
                    }
                }
                break;
            default:
                if (ev instanceof HttpErrorResponse) {
                    return throwError(ev);
                }
                break;
        }
    }

}
