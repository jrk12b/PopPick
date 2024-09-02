const mockBookResponseData = {
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

const mockFlattenedBookData = [
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

const mockSelectedBook = {
  authors: ['Simon Goldhill'],
  average_rating: 4.5,
  description:
    'An advanced critical introduction to Greek tragedy for those who do not read Greek. Combines the best contemporary scholarly analysis of the classics with a wide knowledge of contemporary literary studies in discussing the masterpieces of Athenian drama.',
  id: 'zmQKcdh4i-oC',
  thumbnail:
    'http://books.google.com/books/content?id=zmQKcdh4i-oC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  title: 'Reading Greek Tragedy',
};

const mockSelectedBookNoList = {
  authors: ['In No List'],
  average_rating: 4.2,
  description: 'Not in any list',
  id: 'zmQfdsgsfhC',
  thumbnail:
    'http://books.google.com/books/content?id=zmQKcdh4i-oC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  title: 'No List',
};

const mockSelectedBookInMyList = {
  authors: ['J.R.R. Tolkien'],
  id: 'yl4dILkcqm4C',
  thumbnail:
    'http://books.google.com/books/content?id=yl4dILkcqm4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  title: 'The Lord Of The Rings',
};

const mockSelectedBookInWatchedList = {
  authors: ['John Ronald Reuel Tolkien'],
  id: 'Jelk7EMpA7sC',
  thumbnail:
    'http://books.google.com/books/content?id=Jelk7EMpA7sC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
  title: 'The Lord of the Rings',
};

const mockSelectedBookInLikedList = {
  authors: ['J. R. R. Tolkien'],
  id: '0CFAjgEACAAJ',
  thumbnail:
    'http://books.google.com/books/content?id=0CFAjgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
  title: 'The Lord of the Rings',
};

const mockMyListBooks = [
  {
    authors: ['J.R.R. Tolkien'],
    id: 'yl4dILkcqm4C',
    thumbnail:
      'http://books.google.com/books/content?id=yl4dILkcqm4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title: 'The Lord Of The Rings',
  },
  {
    authors: ['J. R. R. Tolkien'],
    id: 'FKziXsnqLTEC',
    thumbnail:
      'http://books.google.com/books/content?id=FKziXsnqLTEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title:
      'The Lord of the Rings: The Fellowship of the Ring, The Two Towers, The Return of the King',
  },
  {
    authors: ['Simon Goldhill'],
    id: 'zmQKcdh4i-oC',
    thumbnail:
      'http://books.google.com/books/content?id=zmQKcdh4i-oC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title: 'Reading Greek Tragedy',
  },
  {
    authors: ['Tommy Orange'],
    id: 'oNY0DwAAQBAJ',
    thumbnail:
      'http://books.google.com/books/content?id=oNY0DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title: 'There There',
  },
  {
    authors: ['Homer'],
    description:
      "Homer's epic chronicle of the Greek hero Odysseus' journey home from the Trojan War has inspired writers from Virgil to James Joyce. Odysseus survives storm and shipwreck, the cave of the Cyclops and the isle of Circe, the lure of the Sirens' song and a trip to the Underworld, only to find his most difficult challenge at home, where treacherous suitors seek to steal his kingdom and his loyal wife, Penelope. Favorite of the gods, Odysseus embodies the energy, intellect, and resourcefulness that were of highest value to the ancients and that remain ideals in out time. In this new verse translation, Allen Mandelbaum--celebrated poet and translator of Virgil's Aeneid and Dante's Divine Comedy --realizes the power and beauty of the original Greek verse and demonstrates why the epic tale of The Odyssey has captured the human imagination for nearly three thousand years.",
    id: 'ORyo8qAA-CQC',
    thumbnail:
      'http://books.google.com/books/content?id=ORyo8qAA-CQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title: 'The Odyssey of Homer',
  },
  {
    authors: ['Richard Dawkins'],
    description: 'With a new epilogue to the 40th anniversary edition.',
    id: 'ekonDAAAQBAJ',
    thumbnail:
      'http://books.google.com/books/content?id=ekonDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title: 'The Selfish Gene',
  },
];

const mockLikedListBooks = [
  {
    authors: ['J. R. R. Tolkien'],
    id: '0CFAjgEACAAJ',
    thumbnail:
      'http://books.google.com/books/content?id=0CFAjgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    title: 'The Lord of the Rings',
  },
];

const mockWatchedListBooks = [
  {
    authors: ['John Ronald Reuel Tolkien'],
    id: 'Jelk7EMpA7sC',
    thumbnail:
      'http://books.google.com/books/content?id=Jelk7EMpA7sC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    title: 'The Lord of the Rings',
  },
];

module.exports = {
  mockBookResponseData,
  mockFlattenedBookData,
  mockSelectedBook,
  mockSelectedBookNoList,
  mockSelectedBookInMyList,
  mockSelectedBookInWatchedList,
  mockSelectedBookInLikedList,
  mockMyListBooks,
  mockLikedListBooks,
  mockWatchedListBooks,
};
