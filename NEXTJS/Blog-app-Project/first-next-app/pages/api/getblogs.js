// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs, { readFileSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";

import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/test").then(succ => console.log("connected")).catch(err => console.log(err));


const blogSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  description: { type: String, unique: true }
});

let Blog = mongoose.models.bloging || mongoose.model('bloging', blogSchema) // agar already model hua wa he? then select the collection, but if not? then create one..!




export default async function handler(req, res) {
  console.log("assalam alaikum next-js backend"); // it would show up in the command-line (server)

  // // creating a document in mongodb with the mongoosejs
  // Blog.create({ title: "How to learn JS in 2022", description: "A programming language is any set of rules that converts strings, or graphical program elements in the case of visual programming languages, to various kinds of machine code output. Programming languages are one kind of computer language, and are used in computer programming to implement algorithms." });

  // fs.readFile("/blogdata/blog-json.json", "utf-8", (err, data) => {
  //   console.log(data, err);
  // });
  const { pageNumber, numOfBlogsOnPage } = req.query;

  console.log(pageNumber)



  let blogs = await Blog.find({});  // fetching all blogs from the Data-Base

  const totalResults = blogs.length;

  const totalBlogs = numOfBlogsOnPage * pageNumber; // Calculating the total-Blogs User Ki Demand Par, Ab Data-Base mein Itny Vlogs Hen Ya Nhi Wo baad mein Dekhty hen..

  if (totalBlogs < blogs.length)
    blogs = blogs.slice(totalBlogs - numOfBlogsOnPage, totalBlogs)

  else if (totalBlogs > blogs.length && blogs.length % numOfBlogsOnPage !== 0) {
    console.log('hh')
    blogs = blogs.slice(blogs.length - (blogs.length % numOfBlogsOnPage), blogs.length + 1)

    console.log("Remainder is Something", blogs.length % numOfBlogsOnPage)
  }

  else if (totalBlogs === blogs.length && blogs.length % numOfBlogsOnPage === 0) {

    //  if blogs.length is greater than total-required-Blogs, then slice the last-four Blogs as a response
    blogs = blogs.slice(blogs.length - numOfBlogsOnPage, blogs.length)  // slicing the last n-blogs

    console.log("Remainder is 0")
  }




  res.status(200).json({ success: true, totalResults, blogs });
}
