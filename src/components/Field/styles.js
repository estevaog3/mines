import {StyleSheet} from 'react-native';
import params from '../../params';
import {color, border, font} from '../../styles/base';

export default StyleSheet.create({
  field: {
    width: params.blockSize,
    height: params.blockSize,
    borderWidth: border.size,
  },
  opened: {
    backgroundColor: color.primary,
    borderColor: color.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closed: {
    backgroundColor: color.primary,
    borderLeftColor: border.colorPrimary,
    borderTopColor: border.colorPrimary,
    borderBottomColor: border.colorSecondary,
    borderRightColor: border.colorSecondary,
  },
  label: {
    fontSize: font.sm,
    fontFamily: font.primary,
    position: 'relative',
    left: 1,
  },
  labelColor1: {
    color: '#00f',
  },
  labelColor2: {
    color: '#007b00',
  },
  labelColor3: {
    color: '#f00',
  },
  labelColor4: {
    color: '#00007b',
  },
  labelColor5: {
    color: '#7b0000',
  },
  labelColor6: {
    color: '#007b7b',
  },
  labelColor7: {
    color: '#000',
  },
  labelColor8: {
    color: '#7b7b7b',
  },
});
