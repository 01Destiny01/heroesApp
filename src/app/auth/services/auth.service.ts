import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Auth } from '../interfaces/auth.inteface';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl:string = environment.baseUrl;
private _auth:Auth| undefined;

get auth():Auth{
  return {...this._auth!}
}
constructor(private http:HttpClient) { }
login(){
  return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
  .pipe(  
    tap(auth => this._auth = auth),
    tap(auth => localStorage.setItem('token',auth.id) )
  );
  }
  verificaAutenticacion():Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of (false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      map(auth =>{
        this._auth = auth
        return true;
      })
    );
  }


  logout(){
    this._auth = undefined;
  }

}
