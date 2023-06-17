const Testimonials = () => {
  return (
    <>
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-gray-700 mb-4">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                sit amet aliquam libero."
              </p>
              <p className="text-blue-500 font-semibold">John Doe</p>
              <p className="text-gray-500">Company ABC</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-gray-700 mb-4">
                "Sed tincidunt neque vitae turpis semper, id consequat tellus
                ultricies."
              </p>
              <p className="text-blue-500 font-semibold">Jane Smith</p>
              <p className="text-gray-500">Company XYZ</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-gray-700 mb-4">
                "Vestibulum ante ipsum primis in faucibus orci luctus et
                ultrices posuere cubilia Curae."
              </p>
              <p className="text-blue-500 font-semibold">Mike Johnson</p>
              <p className="text-gray-500">Company 123</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
