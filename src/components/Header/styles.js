import {StyleSheet} from 'react-native';
import {color, font, border} from '../../styles/base';
import params from '../../params';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    width: '100%',
    height: `${params.headerRation * 100}%`,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.primary,
    position: 'relative',
  },
  text: {
    textAlign: 'center',
    fontSize: font.md,
    fontFamily: font.primary,
  },
  textExtraSmall: {
    fontSize: font.xm,
  },
  inlineContainer: {
    flexDirection: 'row',
    width: 80,
    alignItems: 'center',
  },
  button: {
    width: 105,
    paddingVertical: 6,
    borderWidth: border.size,
    backgroundColor: color.primary,
    borderLeftColor: border.colorPrimary,
    borderTopColor: border.colorPrimary,
    borderBottomColor: border.colorSecondary,
    borderRightColor: border.colorSecondary,
  },
});
