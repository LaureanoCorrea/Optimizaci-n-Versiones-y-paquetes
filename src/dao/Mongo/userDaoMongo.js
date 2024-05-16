import usersModel from "./models/users.model.js";

class UserDaoMongo {
  constructor() {
    this.usersModel = usersModel;
  }

  async get() {
    return await this.usersModel.find({});
  }

  async getBy(filter) {
    return await this.usersModel.findOne(filter);
  }


  async create(newUser) {
    return await this.usersModel.create(newUser);
  }

  async update(uid, userToUpdate) {
    return await this.usersModel.updateOne({ _id: uid }, userToUpdate, {
      new: true,
    });
  }

  async delete(uid) {
    return await this.usersModel.deleteOne({ _id: uid });
  }

  async updateUserCart(userId, cid) {
    return await this.usersModel.findByIdAndUpdate(
      userId,
      { cart: cid },
      { new: true }
    );
  }
}

export default UserDaoMongo;
