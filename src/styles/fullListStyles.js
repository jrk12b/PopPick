import {StyleSheet} from 'react-native';

const fullListStyles = StyleSheet.create({
  FlatList: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  text: {
    color: 'white',
  },
  movieContainer: {
    flex: 1,
    margin: 5,
  },
  poster: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    marginTop: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  gridContainer: {
    paddingBottom: 20,
  },
});

export default fullListStyles;
