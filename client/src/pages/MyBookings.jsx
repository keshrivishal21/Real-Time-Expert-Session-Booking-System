import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const statusStyles = {
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  Completed: "bg-green-50 text-green-700 border-green-200",
};

function MyBookings() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async (e) => {
    e?.preventDefault();
    if (!email.trim()) return;
    try {
      setError("");
      setLoading(true);
      const res = await API.get("/bookings", { params: { email } });
      setBookings(res.data);
      setSearched(true);
    } catch {
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          My Bookings
        </h1>
        <p className="mt-2 text-gray-500">
          Enter your email to view all your booked sessions.
        </p>
      </div>

      {/* Search bar */}
      <form onSubmit={fetchBookings} className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="btn-primary"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Search"
          )}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 mb-6">
          {error}
        </div>
      )}

      {/* Results */}
      {searched && !error && (
        <>
          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-500 text-lg">No bookings found.</p>
              <p className="text-gray-400 text-sm mt-1">
                Haven&apos;t booked yet?
              </p>
              <Link to="/" className="btn-primary mt-4 inline-flex">
                Browse Experts
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {bookings.length}
                </span>{" "}
                booking{bookings.length !== 1 && "s"}
              </p>

              {bookings.map((booking) => (
                <div key={booking._id} className="card p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left side */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg shrink-0">
                        {booking.expert?.name?.charAt(0) || "?"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {booking.expert?.name || "Unknown Expert"}
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {booking.expert?.category}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {booking.timeSlot}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border self-start sm:self-center ${
                        statusStyles[booking.status] || "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default MyBookings;
