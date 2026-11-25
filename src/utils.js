import { EVENTO, LEMA, PROMOCION, NIVEL } from './data.js'

// Quita tildes y pasa a minúsculas (para el buscador)
export const normalizar = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export const mapsUrl = () =>
  'https://maps.app.goo.gl/QLPYmHXw8ghrcCj68'

export const whatsappUrl = () => {
  const texto =
    `🎓✨ ¡Estás invitado a la graduación de ${NIVEL} · ${PROMOCION}!\n` +
    `«${LEMA}»\n\n` +
    `📅 ${EVENTO.diaSemana} ${EVENTO.fechaTexto}\n` +
    `🕓 ${EVENTO.horaTexto} hrs.\n` +
    `📍 ${EVENTO.lugar}, ${EVENTO.referencia}, ${EVENTO.zona}\n\n` +
    `Mira la invitación: ${typeof location !== 'undefined' ? location.href.split('#')[0] : ''}`
  return `https://wa.me/?text=${encodeURIComponent(texto)}`
}

