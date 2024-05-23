import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../servicios/mapa.service';
import { Router } from '@angular/router';
import { Alerta } from '../../dto/alerta';
import { LoginComponent } from '../publico/login/login.component';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { PublicoService } from '../../servicios/publico.service';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  
  private publicoURL = "http://localhost:8080/api/publico";
  negocios: ItemNegocioDTO[];

  constructor(private mapaService: MapaService, private router: Router, private publicoServicio: PublicoService) { 

    this.negocios = [];
  }

  alerta!:Alerta;
  
  ngOnInit(): void {
    this.mapaService.crearMapa();
    console.log("carga aprobados");
    this.listarAprobados("APROBADO");
  }

  public iraBusqueda(valor:string){
    if(valor){
    this.router.navigate(["/busqueda", valor]);
    }
  }

  public listarAprobados(estado : string) {
    this.publicoServicio.listarAprobados(estado).subscribe({
    next: (data) => {
    this.negocios = data.respuesta;
    this.mapaService.pintarMarcadores(this.negocios);
    },
    error: (error) => {
    console.error(error);
    }
    });
  }

  



}
