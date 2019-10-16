import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PronosticoService } from 'src/app/service/pronostico.service';
import { flatMap } from 'rxjs/operators';
import { latLng } from 'leaflet';
import { RespuestaPronostico } from 'src/app/interface/pronostico.interface';

@Component({
  selector: 'app-pronostico',
  templateUrl: './pronostico.page.html',
  styleUrls: ['./pronostico.page.scss'],
})
export class PronosticoPage implements OnInit {
  subscription = new Subscription();
  pronostico: RespuestaPronostico;
  constructor(private activatedRoute: ActivatedRoute,
              private pronosticoService: PronosticoService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.subscription.add(
      this.activatedRoute.queryParams
      .pipe(flatMap( ({lat, lon}) => this.pronosticoService.consultarPronostico(lat, lon) ) )
      .subscribe( resp => {
        this.pronostico = resp;
      })
    );
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}
