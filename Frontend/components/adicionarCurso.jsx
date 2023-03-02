import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AdicionarCurso = () => {
  const [codigoCurso, setCodigoCurso] = useState("");
  const [nomeCurso, setNomeCurso] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nivel, setNivel] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const novoCurso = {
      codigo_curso: codigoCurso,
      nome_curso: nomeCurso,
      descricao: descricao,
      nivel: nivel,
    };

    axios
      .post("http://localhost:8000/cursos/", novoCurso)
      .then((response) => {
        console.log(response.data);
        setCodigoCurso("");
        setNomeCurso("");
        setDescricao("");
        setNivel("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>Adicionar novo curso</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="primeiro-nome">Código do Curso</label>
          <input
            type="text"
            className="form-control"
            id="codigo-curso"
            value={codigoCurso}
            onChange={(event) => setCodigoCurso(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nome-curso">Nome do Curso</label>
          <input
            type="text"
            className="form-control"
            id="nome-curso"
            value={nomeCurso}
            onChange={(event) => setNomeCurso(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            className="form-control"
            id="descricao"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nive">Nivel</label>
          <input
            type="text"
            className="form-control"
            id="nivel"
            value={nivel}
            onChange={(event) => setNivel(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Adicionar Curso
        </button>
      </form>
    </div>
  );
};

export default AdicionarCurso;
