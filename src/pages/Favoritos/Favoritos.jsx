import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favoritos.css";

export const Favoritos = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@produtos");
        const produtosSalvos = JSON.parse(minhaLista) || [];
        setProducts(produtosSalvos);
    }, []);

    function excluir(id) {
        let filtroProdutos = products.filter((item) => {
            return (item.id !== id);
        });
        setProducts(filtroProdutos);
        localStorage.setItem("@produtos", JSON.stringify(filtroProdutos));
        toast.success("Produto excluído com sucesso");
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