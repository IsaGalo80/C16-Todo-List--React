import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

// create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [listTask, setListTask] = useState([]);
  const deletTask = (posicion) => {
    console.log("ejecutado");
    let newList = listTask.filter((value, index) => posicion !== index);
    setListTask(newList);
  };
  return (
    <>
      <div id="box">
        <div id="box1">
          <div id="tex1">
            <h1>Todo List!!</h1>
            <input
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            ></input>
            <button
              id="click"
              onClick={() => {
                setListTask([...listTask, inputValue]);
              }}
            >
              GUARDAR
            </button>
          </div>
          <div>
            <ul>
              {listTask.map((value, index) => {
                return (
                  <li key={index}>
                    {value}{" "}
                    <span
                      onClick={() => {
                        deletTask(index);
                      }}
                    >
                      borrar
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
