export default function ControlUnit({ pc, ir, opcode, active }) {
  return (
    <div className={`card control ${active ? 'active' : ''}`}>
      <h3>Unidad de control</h3>
      <p><strong>Cont. Programa:</strong> {pc}</p>
      <p><strong>Reg. Instrucción:</strong> {ir}</p>
      <p><strong>Opcode:</strong> {opcode}</p>
    </div>
  )
}
