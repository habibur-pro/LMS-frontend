const Footer = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">
              LMS Platform
            </h3>
            <p className="text-gray-600">
              Empowering learners worldwide with quality education.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Platform</h4>
            <div className="space-y-2 text-gray-600">
              <div>Courses</div>
              <div>Instructors</div>
              <div>Certificates</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Support</h4>
            <div className="space-y-2 text-gray-600">
              <div>Help Center</div>
              <div>Contact Us</div>
              <div>Community</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
            <div className="space-y-2 text-gray-600">
              <div>About</div>
              <div>Careers</div>
              <div>Privacy</div>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 LMS Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
