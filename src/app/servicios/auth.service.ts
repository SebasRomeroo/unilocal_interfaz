import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroClienteDTO } from '../dto/registro-cliente-dto';
import { Observable } from 'rxjs/internal/Observable';
import { MensajeDTO } from '../dto/mensaje-dto';
import { LoginDTO } from '../dto/login-dto';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  datosToken: any;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string | null>(null);
  private nombre = new BehaviorSubject<string | null>(null);
  private authURL = "http://localhost:8080/api/auth";
  
  isLoggedIn = this.loggedIn.asObservable();
  role = this.userRole.asObservable();
  nombreUsuario = this.nombre.asObservable();
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) { 
    this.datosToken= '';
  }

  public registrarCliente(cliente: RegistroClienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/registrar-cliente`, cliente);
  }

  public loginCliente(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login-cliente`, loginDTO);
  }

  public loginModerador(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login-moderador`, loginDTO);
  }

  public isLogged(): void {
    this.datosToken = this.tokenService.getToken();
    console.log('Se llama funcion');
    if (this.datosToken) {
      const rol = this.tokenService.obtenerRol();
      const nombre = this.tokenService.getNombre();
      console.log('rol imprime', rol);
      this.loggedIn.next(true);
      this.userRole.next(rol);
      this.nombre.next(nombre);
    }
    else{
      console.log('Entra?');
      this.loggedIn.next(false);
      this.userRole.next('');
      this.nombre.next('');
      this.router.navigate(['/inicio']);
    }
  }  

  public noLogged(){
    this.loggedIn.next(false);
    this.userRole.next('');
    this.tokenService.logout();
  }
}