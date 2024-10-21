import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favoritos.css";

export const Favoritos = () => {
    // useState() inicializa products como um array vazio.
    const [products, setProducts] = useState([]);

    // useEffect() é usado para carregar os produtos salvos do localStorage assim que o componente é montado.
    useEffect(() => {
        // Os produtos são convertidos de volta de JSON para um array de objetos e armazenados em products.
        const minhaLista = localStorage.getItem("@produtos");
        const produtosSalvos = JSON.parse(minhaLista) || [];
        setProducts(produtosSalvos);
    }, []);

    function excluir(id) {
        // excluir(id) filtra os produtos removendo aquele com o id fornecido e atualiza o estado e o localStorage.
        let filtroProdutos = products.filter((item) => {
            return (item.id !== id);
        });
        setProducts(filtroProdutos);
        toast.success("Produto excluído com sucesso");
        localStorage.setItem("@produtos", JSON.stringify(filtroProdutos));
        // Exibe uma mensagem de sucesso ao remover o produto usando toast.
    }

    return (
        <div className="container">
            <div className="meus-produtos">
                <h1>Produtos salvos</h1>
                {products.length === 0 && <p>Nenhum produto salvo!</p>}
                <ul>
                    {products.map((item) => (
                        <li key={item.id}>
                            <img src={item.thumbnail} alt={item.brand} />
                            <h2>{item.title}</h2>
                            <div className="buttons">
                                <Link to={`/product/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluir(item.id)}>Excluir</button>
                            </div>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}