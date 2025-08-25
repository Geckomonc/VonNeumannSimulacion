export default function DataPanel({ stepLabel, onNext, onReset, disabled = false }) {
  return (
    <div className="card data">
      <h3>Datos requeridos</h3>
      <p><strong>Etapa:</strong> {stepLabel}</p>
      <div className="actions">
        <button className="btn primary" onClick={onNext} disabled={disabled}>Ejecutar siguiente paso</button>
        <button className="btn" onClick={onReset}>Reiniciar</button>
      </div>
    </div>
  )
}
