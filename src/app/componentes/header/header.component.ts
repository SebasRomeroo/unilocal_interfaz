import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../publico/login/login.component';
import $ from 'jquery';
import { LoginDTO } from '../../dto/login-dto';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LoginComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  loginDTO: LoginDTO;
  cambio: any;

  constructor(
    private authService: AuthService
  )
  {
    this.loginDTO = new LoginDTO();
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


  public iniciarSesion(){
    //Validar checkbox seleccionado
    const tipoUsuario = $('input[name="tipoUsuario"]:checked').val();
    switch(tipoUsuario){
      case 'Cliente':
        this.loginCliente();
        break;
      case 'Moderador':
        console.log('Ingresa como moderador');
        break;
      default:
        alert('Seleccione un tipo de usuario');  
    }
    //Detonar servicio de Login
  }

  ngOnInit(): void {
    $(document).ready(() => {
      console.log('jQuery is ready');
    });
  }

  public loginCliente(){
    this.authService.loginCliente(this.loginDTO).subscribe({
      next: (data) => {
      console.log(data, 'respuesta Login');
      },
      error: (error) => {
      console.log("Error al cargar las ciudades");
      }
      });
  }
}