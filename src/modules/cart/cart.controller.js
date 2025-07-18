import { cartModel } from "../../../db/models/cart.model.js";

let getUserCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.user.id }).populate("items.product");
        if (!cart) return res.status(404).json({ message: "The cart is not found." });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error when fetching the cart items" });
    }
};

let addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await cartModel.findOne({ user: req.user.id });
        if (!cart) {
            cart = cartModel.insertOne({ user: req.user.id, items: [] });
        }
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({ product: productId, quantity: quantity || 1 });
        }
        await cart.save();
        res.json({ message: "Product added to cart!", cart });
    } catch (error) {
        res.status(500).json({ message: "An error occured when adding the product to cart." });
    }
};

let updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const cart = await cartModel.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: "Cart is not found." });
        const item = cart.items.find(item => item.product.toString() === productId);
        if (!item) return res.status(404).json({ message: "Product is not found in the cart." });
        item.quantity = quantity;
        await cart.save();
        res.status(200).json({ message: "Qunatity has beed updated successfully!", cart });
    } catch (error) {
        res.status(500).json({ message: "Error when updating the product quantity." });
    }
};

let removeFromCart = async (req, res) => {
    const { productId } = req.body;
    try {
        const cart = await cartModel.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: "Cart is not found." });
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        res.status(200).json({ message: "The product has been deleted from cart successfully!", cart });
    } catch (error) {
        res.status(500).json({ message: "Error when deleting the product from cart." });
    }
};

let clearCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: "Cart is not found." });
        cart.items = [];
        await cart.save();
        res.status(200).json({ message: "The cart has been cleared successfully!", cart });
    } catch (error) {
        res.status(500).json({ message: "Error when clearing the cart items." });
    }
};

export {
    getUserCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
}
