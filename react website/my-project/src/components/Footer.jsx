const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-1/4 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                amet aliquam libero.
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">Services</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Web Design
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Graphic Design
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Digital Marketing
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">123 Main Street, City, Country</p>
              <p className="text-gray-400">contact@example.com</p>
              <p className="text-gray-400">+1 234 567 890</p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
