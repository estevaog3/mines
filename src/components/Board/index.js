import React from 'react';
import {View} from 'react-native';

import style from './styles';

export default ({board}) => {
  return (
    <View style={style.container}>
      <View style={style.board}>{board}</View>
    </View>
  );
};
