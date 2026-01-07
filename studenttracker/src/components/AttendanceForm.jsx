function Form({ search, setSearch, present, absent, total }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Attendance Form</h2>

      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-4"
      />

      <div className="flex gap-6 border-t pt-4">
        <span>Present: {present}</span>
        <span>Absent: {absent}</span>
        <span>Total: {total}</span>
      </div>
    </div>
  );
}

export default Form;