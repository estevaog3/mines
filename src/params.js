import {Dimensions} from 'react-native';

export default {
  blockSize: 35,
  headerRation: 0.2,
  getNumberOfColumns() {
    const width = Dimensions.get('window').width;
    return Math.floor(width / this.blockSize);
  },
  getNumberOfRows() {
    const height = Dimensions.get('window').height - 20; // the height is decreased to consider the status bar height
    return Math.floor((height * (1 - this.headerRation)) / this.blockSize);
  },
};
