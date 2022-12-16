import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router){}

    // create the custom route guard here
  // this will be use to protect route for unorauthorized users to access a certain page
    canActivate(): boolean{
      if(this._authService.loggedIn()){
        return true
      }
      else{
        this._router.navigate(['/login']);
        return false
      }
    }

}
