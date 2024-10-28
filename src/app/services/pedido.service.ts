import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:8080/pedidos';  // URL para o backend

  constructor(private http: HttpClient) { }

  // Busca todos os pedidos
  getPedidos(): Observable<Pedido[]> {
    console.log("Buscando todos os pedidos");
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  // Busca um pedido específico por ID
  getPedido(id: number): Observable<Pedido> {
    console.log(`Buscando pedido com ID: ${id}`);
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  // Criação de novo pedido
  create(pedido: Pedido): Observable<Pedido> {
    console.log("Criando novo pedido:", pedido);
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  // Atualiza um pedido existente
  update(id: number, pedido: Pedido): Observable<Pedido> {
    console.log(`Atualizando pedido com ID: ${id}`);
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, pedido);
  }

  // Deleta um pedido
  delete(id: number): Observable<void> {
    console.log(`Deletando pedido com ID: ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Busca pedidos pelo status (ex.: "Enviado", "Preparando")
  getPedidosByStatus(status: string): Observable<Pedido[]> {
    console.log(`Buscando pedidos com status: ${status}`);
    return this.http.get<Pedido[]>(`${this.apiUrl}/status/${status}`);
  }

  // Atualiza o status de um pedido
  updateStatus(id: number, novoStatus: string): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}/status`, { status: novoStatus });  // Manda como string simples
  }
  

  // Busca o status de um pedido específico
  getStatus(id: number): Observable<string> {
    console.log(`Buscando status do pedido com ID: ${id}`);
    return this.http.get(`${this.apiUrl}/${id}/status`, { responseType: 'text' });
  }
}
