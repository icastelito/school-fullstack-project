import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AdicionarEstudante = () => {
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [codigoMatricula, setCodigoMatricula] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const novoEstudante = {
      primeiro_nome: primeiroNome,
      sobrenome: sobrenome,
      rg: rg,
      cpf: cpf,
      codigo_matricula: codigoMatricula,
      data_nascimento: dataNascimento,
    };

    axios
      .post("http://localhost:8000/estudantes/", novoEstudante)
      .then((response) => {
        console.log(response.data);
        // reinicia os campos do formulário após o envio
        setPrimeiroNome("");
        setSobrenome("");
        setRg("");
        setCpf("");
        setCodigoMatricula("");
        setDataNascimento("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>Adicionar novo estudante</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="primeiro-nome">Primeiro Nome:</label>
          <input
            type="text"
            className="form-control"
            id="primeiro-nome"
            value={primeiroNome}
            onChange={(event) => setPrimeiroNome(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sobrenome">Sobrenome:</label>
          <input
            type="text"
            className="form-control"
            id="sobrenome"
            value={sobrenome}
            onChange={(event) => setSobrenome(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rg">RG:</label>
          <input
            type="text"
            className="form-control"
            id="rg"
            value={rg}
            onChange={(event) => setRg(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="codigo-matricula">Código de Matrícula:</label>
          <input
            type="text"
            className="form-control"
            id="codigo-matricula"
            value={codigoMatricula}
            onChange={(event) => setCodigoMatricula(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="data-nascimento">Data de Nascimento:</label>
          <input
            type="date"
            className="form-control"
            id="data-nascimento"
            value={dataNascimento}
            onChange={(event) => setDataNascimento(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Adicionar Estudante
        </button>
      </form>
    </div>
  );
};

export default AdicionarEstudante;
