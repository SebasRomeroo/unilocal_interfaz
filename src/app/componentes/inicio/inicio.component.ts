import { Component } from '@angular/core';
import { MapaService } from '../../servicios/mapa.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  constructor(private mapaService: MapaService) { }
  ngOnInit(): void {
    this.mapaService.crearMapa();
  }

}
