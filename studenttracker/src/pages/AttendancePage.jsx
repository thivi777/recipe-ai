import { useState } from "react";
import Header from "../components/Header";
import AttendanceTable from "../components/AttendanceTable";
import Form from "../components/AttendanceForm";

const initialStudents = [
  { id: 1, roll: "001", name: "Alice", status: "absent", remarks: "" },
  { id: 2, roll: "002", name: "Bob", status: "present", remarks: "" },
  { id: 3, roll: "003", name: "Charlie", status: "absent", remarks: "" },
];

function AttendancePage() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");

  // Add new student
  const addAttendance = (name, date) => {
    const newStudent = {
      id: Date.now(),
      roll: (students.length + 1).toString().padStart(3, "0"),
      name,
      status: "absent",
      remarks: "",
      date,
    };
    setStudents([...students, newStudent]);
  };

  // Toggle present/absent
  const toggleStatus = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === "present" ? "absent" : "present",
            }
          : student
      )
    );
  };

  // Update remarks
  const updateRemarks = (id, text) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, remarks: text } : student
      )
    );
  };

  // Filter by search
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  // Counts
  const presentCount = students.filter((s) => s.status === "present").length;
  const absentCount = students.filter((s) => s.status === "absent").length;

  return (
    <div className="p-4">
      {/* Header with Add Attendance */}
      <Header addAttendance={addAttendance} />

      {/* Attendance table */}
      <AttendanceTable
        students={filteredStudents}
        toggleStatus={toggleStatus}
        updateRemarks={updateRemarks}
      />

      {/* Search and counts */}
      <Form
        search={search}
        setSearch={setSearch}
        present={presentCount}
        absent={absentCount}
        total={students.length}
      />
    </div>
  );
}

export default AttendancePage;