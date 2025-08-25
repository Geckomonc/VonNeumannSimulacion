export default function MemoryView({ mem, readDir = '', writeDir = '' }) {
  return (
    <div className="card memory">
      <h3>Memoria</h3>
      <table className="mem-table">
        <thead><tr><th>Dir</th><th>Contenido</th></tr></thead>
        <tbody>
          {mem.map((m) => {
            const cls =
              m.dir === writeDir ? 'row-write' :
              m.dir === readDir  ? 'row-read'  : '';
            return (
              <tr key={m.dir} className={cls}>
                <td>{m.dir}</td>
                <td>{m.bin}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
