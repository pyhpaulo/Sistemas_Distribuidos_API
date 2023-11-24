using Microsoft.AspNetCore.Mvc;
using ProdutosApiAula.Models;
using ProdutosApiAula.Repositories;

namespace ProdutosApiAula.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProdutoController : Controller
    {
        //Criação do metodo  GET

        [HttpGet(Name = "GetProduto")]
        public IEnumerable<Produto> Get()
        {
            return MockDB.GetProdutos();
        }

        [HttpGet("{id}")]
        public Produto GetProduto(int id)
        {
            return MockDB.GetProduto(id);
        }
        //Criação do metodo Post

        [HttpPost]

        [HttpPost]
        public IActionResult Post([FromBody] Produto produto)
        {
            MockDB.Produtos.Add(produto);
            return CreatedAtRoute("GetProduto", new { id = produto.Id }, produto);
        }
        //Criação do Metodo PUT

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Produto produto)
        {
            var existingProduto = MockDB.GetProduto(id);
            if (existingProduto == null)
            {
                return NotFound();
            }

            existingProduto.Name = produto.Name;
            existingProduto.Description = produto.Description;
            existingProduto.Price = produto.Price;
            existingProduto.Quantity = produto.Quantity;

            return NoContent();
        }
        //Criação do método Delete

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var produto = MockDB.GetProduto(id);
            if (produto == null)
            {
                return NotFound();
            }

            MockDB.Produtos.Remove(produto);

            return NoContent();
        }


    }
}