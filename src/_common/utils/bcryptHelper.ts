import * as bcrypt from 'bcrypt';
export const hashPass = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const bcryptCheckPass = async (
  userPassword: string,
  hashedPass: string,
): Promise<boolean> => {
  return await bcrypt.compare(userPassword, hashedPass);
};
