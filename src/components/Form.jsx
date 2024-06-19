const Form = ({
  text,
  editText,
  handleChange,
  handleTask,
  setSelect,
  handleCategory,
  create_category,
  newCategory,
  darkMode,
}) => {
  const selectHandler = (event) => {
    setSelect(event.target.value);
  };

  return (
    <>
      <form id="taskForm" className='form_div'>
        <div className="category_input">
          <input
            id="input-box"
            type="text"
            value={newCategory}
            name="text"
            onChange={handleCategory}
            placeholder="Enter your category"
          />

          <button
            className="category_Add_Button"
            onClick={create_category}
            type="add"
          >
            ADD
          </button>
        </div>
        <div className="task_input">
          <input
            id="input-box2"
            type="text"
            value={text}
            name="text"
            onChange={handleChange}
            placeholder="Enter your task"
          />
          <button className="addButton" onClick={handleTask} type="add">
            {editText ? "UPDATE" : "ADD"}
          </button>
        </div>

        <div className="select">
          <select onChange={selectHandler} name="todo" id="todo">
            <option className="option" value="all">
              All
            </option>
            <option className="option" value="completed">
              Completed
            </option>
            <option className="option" value="uncompleted">
              Uncompleted
            </option>
          </select>
        </div>
      </form>
    </>
  );
};

export default Form;
