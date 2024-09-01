/**
 * Function to flatten and extract relevant data from a book API response.
 *
 * This function processes an array of book data items, typically returned from an API,
 * and maps them into a simplified structure with only the necessary fields.
 *
 * @param {Object} data - The data object containing an array of book items.
 * @returns {Array} - An array of flattened book objects with selected properties.
 *
 * The function extracts and returns the following properties for each book:
 * - id: The unique identifier for the book.
 * - title: The title of the book.
 * - authors: An array of authors of the book.
 * - thumbnail: The URL of the book's thumbnail image (if available).
 * - average_rating: The average rating of the book (if available).
 * - description: A brief description of the book (if available).
 */
const flattenData = data => {
  return data.items.map(item => ({
    id: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors,
    thumbnail: item.volumeInfo.imageLinks?.thumbnail,
    average_rating: item.volumeInfo.averageRating,
    description: item.volumeInfo.description,
  }));
};

export default flattenData;
