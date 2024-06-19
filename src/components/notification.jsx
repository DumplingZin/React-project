import React, { useEffect } from "react";

const AlertNoti = ({ clearnoti, message, toastValue }) => {
  useEffect(() => {
    if (message !== "") {
      const close = setInterval(() => {
        clearnoti();
      }, 1000);
      return () => {
        clearInterval(close);
      };
    }
  }, [message]);

  return (
    <div
      id="alertItem"
      className={
        toastValue === "addItem" || toastValue === "editItem" ? "add" : "delete"
      }
      // style={styles}
      onClose={clearnoti}
    >
      <div className="icon-div">
        {toastValue === "addItem" || toastValue === "editItem" ? (
          <i className="fa-solid fa-circle-check"></i>
        ) : (
          <i className="fa-solid fa-trash-can-arrow-up"></i>
        )}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default AlertNoti;
