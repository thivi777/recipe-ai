function StudentRow({ student, toggleStatus, updateRemarks }) {
  return (
    <tr className="border-b">
      <td className="px-6 py-4">{student.roll}</td>
      <td className="px-6 py-4">{student.name}</td>

      <td className="px-6 py-4 text-center">
        <button
          onClick={() => toggleStatus(student.id)}
          className={`px-4 py-1 rounded-full text-white ${
            student.status === "present" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {student.status === "present" ? "Present" : "Absent"}
        </button>
      </td>

      <td className="px-6 py-4">
        <input
          type="text"
          value={student.remarks}
          onChange={(e) => updateRemarks(student.id, e.target.value)}
          placeholder="Add remarks..."
          className="w-full px-2 py-1 border rounded"
        />
      </td>
    </tr>
  );
}

export default StudentRow;