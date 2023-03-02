import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function AdicionarMatricula() {
  const [estudantes, setEstudantes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [periodo, setPeriodo] = useState("");
  const [dataMatricula, setDataMatricula] = useState("");
  const [estudanteSelecionado, setEstudanteSelecionado] = useState("");
  const [cursoSelecionado, setCursoSelecionado] = useState("");

  useEffect(() => {
    async function fetchData() {
      const responseEstudantes = await axios.get(
        "http://localhost:8000/estudantes/"
      );
      const responseCursos = await axios.get("http://localhost:8000/cursos/");
      setEstudantes(responseEstudantes.data);
      setCursos(responseCursos.data);
    }
    fetchData();
  }, []);

  function handleEstudanteChange(event) {
    setEstudanteSelecionado(event.target.value);
  }

  function handleCursoChange(event) {
    setCursoSelecionado(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8000/matriculas/", {
        periodo: periodo,
        data_matricula: dataMatricula,
        estudante: estudanteSelecionado,
        curso: cursoSelecionado,
      })
      .then((response) => console.log(response.data));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formPeriodo">
        <Form.Label>Periodo</Form.Label>
        <Form.Control
          as="select"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
        >
          <option value="">Selecione um período</option>
          <option value="M">Manhã</option>
          <option value="T">Tarde</option>
          <option value="N">Noite</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formDataMatricula">
        <Form.Label>Data da Matrícula</Form.Label>
        <Form.Control
          type="date"
          placeholder="Insira a data da matrícula"
          value={dataMatricula}
          onChange={(e) => setDataMatricula(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEstudante">
        <Form.Label>Estudante</Form.Label>
        <Form.Control as="select" onChange={handleEstudanteChange}>
          <option value="">Selecione um estudante</option>
          {estudantes.map((estudante) => (
            <option key={estudante.id} value={estudante.id}>
              {estudante.primeiro_nome} {estudante.sobrenome}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formCurso">
        <Form.Label>Curso</Form.Label>
        <Form.Control as="select" onChange={handleCursoChange}>
          <option value="">Selecione um curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nome_curso}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Adicionar Matrícula
      </Button>
    </Form>
  );
}

export default AdicionarMatricula;
