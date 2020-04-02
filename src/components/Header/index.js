import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import style from './styles';
import Emoji from '../Emoji/index';
import Flag from '../Flag/index';

export default ({
  gameState,
  difficulty,
  changeDifficulty,
  beginNewGame,
  numberOfRemainingFlags,
}) => {
  const handleEmojiPress = () => {
    beginNewGame();
  };

  return (
    <View style={style.container}>
      <View style={style.inlineContainer}>
        <Flag />
        <Text style={style.text}>{numberOfRemainingFlags}</Text>
      </View>
      <Emoji gameState={gameState} handleEmojiPress={handleEmojiPress} />
      <TouchableOpacity onPress={changeDifficulty}>
        <View style={style.button}>
          <Text style={[style.text, style.textExtraSmall]}>{difficulty}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
