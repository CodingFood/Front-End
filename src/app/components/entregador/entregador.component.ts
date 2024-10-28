import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entregador',
  templateUrl: './entregador.component.html',
  styleUrls: ['./entregador.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe]  // Certifique-se de adicionar o DatePipe aos providers
})
export class EntregadorComponent implements OnInit {

  pedidosEnviados: Pedido[] = [];
  pedidosSelecionados: Pedido[] = [];
  pedidoEntregue: Pedido | null = null;  // Para armazenar o pedido entregue
  entregaHora: string = '';  // Hora da entrega

  constructor(private pedidoService: PedidoService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getPedidosEnviados();

    // Atualizar a lista de pedidos a cada 5 segundos
    setInterval(() => {
      this.getPedidosEnviados();
    }, 5000);
  }

  // Função para buscar pedidos enviados
  getPedidosEnviados(): void {
    this.pedidoService.getPedidosByStatus('Enviado').subscribe(
      pedidos => {
        console.log("Pedidos enviados recebidos:", pedidos);
        this.pedidosEnviados = pedidos;
      },
      error => {
        console.error("Erro ao buscar pedidos enviados:", error);
      }
    );
  }

  // Alternar seleção de pedidos
  togglePedidoSelecionado(pedido: Pedido): void {
    const pedidoJaSelecionado = this.pedidosSelecionados.find(p => p.id === pedido.id);

    if (pedidoJaSelecionado) {
      // Remove o pedido da lista se ele já estiver selecionado
      this.pedidosSelecionados = this.pedidosSelecionados.filter(p => p.id !== pedido.id);
    } else {
      // Adiciona o pedido à lista se ele não estiver selecionado
      this.pedidosSelecionados.push(pedido);
    }

    // Atualiza o estado de 'selecionado' do pedido
    pedido.selecionado = !pedido.selecionado;

    // Log para verificar os pedidos selecionados
    console.log("Pedidos selecionados:", this.pedidosSelecionados);
  }

  // Função para marcar pedidos como "Entregue" e exibir a tela de confirmação
  marcarComoEntregue(): void {
    if (this.pedidosSelecionados.length === 1) {  // Exemplo: entregando um pedido de cada vez
      const pedido = this.pedidosSelecionados[0];
      this.pedidoService.updateStatus(pedido.id!, 'Entregue').subscribe(updatedPedido => {
        console.log(`Pedido ${pedido.id} marcado como Entregue.`);
        pedido.status = updatedPedido.status;
        this.pedidosEnviados = this.pedidosEnviados.filter(p => p.id !== pedido.id);
        this.pedidoEntregue = pedido;  // Exibir o pedido entregue
        this.entregaHora = this.datePipe.transform(new Date(), 'HH:mm') || '';  // Captura a hora da entrega
      });
    }

    // Limpar a seleção
    this.pedidosSelecionados = [];
  }

  // Função para voltar à lista de pedidos após a confirmação da entrega
  voltarParaPedidos(): void {
    this.pedidoEntregue = null;  // Limpar o pedido entregue para voltar à lista
    this.getPedidosEnviados();   // Recarregar os pedidos enviados
  }
}
