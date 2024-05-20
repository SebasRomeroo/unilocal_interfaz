import { Component } from '@angular/core';
import { AlertaComponent } from "../../alerta/alerta.component";
import { AuthService } from '../../../servicios/auth.service';
import { TokenService } from '../../../servicios/token.service';
import { LoginDTO } from '../../../dto/login-dto';
import { Alerta } from '../../../dto/alerta';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [RouterLink, FormsModule, AlertaComponent]
})
export class LoginComponent {

  loginDTO: LoginDTO;
  cambio: any;
  router: any;
  alerta!:Alerta;
  interfazCliente: boolean;
  interfazModerador: boolean;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ){
    this.loginDTO = new LoginDTO();
    this.alerta= new Alerta("","");
    this.interfazCliente = false;
    this.interfazModerador = false;
  }

  public iniciarSesion(){
    //Validar checkbox seleccionado
    const tipoUsuario = $('input[name="tipoUsuario"]:checked').val();
    switch(tipoUsuario){
      case 'Cliente':
        this.loginCliente();
        break;
      case 'Moderador':
        this.loginModerador();
        break;
      default:
        alert('Seleccione un tipo de usuario');  
    }
    //Detonar servicio de Login
  }

  public loginCliente(){
    this.authService.loginCliente(this.loginDTO).subscribe({
      next: (data) => {
        this.tokenService.loginCliente(data.respuesta.token);
        this.authService.isLogged();
      },
      error: (error) => {
        console.log(error);
        this.alerta = new Alerta(error.error.respuesta, "danger");
      }
      });
  }

  public loginModerador(){
    this.authService.loginModerador(this.loginDTO).subscribe({
      next: (data) => {
        this.tokenService.loginModerador(data.respuesta.token);
        this.authService.isLogged();
      },
      error: (error) => {
        this.alerta = new Alerta(error.respuesta.error, "danger");
      }
      });
  }

  public mostrarPassword() {
		this.cambio = document.getElementById("txtPassword");
		if(this.cambio.type == "password"){
			this.cambio.type = "text";
			$('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
		}else{
			this.cambio.type = "password";
			$('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
		}
	} 
}
