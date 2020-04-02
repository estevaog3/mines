import {StyleSheet} from 'react-native';

const size = 50;

export default StyleSheet.create({
  icon: {height: size, width: size},
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: (-1 * size) / 4}, {translateY: (-1 * size) / 2}],
  },
});
