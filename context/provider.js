import React, { useState, useContext, createContext } from "react";

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
      "Custo ($)": 10,
      "Duração (T)": 10
    },
    {
      "Serviço": "Lavagem completa (com enceramento)",
      "Custo ($)": 30,
      "Duração (T)": 20
    },
    {
      "Serviço": "Polimento de faróis",
      "Custo ($)": 50,
      "Duração (T)": 100
    },
    {
      "Serviço": "Cristalização de vidros",
      "Custo ($)": 200,
      "Duração (T)": 100
    },
    {
      "Serviço": "Limpeza técnica de motor",
      "Custo ($)": 50,
      "Duração (T)": 100
    },
    {
      "Serviço": "Higienização de ar-condicionado",
      "Custo ($)": 10,
      "Duração (T)": 10
    },
    {
      "Serviço": "Higienização interna",
      "Custo ($)": 10,
      "Duração (T)": 20
    },
    {
      "Serviço": "Limpeza e hidratação de couro",
      "Custo ($)": 100,
      "Duração (T)": 200
    },
    {
      "Serviço": "Oxi-sanitização",
      "Custo ($)": 20,
      "Duração (T)": 50
    }
  ]);
  const [tempoAtual, setTempoAtual] = useState(0);

  const atualizaFilas = () => {
    const atualizaBox = (box, setBox, fila, setFila) => {
      const novoBox = box.filter(servico => {
        const tempoTermino = servico.tempoInicio + (servico.tempoExecucao*100);
        return tempoTermino > tempoAtual;
      });

      const novosServicos = box.filter(servico => {
        const tempoTermino = servico.tempoInicio + (servico.tempoExecucao*100);
        return tempoTermino <= tempoAtual;
      });

      setBox(novoBox);

      if (novosServicos.length > 0 && fila.length > 0) {
        const novosServicosFila = fila.slice(0, novosServicos.length);
        const restoFila = fila.slice(novosServicos.length);

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
    const novoTempo = new Date().getTime();
    setTempoAtual(novoTempo);
    console.log("novo tempo")
    console.log(tempoAtual)
    atualizaFilas();
  };
const fazLog=()=>{
    console.log("filas")
    console.log(filaBox1)
    console.log(filaBox2)
    console.log(filaBox3)
    console.log("boxes")
    console.log(box1)
    console.log(box2)
    console.log(box3)
}
  const escolheBox = (ordemServico) => {
    const filas = [
      { nome: 'Box1', fila: filaBox1, setFila: setfilaBox1, box: box1, setBox: setBox1 },
      { nome: 'Box2', fila: filaBox2, setFila: setfilaBox2, box: box2, setBox: setBox2 },
      { nome: 'Box3', fila: filaBox3, setFila: setfilaBox3, box: box3, setBox: setBox3 }
    ];
  
    filas.sort((a, b) => a.fila.length - b.fila.length);
  
    for (let box of filas) {
      if (box.fila.length === 0 && box.box.length === 0) {
        // Se a fila e o box estiverem vazios, adiciona diretamente ao box
        box.setBox([ordemServico]);
        console.log(`Ordem de serviço adicionada diretamente no ${box.nome}`);
        fazLog();
        return;
      } else if (box.fila.length < 4) {
        // Adiciona à fila se ainda houver espaço
        box.setFila([...box.fila, ordemServico]);
        console.log(`Ordem de serviço adicionada na fila de ${box.nome}`);
        fazLog();
        return;
      }
    }
  
    console.log('Todas as filas estão cheias. Ordem de serviço negada.');
  };

  const adicionarOrdemServico = (ordemServico) => {
    const id = new Date().getTime();
    const novaOrdemServico = { id, ...ordemServico };
    escolheBox(novaOrdemServico);
    console.log('ordem adicionada')
    console.log(novaOrdemServico)
  };

  const removerOrdemServico = (ordemServico) => {
    // Atualizar essa função se necessário
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
        removerOrdemServico,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
