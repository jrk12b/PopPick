// Function to generate the appropriate title based on the media type
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

// Function to generate the appropriate page name based on the media type
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

export const keyExtractor = item => item.id?.toString() || item.key;
