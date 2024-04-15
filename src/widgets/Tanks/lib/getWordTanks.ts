export const getWordTanks = (quantity: number) => {
  let wordTanks;

  const numberTanks = quantity > 10 && quantity < 20
    ? quantity.toString()
    : quantity.toString().slice(-1);

  switch (numberTanks) {
    case '1':
      wordTanks = 'танк';
      break;
    case '2':
    case '3':
    case '4':
      wordTanks = 'танка';
      break;
    default:
      wordTanks = 'танков';
      break;
  }

  return wordTanks;
};
