import React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';

import style from './styles';
import regular from '../../assets/icons/emoji-regular.png';
import lose from '../../assets/icons/emoji-lose.png';
import win from '../../assets/icons/emoji-win.png';

const icons = {regular, lose, win};

export default ({gameState, handleEmojiPress}) => {
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={handleEmojiPress}>
        <Image
          source={
            gameState === 'running'
              ? icons.regular
              : gameState === 'won'
              ? icons.win
              : icons.lose
          }
          style={style.icon}
        />
      </TouchableOpacity>
    </View>
  );
};
