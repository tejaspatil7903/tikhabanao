import { Link } from 'react-router-dom';

export default function FoodSelection() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-primary mb-16 text-center">
        What's Your{' '}
        <span className="text-secondary relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 after:bg-secondary/20">
          Preference?
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <Link
          to="/main-course?type=veg"
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-white p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1"
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-semibold text-green-600 mb-6 group-hover:text-green-700 transition-colors duration-300">
              Vegetarian
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              Explore our delicious vegetarian options crafted with fresh ingredients
            </p>
            <span className="mt-6 inline-flex items-center text-green-500 font-medium group-hover:translate-x-3 transition-all duration-300">
              Browse Menu 
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
          <div className="absolute top-0 right-0 w-48 h-48 -mr-8 -mt-8 bg-green-100 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute bottom-0 left-0 w-32 h-32 -ml-8 -mb-8 bg-green-50 rounded-full opacity-30 group-hover:scale-125 transition-transform duration-500" />
        </Link>

        <Link
          to="/main-course?type=non-veg"
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-50 to-white p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:-rotate-1"
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-semibold text-red-600 mb-6 group-hover:text-red-700 transition-colors duration-300">
              Non-Vegetarian
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              Discover our savory non-vegetarian dishes prepared to perfection
            </p>
            <span className="mt-6 inline-flex items-center text-red-500 font-medium group-hover:translate-x-3 transition-all duration-300">
              Browse Menu
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
          <div className="absolute top-0 right-0 w-48 h-48 -mr-8 -mt-8 bg-red-100 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute bottom-0 left-0 w-32 h-32 -ml-8 -mb-8 bg-red-50 rounded-full opacity-30 group-hover:scale-125 transition-transform duration-500" />
        </Link>
      </div>
    </div>
  );
}