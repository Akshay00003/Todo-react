import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaRegWindowClose } from "react-icons/fa";

const Task = ({ id ,setDetails}) => {
  const [data, setData] = useState([]);
  const [taskEdit, setTaskEdit] = useState(false);
  const [title, setTitle] = useState("");
  useEffect(() => {
    const GetTask = async () => {
      const response = await axios.get(`http://localhost:5555/task/${id}`);
      setData(response.data);
      console.log(response.data);
    };
    GetTask();
  }, [id]);
  const handleTaskEdit = (id) => {
    axios
      .put(`http://localhost:5555/task/title/${id}`, { task: title })
      .then((res) => console.log(res.data));
  };
  const handleDoneEdit = (id) => {
    axios.put(`http://localhost:5555/task/done/${id}`).then(location.reload());
  };
  const handleDoneRevers = (id) => {
    axios
      .put(`http://localhost:5555/task/done/reverse/${id}`)
      .then(location.reload());
  };
  const handleDelete=(id)=>{
    axios.delete(`http://localhost:5555/task/${id}`)
    .then(location.reload())
  }
  return (
    <div className="w-1/3 flex flex-col justify-center bg-gray-900 text-white p-4">
      <div className="flex justify-end">
        <FaRegWindowClose className="cursor-pointer" onClick={()=>setDetails(null)} />
      </div>

      {[data].map((item) => (
        <div
          key={item._id}
          className="flex flex-col justify-center items-center gap-4"
        >
          <div className="flex justify-between items-center">
            {taskEdit ? (
              <div className="flex justify-between items-center gap-14">
                {" "}
                <input
                  className="border-2 text-black"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  // value={item.task}
                />
                <button
                  onClick={() => handleTaskEdit(item._id)}
                  className="w-14 h-7 bg-red-500"
                >
                  Submit
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center gap-14">
                <p>Task : {item.task}</p>
                <FaEdit onClick={() => setTaskEdit(!taskEdit)} className="cursor-pointer" />
              </div>
            )}
          </div>
          <div className="flex">
            <p>Updated At : {new Date(item.createdAt).toLocaleString()}</p>
          </div>
          <div className="flex gap-3">
            <p>Status : {item.done ? "completed" : "Not Completed"}</p>
            <button
              onClick={() =>
                item.done
                  ? handleDoneRevers(item._id)
                  : handleDoneEdit(item._id)
              }
            >
              click here to change status
            </button>
          </div>
          <div className="w-full">
            <button onClick={()=>handleDelete(item._id)} className="w-full h-8 rounded-md bg-orange-500">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Task;
