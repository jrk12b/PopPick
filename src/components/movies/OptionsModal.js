import React from 'react';
import {View, Text, Modal, Button} from 'react-native';
import styles from '../../styles/styles';

const MovieOptionsModal = ({
  selectedMovie,
  modalVisible,
  handleCloseModal,
  handleOptionSelect,
  myList,
  likedList,
  watchedList,
}) => {
  if (!selectedMovie) {
    return null;
  }

  const isInList = list => list.some(movie => movie.id === selectedMovie.id);

  const inMyList = isInList(myList);
  const inLikedList = isInList(likedList);
  const inWatchedList = isInList(watchedList);

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      onRequestClose={handleCloseModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.movieTitle}>{selectedMovie.title}</Text>
          <Text style={styles.movieDescription}>{selectedMovie.overview}</Text>
          <Text style={styles.movieRelease}>
            Release date: {selectedMovie.release_date}
          </Text>
          <Text style={styles.movieRating}>
            Rating: {selectedMovie.vote_average}
          </Text>

          {!inMyList && !inLikedList && !inWatchedList && (
            <>
              <Button
                title="Add to My List"
                color={styles.modalButton.color}
                onPress={() => handleOptionSelect('addToMyList')}
              />
              <Button
                title="Mark as Watched"
                color={styles.modalButton.color}
                onPress={() => handleOptionSelect('addToWatched')}
              />
              <Button
                title="Mark as Liked"
                color={styles.modalButton.color}
                onPress={() => handleOptionSelect('addtoLiked')}
              />
            </>
          )}

          {inMyList && (
            <>
              <Button
                title="Remove from My List"
                color={styles.modalButton.color}
                onPress={() => handleOptionSelect('removeFromMyList')}
              />
              {!inWatchedList && (
                <Button
                  title="Mark as Watched"
                  color={styles.modalButton.color}
                  onPress={() => handleOptionSelect('addToWatched')}
                />
              )}
              {!inLikedList && (
                <Button
                  title="Mark as Liked"
                  color={styles.modalButton.color}
                  onPress={() => handleOptionSelect('addtoLiked')}
                />
              )}
            </>
          )}

          {inLikedList && (
            <>
              <Button
                title="Remove from Liked List"
                color={styles.modalButton.color}
                onPress={() => handleOptionSelect('removeFromLikedList')}
              />
              {!inWatchedList && (
                <Button
                  title="Mark as Watched"
                  color={styles.modalButton.color}
                  onPress={() => handleOptionSelect('addToWatched')}
                />
              )}
            </>
          )}

          {inWatchedList && (
            <>
              <Button
                title="Remove from Watched List"
                color={styles.modalButton.color}
                onPress={() => handleOptionSelect('removeFromWatchedList')}
              />
              {!inLikedList && (
                <Button
                  title="Mark as Liked"
                  color={styles.modalButton.color}
                  onPress={() => handleOptionSelect('addtoLiked')}
                />
              )}
              {!inMyList && (
                <Button
                  title="Add to My List"
                  color={styles.modalButton.color}
                  onPress={() => handleOptionSelect('addToMyList')}
                />
              )}
            </>
          )}

          <Button
            title="Cancel"
            color={styles.modalButton.color}
            onPress={handleCloseModal}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MovieOptionsModal;
