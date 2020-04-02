import React from 'react';
import {Image, View} from 'react-native';

import {iconWrapper, iconImage} from '../../styles/base';
import style from './styles';
import icon from '../../assets/icons/mine.png';

export default props => {
  let styleList = [iconImage];
  if (props.isMineExploded) {
    styleList.push(style.exploded);
  }
  return (
    <View style={iconWrapper}>
      <Image style={styleList} source={icon} />
    </View>
  );
};
