import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../models/pedido.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-order-status',
  templateUrl: './customer-order-status.component.html',
  styleUrls: ['./customer-order-status.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CustomerOrderStatusComponent implements OnInit, OnDestroy {
  pedidoId!: number;
  pedido: Pedido | null = null;
  dataAtual: Date = new Date();
  statusSubscription?: Subscription;
  statusMensagem: string = '';
  statusIcone: string = '☕';

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pedidoId = +params['id'];
      if (!isNaN(this.pedidoId) && this.pedidoId > 0) {
        this.carregarPedido();
        this.iniciarMonitoramentoStatus();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

  carregarPedido(): void {
    if (this.pedidoId) {
      this.pedidoService.getPedido(this.pedidoId).subscribe({
        next: (pedido) => {
          if (pedido) {
            this.pedido = pedido;
            this.atualizarMensagemStatus(pedido.status);
          }
        },
        error: (error) => {
          console.error('Erro ao carregar pedido:', error);
        }
      });
    }
  }

  iniciarMonitoramentoStatus(): void {
    // Monitora o status a cada 5 segundos
    this.statusSubscription = interval(5000)
      .pipe(
        switchMap(() => this.pedidoService.getPedido(this.pedidoId))
      )
      .subscribe({
        next: (pedidoAtualizado) => {
          if (pedidoAtualizado && this.pedido?.status !== pedidoAtualizado.status) {
            this.pedido = pedidoAtualizado;
            this.atualizarMensagemStatus(pedidoAtualizado.status);
          }
        },
        error: (error) => {
          console.error('Erro ao atualizar status:', error);
        }
      });
  }

  atualizarMensagemStatus(status: string): void {
    switch (status.toLowerCase()) {
      case 'pendente':
        this.statusMensagem = 'Aguardando confirmação...';
        this.statusIcone = '⏳';
        break;
      case 'preparando':
        this.statusMensagem = 'Preparando pedido...';
        this.statusIcone = '☕';
        break;
      case 'pronto':
        this.statusMensagem = 'Pedido pronto!';
        this.statusIcone = '✅';
        break;
      case 'enviado':
        this.statusMensagem = 'Pedido a caminho!';
        this.statusIcone = '🚚';
        break;
      case 'entregue':
        this.statusMensagem = 'Pedido entregue!';
        this.statusIcone = '✨';
        break;
      default:
        this.statusMensagem = 'Processando pedido...';
        this.statusIcone = '⏳';
    }
  }

  novoPedido(): void {
    if (this.pedido) {
      this.router.navigate(['/customer-products'], {
        queryParams: {
          name: this.pedido.cliente,
          endereco: this.pedido.endereco
        }
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/customer-products']);
  }
}