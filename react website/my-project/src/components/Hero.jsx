const Hero = () => {
  return (
    <>
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 ">
                <span className="bg-white text-blue-500 px-2 rounded-md">
                  Welcome
                </span>{" "}
                to our Website
              </h1>
              <p className="text-lg mb-8">
                Discover the best products and services.
              </p>
              <a
                href="#"
                className="bg-white text-blue-500 px-4 py-3 rounded-lg shadow-lg font-semibold uppercase hover:bg-blue-100 w-36"
              >
                Get Started
              </a>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/400"
                alt="Hero Image"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
