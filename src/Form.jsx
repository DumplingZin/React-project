const Form = ({ text, editText, handleChange, handleTask, setSelect }) => {
  const selectHandler = (event) => {
    setSelect(event.target.value);
  };

  return (
    <>
      <div className="inputContainer">
        <input
          id="input-box"
          type="text"
          value={text}
          name="text"
          onChange={handleChange}
          placeholder="Enter your task"
        />

        <button className="addButton" onClick={handleTask} type="add">
          {editText ? "Update" : "Add"}
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
    </>
  );
};

export default Form;
