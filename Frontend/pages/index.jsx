import React, { useState } from "react";
import { Card, Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AdicionarEstudante from "../components/adicionarEstudantes";
import AdicionarCurso from "../components/adicionarCurso";
import ListarEstudantes from "../components/listarEstudantes";
import ListarCursos from "../components/listarCursos";
import MyApp from "./_app";
import ListarAlunosPorCurso from "../components/listarMatriculas";
import AdicionarMatricula from "../components/adicionarMatricula";
import EditarMatriculas from "../components/editarMatricula";

function HomePage() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeInnerTab, setActiveInnerTab] = useState("innerTab1");

  return (
    <>
      <header>
        <h1>Colégio Astra </h1>
      </header>
      <main className="black-bg">
        <Card>
          <Card.Header className="tab-header">
            <Tabs
              activeKey={activeTab}
              onSelect={(key) => setActiveTab(key)}
              fill
            >
              <Tab eventKey="tab1" title="Estudantes">
                {activeTab === "tab1" && (
                  <Tabs
                    activeKey={activeInnerTab}
                    onSelect={(key) => setActiveInnerTab(key)}
                    fill
                    className="inner-tabs"
                  >
                    <Tab eventKey="innerTab1" title="Listar">
                      {activeInnerTab === "innerTab1" && (
                        <div className="inner-tab-content">
                          {<ListarEstudantes />}
                        </div>
                      )}
                    </Tab>

                    <Tab eventKey="innerTab2" title="Adicionar">
                      {activeInnerTab === "innerTab2" && (
                        <div className="inner-tab-content">
                          {<AdicionarEstudante />}
                        </div>
                      )}
                    </Tab>
                  </Tabs>
                )}
              </Tab>

              <Tab eventKey="tab2" title="Cursos">
                {activeTab === "tab2" && (
                  <Tabs
                    activeKey={activeInnerTab}
                    onSelect={(key) => setActiveInnerTab(key)}
                    fill
                    className="inner-tabs"
                  >
                    <Tab eventKey="innerTab1" title="Listar">
                      {activeInnerTab === "innerTab1" && (
                        <div className="inner-tab-content">
                          {<ListarCursos />}
                        </div>
                      )}
                    </Tab>

                    <Tab eventKey="innerTab2" title="Adicionar">
                      {activeInnerTab === "innerTab2" && (
                        <div className="inner-tab-content">
                          {<AdicionarCurso />}
                        </div>
                      )}
                    </Tab>
                  </Tabs>
                )}
              </Tab>
              <Tab eventKey="tab3" title="Matrículas">
                {activeTab === "tab3" && (
                  <Tabs
                    activeKey={activeInnerTab}
                    onSelect={(key) => setActiveInnerTab(key)}
                    fill
                    className="inner-tabs"
                  >
                    <Tab eventKey="innerTab1" title="Listar">
                      {activeInnerTab === "innerTab1" && (
                        <div className="inner-tab-content">
                          {<ListarAlunosPorCurso />}
                        </div>
                      )}
                    </Tab>

                    <Tab eventKey="innerTab2" title="Adicionar">
                      {activeInnerTab === "innerTab2" && (
                        <div className="inner-tab-content">
                          {<AdicionarMatricula />}
                        </div>
                      )}
                    </Tab>

                    <Tab eventKey="innerTab3" title="Editar">
                      {activeInnerTab === "innerTab3" && (
                        <div className="inner-tab-content">
                          {<EditarMatriculas />}
                        </div>
                      )}
                    </Tab>
                  </Tabs>
                )}
              </Tab>
            </Tabs>
          </Card.Header>
        </Card>
      </main>
    </>
  );
}

export default HomePage;
