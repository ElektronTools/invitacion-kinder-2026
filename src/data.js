// ─────────────────────────────────────────────
//  EDITA AQUÍ los datos de la invitación
// ─────────────────────────────────────────────

export const INSTITUCION = '' // opcional: nombre de la unidad educativa (déjalo vacío para ocultarlo)
export const NIVEL = 'Nivel Inicial'
export const PROMOCION = 'Promoción 2026'
export const LEMA = 'Brillando juntos hacia el futuro'

// Imágenes flotantes (niños con birrete, etc.) que aparecen mientras se baja por la página.
// Ponlas en  src/assets/decor/  (o en  decor-src/  y se optimizan solas al ejecutar npm run dev / build).
export const DECOR = {
  urls: [], // opcional: URLs externas, p. ej. de Supabase ('https://.../nino1.png')
  separacion: 780, // píxeles aprox. entre una imagen y la siguiente (más bajo = más imágenes)
}

// Video teaser (hecho en Canva). Copia el MP4 en public/teaser.mp4.
// Si el archivo no existe, la sección del teaser simplemente no se muestra.
// También puedes poner una URL completa (https://...) a un .mp4 alojado en otro sitio.
export const TEASER = {
  src: 'teaser.mp4',
  poster: 'teaser-poster.jpg', // opcional (imagen de portada)
}

export const EVENTO = {
  fechaTexto: '04 de Diciembre de 2026',
  diaSemana: 'Viernes',
  horaTexto: '16:00',
  horaSufijo: 'hrs. (4:00 p. m.)',
  // Fecha/hora exacta (zona horaria de Bolivia, UTC-4). Se usa para la cuenta regresiva.
  inicioISO: '2026-12-04T16:00:00-04:00',
  duracionHoras: 2,
  lugar: 'Av. Buenos Aires N° 4410',
  referencia: 'Lado Iglesia San Francisco de Borgan (Camino Laja)',
  zona: 'Zona Villa Yunguyo · El Alto',
  // Texto usado para abrir Google Maps
  mapsQuery: 'Av. Buenos Aires 4410, Villa Yunguyo, El Alto, Bolivia',
}

export const GRUPOS = [
  {
    id: 'A',
    titulo: 'Inicial “A”',
    alumnos: [
      'BAUTISTA LIMACHI JOSE DANIEL',
      'BLANCO YANA MAYUMI',
      'BLANCO CALLISAYA DYLAN',
      'CALLE RODRIGUEZ NICOLETH ODALIZ',
      'CALLISAYA APAZA YHOEL NEYMAR',
      'CHIPANA ACAHUANA SANTOS YOACIR',
      'CHOQUE TICONA LIA NOCOL',
      'COARICONA RIVEROS MELVIN THIAGO',
      'CONDORI MIRANDA JHON TAYRON',
      'CUCHUTA BURGOA EMIR DANIEL',
      'ESCOBAR ROJAS IAN ALELEJANDRO',
      'ESTEVEZ QUISPE HELSEY NICOL',
      'FLORES MAYTA LIAN GAEL',
      'GUTIERREZ HUALLPA SEBASTIAN ALEJANDRO',
      'LOZA ARO IAN ANDRE',
      'MAMANI ARUQUIPA GUISELA YAMILETH',
      'MAMANI LLUSCO ALESSA KAILANI',
      'MAMANI COLQUE JHIMI JUAN',
      'MAMANI VEGA IAN ISRAEL',
      'QUISPE LIMACHI SEBASTIAN STANIS',
      'QUISPE HUANCA DANA SAMARA',
      'QUISPE APAZA BORGAN JOSHUA',
      'SIRPA MUJICA YHAZIEL SARAI',
      'TANCARA QUISPE SULEMA RAQUEL',
      'ZAPATA YANA AIMEE CAMILA',
    ],
  },
  {
    id: 'B',
    titulo: 'Inicial “B”',
    alumnos: [
      'BAUTISTA POMA JHANDI NICOLETH',
      'APAZA ALEJO LUZ NICOLETH',
      'MAMANI CONDORI ALAN ANTONIO',
      'CHURA MAMANILIAN JOSEPH',
      'QUISPE SIÑANIJHAEL JOSE',
      'CHIPANA CONDORI HUGO ATTES',
      'AMARU MITA ABIGAIL',
      'SANGALI MAMANI GABRIELA YISSEL',
      'MAMANI AMARO ANDER AITOR',
      'LLUSCO NINA ZAID AMIR',
    ],
  },
]
