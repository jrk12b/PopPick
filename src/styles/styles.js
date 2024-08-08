import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#595959',
    padding: 10,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FBF4F4',
    marginBottom: 10,
  },
  movieContainer: {
    marginBottom: 20,
    marginRight: 10,
  },
  poster: {
    width: 100,
    height: 150,
  },
  title: {
    color: '#FBF4F4',
    marginTop: 5,
  },
  text: {
    color: '#FBF4F4',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#454545',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000', // iOS shadow color
    shadowOffset: {width: 0, height: 2}, // iOS shadow offset
    shadowOpacity: 0.3, // iOS shadow opacity
    shadowRadius: 4, // iOS shadow radius
    elevation: 5, // Android shadow/elevation
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FBF4F4',
    textAlign: 'center',
  },
  modalButton: {
    color: '#FBF4F4',
  },
});

export default styles;
