import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

export const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, salt);
};

export const comparePassword = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};
