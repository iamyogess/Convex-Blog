import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-10">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center gap-x-6">
        {/* info  */}
        <div>
          <h1>About</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            cupiditate ab optio voluptatem ipsam quibusdam.
          </p>
          <p>Email: Yogesh Shrestha</p>
          <p>Mobile: 986676543</p>
        </div>
        {/* links  */}
        <div className="flex justify-between items-center">
          <div>
            <h1>Quick Links</h1>
            <ul>
              <li>
                <Link href="#">Entertainment</Link>
              </li>
              <li>
                <Link href="#">Entertainment</Link>
              </li>
              <li>
                <Link href="#">Entertainment</Link>
              </li>
              <li>
                <Link href="#">Entertainment</Link>
              </li>
              <li>
                <Link href="#">Entertainment</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1>Categories</h1>
            <ul>
              <li>
                <Link href="#">Entertainment</Link>
              </li>
              <li>
                <Link href="#">Entertainment</Link>
              </li>
              <li>
                <Link href="#">Entertainment</Link>
              </li>
              <li>
                <Link href="#">Entertainment</Link>
              </li>
              <li>
                <Link href="#">Entertainment</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* news letter  */}
        <div>
          <h1>Weekly Newsletter</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <form action="">
            <input type="text" />
            <button>Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
