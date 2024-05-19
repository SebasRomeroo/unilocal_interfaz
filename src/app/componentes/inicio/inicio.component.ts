import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../servicios/mapa.service';
import { Router } from '@angular/router';
import { Alerta } from '../../dto/alerta';
import { LoginComponent } from '../publico/login/login.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  constructor(private mapaService: MapaService, private router: Router) { }

  alerta!:Alerta;
  
  ngOnInit(): void {
    this.mapaService.crearMapa();
  }

  public iraBusqueda(valor:string){
    if(valor){
    this.router.navigate(["/busqueda", valor]);
    }
    }

}
