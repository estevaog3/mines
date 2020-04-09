import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

import style from './styles';
import Mine from '../Mine/index';
import Flag from '../Flag/index';

export default (props) => {
  const {
    isOpen,
    hasMine,
    numberOfAdjacentMines,
    hasFlag,
    position,
    isMineExploded,
    handlePress,
    handleLongPress,
  } = props;

  const fillField = () => {
    if (!isOpen) {
      return hasFlag ? <Flag doAnimation /> : null;
    }

    if (hasMine) {
      return <Mine isMineExploded={isMineExploded} />;
    } else if (numberOfAdjacentMines > 0) {
      return (
        <Text
          style={[style.label, style[`labelColor${numberOfAdjacentMines}`]]}>
          {numberOfAdjacentMines}
        </Text>
      );
    }
    return null;
  };

  return (
    <TouchableHighlight
      disabled={isOpen}
      onPress={() => handlePress(position)}
      onLongPress={() => handleLongPress(position)}>
      <View
        style={
          isOpen ? [style.field, style.opened] : [style.field, style.closed]
        }>
        {fillField()}
      </View>
    </TouchableHighlight>
  );
};
