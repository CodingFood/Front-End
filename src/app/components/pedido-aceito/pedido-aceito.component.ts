import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';
import { CommonModule, DatePipe } from '@angular/common';  // Importando DatePipe
import { FormsModule } from '@angular/forms';    

@Component({
  selector: 'app-pedido-aceito',
  templateUrl: './pedido-aceito.component.html',
  styleUrls: ['./pedido-aceito.component.css'],
  standalone: true,  
  imports: [CommonModule, FormsModule, DatePipe]  // Adicionando DatePipe aos imports
})
export class PedidoAceitoComponent implements OnInit {

  pedidoId!: number;
  pedido: Pedido | null = null;  // Inicializando como null

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pedidoId = +params['id'];
      if (!isNaN(this.pedidoId) && this.pedidoId > 0) {
        this.pedidoService.getPedido(this.pedidoId).subscribe(pedido => {
          if (pedido) {
            this.pedido = pedido;

            // Se o status for "Pendente", alteramos para "Preparando"
            if (this.pedido.status === 'Pendente') {
              this.atualizarStatusPreparando();
            }
          } else {
            console.warn('Pedido não encontrado!');
          }
        });
      }
    });
  }

  atualizarStatusPreparando(): void {
    if (this.pedido) {
      this.pedidoService.updateStatus(this.pedido.id!, 'Preparando').subscribe(
        updatedPedido => {
          if (updatedPedido && updatedPedido.status) {
            this.pedido!.status = updatedPedido.status;  // Atualiza localmente para "Preparando"
            console.log('Status atualizado para Preparando');
          }
        },
        error => {
          console.error('Erro ao atualizar para Preparando:', error);
        }
      );
    }
  }

  enviarPedido(): void {
    if (this.pedido) {
      this.pedidoService.updateStatus(this.pedido.id!, 'Enviado').subscribe(
        updatedPedido => {
          if (updatedPedido && updatedPedido.status) {
            this.pedido!.status = updatedPedido.status;  // Atualiza o status para "Enviado"
            alert('Pedido enviado com sucesso!');
            this.router.navigate(['/pedidos']);  // Redireciona após o envio
          }
        },
        error => {
          console.error('Erro ao enviar o pedido:', error);
          alert('Ocorreu um erro ao enviar o pedido. Tente novamente.');
        }
      );
    }
  }
}
