import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-3xl font-bold mb-6 text-black text-center">
          Welcome to Attendance Dashboard
        </h1>
        <Link to="/attendance">
          <button className="bg-indigo-600 text-black px-6 py-3 rounded-lg">
            Go to Attendance
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;