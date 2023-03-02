import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const ListarCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [cursoEditando, setCursoEditando] = useState({
    id: null,
    codigo_curso: "",
    nome_curso: "",
    descricao: "",
    nivel: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/cursos/")
      .then((response) => {
        setCursos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (cursoId) => {
    axios
      .delete(`http://localhost:8000/cursos/${cursoId}/`)
      .then(() => {
        setCursos((cursos) => cursos.id !== cursoId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (curso) => {
    setCursoEditando(curso);
    setEditando(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCursoEditando((cursoEditando) => ({
      ...cursoEditando,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:8000/estudantes/${cursoEditando.id}/`,
        cursoEditando
      )
      .then((response) => {
        const index = cursos.findIndex(
          (curso) => curso.id === response.data.id
        );
        const newCursos = [...cursos];
        newCursos[index] = response.data;
        setCursos(newCursos);
        setCursoEditando({
            id: null,
            codigo_curso: "",
            nome_curso: "",
            descricao: "",
            nivel: "",
        });
        setEditando(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setCursoEditando({
        id: null,
        codigo_curso: "",
        nome_curso: "",
        descricao: "",
        nivel: ""
    });
    setEditando(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lista de Cursos</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Código do Curso</th>
            <th>Nome do Curso</th>
            <th>Descrição</th>
            <th>Nível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.codigo_curso}</td>
              <td>{curso.nome_curso}</td>
              <td>{curso.descricao}</td>
              <td>{curso.nivel}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary mr-2 mx-2"
                  onClick={() => handleEdit(curso)}
                >
                  <FaEdit /> Editar
                </button>
                <button
                  type="button"
                  className="btn btn-danger mr-2 mx-2"
                  onClick={() => handleDelete(curso.id)}
                >
                  <FaTrash /> Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editando ? (
    <form onSubmit={handleSubmit}>
      <h2>Editar Curso</h2>
      <div className="form-group">
        <label htmlFor="codigo_curso">Codigo do Curso:</label>
        <input
          type="text"
          className="form-control"
          id="codigo_curso"
          name="codigo_curso"
          value={cursoEditando.codigo_curso}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="nome_curso">nome_curso:</label>
        <input
          type="text"
          className="form-control"
          id="nome_curso"
          name="nome_curso"
          value={cursoEditando.nome_curso}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="descricao">descricao:</label>
        <input
          type="text"
          className="form-control"
          id="descricao"
          name="descricao"
          value={cursoEditando.descricao}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="nivel">nivel:</label>
        <input
          type="text"
          className="form-control"
          id="nivel"
          name="nivel"
          value={cursoEditando.nivel}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mx-2 my-1">
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

export default ListarCursos;
