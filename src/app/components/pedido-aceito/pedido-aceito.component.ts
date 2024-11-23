import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedido-aceito',
  templateUrl: './pedido-aceito.component.html',
  styleUrls: ['./pedido-aceito.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PedidoAceitoComponent implements OnInit {
  pedidoId!: number;
  pedido: Pedido | null = null;
  dataAtual: Date = new Date();

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
      }
    });
  }

  carregarPedido(): void {
    this.pedidoService.getPedido(this.pedidoId).subscribe({
      next: (pedido) => {
        if (pedido) {
          this.pedido = pedido;
          if (this.pedido.status === 'Pendente') {
            this.atualizarStatusPreparando();
          }
        }
      },
      error: (error) => {
        console.error('Erro ao carregar pedido:', error);
      }
    });
  }

  atualizarStatusPreparando(): void {
    if (this.pedido) {
      this.pedidoService.updateStatus(this.pedido.id!, 'Preparando').subscribe({
        next: (updatedPedido) => {
          if (updatedPedido && updatedPedido.status) {
            this.pedido!.status = updatedPedido.status;
          }
        },
        error: (error) => {
          console.error('Erro ao atualizar status:', error);
        }
      });
    }
  }

  enviarPedido(): void {
    if (this.pedido) {
      this.pedidoService.updateStatus(this.pedido.id!, 'Enviado').subscribe({
        next: (updatedPedido) => {
          if (updatedPedido && updatedPedido.status) {
            this.router.navigate(['/pedidos']);
          }
        },
        error: (error) => {
          console.error('Erro ao enviar pedido:', error);
        }
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/pedidos']);
  }
}