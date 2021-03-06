let _userService = null;

class UserController {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async getUser(req, res) {
    const { id } = req.params;
    const role = await _userService.getUser(id);
    return res.send(role);
  }

  async getAllUsers(req, res) {
    const { pageSize, pageNum } = req.query;

    const roles = await _userService.getAllUsers(pageSize, pageNum);
    return res.send(roles);
  }

  async createUser(req, res) {
    const { body } = req;
    const createdUser = await _userService.createUser(body);
    return res.status(201).send(createdUser);
  }

  async updateUser(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedUser = await _userService.updateUser(id, body);
    return res.send(updatedUser);
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const deletedUser = await _userService.deleteUser(id);
    return res.send(deletedUser);
  }

  async setRoleToUser(req, res) {
    const { roleId } = req.body;
    const { userId } = req.params;

    const roleSetted = await _userService.setRoleToUser(userId, roleId);
    return res.send(roleSetted);
  }
}

module.exports = UserController;
