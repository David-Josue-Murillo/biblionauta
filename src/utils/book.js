import { googleBooksApi } from "../api/googleBooksApi";

export function stripHtmlTags(htmlString) {
    if (!htmlString) return "";
    return htmlString.replace(/<[^>]*>/g, '');
}

export async function getBookDetails(id) {
    const response = await googleBooksApi.get(`volumes/${id}`);
    const data = response.data;

    const volume = data.volumeInfo || {};

    return {
        id: data.id,
        title: volume.title || "Sin título",
        subtitle: volume.subtitle || "",
        authors: volume.authors || ["Autor desconocido"],
        language: volume.language || "N/A",
        description: volume.description || "Sin descripción",
        categories: volume.categories || [],
        image: volume.imageLinks?.thumbnail || volume.imageLinks?.smallThumbnail || "",
        rating: volume.averageRating || 0,
        ratingsCount: volume.ratingsCount || 0,
        publishedDate: volume.publishedDate || "",
    };
}