import { useState, useEffect } from "react";
import AlertNoti from "./notification";
import Form from "./Form";
import DarkMode from "./DarkMode";
const TodoList = () => {
  const [message, setAlert] = useState("");
  const [status, setSelect] = useState("all");
  const [filterArray, setFilter] = useState([]);
  const [tasks, setTask] = useState({});

  const [text, setText] = useState("");
  const [pop, setPop] = useState(false);
  const [editText, setEdit] = useState(null);
  const [color, setColor] = useState("green");
  const [toastValue, setToastValue] = useState("");
  const [categories, setCategories] = useState([]); ///
  const [newCategory, setNewCategory] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [darkMode, setDarkMode] = useState("light");
  // Local stroage part
  useEffect(() => {
    getFromLocalStorage();
  }, []);

  useEffect(() => {
    handlerChange();

    if (tasks[selectCategory] !== undefined) {
      saveToLocalStorage();
    }
  }, [tasks, status]);
  useEffect(() => {
    const s = setInterval(() => {
      if (categories.length === 0) {
        localStorage.setItem("tasks", JSON.stringify([]));
        setTask({});
      }
    }, 2000);

    return () => {
      clearInterval(s);
    };
  }, [categories]);

  useEffect(() => {
    /*
    if (darkMode) {
      document.body.style.backgroundColor = "#121215";
    } else {
      document.body.style.backgroundColor = "#E4F0FA";
    }
      */
    document.documentElement.setAttribute("data-theme", darkMode);
  }, [darkMode]);

  const saveToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("categories", JSON.stringify(categories));
  };

  const getFromLocalStorage = () => {
    if (
      localStorage.getItem("tasks") === null &&
      localStorage.getItem("categories") === null
    ) {
      localStorage.setItem("tasks", JSON.stringify([]));
      localStorage.setItem("categories", JSON.stringify([]));
    } else {
      let localStorageItem = JSON.parse(localStorage.getItem("tasks"));
      let localStorageCategory = JSON.parse(localStorage.getItem("categories"));
      // console.log("localStorageItem accessing");
      //console.log(localStorageItem);
      setTask(localStorageItem);
      setCategories(localStorageCategory);
    }
  };
  // The Task
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const addTask = () => {
    let task = {
      id: Math.random() * 1000,

      name: text,
      completed: false,
    };
    if (tasks && selectCategory) {
      setTask({ ...tasks, [selectCategory]: [...tasks[selectCategory], task] });
      setText("");
    }
  };

  const handleCategory = (event) => {
    setNewCategory(event.target.value);
  };
  const create_category = (event) => {
    event.preventDefault();

    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setTask({ ...tasks, [newCategory]: [] });
      setSelectCategory(newCategory); // Automatically select the new category
      setNewCategory("");
    }
  };

  const handleSelected = (category) => {
    setSelectCategory(category);
    setNewCategory(category);
  };

  const deleteCategory = (category) => {
    const newCate = categories.filter((item) => item !== category);
    console.log(newCate);

    setCategories(newCate);
    localStorage.setItem("categories", JSON.stringify(newCate));
  };

  const handleTask = (event) => {
    event.preventDefault();

    if (editText) {
      editTask();
      setToastValue("editItem");
      setAlert("The Task Added To List");
    } else if (text !== "") {
      addTask();
      console.log("Running");
      showAlert("The Task Added To List");
      setToastValue("addItem");
      setColor("#32d9cb");
    } else {
      return;
    }
  };

  const handleTextEdit = (task) => {
    setText(task.name);
    setEdit(task.id);
  };

  const editTask = () => {
    const updatedTasks = tasks[selectCategory].map((task) => {
      if (task.id === editText) {
        return {
          ...task,
          name: text.trim(),
        };
      }
      return task;
    });

    const newTasks = {
      ...tasks,
      [selectCategory]: updatedTasks,
    };

    if (text.trim() !== "") {
      setTask(newTasks);
      setText("");

      setEdit(null);
    }
  };
  const handleDelete = (id) => {
    const deleteTask = tasks[selectCategory].filter((task) => task.id !== id);
    const newDeleteTask = {
      ...tasks,
      [selectCategory]: deleteTask,
    };
    setTask(newDeleteTask);
    // saveToLocalStorage(newDeleteTask);
    localStorage.setItem("tasks", JSON.stringify(newDeleteTask));
    setToastValue("deleteItem");
    showAlert("You Just Deleted The Task");
    setColor("#f67280");
  };

  // Alert message
  const clearnoti = () => {
    setAlert("");
  };
  const showAlert = (message) => {
    setAlert(message);
  };

  // check box
  const handleBox = (id) => {
    let newTask = tasks[selectCategory].map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    const newCompleteTask = {
      ...tasks,
      [selectCategory]: newTask,
    };
    setTask(newCompleteTask);
  };

  // completed check
  const handlerChange = () => {
    if (categories.length == 0) {
      return;
    }
    switch (status) {
      case "completed": {
        const completedTasks = tasks[selectCategory].filter(
          (task) => task.completed === true
        );

        setFilter({ ...tasks, [selectCategory]: completedTasks });

        break;
      }

      case "uncompleted": {
        const uncompletedTasks = tasks[selectCategory].filter(
          (task) => task.completed === false
        );
        setFilter({ ...tasks, [selectCategory]: uncompletedTasks });
        break;
      }
      default:
        setFilter(tasks);
        break;
    }
  };

  return (
    <>
      <div className="mainContainer">
        <header className="title">
          to<span className="i_text">do.</span>
        </header>
        <DarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="form_container">
          {message && (
            <AlertNoti
              message={message}
              clearnoti={clearnoti}
              colors={color}
              tasks={tasks}
              toastValue={toastValue}
            />
          )}
          {pop && (
            <Form
              newCategory={newCategory}
              addTask={addTask}
              text={text}
              darkMode={darkMode}
              editText={editText}
              handleChange={handleChange}
              handleTask={handleTask}
              setSelect={setSelect}
              handleCategory={handleCategory}
              create_category={create_category}
              //
            />
          )}

          <button
            className="addTask_Button"
            onClick={() => setPop((preState) => !preState)}
          >
            {" "}
            Add Task
          </button>
        </div>
        <div className="main-wrapper">
          <div
            className="category-wrapper"
            style={{
              transform:
                categories.length !== 0
                  ? "translateX(0px)"
                  : "translateX(-2000px)",
            }}
          >
            <h2 className="category_title">
              {categories.length !== 0 ? selectCategory : null}
            </h2>

            <ul className="category-container">
              {categories?.map((category, index) => {
                return (
                  <div key={index} className="single-category">
                    <div>
                      <li onClick={() => handleSelected(category)}>
                        {category}
                      </li>
                    </div>

                    <i
                      className="fa-solid fa-xmark category-del"
                      onClick={() => deleteCategory(category)}
                    ></i>
                  </div>
                );
              })}
            </ul>
          </div>
          <div
            className="taskContainer"
            style={{
              transform:
                categories.length !== 0
                  ? "translateX(0px)"
                  : "translateX(2000px)",
            }}
          >
            <h1 className="tasks-title">Tasks</h1>
            {filterArray[selectCategory]?.map((task) => {
              return (
                <div
                  key={task.id}
                  className="singleTask"
                  style={{
                    backgroundColor:
                      task.completed === true ? "transparent" : "",
                  }}
                >
                  <div className="checkmark">
                    <input
                      className="check-box"
                      type="checkbox"
                      name="checkbox"
                      checked={task.completed}
                      onChange={() => handleBox(task.id)}
                    />
                  </div>

                  <p
                    style={{
                      textDecoration:
                        task.completed === true ? "line-through" : "",
                      color: task.completed === true ? "gray" : "",
                    }}
                    className="task-text"

                    // onDoubleClick={() => handleDelete(task.id)}
                  >
                    {task.name}{" "}
                  </p>

                  <div className="buttonContainer">
                    {task.completed === true ? (
                      <i
                        className="fa-solid fa-trash deleteButton"
                        onClick={() => handleDelete(task.id)}
                      ></i>
                    ) : (
                      <i
                        className="fa-solid fa-pen editButton"
                        onClick={() => handleTextEdit(task)}
                      ></i>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
