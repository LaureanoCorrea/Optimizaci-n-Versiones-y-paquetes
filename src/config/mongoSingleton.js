import mongoose from "mongoose"

class MongoSingleton {
    static #instance
    constructor() {
       mongoose.connect(process.env.MONGO_URL);
    }
    static getInstance() {
        if(this.#instance) {
            console.log("Ya existe una instancia de MongoSingleton")
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        console.log("Se ha creado una nueva instancia de MongoSingleton")
        return this.#instance
    }
}
export default MongoSingleton