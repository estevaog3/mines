import React, {Component} from 'react';
import {View, ToastAndroid, Alert, Platform} from 'react-native';

import Board from './src/components/Board/index';
import Header from './src/components/Header/index';
import Field from './src/components/Field/index';
import params from './src/params';
import {wrapper} from './src/styles/base';

const offsets = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const sendMessage = msg => {
  if (Platform.OS === 'ios') {
    Alert.alert('Attention', msg);
  } else {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  }
};

export default class App extends Component {
  handleGameOver = position => {
    const newBoard = this.state.board.map(row => {
      return row.map(field => {
        if (field.props.hasMine) {
          return (
            <Field
              {...field.props}
              isOpen
              key={`${field.props.position.i}${field.props.position.j}`}
            />
          );
        }
        return field;
      });
    });
    const {i, j} = position;
    newBoard[i][j] = (
      <Field
        {...this.state.board[i][j].props}
        isOpen
        key={`${i}${j}`}
        isMineExploded
      />
    );
    this.endGame(false);
    this.setState({board: newBoard});
  };

  doBFS = position => {
    const newBoard = this.state.board.map(row => row.slice());
    let queue = [position];
    let isVisited = [...Array(newBoard.length)].map(_ => [
      ...Array(newBoard[0].length),
    ]);
    while (queue.length > 0) {
      let {i, j} = queue.shift();
      isVisited[i][j] = true;
      if (newBoard[i][j].props.numberOfAdjacentMines === 0) {
        for (const offset of offsets) {
          if (
            i + offset[0] >= 0 &&
            i + offset[0] < newBoard.length &&
            j + offset[1] >= 0 &&
            j + offset[1] < newBoard[0].length &&
            !isVisited[i + offset[0]][j + offset[1]] &&
            !newBoard[i + offset[0]][j + offset[1]].props.isOpen &&
            !newBoard[i + offset[0]][j + offset[1]].props.hasFlag &&
            !newBoard[i + offset[0]][j + offset[1]].props.hasMine
          ) {
            queue.push({i: i + offset[0], j: j + offset[1]});
          }
        }
      }
      newBoard[i][j] = (
        <Field {...newBoard[i][j].props} isOpen key={`${i}${j}`} />
      );
    }

    this.setState({board: newBoard});
    if (this.isGameWon(newBoard)) {
      this.endGame(true);
    }
  };

  isGameWon = board => {
    let isGameWon = true;
    for (let i = 0; i < board.length && isGameWon; i++) {
      for (let j = 0; j < board[0].length && isGameWon; j++) {
        if (
          !board[i][j].props.isOpen &&
          !(board[i][j].props.hasMine && board[i][j].props.hasFlag)
        ) {
          isGameWon = false;
        }
      }
    }
    return isGameWon;
  };

  handlePress = (position) => {
    const {i, j} = position;
    if (
      this.state.gameState !== 'running' ||
      this.state.board[i][j].props.hasFlag
    ) {
      return;
    }
    if (this.state.board[i][j].props.hasMine) {
      this.handleGameOver(position);
    } else if (
      !this.state.board[i][j].props.isOpen &&
      !this.state.board[i][j].props.hasFlag
    ) {
      this.doBFS(position);
    }
  };

  handleLongPress = position => {
    if (this.state.gameState !== 'running') {
      return;
    }
    const newBoard = this.state.board.map(row => row.slice());
    let {i, j} = position;
    newBoard[i][j] = (
      <Field
        {...this.state.board[i][j].props}
        hasFlag={!this.state.board[i][j].props.hasFlag}
        key={`${i}${j}`}
      />
    );
    const countFlags = newBoard[i][j].props.hasFlag
      ? this.state.countFlags + 1
      : this.state.countFlags - 1;
    this.setState({board: newBoard, countFlags});
    if (this.isGameWon(newBoard)) {
      this.endGame(true);
    }
  };

  countAdjacentMines = (board, position) => {
    let numberOfAdjacentMines = 0;
    const {i, j} = position;
    for (const offset of offsets) {
      if (
        i + offset[0] >= 0 &&
        i + offset[0] < board.length &&
        j + offset[1] >= 0 &&
        j + offset[1] < board[0].length &&
        board[i + offset[0]][j + offset[1]].props.hasMine
      ) {
        numberOfAdjacentMines++;
      }
    }
    return numberOfAdjacentMines;
  };

  countMines = board => {
    const newBoard = board.map((row, i) => {
      return row.map((field, j) => {
        return (
          <Field
            {...field.props}
            numberOfAdjacentMines={this.countAdjacentMines(board, {i, j})}
            position={{i, j}}
            handlePress={this.handlePress}
            handleLongPress={this.handleLongPress}
            key={`${i}${j}`}
          />
        );
      });
    });
    return newBoard;
  };

  generateBoard = difficulty => {
    const proportionOfMines =
      difficulty === 'easy' ? 0.1 : difficulty === 'normal' ? 0.2 : 0.3;

    let numberOfMines = 0;
    const board = [...Array(params.getNumberOfRows())].map((_, i) => {
      return [...Array(params.getNumberOfColumns())].map((__, j) => {
        const hasMine = Math.random() < proportionOfMines ? true : false;
        if (hasMine) {
          numberOfMines++;
        }
        return <Field hasMine={hasMine} />;
      });
    });

    return {board: this.countMines(board), numberOfMines};
  };

  endGame = isWin => {
    if (isWin) {
      this.setState({gameState: 'won'});
      sendMessage('Parabéns, você venceu!');
    } else {
      this.setState({gameState: 'lose'});
      sendMessage('Que pena!');
    }
  };

  changeDifficulty = () => {
    if (this.state.difficulty === 'easy') {
      this.setState({difficulty: 'normal'});
    } else if (this.state.difficulty === 'normal') {
      this.setState({difficulty: 'hard'});
    } else {
      this.setState({difficulty: 'easy'});
    }
  };

  createNewState = difficulty => {
    return {
      ...this.generateBoard(difficulty),
      difficulty,
      gameState: 'running',
      countFlags: 0,
    };
  };

  beginNewGame = () => {
    this.setState(this.createNewState(this.state.difficulty));
  };

  state = this.createNewState('easy');

  render() {
    return (
      <View style={wrapper}>
        <Header
          numberOfRemainingFlags={
            this.state.numberOfMines - this.state.countFlags
          }
          gameState={this.state.gameState}
          beginNewGame={this.beginNewGame}
          difficulty={this.state.difficulty}
          changeDifficulty={this.changeDifficulty}
        />
        <Board board={this.state.board} />
      </View>
    );
  }
}
