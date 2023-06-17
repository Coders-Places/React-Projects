import React from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
const Nav = () => {
  const Nav = [
    { navurl: "/", navItem: "Home" },
    { navurl: "/blogs", navItem: "Blogs" },
    { navurl: "/about", navItem: "About" },
    { navurl: "/contact", navItem: "Contact Us" },
  ];
  return (
    <>
      <nav className={"con"}>
        <style jsx global>
          {`
            .con {
              background: green;
            }
          `}
        </style>
        <ul className={styles.navigation}>
          {Nav.map((navElement, index) => (
            <li key={index}>
              <Link href={navElement.navurl}>
                <a>{navElement.navItem}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
