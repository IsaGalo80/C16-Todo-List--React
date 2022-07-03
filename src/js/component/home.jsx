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
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        // console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        // console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        setListTask(data.map((tarea) => tarea.label)); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setTimeout(() =>
      fetch("https://assets.breatheco.de/apis/fake/todos/user/IsaG", {
        method: "PUT",
        body: JSON.stringify(
          listTask.map((tarea) => ({ label: tarea, done: false }))
        ),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
          console.log(resp.status); // el código de estado = 200 o código = 400 etc.
          console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
          return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
        })
        .then((data) => {
          //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
          console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
        })
        .catch((error) => {
          //manejo de errores
          console.log(error);
        })
    );
  }, 10000);

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
          <div className="box2">
            <input
              id="tarea"
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
              value={inputValue}
              onKeyDown={(e) => {
                if(e.key==="Enter"){
                  setListTask([...listTask, inputValue]);
                  setInputValue("")}
                }}
            >
            </input>
            <div>
              <ul>
                {listTask.map((value, index) => {
                  return (
                    <div id="listas" key={index}>
                      {value}{" "}
                      <span
                        onClick={() => {
                          deletTask(index);
                        }}
                      ><i id="bCerrar" className="fa-solid fa fa-trash"></i>
                      </span>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};
export default Home;
