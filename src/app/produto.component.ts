// produto.component.ts

import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.model';
import { catchError, finalize } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  produtos: Produto[] = [];
  produtoForm: Produto = { id: 0, name: '', description: '', price: 0, quantity: 0 };
  editing = false;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos()
      .subscribe(
        produtos => this.produtos = produtos,
        error => console.error(error)
      );
  }

  editProduto(produto: Produto): void {
    this.editing = true;
    this.produtoForm = { ...produto };
  }

  deleteProduto(id: number): void {
    this.produtoService.excluirProduto(id)
      .pipe(
        catchError(() => EMPTY),
        finalize(() => this.carregarProdutos()) // Atualizar a lista de produtos após a exclusão
      )
      .subscribe();
  }

  submitForm(): void {
    if (this.editing) {
      this.produtoService.atualizarProduto(this.produtoForm.id, this.produtoForm)
        .pipe(
          catchError(() => EMPTY),
          finalize(() => this.resetForm()) // Limpar o formulário após a edição
        )
        .subscribe();
    } else {
      this.produtoService.adicionarProduto(this.produtoForm)
        .pipe(
          catchError(() => EMPTY), 
          finalize(() => this.resetForm()) // Limpar o formulário após a adição
        )
        .subscribe();
    }
  }

  resetForm(): void {
    this.produtoForm = { id: 0, name: '', description: '', price: 0, quantity: 0 };
    this.editing = false;
  }
}
