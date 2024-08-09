import React, {useState} from 'react';
import {Modal, View, TextInput, Button} from 'react-native';
import styles from '../../styles/styles';

const SearchPrompt = ({visible, onClose, onSearch}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
    setQuery('');
    onClose();
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   prompt: {
//     width: '80%',
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     marginBottom: 10,
//   },
// });

export default SearchPrompt;
