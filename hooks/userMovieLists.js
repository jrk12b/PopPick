import {useState} from 'react';

const useMovieLists = () => {
  const [myList, setMyList] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);

  const handleAddToMyList = movie => {
    setMyList(prevList =>
      prevList.find(item => item.id === movie.id)
        ? prevList.filter(item => item.id !== movie.id)
        : [...prevList, movie],
    );
  };

  const handleAddToLiked = movie => {
    setLikedList(prevList =>
      prevList.find(item => item.id === movie.id)
        ? prevList.filter(item => item.id !== movie.id)
        : [...prevList, movie],
    );
  };

  const handleAddToWatched = movie => {
    setWatchedList(prevList =>
      prevList.find(item => item.id === movie.id)
        ? prevList.filter(item => item.id !== movie.id)
        : [...prevList, movie],
    );
    setMyList(prevList => prevList.filter(item => item.id !== movie.id));
  };

  return {
    myList,
    likedList,
    watchedList,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  };
};

export default useMovieLists;
