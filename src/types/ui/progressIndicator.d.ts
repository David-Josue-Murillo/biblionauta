// Tipos para los indicadores de progreso
export interface ProgressIndicatorProps {
  isLoading: boolean
  message?: string
  size?: 'small' | 'large'
}

export interface InlineProgressIndicatorProps {
  isLoading: boolean
  children: React.ReactNode
}
