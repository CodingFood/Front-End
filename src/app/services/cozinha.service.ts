import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cozinha } from '../models/cozinha.model';

@Injectable({
  providedIn: 'root'
})
export class CozinhaService {

  private apiUrl = 'http://localhost:8080/cozinhas';  // Ajuste para a URL do seu backend

  constructor(private http: HttpClient) { }

  // Método para buscar todas as cozinhas
  getCozinhas(): Observable<Cozinha[]> {
    return this.http.get<Cozinha[]>(this.apiUrl);
  }

  // Método para buscar uma cozinha por ID
  getById(id: number): Observable<Cozinha> {
    return this.http.get<Cozinha>(`${this.apiUrl}/${id}`);
  }

  // Método para criar uma nova cozinha
  create(cozinha: Cozinha): Observable<Cozinha> {
    return this.http.post<Cozinha>(this.apiUrl, cozinha);
  }

  // Método para atualizar uma cozinha existente
  update(id: number, cozinha: Cozinha): Observable<Cozinha> {
    return this.http.put<Cozinha>(`${this.apiUrl}/${id}`, cozinha);
  }

  // Método para deletar uma cozinha
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
