/* eslint-disable react/prop-types */
import { FiMinus, FiPlus } from "react-icons/fi";
import formatCurrencyBR from "../../hooks/formatCurrency";
import styles from "./produtoCarrinho.module.css";
import { Link } from "react-router-dom";

export default function CardProdutoCarrinho({
  item,
  removeProduct,
  onQuantidadeChange,
}) {
  const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const nomeAtualizado = removerAcentos(item.descricao)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\//g, "");

  return (
    <div className={styles.cardItemCarrinho} key={item.id}>
      <div className={styles.areaImg}>
        <img
          src={item.imagem ? item.imagem : item.imagens[0]}
          alt={item.descricao}
        />
      </div>
      <div className={styles.areaDescricao}>
        <Link
          to={`/produto/${item.id}/${nomeAtualizado}`}
          id={styles.nomeProduto}
        >
          {item.descricao}
        </Link>
        <p className={styles.estoque}>Em estoque</p>
        <div className={styles.spans}>
          <span onClick={() => removeProduct(item.id)}>Excluir</span>
          <span>Salvar para mais tarde</span>
        </div>
      </div>
      <div className={styles.areaQtd}>
        <FiMinus
          size={24}
          onClick={() => onQuantidadeChange(Math.max(1, item.qtd - 1))}
          style={{ cursor: "pointer" }}
        />
        {item.qtd}
        <FiPlus
          size={24}
          onClick={() => onQuantidadeChange(item.qtd + 1)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className={styles.areaValor}>
        <p>{formatCurrencyBR(item.valor)}</p>
      </div>
    </div>
  );
}