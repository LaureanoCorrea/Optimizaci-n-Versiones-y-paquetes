import usersModel from "../models/users.model.js";
import cartsModel from "../models/carts.model.js";

class UserManagerMongo {
  constructor() {
    this.usersModel = usersModel;
  }

  async getUsers() {
    return await this.usersModel.find({});
  }

  async getUser(filter) {
    return await this.usersModel.findOne(filter);
  }

  async getUserBy(query) {
    return await this.usersModel.findOne(query);
  }

  async getUserCartBy(userId) {
    try {
      const user = await this.usersModel
        .findOne({ _id: userId })
        .select("cart")
        .exec();
      if (!user) {
        throw new Error("User not found");
      }
      return user.cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUsers(newUser) {
    try {
      const user = await this.usersModel.create(newUser);
      return user;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  async updateUser(uid, newData) {
    try {
      return await this.usersModel.updateOne({ _id: uid }, newData);
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async deleteUser(uid) {
    return await this.usersModel.deleteOne({ _id: uid });
  }

  async updateUserCart(userId, cartId) {
    try {
      const updatedUser = await this.usersModel.findByIdAndUpdate(
        userId,
        { cart: cartId },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }

      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user's cart: ${error.message}`);
    }
  }
}

export default UserManagerMongo;