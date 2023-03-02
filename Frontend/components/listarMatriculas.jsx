import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const ListarAlunosPorCurso = () => {
  const [cursos, setCursos] = useState([]);
  const [alunosPorCurso, setAlunosPorCurso] = useState({});

  

  useEffect(() => {
    async function fetchData() {
      const cursosRes = await axios.get("http://localhost:8000/cursos/");
      setCursos(cursosRes.data);

      const alunosRes = await axios.get("http://localhost:8000/estudantes/");
      const matriculasRes = await axios.get(
        "http://localhost:8000/matriculas/"
      );

      // cria um objeto com as informações dos alunos matriculados em cada curso
      const alunosPorCursoObj = matriculasRes.data.reduce((acc, matricula) => {
        const cursoId = matricula.curso;
        const aluno = alunosRes.data.find((a) => a.id === matricula.estudante);

        if (!acc[cursoId]) {
          acc[cursoId] = [aluno];
        } else {
          acc[cursoId].push(aluno);
        }

        return acc;
      }, {});

      setAlunosPorCurso(alunosPorCursoObj);
    }

    fetchData();
  }, []);

  return (
    <Container>
      {cursos.map((curso) => (
        <div key={curso.id} className="container mt-5">
          <h2>{curso.nome_curso}</h2>
          {alunosPorCurso[curso.id] ? (
            <Table className="table table-striped">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>RG</th>
                  <th>CPF</th>
                  <th>Código de Matrícula</th>
                </tr>
              </thead>
              <tbody>
                {alunosPorCurso[curso.id].map((aluno) => (
                  <tr key={aluno.id}>
                    <td>{`${aluno.primeiro_nome} ${aluno.sobrenome}`}</td>
                    <td>{aluno.rg}</td>
                    <td>{aluno.cpf}</td>
                    <td>{aluno.codigo_matricula}</td>
                   
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Nenhum aluno matriculado neste curso.</p>
          )}
        </div>
      ))}
    </Container>
  );
};

export default ListarAlunosPorCurso;
