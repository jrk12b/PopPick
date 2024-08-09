import React, {useState} from 'react';
import {Modal, View, TextInput, Button} from 'react-native';
import styles from '../../styles/styles';

const SearchPrompt = ({visible, onClose, onSearch}) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (query.trim()) {
      // Construct the API URL with the search query
      const apiKey = '15979629ea6e558ef491c9b9ccee0043';
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        query,
      )}`;

      try {
        // Make the API request
        const response = await fetch(url);
        const data = await response.json();

        // Pass the fetched data to onSearch
        onSearch(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      setQuery('');
      onClose();
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.modalInput}
            placeholder="Search movies..."
            placeholderTextColor={styles.modalInput.color}
            value={query}
            onChangeText={setQuery}
          />
          <Button
            title="Search"
            color={styles.modalButton.color}
            onPress={handleSearch}
          />
          <Button
            title="Cancel"
            color={styles.modalButton.color}
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SearchPrompt;
