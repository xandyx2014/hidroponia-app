import { Component, OnInit } from '@angular/core';
import { DatoService } from 'src/app/service/dato.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dato } from 'src/app/interface/dato.interface';

@Component({
  selector: 'app-dato',
  templateUrl: './dato.page.html',
  styleUrls: ['./dato.page.scss'],
})
export class DatoPage implements OnInit {
  subscription = new Subscription();
  dato: Dato = null;
  constructor(private datoService: DatoService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.subscription.add(
      this.activatedRoute.params.subscribe( ( {id} ) => {
        this.subscription.add(
          this.datoService.showDato(id).subscribe(resp => {
            console.log( resp );
            this.dato = resp.data;
          })
        );
      })
     );
  }
  ionViewWillLeave() {
    console.log( 'unsubscribe' );
    this.subscription.unsubscribe();
  }
}
