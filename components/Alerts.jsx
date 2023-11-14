import { observer } from "mobx-react-lite";
import { MessageStore } from "mobx/messageStore";
import React, { useEffect } from "react";

const Alerts = observer(({ className }) => {
  const { error, success, setError, setSuccess } = MessageStore;
  useEffect(() => {
    setError("");
    setSuccess("");
  }, []);
  return (
    <div className="w-full flex justify-center  items-center h-10">
      <div className="text-red ">{error}</div>
      <div className="text-[#0be26f]">{success}</div>
    </div>
  );
});

export default Alerts;
