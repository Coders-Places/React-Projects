const About = () => {
  return (
    <>
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                About Us
              </h2>
              <p className="text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                amet aliquam libero. Maecenas a sollicitudin dui. Nam tincidunt
                neque vitae turpis semper, id consequat tellus ultricies.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia Curae; Proin tristique, lacus vitae vestibulum
                consectetur, felis purus posuere metus, at eleifend justo leo
                vel tortor.
              </p>
              <a
                href="#"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold uppercase hover:bg-blue-600"
              >
                Learn More
              </a>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/400"
                alt="About Image"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
