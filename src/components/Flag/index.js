import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';

import {iconWrapper, iconImage} from '../../styles/base';
import icon from '../../assets/icons/flag.png';

export default ({doAnimation}) => {
  const sizeAnim = useRef(new Animated.Value(6)).current;
  let styleList = [iconImage];
  if (doAnimation) {
    styleList.push({transform: [{scale: sizeAnim}]});
  }

  useEffect(() => {
    if (doAnimation) {
      Animated.timing(sizeAnim, {
        toValue: 1,
        duration: 200,
      }).start();
    }
  });

  return (
    <View style={iconWrapper}>
      <Animated.Image style={styleList} source={icon} />
    </View>
  );
};
