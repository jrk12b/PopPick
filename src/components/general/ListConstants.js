// This function returns a specific title depending on the media type provided.
// - For 'Books', it returns 'Read'.
// - For 'Movies' and 'TV Shows', it returns 'Watched'.
// - For 'Video Games', it returns 'Played'.
// - If the media type does not match any of the specified cases, it defaults to 'Watched'.
export const listTitle = mediaType => {
  switch (mediaType) {
    case 'Books':
      return 'Read';
    case 'Movies':
    case 'TV Shows':
      return 'Watched';
    case 'Video Games':
      return 'Played';
    default:
      return 'Watched';
  }
};

// This function returns a specific page name string depending on the media type provided.
// - For 'Movies', it returns 'Custom Recs'.
// - For 'TV Shows', it returns 'Custom Recs TV Shows'.
// - For 'Video Games', it returns 'Custom Rec Video Games'.
// - If the media type does not match any of the specified cases, it defaults to 'Custom Recs'.
export const getPageName = mediaType => {
  switch (mediaType) {
    case 'Movies':
      return 'Custom Recs';
    case 'TV Shows':
      return 'Custom Recs TV Shows';
    case 'Video Games':
      return 'Custom Rec Video Games';
    default:
      return 'Custom Recs';
  }
};

// Function to extract a unique key from an item
// This function takes an item object and returns its unique identifier for use as a key in lists.
// - It first attempts to use the 'id' property, converting it to a string if it exists.
// - If the 'id' property is not available, it falls back to the 'key' property of the item.
export const keyExtractor = item => item.id?.toString() || item.key;
