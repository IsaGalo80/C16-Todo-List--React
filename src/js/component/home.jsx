import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

// create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [listTask, setListTask] = useState([]);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/IsaG", {
      method: "GET",
    })
      .then((resp) => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        setListTask(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  }, []);

  const deletTask = (posicion) => {
    console.log("ejecutado");
    let newList = listTask.filter((value, index) => posicion !== index);
    setListTask(newList);
  };
  return (
    <>
      <body>
        <div id="box1">
          <h1>todos</h1>
          <div className="PB">
            <input
              id="tarea"
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            ></input>
            <button
              className="btn btn-default"
              // id="click"
              onClick={() => {
                setListTask([...listTask, inputValue]);
              }}
            >
              Add
            </button>
          </div>
          <div>
            <ul>
              {listTask.map((value, index) => {
                return (
                  <div id="listas" key={index}>
                    {value}{" "}
                    <span
                      id="bCerrar"
                      onClick={() => {
                        deletTask(index);
                      }}
                    >
                      <i className="fa-solid fa fa-trash"></i>
                    </span>
                    <hr />
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </body>
    </>
  );
};
export default Home;
