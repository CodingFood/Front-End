import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DishService } from '../../services/dish.service';
import { PedidoService } from '../../services/pedido.service';
import { Dish } from '../../models/dish.model';
import { Pedido } from '../../models/pedido.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-product-list',
  templateUrl: './customer-product-list.component.html',
  styleUrls: ['./customer-product-list.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CustomerProductListComponent implements OnInit {

  dishes: Dish[] = [];
  filteredDishes: Dish[] = [];
  selectedDishes: Dish[] = [];
  totalValue: number = 0;
  currentPedidoId: number | null | undefined = null;
  pedidoStatus: string = '';
  customerName: string = '';  // Nome do cliente vindo da tela customer-identification
  customerAddress: string = ''; // Endereço do cliente vindo da tela anterior
  searchTerm: string = '';  

  constructor(
    private dishService: DishService,
    private pedidoService: PedidoService,
    private router: Router,
    private route: ActivatedRoute  
  ) {}

  ngOnInit(): void {
    // Receber o nome e o endereço do cliente da URL (customer-identification ou outra origem)
    this.route.queryParams.subscribe(params => {
      this.customerName = params['name'] || 'Cliente';
      this.customerAddress = params['endereco'] || '';  // Capturando o endereço do cliente
      console.log(`Nome do Cliente: ${this.customerName}, Endereço: ${this.customerAddress}`);
    });

    // Carregar os pratos disponíveis
    this.dishService.getDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
      this.filteredDishes = data;  
    });
  }

  filterDishes(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredDishes = this.dishes.filter(dish =>
      dish.name.toLowerCase().includes(term)
    );
  }

  toggleDishSelection(dish: Dish): void {
    const index = this.selectedDishes.indexOf(dish);
    if (index === -1) {
      this.selectedDishes.push(dish);
      console.log('Prato selecionado:', dish);
    } else {
      this.selectedDishes.splice(index, 1);
      console.log('Prato desmarcado:', dish);
    }
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalValue = this.selectedDishes.reduce((total, dish) => total + dish.price, 0);
    console.log('Valor total atualizado:', this.totalValue);
  }

  submitOrder(): void {
    console.log("Botão 'Adicionar' clicado");

    if (!this.customerName || this.selectedDishes.length === 0) {
      console.log('Envio de pedido cancelado. Nome do cliente ou pratos não selecionados.');
      return;
    }

    const pedido: Pedido = {
      dishes: this.selectedDishes,
      total: this.totalValue,
      status: 'Pendente',
      cliente: this.customerName,  // Utiliza o campo cliente para armazenar o nome do cliente
      endereco: this.customerAddress // Adiciona o endereço capturado
    };

    console.log('Pratos selecionados para envio:', this.selectedDishes);
    console.log('Cliente selecionado:', this.customerName);
    console.log('Endereço do cliente:', this.customerAddress);
    console.log('Valor total:', this.totalValue);

    // Enviando o pedido para o backend
    this.pedidoService.create(pedido).subscribe(
      (createdPedido: Pedido) => {
        if (createdPedido && createdPedido.id) {
          this.currentPedidoId = createdPedido.id;
          console.log('Pedido criado com sucesso:', createdPedido);
          this.router.navigate(['/customer-order-status'], {
            queryParams: { id: createdPedido.id, name: this.customerName, endereco: this.customerAddress }
          });
        }
      },
      (error) => {
        console.error('Erro ao criar pedido:', error);
      }
    );
  }

  updateOrderStatus(): void {
    if (this.currentPedidoId != null) {
      this.pedidoService.getPedido(this.currentPedidoId).subscribe((pedido: Pedido) => {
        this.pedidoStatus = pedido.status;
        console.log('Status atualizado:', this.pedidoStatus);
      });
    }
  }
}
