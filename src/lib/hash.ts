const bcrypt = require("bcryptjs");

export async function hashPassword(password: any) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: any, hashedPassword: any) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}
