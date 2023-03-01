import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EditarEstudante = (props) => {
  const [estudante, setEstudante] = useState({
    primeiro_nome: "",
    sobrenome: "",
    rg: "",
    cpf: "",
    codigo_matricula: "",
    data_nascimento: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/estudantes/${props.match.params.id}/`)
      .then((response) => {
        setEstudante(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.match.params.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:8000/estudantes/${props.match.params.id}/`,
        estudante
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEstudante({ ...estudante, [name]: value });
  };

  return (
    <div className="container mt-4">
      <h1>Editar Estudante</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Primeiro Nome:</label>
          <input
            type="text"
            name="primeiro_nome"
            className="form-control"
            value={estudante.primeiro_nome}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Sobrenome:</label>
          <input
            type="text"
            name="sobrenome"
            className="form-control"
            value={estudante.sobrenome}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>RG:</label>
          <input
            type="text"
            name="rg"
            className="form-control"
            value={estudante.rg}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            className="form-control"
            value={estudante.cpf}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Código de Matrícula:</label>
          <input
            type="text"
            name="codigo_matricula"
            className="form-control"
            value={estudante.codigo_matricula}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Data de Nascimento:</label>
          <input
            type="text"
            name="data_nascimento"
            className="form-control"
            value={estudante.data_nascimento}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Atualizar
        </button>
      </form>
    </div>
  );
};

export default EditarEstudante;
