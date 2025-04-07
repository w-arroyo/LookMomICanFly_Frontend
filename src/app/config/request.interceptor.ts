import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if(this.needsCredentials(req.url)){
            const requestWithCredentials= req.clone({withCredentials: true});
            return next.handle(requestWithCredentials);
        }
        return next.handle(req);
    }

    private needsCredentials(url: string): boolean{
        return url.includes('');
    }

}