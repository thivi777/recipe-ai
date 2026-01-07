import { useState } from "react";

function Header({ addAttendance }) {
  const [showForm, setShowForm] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [date, setDate] = useState("");

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName || !date) return alert("Fill all fields!");

    // Add attendance to parent state
    addAttendance({ studentName, date });

    // Clear form and close modal
    setStudentName("");
    setDate("");
    handleCloseForm();
  };

  return (
    <>
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Student Attendance</h1>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            onClick={handleOpenForm}
          >
            Add New Attendance
          </button>
        </div>
      </header>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h2 className="text-lg font-semibold mb-4">New Attendance</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Student Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={handleCloseForm}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;