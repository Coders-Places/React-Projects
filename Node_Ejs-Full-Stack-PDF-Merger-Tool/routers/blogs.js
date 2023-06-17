const express = require("express");
const router = express.Router();

router.get("/getblogs", (req, res) => {
  return res.json({ AllBlogs: true });
});

router.post("/addblogs", (req, res) => {
  return res.json({ AddBlog: true });
});

module.exports = router;
