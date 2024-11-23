import { Component, OnInit, OnDestroy } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-entregador',
  templateUrl: './entregador.component.html',
  styleUrls: ['./entregador.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EntregadorComponent implements OnInit, OnDestroy {
  pedidosEnviados: Pedido[] = [];
  pedidoSelecionado: Pedido | null = null;
  pedidoEntregue: Pedido | null = null;
  entregaHora: string = '';
  atualizacaoSubscription?: Subscription;

  constructor(
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarPedidos();
    this.iniciarAtualizacaoAutomatica();
  }

  ngOnDestroy(): void {
    if (this.atualizacaoSubscription) {
      this.atualizacaoSubscription.unsubscribe();
    }
  }

  carregarPedidos(): void {
    this.pedidoService.getPedidosByStatus('Enviado').subscribe({
      next: (pedidos) => {
        this.pedidosEnviados = pedidos;
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos:', error);
      }
    });
  }

  iniciarAtualizacaoAutomatica(): void {
    if (!this.pedidoEntregue) {  // Só atualiza se não estiver na tela de confirmação
      this.atualizacaoSubscription = interval(5000)
        .pipe(
          switchMap(() => this.pedidoService.getPedidosByStatus('Enviado'))
        )
        .subscribe({
          next: (pedidos) => {
            this.pedidosEnviados = pedidos;
          },
          error: (error) => {
            console.error('Erro ao atualizar pedidos:', error);
          }
        });
    }
  }

  togglePedidoSelecionado(pedido: Pedido): void {
    if (this.pedidoSelecionado === pedido) {
      this.pedidoSelecionado = null;
    } else {
      this.pedidoSelecionado = pedido;
    }
  }

  marcarComoEntregue(): void {
    if (!this.pedidoSelecionado) return;

    this.pedidoService.updateStatus(this.pedidoSelecionado.id!, 'Entregue')
      .subscribe({
        next: (pedidoAtualizado) => {
          this.pedidoEntregue = this.pedidoSelecionado;
          this.entregaHora = new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          });
          this.pedidosEnviados = this.pedidosEnviados.filter(
            p => p.id !== this.pedidoSelecionado!.id
          );
          this.pedidoSelecionado = null;
        },
        error: (error) => {
          console.error('Erro ao marcar pedido como entregue:', error);
        }
      });
  }

  voltarParaPedidos(): void {
    this.pedidoEntregue = null;
    this.entregaHora = '';
    this.carregarPedidos();
    this.iniciarAtualizacaoAutomatica();
  }
}