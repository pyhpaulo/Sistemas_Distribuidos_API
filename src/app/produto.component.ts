import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.model';

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
    this.produtoService.getProdutos().subscribe(
      produtos => this.produtos = produtos,
      error => console.error(error)
    );
  }

  editProduto(produto: Produto): void {
    this.editing = true;
    // Copie o produto para o formulário para edição
    this.produtoForm = { ...produto };
  }

  deleteProduto(id: number): void {
    // Lógica para excluir o produto (use seu serviço)
    this.produtoService.excluirProduto(id).subscribe(
      () => {
        // Atualize a lista de produtos após a exclusão
        this.carregarProdutos();
      },
      error => console.error(error)
    );
  }

  submitForm(): void {
    if (this.editing) {
      // Lógica para editar o produto (use seu serviço)
      this.produtoService.atualizarProduto(this.produtoForm.id, this.produtoForm).subscribe(
        () => {
          // Atualize a lista de produtos após a edição
          this.carregarProdutos();
          this.resetForm();
        },
        error => console.error(error)
      );
    } else {
      // Lógica para adicionar um novo produto (use seu serviço)
      this.produtoService.adicionarProduto(this.produtoForm).subscribe(
        () => {
          // Atualize a lista de produtos após a adição
          this.carregarProdutos();
          this.resetForm();
        },
        error => console.error(error)
      );
    }
  }

  resetForm(): void {
    // Limpe o formulário e redefina o modo de edição
    this.produtoForm = { id: 0, name: '', description: '', price: 0, quantity: 0 };
    this.editing = false;
  }
}
