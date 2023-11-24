// MockDB.cs

using ProdutosApiAula.Models;
using System.Collections.Generic;

namespace ProdutosApiAula.Repositories
{
    public static class MockDB
    {
        private static bool produtosGerados = false;

        public static List<Produto> Produtos { get; set; } = new List<Produto>();

        public static List<Produto> GetProdutos()
        {
            if (!produtosGerados)
            {
                generateProdutos();
                produtosGerados = true;
            }

            return Produtos;
        }

        public static Produto? GetProduto(int id)
        {
            if (!produtosGerados)
            {
                generateProdutos();
                produtosGerados = true;
            }

            return Produtos.Find(p => p.Id == id);
        }

        private static void generateProdutos()
        {
            for (int i = 0; i < 5; i++)
            {
                Produto produto = new Produto();
                produto.Id = i;
                produto.Name = $"Produto {i}";
                produto.Description = $"Descrição do produto {i}";
                produto.Price = i * 10;
                produto.Quantity = i * 2;
                Produtos.Add(produto);
            }
        }
    }
}
