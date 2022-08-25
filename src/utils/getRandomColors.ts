export const getRandomColor = (): string => {
  const colors = [
    '#6867AC',
    '#A267AC',
    '#CE7BB0',
    '#D77FA1',
    '#99A799',
    '#87AAAA',
    '#716F81',
    '#6D8299',
    '#8E7F7F',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};
