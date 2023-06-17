import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
const slug = (props) => {
  const router = useRouter();
  const [SingleBlog, setSingleBlog] = useState(props.json);
  // in most of the sceneorios, ham slug ko bahir nikal kar api-call lagainGy and then response client ko serve Karwayngy.. :D



  console.log(router.isReady)

  // // this is useful when we don't use server-side-rendering
  // if (!router.isReady) return;
  // const { blog } = router.query;


  // API-Call to fetch the single blog, corresponding the given-id, 
  // const fetchOneBlogBySlugID = async () => {

  //   console.log(json)
  //   setSingleBlog(json);
  // }

  // useEffect(() => {
  //   fetchOneBlogBySlugID();
  // }, []);


  return (
    SingleBlog && <>
      <div>
        <h1 style={{ textCenter: "center" }}>Mr. Blogger</h1>
        <h3>{SingleBlog.blog.title}</h3>

        <h4>Introduction:-</h4>
        <p>{SingleBlog.blog.description}
        </p>

      </div>
    </>
  );
};

export async function getServerSideProps(context) {



  // console.log(context.query.blog)  // getting the [query-parameter] through the 'context'{Object} without using router, 

  const { blog } = context.query; // Getting the 'slug' or "blog-mongodb-id" needed to fetch the particular blog

  // fetch the particular blog thhrough this endpoint by providing "blog-id (slug)"
  const response = await fetch(`http://localhost:3000/api/getblog?blogId=${blog}`);
  const json = await response.json();

  return {
    props: { json }, // will be passed to the page component as props
  }
}

export default slug;
