/* eslint-disable react/prop-types */
// import ReactInputMask from "react-input-mask";
// import formatCurrencyBR from "../../hooks/formatCurrency.js";
// import formatPriceBR from "../../hooks/formatPrice.js";
// import styles from "./resumo.module.css";
// import { useState } from "react";
// import formatPriceBR from "../../hooks/formatPrice.js";
// import { calculaFrete } from "../../hooks/calculaFrete.js";
// import { useEffect } from "react";

// export default function ResumoPedido({
//   totalProdutos,
//   disabled,
//   total,
//   produtosComFrete,
//   valorFrete,
//   continuarCompra,
//   subtotal,
//   showCalculaFrete = true,
// }) {
//   const [cep, setCep] = useState("");
//   const [frete, setFrete] = useState(null);

//   async function handleCalculaFrete() {
//     try {
//       const response = await calculaFrete(produtosComFrete, cep);

//       if (response && response.length > 0) {
//         const primeiroFrete = response[0];
//         const todasPropriedadesIguais = response.every((item) => {
//           return (
//             item.name === primeiroFrete.name &&
//             item.delivery_range?.min === primeiroFrete.delivery_range?.min &&
//             item.delivery_range?.max === primeiroFrete.delivery_range?.max &&
//             item.company?.name === primeiroFrete.company?.name
//           );
//         });

//         const totalFreteCalculado = response.reduce(
//           (acc, item) => acc + item.price,
//           0
//         );

//         if (todasPropriedadesIguais) {
//           setFrete({
//             name: primeiroFrete.name,
//             delivery_range: primeiroFrete.delivery_range,
//             price: totalFreteCalculado,
//           });
//           console.log(response);
//           console.log(todasPropriedadesIguais);
//           console.log({
//             name: primeiroFrete.name,
//             delivery_range: primeiroFrete.delivery_range,
//             price: totalFreteCalculado,
//           });
//         } else {
//           console.log("As propriedades dos fretes retornados são diferentes.");
//         }
//       }
//     } catch (erro) {
//       console.log(erro);
//     }
//   }

//   useEffect(() => {
//     if (frete !== null && produtosComFrete.length > 0) {
//       handleCalculaFrete();
//     }
//   }, [produtosComFrete]);

//   return (
//     <div className={`${styles.cardResumo} card`}>
//       <div className={styles.titleResumo}>
//         <h5>Resumo da compra</h5>
//       </div>
//       <div className={styles.infoResumo}>
//         <span>
//           <p>Itens ({totalProdutos})</p> <p>{formatCurrencyBR(subtotal)}</p>
//         </span>
//         <span>
//           <section className="w-100">
//             <div className="d-flex align-items-center w-100 justify-content-between">
//               <p>Frete</p>
//               {showCalculaFrete ? (
//                 <>
//                   <div
//                     id={styles.calculaFrete}
//                     className="input-group input-group-sm"
//                   >
//                     <ReactInputMask
//                       type="tel"
//                       mask="99999-999"
//                       maskChar={null}
//                       className="form-control"
//                       id="cep"
//                       autoComplete="off"
//                       placeholder="CEP"
//                       aria-describedby="inputCep"
//                       value={cep}
//                       onChange={(e) => setCep(e.target.value)}
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={handleCalculaFrete}
//                       className="input-group-text m-0"
//                       id="inputCep"
//                     >
//                       Calcular
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <p>{valorFrete ? formatCurrencyBR(valorFrete) : "--"}</p>
//               )}
//             </div>
//             {frete && (
//               <div className=" mt-3 form-check w-100 d-flex align-items-center gap-3">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name={frete.name}
//                   id={frete.name}
//                   checked
//                 />
//                 <label
//                   className={`form-check-label col d-flex align-items-center justify-content-between`}
//                   htmlFor={frete.name}
//                 >
//                   <div>
//                     <p>{frete?.name}</p>
//                     <p>
//                       {frete?.delivery_range?.min} -{" "}
//                       {frete?.delivery_range?.max} dias úteis
//                     </p>
//                   </div>

//                   <p>{formatPriceBR(frete?.price)}</p>
//                 </label>
//               </div>
//             )}
//           </section>
//         </span>
//         {frete ? (
//           <span className={styles.spanTotal}>
//           <p>Total</p> <p>{formatCurrencyBR(total + frete?.price)}</p>
//         </span>
//         ) :  (
//           <span className={styles.spanTotal}>
//           <p>Total</p> <p>{formatCurrencyBR(total)}</p>
//         </span>
//         )}
//       </div>
//       <div id={styles.areaBtn}>
//         <button
//           type="button"
//           className="btn btn-primary"
//           disabled={disabled}
//           onClick={continuarCompra}
//         >
//           Continuar a compra
//         </button>
//       </div>
//     </div>
//   );
// }
