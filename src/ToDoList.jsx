import { useState, useEffect } from "react";
import AlertNoti from "./notification";
import Form from "./Form";
const TodoList = () => {
  const [message, setAlert] = useState("");
  const [status, setSelect] = useState("all");
  const [filterArray, setFilter] = useState([]);
  const [tasks, setTask] = useState([]);
  const [text, setText] = useState("");
  const [editText, setEdit] = useState(null);
  const [color, setColor] = useState("green");

  useEffect(() => {
    getFromLocalStorage();
  }, []);

  useEffect(() => {
    handlerChange();
    if (tasks.length > 0) {
      saveToLocalStorage();
    }
  }, [tasks, status]);
  // Local stroage part

  const saveToLocalStorage = (taskArray = tasks) => {
    localStorage.setItem("tasks", JSON.stringify(taskArray));
  };

  const getFromLocalStorage = () => {
    if (localStorage.getItem("tasks") === null) {
      localStorage.setItem("tasks", JSON.stringify([]));
    } else {
      let localStorageItem = JSON.parse(localStorage.getItem("tasks"));
      //console.log(localStorageItem);
      console.log(localStorageItem);
      setTask(localStorageItem);
    }
  };
  // The task and function
  const handleChange = (event) => {
    setText(event.target.value);
  };

  let addTask = () => {
    let task = {
      id: Math.random() * 1000,
      name: text,
      completed: false,
    };
    if (task.name !== "") {
      setTask([...tasks, task]);
      setText("");
    }
  };

  const handleTask = () => {
    const sameText = tasks.find((task) => task.name === text);

    if (sameText) {
      showAlert("This text is already exist");
      setText("");
    } else {
      if (editText) {
        editTask();
        setAlert("The Task Added To List");
      } else {
        if (text !== "") {
          addTask();
          showAlert("The Task Added To List");
          setColor("#32d9cb");
        }
      }
    }
  };
  const handleTextEdit = (task) => {
    setText(task.name);
    setEdit(task.id);
  };

  const editTask = () => {
    const newEditTask = tasks.map((task) => {
      if (task.id === editText) {
        return { ...task, name: text.trim() };
      } else {
        return task;
      }
    });

    if (newEditTask.name !== "") {
      setTask(newEditTask);
      setText("");
      setEdit(null);
    }
  };
  const handleDelete = (id) => {
    const deleteTask = tasks.filter((task) => task.id !== id);

    setTask(deleteTask);
    saveToLocalStorage(deleteTask);

    showAlert("You Just Deleted The Task");
    setColor("#f67280");
  };

  const clearnoti = () => {
    setAlert("");
  };
  // Alert message
  const showAlert = (message) => {
    setAlert(message);
  };

  // check box
  const handleBox = (id) => {
    let newTask = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });

    setTask(newTask);
  };

  // completed check
  const handlerChange = () => {
    switch (status) {
      case "completed":
        setFilter(tasks.filter((task) => task.completed === true));
        break;
      case "uncompleted":
        setFilter(tasks.filter((task) => task.completed === false));
        break;
      default:
        setFilter(tasks);
        break;
    }
  };
  return (
    <>
      <div className="mainContainer">
        <header>
          <h1>To-Do List</h1>
        </header>
        {message && (
          <AlertNoti message={message} clearnoti={clearnoti} color={color} />
        )}
        <Form
          text={text}
          editText={editText}
          handleChange={handleChange}
          handleTask={handleTask}
          setSelect={setSelect}
        />

        <div className="taskContainer">
          {filterArray.map((task) => {
            return (
              <div key={task.id} className="singleTask">
                <input
                  className="check-box"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleBox(task.id)}
                />
                <span
                  className={task.completed === true ? "lineThroughTask" : ""}
                >
                  {task.name}{" "}
                </span>
                <div className="buttonContainer">
                  <i
                    className="fa-solid fa-trash deleteButton"
                    onClick={() => handleDelete(task.id)}
                  ></i>

                  <i
                    className="fa-solid fa-pen-to-square editButton"
                    onClick={() => handleTextEdit(task)}
                  >
                    {" "}
                  </i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TodoList;
