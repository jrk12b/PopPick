import React from 'react';
import {View, Text, Modal, Button} from 'react-native';
import styles from '../../styles/styles';
import CustomButton from './CustomButton';

const OptionsModal = ({
  selectedItem,
  modalVisible,
  handleCloseModal,
  handleOptionSelect,
  myList,
  likedList,
  watchedList,
  mediaType,
}) => {
  if (!selectedItem) {
    return null;
  }

  const isInList = list => list.some(item => item.id === selectedItem.id);

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
          <Text style={styles.movieTitle}>
            {mediaType === 'movies' ? selectedItem.title : selectedItem.name}
          </Text>
          {mediaType === 'movies' && (
            <>
              <Text style={styles.movieDescription}>
                {selectedItem.overview}
              </Text>
              <Text style={styles.movieRelease}>
                Release date: {selectedItem.release_date}
              </Text>
              <Text style={styles.movieRating}>
                Rating: {selectedItem.vote_average}
              </Text>
            </>
          )}

          {!inMyList && !inLikedList && !inWatchedList && (
            <>
              <CustomButton
                title="Add to My List"
                onPress={() => handleOptionSelect('addToMyList')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              <CustomButton
                title={
                  mediaType === 'movies' ? 'Mark as Watched' : 'Mark as Played'
                }
                onPress={() => handleOptionSelect('addToWatched')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              <CustomButton
                title="Mark as Liked"
                onPress={() => handleOptionSelect('addToLiked')}
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
                  title={
                    mediaType === 'movies'
                      ? 'Mark as Watched'
                      : 'Mark as Played'
                  }
                  onPress={() => handleOptionSelect('addToWatched')}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
              {!inLikedList && (
                <CustomButton
                  title="Mark as Liked"
                  onPress={() => handleOptionSelect('addToLiked')}
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
                  title={
                    mediaType === 'movies'
                      ? 'Mark as Watched'
                      : 'Mark as Played'
                  }
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
                title={
                  mediaType === 'movies'
                    ? 'Remove from Watched List'
                    : 'Remove from Played List'
                }
                onPress={() => handleOptionSelect('removeFromWatchedList')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              {!inLikedList && (
                <CustomButton
                  title="Mark as Liked"
                  onPress={() => handleOptionSelect('addToLiked')}
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

export default OptionsModal;
