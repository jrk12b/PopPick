import React from 'react';
import {View, Text, Modal, Button} from 'react-native';
import styles from '../../styles/styles';
import CustomButton from '../CustomButton';

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
              <CustomButton
                title="Add to My List"
                onPress={() => handleOptionSelect('addToMyList')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              <CustomButton
                title="Mark as Watched"
                onPress={() => handleOptionSelect('addToWatched')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              <CustomButton
                title="Mark as Liked"
                onPress={() => handleOptionSelect('addtoLiked')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
            </>
          )}

          {inMyList && (
            <>
              <CustomButton
                title="Remove from My List"
                onPress={() => handleOptionSelect('removeFromMyList')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              {!inWatchedList && (
                <CustomButton
                  title="Mark as Watched"
                  onPress={() => handleOptionSelect('addToWatched')}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
              {!inLikedList && (
                <CustomButton
                  title="Mark as Liked"
                  onPress={() => handleOptionSelect('addtoLiked')}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
            </>
          )}

          {inLikedList && (
            <>
              <CustomButton
                title="Remove from Liked List"
                onPress={() => handleOptionSelect('removeFromLikedList')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              {!inWatchedList && (
                <CustomButton
                  title="Mark as Watched"
                  onPress={() => handleOptionSelect('addToWatched')}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
            </>
          )}

          {inWatchedList && (
            <>
              <CustomButton
                title="Remove from Watched List"
                onPress={() => handleOptionSelect('removeFromWatchedList')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              {!inLikedList && (
                <CustomButton
                  title="Mark as Liked"
                  onPress={() => handleOptionSelect('addtoLiked')}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
              {!inMyList && (
                <CustomButton
                  title="Add to My List"
                  onPress={() => handleOptionSelect('addToMyList')}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
            </>
          )}

          <Button
            title="Cancel"
            color={styles.text.color}
            onPress={handleCloseModal}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MovieOptionsModal;
