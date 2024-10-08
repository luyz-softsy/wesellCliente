/* eslint-disable react/prop-types */
import { useState } from "react";
import StepWizard from "react-step-wizard";
import Etapa1 from "./Etapa1";
import Etapa2 from "./Etapa2";
import Etapa3 from "./Etapa3";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useContexts from "../../hooks/useContext";
import { url_base } from "../../services/apis";
import "./wizard.css";

function WizardForm() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    nomeSocial: "",
    cpf: "",
    genero: "",
    dataNascimento: "",
    email: "",
    celular: "",
    endereco: "",
    numero: "",
    complemento: "",
    cep: "",
    bairro: "",
    municipio: "",
    uf: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { storageClient, setClient } = useContexts();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function limparMascara(valor, campo) {
    if (campo === "cpf" || campo === "celular" || campo === "cep") {
      return valor ? valor.replace(/[^\d]+/g, "") : "";
    }
    return valor;
  }

  async function handleSubmit(data) {
    setLoading(true);
    const formDataLimpo = {};
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        formDataLimpo[key] = limparMascara(data[key], key);
      }
    }

    await axios
      .post(url_base + "/clientes", formDataLimpo)
      .then((response) => {
        let resData = response.data
        resData.id = response.data.idCliente
        storageClient(resData);
        setClient(resData);
        setLoading(false);
        toast.success(`Cadastro realizado com sucesso!`);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
        toast.error(error.response.data.message);
      });
  }

  return (
    <StepWizard>
      <Etapa1 handleChange={handleChange} formData={formData} />
      <Etapa2 handleChange={handleChange} formData={formData} />
      <Etapa3
        handleChange={handleChange}
        formData={formData}
        onSubmit={handleSubmit}
        loading={loading}
        setFormData={setFormData}
      />
    </StepWizard>
  );
}

export default WizardForm;
