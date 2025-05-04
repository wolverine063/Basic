import React, { useEffect, useRef, useState } from "react";

const Title = () => {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTaskList([...tasklist, { task: task, isDone: false }]);
      setTask("");
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = tasklist.map((item, i) =>
      i === index ? { ...item, isDone: !item.isDone } : item
    );
    setTaskList(updatedTasks);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Todo App</h2>

      <input
        ref={inputRef}
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
        style={{
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width: "300px",
        }}
      />
      <button
        onClick={handleAddTask}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginLeft: "10px",
          cursor: "pointer",
        }}
      >
        Add Task
      </button>

      <ul style={{ marginTop: "20px", listStyleType: "none", padding: "0" }}>
        {tasklist.map((item, index) => (
          <li key={index} style={{ margin: "10px 0" }}>
            <input
              type="checkbox"
              checked={item.isDone}
              onChange={() => toggleTask(index)}
            />
            <span
              style={{
                textDecoration: item.isDone ? "line-through" : "none",
                marginLeft: "10px",
              }}
            >
              {item.task}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Title;
