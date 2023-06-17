import React from "react";
import styles from "../../styles/Home.module.css";
const Blog = () => {
  const Blogs = [
    {
      blogHeading: "The JS The Best Language in the whole world",
      blogdescription:
        "Obviously This is the best language of the 2022 to learn the profitable Skills",
    },
    {
      blogHeading: "The JS The Best Language in the whole world",
      blogdescription:
        "Obviously This is the best language of the 2022 to learn the profitable Skills",
    },
    {
      blogHeading: "The JS The Best Language in the whole world",
      blogdescription:
        "Obviously This is the best language of the 2022 to learn the profitable Skills",
    },
    {
      blogHeading: "The JS The Best Language in the whole world",
      blogdescription:
        "Obviously This is the best language of the 2022 to learn the profitable Skills",
    },
    {
      blogHeading: "The JS The Best Language in the whole world",
      blogdescription:
        "Obviously This is the best   of the 2022 to learn the profitable Skills",
    },
  ];
  return (
    <>
      <div className={styles.grid}>
        <div className="blogs con">
          {Blogs.map((Blog, index) => (
            <div key={index} className="card">
              <h3>{Blog.blogHeading}</h3>
              <p>{Blog.blogdescription}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
