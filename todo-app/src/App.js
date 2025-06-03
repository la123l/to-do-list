import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input.trim()]);
      setInput("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
  };

  const saveEdit = (index) => {
    const updated = [...tasks];
    updated[index] = editValue.trim();
    setTasks(updated);
    setEditIndex(null);
    setEditValue("");
  };

  const handleKey = (e, index) => {
    if (e.key === "Enter") saveEdit(index);
    if (e.key === "Escape") setEditIndex(null);
  };

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Enter a task..."
          className="input"
        />
        <button onClick={addTask} className="add-button">Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {editIndex === index ? (
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => handleKey(e, index)}
                onBlur={() => saveEdit(index)}
                autoFocus
                className="edit-input"
              />
            ) : (
              <>
                <span className="task-text">{task}</span>
                <div className="icon-group">
                  <button onClick={() => startEdit(index)} className="icon-button">✏️</button>
                  <button onClick={() => removeTask(index)} className="icon-button">🗑️</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
