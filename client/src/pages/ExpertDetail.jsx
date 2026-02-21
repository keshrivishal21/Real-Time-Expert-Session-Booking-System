import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import socket from "../api/socket";

const categoryColors = {
  "Career Guidance": "bg-violet-100 text-violet-700",
  Fitness: "bg-emerald-100 text-emerald-700",
  Finance: "bg-amber-100 text-amber-700",
};

function ExpertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchExpert = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/experts/${id}`);
      setExpert(res.data);
    } catch {
      setError("Failed to load expert");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpert();
    socket.on("slotBooked", ({ expertId, date, timeSlot }) => {
      if (expertId === id) {
        setExpert((prev) => {
          if (!prev) return prev;
          const updatedSlots = prev.availableSlots.map((slotObj) => {
            if (slotObj.date === date) {
              return {
                ...slotObj,
                slots: slotObj.slots.filter((slot) => slot !== timeSlot),
              };
            }
            return slotObj;
          });
          return { ...prev, availableSlots: updatedSlots };
        });
      }
    });
    return () => {
      socket.off("slotBooked");
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="rounded-lg bg-red-50 border border-red-200 p-6">
          <p className="text-red-700 font-medium">{error}</p>
          <Link to="/" className="btn-primary mt-4 inline-flex">
            Back to Experts
          </Link>
        </div>
      </div>
    );
  }

  if (!expert) return null;

  const colorClass =
    categoryColors[expert.category] || "bg-gray-100 text-gray-700";

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-primary-600 transition-colors">
          Experts
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium">{expert.name}</span>
      </nav>

      {/* Profile card */}
      <div className="card overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary-500 to-primary-700" />
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-3xl shrink-0">
              {expert.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {expert.name}
                </h1>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colorClass}`}>
                  {expert.category}
                </span>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {expert.experience} years experience
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {expert.rating.toFixed(1)} rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available slots */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-5">
          Available Sessions
        </h2>

        {expert.availableSlots.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-gray-500">No available sessions right now.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {expert.availableSlots.map((slotObj, index) => (
              <div key={index} className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">{slotObj.date}</h3>
                  <span className="text-xs text-gray-400 ml-auto">
                    {slotObj.slots.length} slot{slotObj.slots.length !== 1 && "s"}
                  </span>
                </div>

                {slotObj.slots.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">
                    All sessions booked for this date.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {slotObj.slots.map((slot, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          navigate(`/booking/${expert._id}`, {
                            state: { date: slotObj.date, timeSlot: slot, expertName: expert.name },
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-primary-200 text-primary-700 bg-primary-50 hover:bg-primary-100 hover:border-primary-300 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ExpertDetail;
