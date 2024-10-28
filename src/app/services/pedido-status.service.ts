import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoStatusService {
  private apiUrl = 'http://localhost:8080/pedidos';  // URL para acessar o backend

  constructor(private http: HttpClient) { }

  // Método para buscar o status de um pedido específico
  getStatusById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}/status`);
  }

  // Método para buscar pedidos filtrados por status
  getPedidosByStatus(status: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/status/${status}`);
  }
}
