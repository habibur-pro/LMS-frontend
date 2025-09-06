const Stats = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Trusted by Learners Worldwide
          </h2>
          <p className="text-xl opacity-90">
            Join our growing community of successful students
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-5xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
              50,000+
            </div>
            <div className="text-lg opacity-90">Active Students</div>
          </div>
          <div className="group">
            <div className="text-5xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
              200+
            </div>
            <div className="text-lg opacity-90">Expert Courses</div>
          </div>
          <div className="group">
            <div className="text-5xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
              95%
            </div>
            <div className="text-lg opacity-90">Success Rate</div>
          </div>
          <div className="group">
            <div className="text-5xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
              24/7
            </div>
            <div className="text-lg opacity-90">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
