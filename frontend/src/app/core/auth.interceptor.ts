import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // Helper method to get the token from localStorage
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from localStorage
    const token = this.getToken();

    // Clone the request and add the Authorization header if the token exists
    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      // Pass the cloned request to the next handler
      return next.handle(clonedRequest);
    }

    // If no token, pass the original request to the next handler
    return next.handle(req);
  }
}