import React, { useState } from "react";
import { observer } from "mobx-react-lite";
// import { showItems } from "lib/util"
// import { navStore, Items } from "mobx/navStore"

const NavSelect = observer(({ items, active, setActive, className = "" }) => {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {Object.keys(items).map((item, key) => (
        <Item key={key} name={item} showItem={active} setShowItem={setActive} />
      ))}
    </div>
  );
});

export default NavSelect;

function Item({ showItem, setShowItem, name }) {
  return (
    <div
      className={`cursor-pointer rounded-xl 
       border-white border-2 p-2 ${showItem === name ? "bg-green" : ""}`}
      onClick={() => setShowItem(name)}
    >
      {name}
    </div>
  );
}
