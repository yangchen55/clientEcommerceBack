export const numString = (length) => {
  let num = "";

  for (let i = 0; i < length; i++) {
    num += Math.floor(Math.random() * 10);
  }

  return num;
};
