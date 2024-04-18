import axios from "axios";
import { useEffect, useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Task from "../../components/Task";
import { Link } from "react-router-dom";
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const getAllTask = async () => {
      const response = await axios.get("http://localhost:5555/task");
      setTasks(response.data);
      console.log(response.data);
    };
    getAllTask();
  }, []);
  const handleAdd = () => {
    axios
      .post("http://localhost:5555/task/add", { task: newTask })
      .then(window.location.reload());
  };
  const handleDone = (id) => {
    axios.put(`http://localhost:5555/task/done/${id}`).then(location.reload());
  };
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5555/task/${id}`).then(location.reload());
  };
  return (
    <div className="w-full mx-auto p-12">
      <div className="flex flex-col gap-1 justify-center items-center">
        <div className="w-1/2 flex justify-center items-center">
          <h1 className="text-4xl font-extrabold ml-28">Todo List</h1>
          <Link to={"/login"}>
            <button className="w-24 h-10 bg-red-900 ml-28 text-white font-bold">
              LogIn
            </button>
          </Link>
        </div>

        <div className="flex">
          <input
            type="text"
            className="w-96 h-12 border-2 border-black"
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="w-24 h-12 bg-black text-white" onClick={handleAdd}>
            Add
          </button>
        </div>
        {details ? <Task id={details} setDetails={setDetails} /> : null}
        {tasks.length === 0 ? (
          <h1>No Tasks</h1>
        ) : (
          tasks.map((item) => (
            <div
              key={item._id}
              className="border-2 h-12 w-1/3 bg-black text-white items-center flex justify-between px-4"
            >
              <div className="flex items-center gap-1">
                {item.done ? <BsFillCheckCircleFill /> : <BsCircleFill />}

                <p className={`${item.done ? "line-through" : ""} text-xl`}>
                  {item.task}
                </p>
              </div>

              <div className="flex items-center gap-5">
                <p
                  onClick={() => setDetails(item._id)}
                  className="text-red-500 underline cursor-pointer"
                >
                  View Details
                </p>
                <p
                  onClick={() => handleDone(item._id)}
                  className="cursor-pointer"
                >
                  Done
                </p>
                <BsFillTrashFill
                  className="cursor-pointer"
                  onClick={() => handleDelete(item._id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
