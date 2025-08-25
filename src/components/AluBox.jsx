export default function AluBox({ acc, input, active }) {
  return (
    <div className={`card alu ${active ? 'active' : ''}`}>
      <h3>ALU</h3>
      <p><strong>Acumulador:</strong> {acc}</p>
      <p><strong>Entrada:</strong> {input}</p>
    </div>
  )
}
