import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth / 3 - 20; // 3 items per row, with margin adjustments

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
    width: itemWidth,
    margin: 5,
  },
  poster: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  gridContainer: {
    paddingBottom: 20,
  },
});

export default fullListStyles;
