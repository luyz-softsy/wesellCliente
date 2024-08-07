/* eslint-disable react/prop-types */
import styles from "./avaliation.module.css";
import AvaliacaoFixa from "../SectionAvaliation/AvaliacaoFixa";

const Avaliation = ({ numeroAvaliacoes }) => {
  return (
    <div className={styles.boxAvaliation}>
      <div className={styles.lineAvaliation}>
        <h6 className="my-0">
          Kerley Pollyany
          <span className="text-secondary text-end ms-1">(31/03/2024)</span>
        </h6>
        <AvaliacaoFixa heigth="1.4em" mediaAvaliacoes={numeroAvaliacoes} />
      </div>
      <p>
        O console é top demais gráficos realistas, gostei muito. Entrega foi
        rápida e chegou antes do prazo.
      </p>
    </div>
  );
};

export default Avaliation;
