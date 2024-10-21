import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import "./product.css";
import { toast } from "react-toastify";

export const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [product, setProduct] = useState({});

    useEffect(() => {
        async function loadProduct() {
            await api.get(`products/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error("Produto não encontrado", error);
                navigate("/", { replace: true });
                return;
            });
        }

        loadProduct();
    }, [navigate, id]);

    function salvarProduto() {
        const minhaLista = localStorage.getItem("@produtos");
        let produtosSalvos = JSON.parse(minhaLista) || [];
        const hasProduct = produtosSalvos.some((produto) => produto.id === product.id);
        if(hasProduct) {
            toast.warn("Este produto já foi salvo");
            return;
        }
        produtosSalvos.push(product);
        localStorage.setItem("@produtos", JSON.stringify(produtosSalvos));
        // alert("Produto salvo com sucesso");
        toast.success("Produto salvo com sucesso");
    }

    return ( 
        <div className="produto-info">
            <h1>{product.title}</h1>
            <img src={product.thumbnail} alt={product.brand} />
            <p>{product.description}</p>

            <div className="area-buttons">
                <button onClick={salvarProduto}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`http://google.com/search?q=${product.title}`}>
                    Mais na internet
                    </a>
                </button>
            </div>
        </div>
     );
}