export function generateUniqueKey(id: string, index: number, startIndex: number): string {
  return `${id}-${startIndex + index}`
}

export function formatAuthors(authors?: string[] | string): string {
  if (!authors) return ''
  return Array.isArray(authors) ? authors.join(', ') : authors
}

export function formatCategories(categories?: string[]): string {
  if (!categories) return ''
  return categories.join(', ')
} 