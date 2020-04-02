import {StyleSheet} from 'react-native';

import params from '../../params';
import {color} from '../../styles/base';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: `${(1 - params.headerRation) * 100}%`,
    alignItems: 'center',
    backgroundColor: color.primary,
  },
  board: {
    width: params.getNumberOfColumns() * params.blockSize,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
