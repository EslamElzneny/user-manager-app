import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from '../services/cookie.service';

@Injectable()
export class HttpCachingInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cachedResponse = this.cookieService.getCookie(req.urlWithParams);

    if (cachedResponse) {
      // Return the cached response if found
      return of(new HttpResponse({ body: JSON.parse(cachedResponse), status: 200 }));
    } else {
      // Otherwise, make the request and cache the response
      return next.handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.cookieService.setCookie(req.urlWithParams, JSON.stringify(event.body), 1 /* expire in 1 day */);
          }
        })
      );
    }
  }

}
