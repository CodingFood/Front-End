<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component } from '@angular/core';
>>>>>>> a371dc01bc2c0334c12438b9ec60c10cec1b4c82

@Component({
  selector: 'app-order-list',
  standalone: true,
<<<<<<< HEAD
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  dataPedidos: string = '';

  ngOnInit() {
    this.mostrarDataAtual();
  }

  mostrarDataAtual(): void {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
    const ano = dataAtual.getFullYear();

    // Formatar a data como: Hoje, DD/MM/AAAA
    this.dataPedidos = `Hoje, ${dia}/${mes}/${ano}`;
  }
=======
  imports: [],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {

>>>>>>> a371dc01bc2c0334c12438b9ec60c10cec1b4c82
}
