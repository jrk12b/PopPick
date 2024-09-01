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
