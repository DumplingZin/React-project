import React, { useState, useEffect } from "react";

const AlertNoti = ({ clearnoti, message, color }) => {
  useEffect(() => {
    const close = setTimeout(() => {
      clearnoti();
    }, 1000);
    return () => {
      clearInterval(close);
    };
  }, [message]);

  return (
    <div id="alertItem" style={{ backgroundColor: color }} onClose={clearnoti}>
      {message}
    </div>
  );
};

export default AlertNoti;
