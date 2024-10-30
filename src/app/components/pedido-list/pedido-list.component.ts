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
  pedidoSelecionado: Pedido | null = null;  // Apenas um pedido pode ser selecionado

  constructor(private pedidoService: PedidoService, private router: Router) { }

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe(data => {
      console.log('Pedidos recebidos do backend:', data);  // Verifica os pedidos que vêm do backend
      this.pedidos = data.map(pedido => ({
        ...pedido,
        selecionado: false  // Inicializa o campo 'selecionado'
      }));
    });
  }

  // Função para alternar a seleção de pedidos (apenas um selecionado por vez)
  togglePedidoSelecionado(pedido: Pedido): void {
    if (this.pedidoSelecionado === pedido) {
      // Se o pedido já está selecionado, desmarque
      this.pedidoSelecionado = null;
      pedido.selecionado = false;
    } else {
      // Seleciona um novo pedido, desmarcando qualquer outro
      this.pedidos.forEach(p => p.selecionado = false); // Desmarcar todos
      pedido.selecionado = true;
      this.pedidoSelecionado = pedido;
    }
    console.log('Pedido atualmente selecionado:', this.pedidoSelecionado);
  }

  // Função para aceitar o pedido selecionado e redirecionar para a tela de "Pedido Aceito"
  aceitarPedidos(): void {
    if (!this.pedidoSelecionado) {
      console.warn('Nenhum pedido selecionado.');
      return;
    }

    console.log('Pedido selecionado para aceitar:', this.pedidoSelecionado);

    // Alterar o status para "Preparando"
    this.pedidoService.updateStatus(this.pedidoSelecionado.id!, 'Preparando').subscribe(
      (updatedPedido: Pedido) => {
        console.log('Status atualizado para "Preparando":', updatedPedido);

        // Redirecionar para a página de "Pedido Aceito"
        this.router.navigate(['/pedido-aceito'], { queryParams: { id: this.pedidoSelecionado!.id } });

        // Remover o pedido da lista localmente
        this.pedidos = this.pedidos.filter(p => p.id !== this.pedidoSelecionado!.id);
        this.pedidoSelecionado = null;  // Limpar a seleção
      },
      error => {
        console.error('Erro ao atualizar o status do pedido:', error);
      }
    );
  }

  // Função para navegar para a tela de adicionar novo produto
  navigateToAddDish(): void {
    this.router.navigate(['/dish-list']);
  }
}
