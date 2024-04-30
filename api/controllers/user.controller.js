import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: " Fail to get users" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...rest } = req.body;

  if (id !== tokenUserId) {
    res.status(403).json({ message: " Not Authorized" });
  }
  let hashedPassword = null;
  try {
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...rest,
        ...(hashedPassword && { password: hashedPassword }),
        ...(avatar && { avatar }),
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: " Fail to update users" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    res.status(403).json({ message: " Not Authorized" });
  }
  res.status(200).json({ message: " User deleted" });
  try {
    await prisma.user.delete({ where: { id } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: " Fail to delete users" });
  }
};
