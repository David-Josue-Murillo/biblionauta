// Helper para formatear fecha de lectura
export function formatRecentBookDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric',
  })
}
