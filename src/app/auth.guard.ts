import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(localStorage.getItem('authToken')) {
        return true;
      }

      const swal = Swal.default.fire({
        icon: 'error',
        title: 'Erro!',
        html: 'Sua sessão expirou!<br> Autentique-se novamente para prosseguir',
        timer: 1500
      });

      swal.then(
        _result => {
          this.router.navigate(['/login'])
          return false;
        }
      )
      return false;
  }
  
}
