
import connectToDB from "../../middleware/db";
import Product from "../../models/Product";

const handler = async (req, res) => {

    if (req.method != "POST") return res.status(400).send({ error: "bad request" })



    const Products = req.body;


    try {

        for (const item of Products) {
            const {
                productTitle,
                slug,
                productDescription,
                productImgURL,
                productCategory,
                size,
                color,
                productPrice,
                productStockQuantity
            } = item;

            const product = new Product({
                productTitle,
                slug,
                productDescription,
                productImgURL,
                productCategory,
                size,
                color,
                productPrice,
                productStockQuantity
            });
            await product.save();
        }
    } catch (error) {
        res.status(500).send({ error, message: "duplicate Values" })
    }




    res.send({ success: true })


}
export default connectToDB(handler);