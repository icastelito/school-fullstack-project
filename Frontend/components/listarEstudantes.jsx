import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {FaEdit, FaTrash } from "react-icons/fa";

const ListarEstudantes = () => {
  const [estudantes, setEstudantes] = useState([]);
  const [editando, setEditando] = useState(false);
  const [estudanteEditando, setEstudanteEditando] = useState({
    id: null,
    primeiro_nome: "",
    sobrenome: "",
    cpf: "",
    rg: "",
    codigo_matricula: ""
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/estudantes/")
      .then((response) => {
        setEstudantes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (estudanteId) => {
    axios
      .delete(`http://localhost:8000/estudantes/${estudanteId}/`)
      .then(() => {
        setEstudantes((estudantes) =>
          estudantes.filter((estudante) => estudante.id !== estudanteId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (estudante) => {
    setEstudanteEditando(estudante);
    setEditando(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEstudanteEditando((estudanteEditando) => ({
      ...estudanteEditando,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8000/estudantes/${estudanteEditando.id}/`, estudanteEditando)
      .then((response) => {
        const index = estudantes.findIndex((estudante) => estudante.id === response.data.id);
        const newEstudantes = [...estudantes];
        newEstudantes[index] = response.data;
        setEstudantes(newEstudantes);
        setEstudanteEditando({
          id: null,
          primeiro_nome: "",
          sobrenome: "",
          cpf: "",
          rg: "",
          codigo_matricula: ""
        });
        setEditando(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setEstudanteEditando({
      id: null,
      primeiro_nome: "",
      sobrenome: "",
      cpf: "",
      rg: "",
      codigo_matricula: ""
    });
    setEditando(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lista de Estudantes</h1>
      <table className="table table-striped">
    <thead>
      <tr>
        <th>Primeiro Nome</th>
        <th>Sobrenome</th>
        <th>CPF</th>
        <th>RG</th>
        <th>Código de Matrícula</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {estudantes.map((estudante) => (
        <tr key={estudante.id}>
          <td>{estudante.primeiro_nome}</td>
          <td>{estudante.sobrenome}</td>
          <td>{estudante.cpf}</td>
          <td>{estudante.rg}</td>
          <td>{estudante.codigo_matricula}</td>
          <td>

          <button type="button" className="btn btn-primary mr-2 mx-2" onClick={() => handleEdit(estudante)}>
              <FaEdit /> Editar
          </button>
          <button type="button" className="btn btn-danger mr-2 mx-2" onClick={() => handleDelete(estudante.id)}>
              <FaTrash /> Excluir
          </button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {editando ? (
    <form onSubmit={handleSubmit}>
      <h2>Editar Estudante</h2>
      <div className="form-group">
        <label htmlFor="primeiro_nome">Primeiro Nome:</label>
        <input
          type="text"
          className="form-control"
          id="primeiro_nome"
          name="primeiro_nome"
          value={estudanteEditando.primeiro_nome}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="sobrenome">Sobrenome:</label>
        <input
          type="text"
          className="form-control"
          id="sobrenome"
          name="sobrenome"
          value={estudanteEditando.sobrenome}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="cpf">CPF:</label>
        <input
          type="text"
          className="form-control"
          id="cpf"
          name="cpf"
          value={estudanteEditando.cpf}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="rg">RG:</label>
        <input
          type="text"
          className="form-control"
          id="rg"
          name="rg"
          value={estudanteEditando.rg}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="codigo_matricula">Código de Matrícula:</label>
        <input
          type="text"
          className="form-control"
          id="codigo_matricula"
          name="codigo_matricula"
          value={estudanteEditando.codigo_matricula}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mr-2 mx-2 my-1">
        Salvar
      </button>
      <button type="button" className="btn btn-danger mr-2 mx-2 my-1" onClick={handleCancel}>
        Cancelar
      </button>
    </form>
  ) : null}
</div>
);
};

export default ListarEstudantes;