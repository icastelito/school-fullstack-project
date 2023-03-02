import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const EditarMatricula = () => {
  const [matriculas, setMatriculas] = useState([]);
  const [estudantes, setEstudantes] = useState([]);
  const [editando, setEditando] = useState(false);
  const [cursos, setCursos] = useState({});
  const [matriculaEditando, setMatriculaEditando] = useState({
    id: null,
    periodo: "",
    data_matricula: "",
    estudante: "",
    curso: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/matriculas/")
      .then((response) => {
        setMatriculas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/estudantes/")
      .then((response) => {
        const estudantesData = {};
        response.data.forEach((estudante) => {
          estudantesData[estudante.id] = estudante;
        });
        setEstudantes(estudantesData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cursos/")
      .then((response) => {
        const cursosData = {};
        response.data.forEach((curso) => {
          cursosData[curso.id] = curso;
        });
        setCursos(cursosData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getEstudanteNome = (id) => {
    if (estudantes[id]) {
      return estudantes[id].primeiro_nome + " " + estudantes[id].sobrenome;
    } else {
      return "";
    }
  };

  const getCursoNome = (id) => {
    if (cursos[id]) {
      return cursos[id].nome_curso;
    } else {
      return "";
    }
  };

  const handleDelete = (matriculaId) => {
    axios
      .delete(`http://localhost:8000/matriculas/${matriculaId}/`)
      .then(() => {
        setMatriculas((matriculas) =>
          matriculas.filter((matricula) => matricula.id !== matriculaId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (matricula) => {
    setMatriculaEditando(matricula);
    setEditando(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMatriculaEditando({ ...matriculaEditando, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:8000/matriculas/${matriculaEditando.id}/`,
        matriculaEditando
      )
      .then(() => {
        setMatriculas((matriculas) =>
          matriculas.map((matricula) =>
            matricula.id === matriculaEditando.id
              ? matriculaEditando
              : matricula
          )
        );
        setMatriculaEditando({
          id: null,
          periodo: "",
          data_matricula: "",
          estudante: "",
          curso: "",
        });
        setEditando(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Editar Matrículas</h2>
      <Table className=" table table-striped ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Período</th>
            <th>Data da Matrícula</th>
            <th>Estudante</th>
            <th>Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {matriculas.map((matricula) => (
            <tr key={matricula.id}>
              <td>{matricula.id}</td>
              <td>{matricula.periodo}</td>
              <td>{matricula.data_matricula}</td>
              <td>{getEstudanteNome(matricula.estudante)}</td>
              <td>{getCursoNome(matricula.curso)}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary mr-2 mx-2"
                  onClick={() => handleEdit(matricula)}
                >
                  <FaEdit />
                  Editar
                </button>

                <button
                  type="button"
                  className="btn btn-danger mr-2 mx-2"
                  onClick={() => handleDelete(matricula.id)}
                >
                  <FaTrash /> Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {editando ? (
        <div className="form-group">
          <h3>Editar Matrícula</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Período:
              <input
                type="text"
                name="periodo"
                className="form-control"
                value={matriculaEditando.periodo}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Data da Matrícula:
              <input
                type="date"
                name="data_matricula"
                className="form-control"
                value={matriculaEditando.data_matricula}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Estudante:
              <select
                name="estudante"
                className="form-control"
                value={matriculaEditando.estudante}
                onChange={handleChange}
              >
                <option value=""></option>
                {Object.values(estudantes).map((estudante) => (
                  <option key={estudante.id} value={estudante.id}>
                    {estudante.primeiro_nome} {estudante.sobrenome}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Curso:
              <select
                name="curso"
                className="form-control"
                value={matriculaEditando.curso}
                onChange={handleChange}
              >
                <option value=""></option>
                {Object.values(cursos).map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nome_curso}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <button type="submit" className="btn btn-primary mr-2 mx-2 my-1">  Salvar</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default EditarMatricula;
