import { orderService } from "../services/index.js";

class OrdersController {
    constructor() {
        this.service = orderService
    }

    getOrders = async (req, res) => {
        try {
            const result = await this.service.getOrders();
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    getOrderById = async (req, res) => {
        try {
            const result = await this.service.getOrderById(req.params.oid);
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    createOrder = async (req, res) => {
        try {
            const result = await this.service.createOrder(ticketData);
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    updateOrder = async (req, res) => {
        try {
            const result = await this.service.updateOrder(req.params.oid, req.body);
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    deleteOrder = async (req, res) => {
        try {
            const result = await this.service.deleteOrder(req.params.oid);
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

}

export default OrdersController