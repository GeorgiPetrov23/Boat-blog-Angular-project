import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';

const { apiURL } = environment;
const API = "/api";

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req.url);
  if(req.url.startsWith(API)){
    req = req.clone({
      url: req.url.replace(API, apiURL),
      withCredentials: true
    })
  }  
  return next(req);
};
