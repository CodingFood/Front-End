import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../models/pedido.model';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Dish } from '../models/dish.model'; 

@Component({
  selector: 'app-customer-order-status',
  templateUrl: './customer-order-status.component.html',
  styleUrls: ['./customer-order-status.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CustomerOrderStatusComponent implements OnInit {

  pedidoId!: number;
  pedido: Pedido | undefined;  
  pedidoStatus: string = '';  // Status atual do pedido
  dishes: Dish[] = [];  // Alterado de 'produtos' para 'dishes'

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const pedidoId = +params['id'];  // Obtendo o ID do pedido da URL
  
      // Exibindo o ID do pedido recebido via queryParams
      console.log('ID do Pedido recebido nos queryParams:', pedidoId);
  
      if (!isNaN(pedidoId) && pedidoId > 0) {
        this.carregarPedido(pedidoId);
      } else {
        console.error('ID do pedido inválido:', pedidoId);
      }
    });

    // Atualiza o status do pedido a cada 5 segundos
    setInterval(() => {
      if (this.pedidoId) {
        this.atualizarStatus();
      }
    }, 5000); // Atualiza a cada 5 segundos
  }

  // Função para carregar o pedido completo
  carregarPedido(pedidoId: number): void {
    this.pedidoService.getPedido(pedidoId).subscribe(pedido => {
      this.pedido = pedido;
      this.pedidoId = pedido.id!;
      this.pedidoStatus = pedido.status;
      this.dishes = pedido.dishes;  // Carregando os pratos do pedido

      // Exibindo o pedido carregado do backend
      console.log('Pedido carregado do backend:', pedido);
    });
  }

  // Função para atualizar o status do pedido
  atualizarStatus(): void {
    this.pedidoService.getPedido(this.pedidoId).subscribe(pedido => {
      if (pedido && pedido.status !== this.pedidoStatus) {
        this.pedidoStatus = pedido.status;  // Atualiza o status
        console.log('Status atualizado:', this.pedidoStatus);  // Log para o novo status
      }
    });
  }

  // Atualização na função para redirecionar com o nome e o endereço do cliente
  novoPedido(): void {
    if (this.pedido) {
      this.router.navigate(['/customer-products'], { 
        queryParams: { 
          name: this.pedido.cliente,  // Passando o nome do cliente
          endereco: this.pedido.endereco  // Passando o endereço do cliente
        }
      });
    }
  }
}
