import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class SharedPedidoService {

  private pedidosEnviados: Pedido[] = [];

  // Método para adicionar um pedido à lista de pedidos enviados
  adicionarPedido(pedido: Pedido): void {
    this.pedidosEnviados.push(pedido);
  }

  // Método para obter a lista de pedidos enviados
  getPedidosEnviados(): Pedido[] {
    return this.pedidosEnviados;
  }

  // Método para remover um pedido da lista (caso seja necessário)
  removerPedido(id: number): void {
    this.pedidosEnviados = this.pedidosEnviados.filter(p => p.id !== id);
  }
}
