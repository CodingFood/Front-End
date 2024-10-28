import { Component, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { PedidoService } from '../../services/pedido.service';
import { ClienteService } from '../../services/cliente.service';
import { CozinhaService } from '../../services/cozinha.service';
import { Dish } from '../../models/dish.model';
import { Pedido } from '../../models/pedido.model';
import { Cliente } from '../../models/cliente.model';
import { Cozinha } from '../../models/cozinha.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-dish-list',
  templateUrl: './customer-dish-list.component.html',
  styleUrls: ['./customer-dish-list.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CustomerDishListComponent implements OnInit {
  dishes: Dish[] = [];
  selectedDishes: Dish[] = [];
  totalValue: number = 0;
  clientes: Cliente[] = [];
  cozinhas: Cozinha[] = [];
  selectedCliente!: Cliente;
  selectedCozinha!: Cozinha;

  constructor(
    private dishService: DishService,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private cozinhaService: CozinhaService
  ) {}

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(data => {
      this.dishes = data;
    });

    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    });

    this.cozinhaService.getCozinhas().subscribe(data => {
      this.cozinhas = data;
    });
  }

  toggleDishSelection(dish: Dish): void {
    const index = this.selectedDishes.indexOf(dish);
    if (index === -1) {
      this.selectedDishes.push(dish);
    } else {
      this.selectedDishes.splice(index, 1);
    }
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalValue = this.selectedDishes.reduce((total, dish) => total + dish.price, 0);
  }

  submitOrder(): void {
    const pedido: Pedido = {
      dishes: this.selectedDishes,
      total: this.totalValue,
      status: 'Pendente',
      cliente: this.selectedCliente,
      cozinha: this.selectedCozinha
    };

    this.pedidoService.create(pedido).subscribe(() => {
      alert('Pedido enviado com sucesso!');
      this.selectedDishes = [];
      this.totalValue = 0;
    });
  }
}
