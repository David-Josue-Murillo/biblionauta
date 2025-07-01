import responseBooks from '../../src/mocks/results-api.json'

export function useBooks() {
    const books = responseBooks.items

    const mappedBooks = books?.map((books) => {
        return {
            id: books.id,
            title: books.volumeInfo.title,
            authors: books.volumeInfo.authors,
            description: books.volumeInfo.description,
            categories: books.volumeInfo.categories,
            imageLinks: books.volumeInfo.imageLinks,
            publishedDate: books.volumeInfo.publishedDate,
        }
    }) 

    return {books: mappedBooks}
}