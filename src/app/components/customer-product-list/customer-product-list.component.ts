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
  searchTerm: string = '';
  customerName: string = '';
  customerAddress: string = '';

  constructor(
    private dishService: DishService,
    private pedidoService: PedidoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.customerName = params['name'] || '';
      this.customerAddress = params['endereco'] || '';
    });

    this.loadDishes();
  }

  loadDishes(): void {
    this.dishService.getDishes().subscribe({
      next: (dishes) => {
        this.dishes = dishes;
        this.filteredDishes = dishes;
      },
      error: (error) => {
        console.error('Erro ao carregar pratos:', error);
      }
    });
  }

  getProductImage(productName: string): string {
    const name = productName.toLowerCase();
    
    if (name.includes('salad') || name.includes('hamburguer')) {
      return 'assets/images/hamburguer.png';
    }
    if (name.includes('coca')) {
      return 'assets/images/coca.png';
    }
    if (name.includes('açaí')) {
      return 'assets/images/acai.png';
    }
    if (name.includes('strogonoff')) {
      return 'assets/images/strogonoff.png';
    }
    if (name.includes('lasanha')) {
      return 'assets/images/lasanha.png';
    }
    return 'assets/images/default.png';
  }

  filterDishes(): void {
    if (!this.searchTerm.trim()) {
      this.filteredDishes = this.dishes;
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredDishes = this.dishes.filter(dish =>
      dish.name.toLowerCase().includes(term)
    );
  }

  toggleDishSelection(dish: Dish): void {
    const index = this.selectedDishes.findIndex(d => d.id === dish.id);
    
    if (index === -1) {
      this.selectedDishes.push(dish);
    } else {
      this.selectedDishes.splice(index, 1);
    }
    
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalValue = this.selectedDishes.reduce(
      (total, dish) => total + dish.price,
      0
    );
  }

  submitOrder(): void {
    if (this.selectedDishes.length === 0) {
      return;
    }

    const pedido: Pedido = {
      dishes: this.selectedDishes,
      total: this.totalValue,
      status: 'Pendente',
      cliente: this.customerName,
      endereco: this.customerAddress
    };

    this.pedidoService.create(pedido).subscribe({
      next: (createdPedido) => {
        if (createdPedido && createdPedido.id) {
          this.router.navigate(['/customer-order-status'], {
            queryParams: {
              id: createdPedido.id,
              name: this.customerName,
              endereco: this.customerAddress
            }
          });
        }
      },
      error: (error) => {
        console.error('Erro ao criar pedido:', error);
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/customer-identification']);
  }

  isSelected(dish: Dish): boolean {
    return this.selectedDishes.some(d => d.id === dish.id);
  }
}