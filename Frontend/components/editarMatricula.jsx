import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function EditarMatriculas() {
  const [matriculas, setMatriculas] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8000/matriculas/");
      setMatriculas(response.data);
    }
    fetchData();
  }, []);

  async function handleDelete(matricula) {
    await axios.delete(`http://localhost:8000/matriculas/${matricula.id}`);
    setMatriculas(matriculas.filter((m) => m.id !== matricula.id));
  }

  function handleEdit(id) {
    setEditing(id);
  }

  function handleCancelEdit() {
    setEditing(null);
  }

  function handleSave(matricula) {
    //TODO: Implementar função para salvar a matrícula modificada
    console.log(matricula);
    setEditing(null);
  }

  return (
    <>
      {editing !== null ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Estudante</th>
              <th>Curso</th>
              <th>Período</th>
              <th>Data da Matrícula</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr key={matriculas[editing].id}>
              <td>{matriculas[editing].id}</td>
              <td>
                <Form.Control
                  type="text"
                  defaultValue={matriculas[editing].estudante}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  defaultValue={matriculas[editing].curso}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  defaultValue={matriculas[editing].periodo}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  defaultValue={matriculas[editing].data_matricula}
                />
              </td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleSave(matriculas[editing])}
                >
                  Salvar
                </Button>
                <Button variant="secondary" onClick={handleCancelEdit}>
                  Cancelar
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Estudante</th>
              <th>Curso</th>
              <th>Período</th>
              <th>Data da Matrícula</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map((matricula, index) => (
              <tr key={matricula.id}>
                <td>{matricula.id}</td>
                <td>{matricula.estudante}</td>
                <td>{matricula.curso}</td>
                <td>{matricula.periodo}</td>
                <td>{matricula.data_matricula}</td>
                <td>
                  <Button
                    variant="primary"
                    className="mr-2"
                    onClick={() => handleEdit(index)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(matricula)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default EditarMatriculas;
