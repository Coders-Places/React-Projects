import mongoose from 'mongoose'
mongoose.connect("mongodb://localhost:27017/test");



let Blog = mongoose.models.bloging || mongoose.model('bloging', blogSchema) // agar already model hua wa he? then select the collection, but if not? then create one..!



export default async function handler(req, res) {

    req.method = "POST";
    console.log(req.query.blogId)   // Blog-ID is Sent By The Client.., and we are receiving the Blog-ID in the backend

    // Now, we got the blog-mongoose-id, so let's find the document the document and send it to the client as response
    const { blogId } = req.query;

    try {
        const blog = await Blog.findById(blogId)    // fetching that particular, having the same blog-id
        return res.status(200).json({ sucess: true, blog });
    } catch (err) {
        return res.status(404).json({ success: false, message: "internal server error blog not found" });
    }





}