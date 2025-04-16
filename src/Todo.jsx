import React, { useState } from 'react';
import './App.css';

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleEditInputChange(event) {
    setEditText(event.target.value);
  }

  //ye naya task banayega 
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(t => [...t, newTask]);
      setNewTask("");
    }
  }
// ye purana task ko deletyte krega 
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function startEditing(index) {
    setEditingIndex(index);
    setEditText(tasks[index]);
  }//ye edit krne k lie 

  function saveEdit() {
    //y esave krega eduts ko ouranet taask wale
    if (editText.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = editText; 
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditText("");
    }
  }

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={editingIndex === null ? newTask : editText}
          onChange={editingIndex === null ? handleInputChange : handleEditInputChange}
        />
        {editingIndex === null ? (
          <button className="add-button" onClick={addTask}>Add</button>
        ) : (
          <button className="add-button" onClick={saveEdit}>Save</button>
        )}
      </div>

      <ol>
        {tasks.map((task, index) =>
          <li key={index}>
            <span className="text">{task}</span>
            <button className="edit-button" onClick={() => startEditing(index)}>Edit</button>
            <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
          </li>
        )}
      </ol>
    </div>
  );
}

export default ToDo;
