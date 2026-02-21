import { useNavigate } from "react-router-dom";

const categoryColors = {
  "Career Guidance": "bg-violet-100 text-violet-700",
  Fitness: "bg-emerald-100 text-emerald-700",
  Finance: "bg-amber-100 text-amber-700",
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-gray-500">{rating.toFixed(1)}</span>
    </div>
  );
}

function ExpertCard({ expert }) {
  const navigate = useNavigate();
  const colorClass =
    categoryColors[expert.category] || "bg-gray-100 text-gray-700";

  const totalSlots = expert.availableSlots?.reduce(
    (sum, d) => sum + d.slots.length,
    0
  ) ?? 0;

  return (
    <div className="card overflow-hidden flex flex-col">
      {/* Color accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-primary-500 to-primary-700" />

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg shrink-0">
              {expert.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 leading-tight">
                {expert.name}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                {expert.experience} yrs experience
              </p>
            </div>
          </div>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${colorClass}`}
          >
            {expert.category}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-1">
          <StarRating rating={expert.rating} />
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-md ${
              totalSlots > 0
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {totalSlots > 0 ? `${totalSlots} slots` : "No slots"}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate(`/expert/${expert._id}`)}
          className="btn-primary mt-auto w-full"
        >
          View Profile
          <svg
            className="w-4 h-4 ml-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ExpertCard;