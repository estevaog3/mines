import React from 'react';
import {View, Image} from 'react-native';

import {iconWrapper, iconImage} from '../../styles/base';
import icon from '../../assets/icons/flag.png';

export default () => {
  return (
    <View style={iconWrapper}>
      <Image style={iconImage} source={icon} />
    </View>
  );
};
