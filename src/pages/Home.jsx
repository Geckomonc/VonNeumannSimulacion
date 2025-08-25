export default function Home() {
  return (
    <section className="container">
      <h1>¿Qué es la máquina de Von Neumann?</h1>
      <p>
        Es un modelo de arquitectura con memoria unificada donde el programa y los datos
        comparten espacio. El ciclo clásico es: <strong>Fetch → Decode → Execute</strong>.
      </p>
      <ul className="bullets">
        <li>Unidad de control (PC/IR)</li>
        <li>Memoria (direcciones y datos)</li>
        <li>ALU (acumulador/entrada)</li>
      </ul>
    </section>
  )
}
