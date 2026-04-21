import { useEffect, useState } from "react";
import API from "../api/axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      age: "",
      course: ""
    });
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthError = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const fetchStudents = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await API.get("/student");
      setStudents(res.data.data); // because of ApiResponse
    } catch {
      setError("Could not load students. Please refresh and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.course.trim()) {
      setError("Name, email and course are required.");
      return;
    }

    const age = Number(formData.age);

    if (!Number.isInteger(age) || age < 1 || age > 100) {
      setError("Age must be a whole number between 1 and 100.");
      return;
    }

    setError("");
    setFeedback("");
    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      age,
      course: formData.course.trim()
    };

    try {
      if (editingId) {
        await API.put("/student", { id: editingId, ...payload });
        setFeedback("Student updated successfully.");
      } else {
        await API.post("/student", payload);
        setFeedback("Student added successfully.");
      }

      resetForm();
      await fetchStudents();
    } catch (err) {
      if (err?.response?.status === 401) {
        handleAuthError();
        return;
      }

      setError(editingId ? "Could not update student." : "Could not add student.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      age: String(student.age),
      course: student.course
    });
    setError("");
    setFeedback("");
  };

  const deleteStudent = async (id) => {
    const confirmed = window.confirm("Delete this student?");
    if (!confirmed) {
      return;
    }

    setError("");
    setFeedback("");

    try {
      await API.delete(`/student/${id}`);
      setFeedback("Student deleted successfully.");
      if (editingId === id) {
        resetForm();
      }
      if (selectedStudent?.id === id) {
        setSelectedStudent(null);
      }
      await fetchStudents();
    } catch (err) {
      if (err?.response?.status === 401) {
        handleAuthError();
        return;
      }

      setError("Could not delete student.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
      return;
    }

    fetchStudents();
  }, []);

  return (
    <section className="students-shell">
      <div className="students-header">
        <div>
          <p className="auth-kicker">Dashboard</p>
          <h2>Students</h2>
          <p className="students-subtitle">Add, update, view, and delete student records.</p>
        </div>
        <div className="students-header-actions">
          <button type="button" className="secondary-button" onClick={fetchStudents}>
            Refresh
          </button>
          <button className="secondary-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="students-meta-row">
        <p className="students-count">
          Total students: <strong>{students.length}</strong>
        </p>
      </div>

      <div className="students-top-grid">
        <form className="student-form" onSubmit={submitForm}>
          <h3>{editingId ? "Update Student" : "Add Student"}</h3>

          <div className="student-form-grid">
            <label>
              Name
              <input
                name="name"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="e.g. john@email.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Age
              <input
                name="age"
                type="number"
                min="1"
                max="100"
                placeholder="18"
                value={formData.age}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Course
              <input
                name="course"
                placeholder="e.g. Computer Science"
                value={formData.course}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="student-form-actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editingId ? "Update Student" : "Add Student"}
            </button>

            {editingId ? (
              <button
                type="button"
                className="secondary-button"
                onClick={resetForm}
                disabled={isSubmitting}
              >
                Cancel Edit
              </button>
            ) : null}
          </div>
        </form>

        <aside className="student-view-panel">
          {selectedStudent ? (
            <>
              <h3>Selected Student</h3>
              <p>
                <strong>Name:</strong> {selectedStudent.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedStudent.email}
              </p>
              <p>
                <strong>Age:</strong> {selectedStudent.age}
              </p>
              <p>
                <strong>Course:</strong> {selectedStudent.course}
              </p>
            </>
          ) : (
            <>
              <h3>Selected Student</h3>
              <p className="status-text">Click View on any card to show full student details here.</p>
            </>
          )}
        </aside>
      </div>

      <div className="students-messages">
        {isLoading ? <p className="status-text">Loading students...</p> : null}
        {error ? <p className="form-error">{error}</p> : null}
        {feedback ? <p className="form-success">{feedback}</p> : null}
      </div>

      {!isLoading && !error && students.length === 0 ? (
        <p className="status-text">No students found.</p>
      ) : null}

      <div className="students-list-header">
        <h3>Student Directory</h3>
      </div>

      <div className="students-grid">
        {students.map((s) => (
          <article key={s.id} className="student-card">
            <div className="student-card-content">
              <h3>{s.name}</h3>
              <p>{s.email}</p>
              <p>
                {s.course} | Age: {s.age}
              </p>
            </div>

            <div className="student-card-actions">
              <button type="button" className="secondary-button" onClick={() => setSelectedStudent(s)}>
                View
              </button>
              <button type="button" onClick={() => startEdit(s)}>
                Edit
              </button>
              <button type="button" className="danger-button" onClick={() => deleteStudent(s.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Students;