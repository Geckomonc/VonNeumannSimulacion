import { useState } from 'react';
import './index.css';

const memoriaInicial = [
  { dir: '0000', bin: '00000100' }, // LOAD
  { dir: '0001', bin: '00000101' }, // ADD
  { dir: '0010', bin: '00000110' }, // STORE
  { dir: '0011', bin: '00000111' }, // SUB
  { dir: '0100', bin: '00001000' }, // STORE
];

const components = ['Memoria', 'Unidad de Control', 'ALU', 'CPU'];
const instructions = [
  'Cargar valor de la memoria',
  'Decodificar instrucción',
  'Ejecutar operación en la ALU',
  'Guardar resultado en memoria'
];

export default function App() {
  const [pc, setPc] = useState(0);
  const [ir, setIr] = useState('');
  const [acc, setAcc] = useState(0);
  const [entrada, setEntrada] = useState(0);
  const [mem, setMem] = useState(memoriaInicial);

  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([]);

  const ejecutar = () => {
    if (pc >= mem.length || step >= instructions.length) return;

    const instruccion = mem[pc].bin;
    setIr(instruccion);
    const valor = parseInt(instruccion.slice(4), 2);
    const op = instruccion.slice(0, 4);

    let nuevoAcc = acc;

    switch (op) {
      case '0000': // LOAD
        nuevoAcc = valor;
        break;
      case '0001': // ADD
        nuevoAcc += valor;
        break;
      case '0010': // STORE
        setMem(prev => {
          const nueva = [...prev];
          nueva[valor] = { ...nueva[valor], bin: acc.toString(2).padStart(8, '0') };
          return nueva;
        });
        break;
      case '0011': // SUB
        nuevoAcc -= valor;
        break;
    }

    setAcc(nuevoAcc);
    setEntrada(valor);
    setPc(pc + 1);

    // Registro del paso actual en historial
    setHistory(prev => [...prev, instructions[step]]);
    setStep(step + 1);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#0f172a' }}>Simulador Visual - Von Neumann</h1>

      <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
        {/* Unidad de Control */}
        <div style={{ border: '2px solid #60a5fa', padding: 10, width: 220 }}>
          <h3>Unidad de Control</h3>
          <p><strong>Cont. Programa:</strong> {pc.toString(2).padStart(4, '0')}</p>
          <p><strong>Reg. Instrucción:</strong> {ir}</p>
        </div>

        {/* ALU */}
        <div style={{ border: '2px solid #4ade80', padding: 10, width: 220 }}>
          <h3>ALU</h3>
          <p><strong>Acumulador:</strong> {acc.toString(2).padStart(8, '0')}</p>
          <p><strong>Reg. Entrada:</strong> {entrada.toString(2).padStart(8, '0')}</p>
        </div>

        {/* Memoria */}
        <div style={{ border: '2px solid #fbbf24', padding: 10 }}>
          <h3>Memoria</h3>
          <table>
            <thead>
              <tr><th>Dir</th><th>Contenido</th></tr>
            </thead>
            <tbody>
              {mem.map((m, i) => (
                <tr key={i}>
                  <td>{m.dir}</td>
                  <td>{m.bin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sección de control */}
      <button
        onClick={ejecutar}
        style={{
          marginTop: 20,
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer'
        }}
        disabled={step >= instructions.length}
      >
        Ejecutar siguiente paso
      </button>

      {/* Visualización de estado actual */}
      <div style={{ marginTop: 30 }}>
        <p><strong>Componente activo:</strong> {components[step % components.length] || 'Finalizado'}</p>
        <p><strong>Instrucción actual:</strong> {instructions[step] || 'Todas completadas'}</p>

        <h3>Historial de ejecución</h3>
        <ol>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

