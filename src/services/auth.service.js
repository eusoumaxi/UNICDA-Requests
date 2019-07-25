const { JwtHelper } = require("../helpers");

let _userService = null;

class AuthService {
  constructor({ UserService }) {
    _userService = UserService;
  }
  async signUp(user) {
    const { username } = user;
    const userExists = await _userService.getUserByUsername(username);

    if (userExists) {
      const error = new Error();
      error.status = 401;
      error.message = "User already exists";
      throw error;
    }

    return await _userService.createUser(user);
  }

  async signIn(user) {
    const { username, password } = user;

    const userExits = await _userService.getUserByUsername(username);

    if (!userExits) {
      const error = new Error();
      error.status = 404;
      error.message = "Username does not exists";
      throw error;
    }

    const validPassword = userExits.comparePasswords(password);

    if (!validPassword) {
      const error = new Error();
      error.status = 401;
      error.message = "Invalid password";
      throw error;
    }

    const encodeUser = {};
    encodeUser.role = userExits.roles.map(role => role.name);
    encodeUser.username = userExits.username;
    encodeUser.id = userExits._id;

    const token = JwtHelper.generateToken(encodeUser);

    return token;
  }
}

module.exports = AuthService;