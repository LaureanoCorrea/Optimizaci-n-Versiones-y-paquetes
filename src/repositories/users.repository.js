import UserDto from "../dto/userDto.js";

class UserRepository {
  constructor(userDao) {
    this.dao = userDao;
  }

  getUsers = async (filter) => {
    return await this.dao.get(filter);
  };

  getUser = async (query) => {
    try {
      const user = await this.dao.getBy(query);
      return user;
    } catch (error) {
      throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
  };

  createUser = async (newUser) => {
    try {
      const newUserDto = new UserDto(newUser);
      return await this.dao.create(newUserDto);
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  };

  getUserById = async (uid) => {
    try {
      return await this.dao.getBy({ _id: uid });
    } catch (error) {
      throw new Error(`Error al obtener el usuario por ID: ${error.message}`);
    }
  };

   updateUser = async (uid, userToUpdate) => {
    try {
      await this.dao.update({ _id: uid }, userToUpdate);
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
  }

   updateUserCart = async (uid, cid) => {
    try {
      await this.dao.updateUserCart(uid, cid);
    } catch (error) {
      throw new Error(`Error al actualizar el carrito del usuario: ${error.message}`);
    }
  }

  deleteUser = async (uid) => {
    try {
      await this.dao.delete({ _id: uid });
    } catch (error) {
      throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
  };
}

export default UserRepository;
