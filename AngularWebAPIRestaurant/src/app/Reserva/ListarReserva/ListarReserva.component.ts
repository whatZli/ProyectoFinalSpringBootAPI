import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { Reserva } from 'src/app/Modelo/Reserva';

@Component({
  selector: 'app-listar',
  templateUrl: './ListarReserva.component.html',
  styleUrls: ['./ListarReserva.component.css']
})
export class ListarReservaComponent implements OnInit {
  title: String = "reservas";
  reservas: Reserva[];
  fechaHoyDate: Date = new Date();
  fechaHoyString: String = this.fechaHoyDate.getFullYear() + "-" + ("0" + (this.fechaHoyDate.getMonth() + 1)).slice(-2) + "-" + ("0" + this.fechaHoyDate.getDate()).slice(-2);
  reserva: Reserva;
  totalPersonas: number = 0;
  btnBuscarFecha: Boolean = false;
  btnBuscarEntreFechas: Boolean = false;
  fecha1: String;
  fecha2: String;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.VerReservasHoy();
  }

  VerTodasReservas() {
    this.btnBuscarFecha = false;
    this.btnBuscarEntreFechas = false;
    this.service.getReservas()
      .subscribe(data => {
        this.reservas = data;

        if (data.length > 0) {
          //this.ComprobarSiLaFechaEsHoy();
        }
      });
    this.title = "todas las reservas";
  }

  VerReservasHoy() {
    this.btnBuscarFecha = false;
    this.btnBuscarEntreFechas = false;
    this.service.getReservasHoy()
      .subscribe(data => {
        this.reservas = data;
        if (data.length > 0) {
          //this.ComprobarSiLaFechaEsHoy();
        }
        for (let i = 0; i < data.length; i++) {
          this.reserva = data[i];
          this.totalPersonas = this.totalPersonas + this.reserva.personas;
        }
        this.title = "reservas para hoy (" + this.totalPersonas + " personas)";
        this.totalPersonas = 0;
      });

  }

  ActivarBuscarPorFecha() {
    this.btnBuscarEntreFechas = false;
    this.btnBuscarFecha = true;
    this.reservas = null;//Para limpiar la lista de reservas
    this.title = "reservas por fecha";
  }
  BuscarPorFecha() {
    this.service.getReservasFecha(this.fecha1)
      .subscribe(data => {
        this.reservas = data;
        for (let i = 0; i < data.length; i++) {
          this.reserva = data[i];
          this.totalPersonas = this.totalPersonas + this.reserva.personas;
        }
        this.title = "reservas para " + this.fecha1 + " (" + this.totalPersonas + " personas)";
        this.totalPersonas = 0;
      });
  }

  ActivarBuscarEntreFechas() {
    this.btnBuscarFecha = false;
    this.btnBuscarEntreFechas = true;
    this.reservas = null;//Para limpiar la lista de reservas
    this.title = "reservas entre fechas";
  }
  BuscarEntreFechas() {
    this.service.getReservasEntreFechas(this.fecha1, this.fecha2)
      .subscribe(data => {
        this.reservas = data;
        this.title = "reservas entre " + this.fecha1 + " y " + this.fecha2;
      });
  }



  Nuevo() {
    this.router.navigate(["addReserva"]);
  }

  Ver(reserva: Reserva): void {
    localStorage.setItem("idReserva", reserva.id.toString());
    this.router.navigate(["verReserva"]);
  }

  Editar(reserva: Reserva): void {
    localStorage.setItem("idReserva", reserva.id.toString());
    this.router.navigate(["editReserva"]);
  }

  Delete(reserva: Reserva) {
    this.service.deleteReserva(reserva)
      .subscribe(data => {
        this.reservas = this.reservas.filter(p => p !== reserva);
        alert("Se eliminará la reserva seleccionada");
      })
  }

}
