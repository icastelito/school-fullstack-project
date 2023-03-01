import React, { useState } from "react";
import { Card, Tabs, Tab } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import EstudantesLista from "../components/listarEstudantes";
import EditarEstudante from "../components/editarEstudantes";
import AdicionarEstudante from "../components/adicionarEstudantes";

function HomePage() {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <>
      <header>
        <h1>Colégio Astra </h1>
      </header>
      <main>
        <Card> 
          <Card.Header>
            <Tabs
              activeKey={activeTab}
              onSelect={(key) => setActiveTab(key)}
              fill
            >
              <Tab eventKey="tab1" title="Estudantes">
                {activeTab === "tab1" && <div>
                  {<EstudantesLista />}
                  </div>}
              </Tab>
              <Tab eventKey="tab2" title="Aba 2">
                {activeTab === "tab2" && <div>{/* conteúdo da aba 2 */}</div>}
              </Tab>
              <Tab eventKey="tab3" title="Aba 3">
                {activeTab === "tab3" && <div>{/* conteúdo da aba 3 */}</div>}
              </Tab>
              <Tab eventKey="tab4" title="Aba 4">
                {activeTab === "tab4" && <div>{/* conteúdo da aba 4 */}</div>}
              </Tab>
            </Tabs>
          </Card.Header>
        

        </Card>
      </main>
    </>
  );
}

export default HomePage;
