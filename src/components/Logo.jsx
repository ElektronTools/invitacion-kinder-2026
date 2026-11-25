// Emblema institucional sin aro decorativo exterior.
export default function Logo() {
  return (
    <div className="logo-wrap">
      <img
        className="logo"
        src="/logo-colegio-pro.png"
        alt="Escudo de la Unidad Educativa Yunguyo Fe y Alegría A11"
        width="240"
        height="240"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  )
}
