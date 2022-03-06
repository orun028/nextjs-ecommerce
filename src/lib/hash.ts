import bcrypt from "bcryptjs";

export async function hashPassword(password: any) {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: any, hashedPassword: any) {
  return await bcrypt.compare(password, hashedPassword);
}
