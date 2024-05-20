import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  interfazCliente: boolean = false;
  interfazModerador: boolean = false;
  token : string='';

  constructor(private router: Router) {
   // this.token='';
   }

  
  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public loginCliente(token: string) {
    this.setToken(token);
    this.router.navigate(["/gestionNegocio"]);
  }

  public loginModerador(token: string) {
    this.setToken(token);
    this.router.navigate(["/gestionNegocio"]);
  }

  public logout() {
    window.sessionStorage.clear();
    this.router.navigate(["/inicio"]);
  }

  public obtenerRol(): string
  {
    const token = this.getToken();
    if (token) {
      const values= this.decodePayload(token);
      return values.rol;
    }

    return '';
  }

  public getCodigo(): string {
    const token = this.getToken();
    if (token) {
    const values = this.decodePayload(token);
    return values.id;
    }
    return "";
  }

  public getNombre(): string {
    const token = this.getToken();
    if (token) {
    const values = this.decodePayload(token);
    return values.nombre;
    }
    return "";
  }

  private decodePayload(token: string): any {
    const payload = token!.split(".")[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
  }
}
