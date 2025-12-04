import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Loginservice } from '../services/loginservice';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  
  const token = sessionStorage.getItem('token');

  // 🔥 AÑADE ESTOS LOGS AQUÍ 🔥
  console.log("→ INTERCEPTOR EJECUTADO");
  console.log("→ URL:", req.url);
  console.log("→ TOKEN:", token);

  if (token) {
    const reqClone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(reqClone);
  }

  return next(req);


};

