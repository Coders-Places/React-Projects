import mongoose from 'mongoose'


mongoose.connect("mongodb://localhost:27017/test").then(succ => console.log("connected")).catch(err => console.log(err));


const userSchema = new mongoose.Schema({
    name: { type: String, unique: false },
    email: { type: String, unique: true },
    description: { type: String, unique: false },
    phone: { type: String, unique: true }
});

let User = mongoose.models.user || mongoose.model('user', userSchema) // agar already model hua wa he? then select the collection, but if not? then create one..!


export default async function handler(req, res) {


    if (req.method === 'POST') {
        try {

            const { body } = req;

            // Returning-back the created-document to Us
            await User.create(body);

            return res.status(200).json({ success: true });

        } catch (error) {
            return res.status(404).json({ success: false, error: "duplicate values", error });
        }
    }

    // if client dosen't make POST-Request
    return res.status(404).json({ success: false, error: "kindly Send Data Through The Post-Request :(" });
}
