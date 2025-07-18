import { orderModel } from "../../../db/models/order.model.js";

let createOrder = async (req, res) => {
    const { products, shippingAddress } = req.body;
    try {
        if (!products || products.length === 0) {
            return res.status(400).json({ message: "There's no products found." });
        }
        let totalPrice = 0;
        for (const item of products) {
            const dbProduct = await orderModel.findById(item.product);
            if (!dbProduct) {
                return res.status(404).json({ message: "Product is not found" });
            }
            totalPrice += dbProduct.price * (item.quantity || 1);
        }
        const order = await orderModel.insertOne(
            {
                products: products,
                shippingAddress: shippingAddress,
                totalPrice: totalPrice,
            }
        );
        res.status(201).json({ message: "Order has been created successfully!", order: order });

    } catch (error) {
        res.status(500).json({ message: "Error occured when creating the order.", error });
    }
};

let getUserOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.user.id }).populate("products.product");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error occured when fetching the orders" });
    }
};

let getOrderById = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id).populate("products.product");
        if (!order) return res.status(404).json({ message: "Order not found." });
        if (order.user.toString() !== req.user.id)
            return res.status(403).json({ message: "You're not allowed to access this order." });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error occured when fetching order details." });
    }
};

export {
    createOrder,
    getUserOrders,
    getOrderById,
};
