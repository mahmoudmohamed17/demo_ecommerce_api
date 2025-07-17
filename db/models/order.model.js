import mongoose, { model, Schema } from "mongoose";

const orderSchema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        products: [
            {
                product: {
                    type: mongoose.Types.ObjectId,
                    ref: "Product",
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        shippingAddress: {
            fullName: String,
            city: String,
            country: String,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const orderModel = model("Order", orderSchema);
