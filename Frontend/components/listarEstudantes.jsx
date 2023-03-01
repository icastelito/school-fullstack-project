import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash } from "react-icons/fa";

const EstudantesLista = () => {
  const [estudantes, setEstudantes] = useState([]);

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
      .delete("http://localhost:8000/estudantes/${estudanteId}/")
      .then(() => {
        setEstudantes((estudantes) =>
          estudantes.filter((estudante) => estudante.id !== estudanteId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lista de Estudantes</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Sobrenome</th>
            <th scope="col">CPF</th>
            <th scope="col">RG</th>
            <th scope="col">Matrícula</th>
            <th scope="col">Ações</th>
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
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(estudante.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstudantesLista;
