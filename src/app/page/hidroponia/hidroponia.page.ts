import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { HidroponiaService } from 'src/app/service/hidroponia.service';
import { Hidroponia } from 'src/app/interface/hidroponia.interface';
import * as L from 'leaflet';
import { Modulo } from 'src/app/interface/modulo.interface';
@Component({
  selector: 'app-hidroponia',
  templateUrl: './hidroponia.page.html',
  styleUrls: ['./hidroponia.page.scss'],
})
export class HidroponiaPage implements OnInit {
  hidroponia: Hidroponia = null;
  myMap: L.Map;
  iconImg =  {
    icon: L.icon({
       iconSize: [ 25, 41 ],
       iconAnchor: [ 13, 41 ],
       iconUrl: 'assets/marker-icon.png',
       shadowUrl: 'assets/marker-shadow.png'
    })
  };
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private hidroponiaService: HidroponiaService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.activatedRoute.params
      .pipe(flatMap( ( {id} ) =>  this.hidroponiaService.showHidroponia(id)))
      .subscribe( ( resp ) => {
        this.hidroponia = resp.data;
        this.crearMapa(resp.data.latitud, resp.data.longitud);
      });
  }
  crearMapa(latitud, longitud) {
    /* if ( this.myMap !== undefined) {
      this.myMap.remove();
    } */
    this.myMap = L.map('mapidNosocomio',
     {
       fadeAnimation: true
     }
    ).setView([latitud, longitud], 13);
    L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
      attribution: 'CIDIT',
      maxZoom: 28,
    }).addTo(this.myMap);
    this.agregarMarker(latitud, longitud);
  }

  agregarMarker(latitud, longitud) {
    L.marker([latitud, longitud], this.iconImg).addTo(this.myMap);
  }
  ionViewWillLeave() {
    this.myMap.off();
    this.myMap.remove();
  }
  irPagina(item: Modulo) {
    this.myMap.off();
    this.myMap.remove();
    this.router.navigate(['/dato', item.id]);
  }
  irModuloFecha(item: Modulo) {
    this.router.navigate(['/modulo-fecha', item.id]);
  }
  irNotificacion(item: Modulo) {
    this.router.navigate(['/notificacion', item.id]);
  }
  verPronostico() {
    this.router.navigate(['/pronostico'], {queryParams: {
      lat: this.hidroponia.latitud,
      lon: this.hidroponia.longitud
    }});
  }

}
