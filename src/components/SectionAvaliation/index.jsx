/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Avaliation from "../Avaliation";
import CardRecommendation from "../CardRecommendation";
import RatingnBar from "../RatingBar";
import AvaliacaoFixa from "./AvaliacaoFixa";
import styles from "./sectionAvaliation.module.css";

const SectionAvaliation = ({ total, avaliacoes }) => {
  const [visibleAvaliacoes, setVisibleAvaliacoes] = useState(4);
  const [avaliacoesComDescricao, setAvaliacoesComDescricao] = useState([]);

  useEffect(() => {
    const filtradas = avaliacoes.length > 0 ? avaliacoes.filter(
      (avaliacao) => avaliacao.descricaoAvaliacao 
    ): []
    setAvaliacoesComDescricao(filtradas);
  }, [avaliacoes]);

  const countStars = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  const carregarMaisAvaliacoes = () => {
    setVisibleAvaliacoes((prevCount) => prevCount + 10);
  };

  avaliacoes.length > 0 &&
    avaliacoes.forEach((avaliacao) => {
      const star = avaliacao.avaliacao.toString();
      if (countStars.hasOwnProperty(star)) {
        countStars[star]++;
      }
    });

  const somaEstrelas =
    avaliacoes.length > 0 &&
    avaliacoes.reduce((acc, avaliacao) => acc + avaliacao.avaliacao, 0);
  let media = total > 0 ? somaEstrelas / total : 0;
  media = Math.min(5, Math.max(0, media));
  media = parseFloat(media.toFixed(1));

  const porcentagens = {};
  for (let key in countStars) {
    if (Object.prototype.hasOwnProperty.call(countStars, key)) {
      if (countStars[key] > 0) {
        porcentagens[key] = Math.round((countStars[key] / total) * 100);
      } else {
        porcentagens[key] = 0;
      }
    }
  }

  const porcentagemBom = isNaN(
    Math.round(
      ((countStars["3"] + countStars["4"] + countStars["5"]) / total) * 100
    )
  )
    ? 0
    : Math.round(
        ((countStars["3"] + countStars["4"] + countStars["5"]) / total) * 100
      );

  const porcentagemRuim = isNaN(
    Math.round(((countStars["1"] + countStars["2"]) / total) * 100)
  )
    ? 0
    : Math.round(((countStars["1"] + countStars["2"]) / total) * 100);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <div className={styles.infoAvaliation}>
        <h1 id={styles.title}>Avaliações do produto</h1>
        <div className={styles.textStar}>
          <span>
            <p>{media}</p>
            <div className="pt-1">
              <AvaliacaoFixa mediaAvaliacoes={media} heigth="26px" />
              <p className="mt-1">
                ({total > 0 ? total : 0}) Avaliações de clientes
              </p>
            </div>
          </span>
        </div>
        <div className={styles.rankings}>
          <RatingnBar estrelas="5" porcentagem={porcentagens["5"]} />
          <RatingnBar estrelas="4" porcentagem={porcentagens["4"]} />
          <RatingnBar estrelas="3" porcentagem={porcentagens["3"]} />
          <RatingnBar estrelas="2" porcentagem={porcentagens["2"]} />
          <RatingnBar estrelas="1" porcentagem={porcentagens["1"]} />
        </div>

        <div className={styles.avaliationClients}>
          <div className={styles.boxCards}>
            <CardRecommendation status={true} value={porcentagemBom} />
            <CardRecommendation status={false} value={porcentagemRuim} />
          </div>
        </div>
      </div>
      <div className={styles.commentsAvaliation}>
        <h1>Avaliações em destaque</h1>
        {avaliacoesComDescricao.length > 0 ? (
          <>
            {avaliacoesComDescricao
              .sort(
                (a, b) => new Date(b.dataAvaliacao) - new Date(a.dataAvaliacao)
              ) 
              .slice(0, visibleAvaliacoes)
              .map((avaliacao, index) => (
                <Avaliation
                  key={index}
                  nomeUsuario={avaliacao.nomeCompleto}
                  comentario={avaliacao.descricaoAvaliacao}
                  numeroAvaliacoes={avaliacao.avaliacao}
                  dataAvaliacao={formatDate(avaliacao.dataAvaliacao)}
                />
              ))}

            {visibleAvaliacoes < avaliacoesComDescricao.length && (
              <div className={styles.areaLoadItens}>
                <p
                  onClick={carregarMaisAvaliacoes}
                  className={styles.loadItens}
                >
                  Carregar Mais
                </p>
              </div>
            )}
          </>
        ) : (
          <p>Produtos sem avaliações detalhadas.</p>
        )}
      </div>
    </>
  );
};

export default SectionAvaliation;
