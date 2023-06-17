import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
const Blogs = (props) => {

  const [AllBlogs, setAllBlogs] = useState([]);
  const [PageNumber, setPageNumber] = useState(1);
  const [TotalBlogsOnSinglePage, setTotalBlogsOnSinglePage] = useState(4);
  const [TotalResults, setTotalResults] = useState();






  // I've Commented-Out the use-Effect as i'm doing Server-Side-Rendering  
  async function fetchMoreData() {

    const response = await fetch(`http://localhost:3000/api/getblogs?pageNumber=${PageNumber}&numOfBlogsOnPage=${TotalBlogsOnSinglePage}`);
    const json = await response.json();

    if (json.blogs == AllBlogs) {
      console.log("equeal")
    }
    setAllBlogs([...AllBlogs, ...json.blogs]);
    setTotalResults(json.totalResults);

  }

  const handleLoadeMore = () => {
    setPageNumber(() => PageNumber + 1)
  }


  useEffect(() => {

    fetchMoreData();
  }, [PageNumber]);
  return (
    <>
      <h1>Mr. Blogger</h1>
      <div className={styles.grid}  >

        <div className="blogs con" style={{ padding: '1rem' }}>
          {AllBlogs && AllBlogs.map((Blog, index) => (
            <div key={index} className="card">
              <Link href={`/blogpost/${Blog._id}`} >
                <h3 style={{ cursor: "pointer" }}>{Blog.title}</h3>
              </Link>
              <p>{Blog.description.substr(0, 180) + "..."}</p>
            </div>
          ))}
        </div>
        <button onClick={handleLoadeMore} disabled={(Math.ceil(TotalResults / TotalBlogsOnSinglePage) < PageNumber + 1)}>Load More </button>
      </div>

      {/* <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />

        <InfiniteScroll
          dataLength={AllBlogs.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {AllBlogs && AllBlogs.map((i, index) => (
            <div key={index}>
              {index}
              div - #{i.title}
            </div>
          ))}
        </InfiniteScroll>
      </div> */}
    </>
  );
};


// NOTE:- this function runs on the [server-side] for SSR(server-side-rendering), not [client-side] again..!
export async function getServerSideProps(context) {



  // Calling Next-Backend-End API On The [Server-Side]
  // const response = await fetch("http://localhost:3000/api/getblogs?pageNumber=2&numOfBlogsOnPage=8");
  // const json = await response.json();


  // console.log(json.blogs)



  return {
    props: {}, // will be passed to the page component as props
  }
}

export default Blogs;
