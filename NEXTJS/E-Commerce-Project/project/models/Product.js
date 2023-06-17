import { model, models, Schema } from "mongoose";


// Schema For the Particular Product  
const productSchema = new Schema({
    productTitle: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    productDescription: { type: String, required: true },
    productImgURL: { type: String, required: true },
    productCategory: { type: String, required: true },

    size: { type: String },
    color: { type: String },

    productPrice: { type: Number, required: true },
    productStockQuantity: { type: Number, required: true }

}, { timestamps: true });


const Product = models.Product || model('Product', productSchema); // agar already model hua wa he? then select the collection, but if not? then create one..!

export default Product;