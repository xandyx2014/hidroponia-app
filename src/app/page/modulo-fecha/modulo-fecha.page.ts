import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuloService } from 'src/app/service/modulo.service';
import { Subscription } from 'rxjs';
import { format, parseISO } from 'date-fns';
import { Modulo } from 'src/app/interface/modulo.interface';
import { Dato } from 'src/app/interface/dato.interface';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/service/notification.service';
@Component({
  selector: 'app-modulo-fecha',
  templateUrl: './modulo-fecha.page.html',
  styleUrls: ['./modulo-fecha.page.scss'],
})
export class ModuloFechaPage implements OnInit {
  form: FormGroup;
  idBusqueda;
  promedioDato: Dato;
  modulo: Modulo = null;
  subscription = new Subscription();
  okey = false;
  slideOpts = {
    speed: 400
  };
  constructor(private fb: FormBuilder,
              private moduloService: ModuloService,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.crearFormulario();
  }
  crearFormulario() {
    this.form = this.fb.group({
      desde: ['', Validators.required],
      hasta: ['', Validators.required]
    });
  }
  buscar() {
    this.subscription.add(
      this.activatedRoute.params.pipe(
        flatMap( ( {id} ) => {
          this.idBusqueda = id;
          return this.moduloService.moduloFecha(
            id,
            this.transformarFecha(this.form.value.desde),
            this.transformarFecha(this.form.value.hasta)
            );
        })).subscribe( resp => {
            this.notificationService.presentLoading( (loading) => {
              loading.dismiss();
              console.log( resp );
              this.modulo = resp.data;
              if (this.modulo) {
                this.promedioDato = this.devolverSumatoria(this.modulo.Datos);
              }
              this.okey = !resp.ok;
            });
          })
    );
  }
  transformarFecha(fecha: string) {
    return format(parseISO(fecha), 'yyyy-MM-dd');
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  devolverDato(datos: Dato[], key: any) {
    if (key === 'fecha') {
      return datos.map( ( item ) => format(parseISO(item[key]), 'MM-dd'));
    } else {
      return datos.map( ( item ) => item[key]);
    }
  }
  devolverSumatoria(datos: Dato[]) {
    return  datos.reduce( (a, b) => {
      return {
        temperatura: Number(a.temperatura) + Number(b.temperatura),
        ph: Number(a.ph) + Number(b.ph),
        solucion: Number(a.solucion) + Number(b.solucion),
        luz: Number(a.luz) + Number(b.luz),
      };
    });
  }
  devolverPromedio(dato) {
    return (dato / this.modulo.Datos.length).toFixed(2);
  }
  verPdf() {
    this.moduloService.moduloFechaPdf(
      this.idBusqueda,
      this.transformarFecha(this.form.value.desde),
      this.transformarFecha(this.form.value.hasta)
    );
  }
}
