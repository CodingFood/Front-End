import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PedidoListComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidoSelecionado: Pedido | null = null;
  dataAtual: Date = new Date();

  constructor(private pedidoService: PedidoService, private router: Router) { }

  ngOnInit(): void {
    this.carregarPedidos();
    // Atualizar a lista de pedidos a cada 30 segundos
    setInterval(() => {
      this.carregarPedidos();
    }, 30000);
  }

  carregarPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        // Filtrar apenas pedidos com status 'Pendente' ou similar
        this.pedidos = data
          .filter(pedido => pedido.status === 'Pendente')
          .map(pedido => ({
            ...pedido,
            selecionado: false
          }));
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos:', error);
      }
    });
  }

  togglePedidoSelecionado(pedido: Pedido): void {
    if (this.pedidoSelecionado === pedido) {
      this.pedidoSelecionado = null;
      pedido.selecionado = false;
    } else {
      // Desmarcar pedido anterior se houver
      if (this.pedidoSelecionado) {
        this.pedidoSelecionado.selecionado = false;
      }
      
      // Selecionar novo pedido
      this.pedidoSelecionado = pedido;
      pedido.selecionado = true;
    }
  }

  aceitarPedidos(): void {
    if (!this.pedidoSelecionado) {
      return;
    }

    this.pedidoService.updateStatus(this.pedidoSelecionado.id!, 'Preparando')
      .subscribe({
        next: (updatedPedido) => {
          // Redirecionar para a página de pedido aceito
          this.router.navigate(['/pedido-aceito'], { 
            queryParams: { id: this.pedidoSelecionado!.id } 
          });
          
          // Remover o pedido da lista local
          this.pedidos = this.pedidos.filter(p => p.id !== this.pedidoSelecionado!.id);
          this.pedidoSelecionado = null;
          
          // Recarregar a lista de pedidos
          this.carregarPedidos();
        },
        error: (error) => {
          console.error('Erro ao atualizar o status do pedido:', error);
        }
      });
  }

  // Formato da data para o template
  formatarData(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(data);
  }

  // Método para navegar para a tela de pratos
  navigateToAddDish(): void {
    this.router.navigate(['/dish-list']);
  }
}