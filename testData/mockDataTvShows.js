const mockSelectedTvShowNoList = {
  adult: false,
  backdrop_path: '/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
  first_air_date: '2011-04-17',
  genre_ids: [10765, 18, 10759],
  id: 1111,
  name: 'No List',
  origin_country: ['US'],
  original_language: 'en',
  original_name: 'No List',
  overview:
    "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
  popularity: 1012.885,
  poster_path: '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
  vote_average: 8.454,
  vote_count: 23722,
};

const mockSelectedTvShowInMyList = {
  adult: false,
  backdrop_path: '/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
  first_air_date: '2011-04-17',
  genre_ids: [10765, 18, 10759],
  id: 1399,
  name: 'Game of Thrones',
  origin_country: ['US'],
  original_language: 'en',
  original_name: 'Game of Thrones',
  overview:
    "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
  popularity: 1012.885,
  poster_path: '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
  vote_average: 8.454,
  vote_count: 23722,
};

const mockSelectedTvShowInWatchedList = {
  adult: false,
  backdrop_path: '/ddFB0J0b3yKIyvlAnbAHWGWxnCJ.jpg',
  first_air_date: '2024-08-13',
  genre_ids: [10764],
  id: 241492,
  name: 'Estrela da Casa',
  origin_country: ['BR'],
  original_language: 'pt',
  original_name: 'Estrela da Casa',
  overview: '',
  popularity: 2773.946,
  poster_path: '/i8HkMKyuZ13i8xpMW3ZmdTXYOL0.jpg',
  vote_average: 2,
  vote_count: 1,
};

const mockSelectedTvShowInLikedList = {
  adult: false,
  backdrop_path: '/96RT2A47UdzWlUfvIERFyBsLhL2.jpg',
  first_air_date: '2023-09-29',
  genre_ids: [16, 18, 10759, 10765],
  id: 423438,
  name: 'Liked List tv show',
  origin_country: ['JP'],
  original_language: 'ja',
  original_name: 'Liked List tv show',
  overview:
    'After the party of heroes defeated the Demon King, they restored peace to the land and returned to lives of solitude. Generations pass, and the elven mage Frieren comes face to face with humanity’s mortality. She takes on a new apprentice and promises to fulfill old friends’ dying wishes. Can an elven mind make peace with the nature of life and death? Frieren embarks on her quest to find out.',
  popularity: 304.878,
  poster_path: '/dqZENchTd7lp5zht7BdlqM7RBhD.jpg',
  vote_average: 8.896,
  vote_count: 254,
};

const mockMyListTvShows = [
  {
    adult: false,
    backdrop_path: '/96RT2A47UdzWlUfvIERFyBsLhL2.jpg',
    first_air_date: '2023-09-29',
    genre_ids: [16, 18, 10759, 10765],
    id: 209867,
    name: "Frieren: Beyond Journey's End",
    origin_country: ['JP'],
    original_language: 'ja',
    original_name: '葬送のフリーレン',
    overview:
      'After the party of heroes defeated the Demon King, they restored peace to the land and returned to lives of solitude. Generations pass, and the elven mage Frieren comes face to face with humanity’s mortality. She takes on a new apprentice and promises to fulfill old friends’ dying wishes. Can an elven mind make peace with the nature of life and death? Frieren embarks on her quest to find out.',
    popularity: 304.878,
    poster_path: '/dqZENchTd7lp5zht7BdlqM7RBhD.jpg',
    vote_average: 8.896,
    vote_count: 254,
  },
  {
    adult: false,
    backdrop_path: '/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
    first_air_date: '2011-04-17',
    genre_ids: [10765, 18, 10759],
    id: 1399,
    name: 'Game of Thrones',
    origin_country: ['US'],
    original_language: 'en',
    original_name: 'Game of Thrones',
    overview:
      "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
    popularity: 1012.885,
    poster_path: '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
    vote_average: 8.454,
    vote_count: 23722,
  },
];

const mockLikedListTvShows = [
  {
    adult: false,
    backdrop_path: '/96RT2A47UdzWlUfvIERFyBsLhL2.jpg',
    first_air_date: '2023-09-29',
    genre_ids: [16, 18, 10759, 10765],
    id: 423438,
    name: 'Liked List tv show',
    origin_country: ['JP'],
    original_language: 'ja',
    original_name: 'Liked List tv show',
    overview:
      'After the party of heroes defeated the Demon King, they restored peace to the land and returned to lives of solitude. Generations pass, and the elven mage Frieren comes face to face with humanity’s mortality. She takes on a new apprentice and promises to fulfill old friends’ dying wishes. Can an elven mind make peace with the nature of life and death? Frieren embarks on her quest to find out.',
    popularity: 304.878,
    poster_path: '/dqZENchTd7lp5zht7BdlqM7RBhD.jpg',
    vote_average: 8.896,
    vote_count: 254,
  },
];

const mockWatchedListTvShows = [
  {
    adult: false,
    backdrop_path: '/ddFB0J0b3yKIyvlAnbAHWGWxnCJ.jpg',
    first_air_date: '2024-08-13',
    genre_ids: [10764],
    id: 241492,
    name: 'Estrela da Casa',
    origin_country: ['BR'],
    original_language: 'pt',
    original_name: 'Estrela da Casa',
    overview: '',
    popularity: 2773.946,
    poster_path: '/i8HkMKyuZ13i8xpMW3ZmdTXYOL0.jpg',
    vote_average: 2,
    vote_count: 1,
  },
  {
    adult: false,
    backdrop_path: '/9faGSFi5jam6pDWGNd0p8JcJgXQ.jpg',
    first_air_date: '2008-01-20',
    genre_ids: [18, 80],
    id: 1396,
    name: 'Breaking Bad',
    origin_country: ['US'],
    original_language: 'en',
    original_name: 'Breaking Bad',
    overview:
      "Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
    popularity: 646.256,
    poster_path: '/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
    vote_average: 8.913,
    vote_count: 14060,
  },
];

const mockPosterTvShowItem = {
  adult: false,
  backdrop_path: '/l0qVZIpXtIo7km9u5Yqh0nKPOr5.jpg',
  first_air_date: '1994-09-22',
  genre_ids: [35],
  id: 1668,
  media_type: 'tv',
  name: 'Friends',
  origin_country: ['US'],
  original_language: 'en',
  original_name: 'Friends',
  overview:
    'Six young people from New York City, on their own and struggling to survive in the real world, find the companionship, comfort and support they get from each other to be the perfect antidote to the pressures of life.',
  popularity: 647.429,
  poster_path: '/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg',
  vote_average: 8.436,
  vote_count: 7910,
  coverImageUrl:
    'https://image.tmdb.org/t/p/w500/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg',
};

module.exports = {
  mockSelectedTvShowNoList,
  mockSelectedTvShowInMyList,
  mockSelectedTvShowInWatchedList,
  mockSelectedTvShowInLikedList,
  mockMyListTvShows,
  mockLikedListTvShows,
  mockWatchedListTvShows,
  mockPosterTvShowItem,
};
