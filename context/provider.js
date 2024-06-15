import React, { useState, useContext, createContext, useEffect } from "react";
import { Alert } from "react-native";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [filaBox1, setfilaBox1] = useState([]);
  const [filaBox2, setfilaBox2] = useState([]);
  const [filaBox3, setfilaBox3] = useState([]);
  const [box1, setBox1] = useState([]);
  const [box2, setBox2] = useState([]);
  const [box3, setBox3] = useState([]);
  const [servicos, setServicos] = useState([
    {
      "Serviço": "Lavagem simples (sem enceramento)",
      "Custo": 10,
      "Duração": 10 // minutos
    },
    {
      "Serviço": "Lavagem completa (com enceramento)",
      "Custo": 30,
      "Duração": 20 // minutos
    },
    {
      "Serviço": "Polimento de faróis",
      "Custo": 50,
      "Duração": 100 // minutos
    },
    {
      "Serviço": "Cristalização de vidros",
      "Custo": 200,
      "Duração": 100 // minutos
    },
    {
      "Serviço": "Limpeza técnica de motor",
      "Custo": 50,
      "Duração": 100 // minutos
    },
    {
      "Serviço": "Higienização de ar-condicionado",
      "Custo": 10,
      "Duração": 10 // minutos
    },
    {
      "Serviço": "Higienização interna",
      "Custo": 10,
      "Duração": 20 // minutos
    },
    {
      "Serviço": "Limpeza e hidratação de couro",
      "Custo": 100,
      "Duração": 200 // minutos
    },
    {
      "Serviço": "Oxi-sanitização",
      "Custo": 20,
      "Duração": 50 // minutos
    }
  ]);
  const [tempoAtual, setTempoAtual] = useState(0);

  useEffect(() => {
    atualizaFilas();
  }, [tempoAtual]);

  const atualizaFilas = () => {
    const atualizaBox = (box, setBox, fila, setFila) => {
      const novoBox = box.filter(servico => {
        const tempoTermino = servico.tempoInicio + (servico.tempoExecucao * 1000);
        return tempoTermino > tempoAtual;
      });

      const servicosTerminados = box.filter(servico => {
        const tempoTermino = servico.tempoInicio + servico.tempoExecucao * 1000;
        return tempoTermino <= tempoAtual;
      });

      setBox(novoBox);

      if (servicosTerminados.length > 0 && fila.length > 0) {
        fila.sort((a, b) => a.tempoInicio - b.tempoInicio);
        const novosServicosFila = fila.slice(0, servicosTerminados.length);
        const restoFila = fila.slice(servicosTerminados.length);

        const novosBox = [...novoBox, ...novosServicosFila.map(servico => ({
          ...servico,
          tempoInicio: tempoAtual
        }))];

        setBox(novosBox);
        setFila(restoFila);
      }
    };

    atualizaBox(box1, setBox1, filaBox1, setfilaBox1);
    atualizaBox(box2, setBox2, filaBox2, setfilaBox2);
    atualizaBox(box3, setBox3, filaBox3, setfilaBox3);
  };

  const atualizaTempo = () => {
    const novoTempo = Date.now();
    setTempoAtual(novoTempo);
    atualizaFilas();
  };

  const escolheBox = (ordemServico) => {
    const filas = [
      { nome: 'Box1', fila: filaBox1, setFila: setfilaBox1, box: box1, setBox: setBox1 },
      { nome: 'Box2', fila: filaBox2, setFila: setfilaBox2, box: box2, setBox: setBox2 },
      { nome: 'Box3', fila: filaBox3, setFila: setfilaBox3, box: box3, setBox: setBox3 }
    ];

    for (let box of filas) {
      if (box.fila.length === 0 && box.box.length === 0) {
        box.setBox([ordemServico]);
        console.log(`Ordem de serviço adicionada diretamente no ${box.nome}`);
        return;
      }
    }

    filas.sort((a, b) => a.fila.length - b.fila.length);

    for (let box of filas) {
      if (box.fila.length < 4) {
        box.setFila([...box.fila, ordemServico]);
        console.log(`Ordem de serviço adicionada na fila de ${box.nome}`);
        return;
      }
    }

    Alert.alert('Atenção', 'Todas as filas estão cheias. Ordem de serviço negada.');
  };

  const adicionarOrdemServico = (ordemServico) => {
    const id = Date.now();
    const novaOrdemServico = { id, ...ordemServico, tempoInicio: Date.now(), tempoExecucao: ordemServico["Duração"] };
    escolheBox(novaOrdemServico);
    console.log('Ordem adicionada');
    console.log(novaOrdemServico);
  };

  return (
    <AppContext.Provider
      value={{
        filaBox1,
        filaBox2,
        filaBox3,
        box1,
        box2,
        box3,
        servicos,
        tempoAtual,
        atualizaTempo,
        adicionarOrdemServico,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);