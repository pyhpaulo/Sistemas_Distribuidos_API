// produto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'https://localhost:7258';

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/Produto`);
  }

  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/Produto/${id}`);
  }

  adicionarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrl}/Produto`, produto);
  }

  atualizarProduto(id: number, produto: Produto): Observable<any> {
    return this.http.put(`${this.apiUrl}/Produto/${id}`, produto);
  }

  excluirProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Produto/${id}`);
  }
}
