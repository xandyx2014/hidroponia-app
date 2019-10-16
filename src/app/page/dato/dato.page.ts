import { Component, OnInit } from '@angular/core';
import { DatoService } from 'src/app/service/dato.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dato } from 'src/app/interface/dato.interface';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { format, parseISO } from 'date-fns';
@Component({
  selector: 'app-dato',
  templateUrl: './dato.page.html',
  styleUrls: ['./dato.page.scss'],
})
export class DatoPage implements OnInit {
  subscription = new Subscription();
  dato: Dato = null;
  public lineChartData: ChartDataSets[] = [
    { data: [0], label: 'Temperatura' }
  ];
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartLabels: Label[] = ['0'];
  constructor(private datoService: DatoService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.subscription.add(
      this.activatedRoute.params.subscribe( ( {id} ) => {
        this.subscription.add(
          this.datoService.showDato(id).subscribe(resp => {
            this.dato = resp.data;
            this.agregarDatos(resp.data.temperatura, resp.data.fecha);
          })
        );
      })
     );
  }
  agregarDatos(numero, fecha) {

      this.lineChartData.forEach((x) => {
        const data: number[] = x.data as number[];
        if (data.length === 5) {
          data.shift();
        } else {
          data.push(numero);
        }
      });
      if (this.lineChartLabels.length === 5) {
        this.lineChartLabels.shift();
      } else {
        this.lineChartLabels.push(`${format(parseISO(fecha), 'dd/MM')}`);
      }

  }
  ionViewWillLeave() {
    console.log( 'unsubscribe' );
    this.subscription.unsubscribe();
  }
}
