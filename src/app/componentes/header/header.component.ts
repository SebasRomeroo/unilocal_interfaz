import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../publico/login/login.component';
import $ from 'jquery';
import { LoginDTO } from '../../dto/login-dto';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LoginComponent, FormsModule, AlertaComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  loginDTO: LoginDTO;
  cambio: any;
  router: any;
  alerta!:Alerta;

  isLoggedIn = false;
  userRole: string | null = null;
  userName: string | null = null;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  )
  {
    this.loginDTO = new LoginDTO();
    this.alerta= new Alerta("","");
  }



  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.role.subscribe((rol) => {
      this.userRole = rol;
    });

    this.authService.nombreUsuario.subscribe((nombre) => {
      this.userName = nombre;
    });
  }


  public irARegistrarse()
  {
    this.router.navigate(['/registro']);
  }

  public cerrarSesion()
  {
    console.log('Ejecuta cerrar sesion');
    this.authService.noLogged();
  }

  
}
