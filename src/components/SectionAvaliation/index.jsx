/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import Avaliation from "../Avaliation";
import CardRecommendation from "../CardRecommendation";
import RatingnBar from "../RatingBar";
import AvaliacaoFixa from "./AvaliacaoFixa";
import styles from "./sectionAvaliation.module.css";

const SectionAvaliation = ({ total, avaliacoes }) => {
  const countStars = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  avaliacoes.forEach((avaliacao) => {
    const star = avaliacao.star.toString();
    if (countStars.hasOwnProperty(star)) {
      countStars[star]++;
    }
  });

  const somaEstrelas = avaliacoes.reduce(
    (acc, avaliacao) => acc + avaliacao.star,
    0
  );
  let media = total > 0 ? somaEstrelas / total : 0;
  media = Math.min(5, Math.max(0, media));
  media = parseFloat(media.toFixed(1));

  const porcentagens = {};
  for (let key in countStars) {
    if (Object.prototype.hasOwnProperty.call(countStars, key)) {
      porcentagens[key] = Math.round((countStars[key] / total) * 100);
    }
  }

  const porcentagemBom = Math.round(
    ((countStars["4"] + countStars["5"]) / total) * 100
  );
  const porcentagemRuim = Math.round(
    ((countStars["1"] + countStars["2"] + countStars["3"]) / total) * 100
  );

  return (
    <>
      <div className={styles.infoAvaliation}>
        <h1 id={styles.title}>Avaliações de clientes</h1>
        <div className={styles.textStar}>
          <span>
            <p>{media}</p>
            <div className="pt-1">
              <AvaliacaoFixa mediaAvaliacoes={media} heigth="26px" />
              <p className="mt-1">({total}) Avaliações de clientes</p>
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
        {/* {props.avaliacaoCliente ? ( */}
        <div className={styles.avaliationClients}>
          <div className={styles.boxCards}>
            <CardRecommendation status={true} value={porcentagemBom} />
            <CardRecommendation status={false} value={porcentagemRuim} />
          </div>
        </div>
        {/* ) : (
          ""
        )} */}
      </div>
      <div className={styles.commentsAvaliation}>
        {/* {props.avaliacaoCliente ? (
          <> */}
        <h1>Avaliações em destaque</h1>
        <Avaliation numeroAvaliacoes={2} />
        <Avaliation numeroAvaliacoes={5} />
        {/* </>
        ) : (
          <h6>Nenhuma avaliação de cliente</h6>
        )} */}
      </div>
    </>
  );
};

export default SectionAvaliation;
