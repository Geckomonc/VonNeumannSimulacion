import { useState } from 'react'
import ControlUnit from '../components/ControlUnit.jsx'
import MemoryView from '../components/MemoryView.jsx'
import AluBox from '../components/AluBox.jsx'
import DataPanel from '../components/DataPanel.jsx'

const memoriaInicial = [
  { dir: '0000', bin: '00000100' }, // LOAD [0100]
  { dir: '0001', bin: '00010101' }, // ADD  [0101]
  { dir: '0010', bin: '00100110' }, // STORE 0110
  { dir: '0011', bin: '00110111' }, // SUB  [0111]
  { dir: '0100', bin: '00000101' }, // dato 5
  { dir: '0101', bin: '00001011' }, // dato 11
  { dir: '0110', bin: '00000000' }, // resultado
  { dir: '0111', bin: '00000000' }, // dato 0
]

const steps = [
  'memory-fetch',          // leer instrucción de memoria por PC
  'control-unit-pc',       // PC++
  'control-unit-decode',   // IR/decodificación
  'memory-read',           // leer operando (si aplica)
  'alu-load',              // cargar entrada en ALU
  'alu-execute',           // ejecutar (ADD/SUB/LOAD/…)
]

const PROGRAM_SIZE = 4 // solo ejecutar las 4 instrucciones 0000..0011

export default function FirstModel() {
  const [pc, setPc] = useState(0)
  const [ir, setIr] = useState('00000000')
  const [acc, setAcc] = useState(0)
  const [inVal, setInVal] = useState(0)
  const [mem, setMem] = useState(memoriaInicial)
  const [step, setStep] = useState(0)
  const [stage, setStage] = useState(0) // contador de instrucción ejecutada
  const [opcode, setOpcode] = useState('0000')
  const [highlight, setHighlight] = useState('') // qué caja resaltar

  const toBin = (n, bits) => (n >>> 0).toString(2).padStart(bits, '0')
  const readMem = (addr4) => mem.find(m => m.dir === addr4)?.bin ?? '00000000'

  const advance = () => {
    // parada por tamaño de programa
    if (pc >= PROGRAM_SIZE) {
      setHighlight('halt')
      return
    }

    // IMPORTANTE: decodificar SIEMPRE desde IR (no desde mem[pc] después de PC++)
    const opFromIR   = ir.slice(0, 4)
    const operFromIR = parseInt(ir.slice(4), 2) || 0
    const addrFromIR = toBin(operFromIR, 4)

    switch (steps[step]) {
      case 'memory-fetch': {
        const nextInstr = mem[pc]?.bin ?? '00000000'
        setIr(nextInstr)
        setOpcode(nextInstr.slice(0, 4))
        setHighlight('memory-fetch')
        setStep(step + 1)
        break
      }
      case 'control-unit-pc': {
        setPc(pc + 1)
        setHighlight('control-unit-pc')
        setStep(step + 1)
        break
      }
      case 'control-unit-decode': {
        setHighlight('control-unit-decode')
        // STORE no lee dato previo; LOAD/ADD/SUB sí leen
        if (opFromIR === '0010') setStep(step + 2)  // → alu-load
        else                     setStep(step + 1)  // → memory-read
        break
      }
      case 'memory-read': {
        const data = readMem(addrFromIR)
        setInVal(parseInt(data, 2))
        setHighlight('memory-read')
        setStep(step + 1)
        break
      }
      case 'alu-load': {
        setHighlight('alu-load')
        setStep(step + 1)
        break
      }
      case 'alu-execute': {
        setHighlight('alu-execute')

        if (opFromIR === '0000') {          // LOAD [k]
          setAcc(inVal)                     // usa el valor leído
          setStep(0); setStage(stage + 1)
          break
        }
        if (opFromIR === '0001') {          // ADD [k]
          setAcc(acc + inVal)
          setStep(0); setStage(stage + 1)
          break
        }
        if (opFromIR === '0011') {          // SUB [k]
          setAcc(acc - inVal)
          setStep(0); setStage(stage + 1)
          break
        }
        if (opFromIR === '0010') {          // STORE k
          const next = mem.map(m =>
            m.dir === addrFromIR ? { ...m, bin: toBin(acc, 8) } : m
          )
          setMem(next)
          setHighlight('memory-write')
          setStep(0); setStage(stage + 1)
          break
        }
        break
      }
      default: {
        setStep(0)
      }
    }
  }

  const reset = () => {
    setPc(0); setIr('00000000'); setAcc(0); setInVal(0)
    setMem(memoriaInicial); setStep(0); setStage(0)
    setOpcode('0000'); setHighlight('')
  }

  return (
    <section className="model-grid">
      <div className="col left">
        <AluBox
          acc={toBin(acc,8)}
          input={toBin(inVal,8)}
          active={['alu-load','alu-execute'].includes(highlight)}
        />
        <ControlUnit
          pc={toBin(pc,4)}
          ir={ir}
          opcode={opcode}
          active={['control-unit-pc','control-unit-decode'].includes(highlight)}
        />
      </div>

      <div className="col right">
        <DataPanel
          stepLabel={highlight === 'halt' ? 'halt' : (steps[step] ?? '—')}
          onNext={advance}
          onReset={reset}
          disabled={highlight === 'halt' || pc >= PROGRAM_SIZE}
        />
        <MemoryView
          mem={mem}
          readDir={['memory-fetch','memory-read'].includes(highlight) ? ir.slice(4) : ''}
          writeDir={highlight === 'memory-write' ? ir.slice(4) : ''}
        />
      </div>
    </section>
  )
}

