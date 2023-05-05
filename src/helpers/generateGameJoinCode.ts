const makeRandomFigure = () => Math.floor(Math.random() * 10) + 1;

const GAME_JOIN_CODE_LENGTH = 6;

export const generateGameJoinCode = () =>
  new Array(GAME_JOIN_CODE_LENGTH).fill(0).map(makeRandomFigure).join('');
