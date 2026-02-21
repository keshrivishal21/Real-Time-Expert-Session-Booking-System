import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="text-7xl font-extrabold text-primary-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        Page not found
      </h1>
      <p className="mt-2 text-gray-500">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link to="/" className="btn-primary mt-8 inline-flex">
        <svg
          className="w-4 h-4 mr-1.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"
          />
        </svg>
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
