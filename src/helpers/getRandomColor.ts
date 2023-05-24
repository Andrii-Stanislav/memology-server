export const getRandomColor = () => {
  const COLORS = {
    0: '#ffc67690',
    1: '#fb8383',
    2: '#ffe485',
    3: '#e6adad',
    4: '#f9c59d',
    5: '#e1fb83',
    6: '#83fbc7',
    7: '#83bdfb',
    8: '#a983fb',
    9: '#fb83ef',
  } as { [key: number]: string };

  return COLORS?.[Math.floor(Math.random() * 10)];
};
