import { User } from "../entities/User";
import { genPassword, issueJWT, validPassword } from "../utils/utils";
import { Role } from "../entities/User";
import { Student } from "../entities/Student";

class UserController {
  register = async (data: {
    registration_number: string;
    password: string;
    role: Role;
  }): Promise<User> => {
    const { registration_number, password, role } = data;

    const { salt, hash } = genPassword(password);
    const user = User.create({
      registration_number,
      hash,
      salt,
      role,
    });

    const student = await Student.findOneBy({ id: registration_number });
    if (student) {
      user.student = student;
    }

    await user.save();
    return user;
  };

  login = async (data: { registration_number: string; password: string }) => {
    const { registration_number, password } = data;

    const user = await User.findOneBy({ registration_number });
    if (!user) {
      throw new Error("User not found");
    }

    if (!validPassword(password, user.hash, user.salt)) {
      throw new Error("Invalid credentials");
    }

    const token = issueJWT(user);
    return { token };
  };
}

export default UserController;
