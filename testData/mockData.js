const mockResponseData = {
  items: [
    {
      accessInfo: [],
      etag: 'i1+uEhGrUQI',
      id: 'U_zINMa9cAA1',
      kind: 'books#volume',
      saleInfo: [],
      searchInfo: [],
      selfLink: 'https://www.googleapis.com/books/v1/volumes/U_zINMa9cAAC',
      volumeInfo: {
        allowAnonLogging: true,
        authors: ['Louis Sachar 1'],
        averageRating: 4.5,
        canonicalVolumeLink:
          'https://play.google.com/store/books/details?id=U_zINMa9cAAC',
        categories: ['Juvenile Fiction'],
        contentVersion: '2.18.12.0.preview.2',
        description: 'test description 1',
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=U_zINMa9cAAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=U_zINMa9cAAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api1',
        },
        industryIdentifiers: [
          {identifier: '9780307798367', type: 'ISBN_13'},
          {identifier: '0307798364', type: 'ISBN_10'},
        ],
        infoLink:
          'https://play.google.com/store/books/details?id=U_zINMa9cAAC&source=gbs_api',
        language: 'en',
        maturityRating: 'NOT_MATURE',
        pageCount: 251,
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        previewLink:
          'http://books.google.com/books?id=U_zINMa9cAAC&printsec=frontcover&dq=Holes&hl=&cd=1&source=gbs_api',
        printType: 'BOOK',
        publishedDate: '2011-06-01',
        publisher: 'Yearling',
        ratingsCount: 77,
        readingModes: {image: false, text: true},
        title: 'Holes 1',
      },
    },
    {
      accessInfo: [],
      etag: 'GTj7YKQQRJ4',
      id: 'VhXMGY-3610C',
      kind: 'books#volume',
      saleInfo: [],
      searchInfo: [],
      selfLink: 'https://www.googleapis.com/books/v1/volumes/VhXMGY-3610C',
      volumeInfo: {
        allowAnonLogging: true,
        authors: ['Louis Sachar 2'],
        averageRating: 4.6,
        canonicalVolumeLink:
          'https://play.google.com/store/books/details?id=U_zINMa9cAAC',
        categories: ['Juvenile Fiction'],
        contentVersion: '2.18.12.0.preview.2',
        description: 'test description 2',
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=U_zINMa9cAAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=U_zINMa9cAAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api2',
        },
        industryIdentifiers: [
          {identifier: '9780307798367', type: 'ISBN_13'},
          {identifier: '0307798364', type: 'ISBN_10'},
        ],
        infoLink:
          'https://play.google.com/store/books/details?id=U_zINMa9cAAC&source=gbs_api',
        language: 'en',
        maturityRating: 'NOT_MATURE',
        pageCount: 251,
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        previewLink:
          'http://books.google.com/books?id=U_zINMa9cAAC&printsec=frontcover&dq=Holes&hl=&cd=1&source=gbs_api',
        printType: 'BOOK',
        publishedDate: '2011-06-01',
        publisher: 'Yearling',
        ratingsCount: 77,
        readingModes: {image: false, text: true},
        title: 'Holes 2',
      },
    },
    {
      accessInfo: [],
      etag: 'xp0cP9Jkork',
      id: '1PvsZnpT6eMC',
      kind: 'books#volume',
      saleInfo: [],
      searchInfo: [],
      selfLink: 'https://www.googleapis.com/books/v1/volumes/1PvsZnpT6eMC',
      volumeInfo: {
        allowAnonLogging: true,
        authors: ['Louis Sachar 3'],
        averageRating: 4.7,
        canonicalVolumeLink:
          'https://play.google.com/store/books/details?id=U_zINMa9cAAC',
        categories: ['Juvenile Fiction'],
        contentVersion: '2.18.12.0.preview.2',
        description: 'test description 3',
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=U_zINMa9cAAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=U_zINMa9cAAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api3',
        },
        industryIdentifiers: [
          {identifier: '9780307798367', type: 'ISBN_13'},
          {identifier: '0307798364', type: 'ISBN_10'},
        ],
        infoLink:
          'https://play.google.com/store/books/details?id=U_zINMa9cAAC&source=gbs_api',
        language: 'en',
        maturityRating: 'NOT_MATURE',
        pageCount: 251,
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        previewLink:
          'http://books.google.com/books?id=U_zINMa9cAAC&printsec=frontcover&dq=Holes&hl=&cd=1&source=gbs_api',
        printType: 'BOOK',
        publishedDate: '2011-06-01',
        publisher: 'Yearling',
        ratingsCount: 77,
        readingModes: {image: false, text: true},
        title: 'Holes 3',
      },
    },
  ],
  kind: 'books#volumes',
  totalItems: 2120,
};

const mockFlattenedData = [
  {
    id: 'U_zINMa9cAA1',
    title: 'Holes 1',
    authors: ['Louis Sachar 1'],
    thumbnail:
      'http://books.google.com/books/content?id=U_zINMa9cAAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api1',
    average_rating: 4.5,
    description: 'test description 1',
  },
  {
    id: 'VhXMGY-3610C',
    title: 'Holes 2',
    authors: ['Louis Sachar 2'],
    thumbnail:
      'http://books.google.com/books/content?id=U_zINMa9cAAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api2',
    average_rating: 4.6,
    description: 'test description 2',
  },
  {
    id: '1PvsZnpT6eMC',
    title: 'Holes 3',
    authors: ['Louis Sachar 3'],
    thumbnail:
      'http://books.google.com/books/content?id=U_zINMa9cAAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api3',
    average_rating: 4.7,
    description: 'test description 3',
  },
];

module.exports = {
  mockResponseData,
  mockFlattenedData,
};
