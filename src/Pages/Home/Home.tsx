import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://ohegciuzbnobpqonduik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZWdjaXV6Ym5vYnBxb25kdWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTA5MzAsImV4cCI6MjA2MDI4NjkzMH0.bH8Tmh0EuxzkUk0-mum6EU-tCeWJjRz2ZFHIpZ_9u0Y"
);
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import "./Home.css"
import "../../App.css";


const Home = () => {
  const [input, setInput] = useState("");
  const [values, setValues] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [tasks, setTasks] = useState<
    { id: number; item: string; completed: boolean; task_due_date: string }[]
  >([]);
  const [searchValue, setSearchValue] = useState("");
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();


  const checkUser = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    console.log(session);
    if (!session) {
      navigate("/intro");
    }
  };
  useEffect(() => {
    getTasks();
    checkUser();
  }, []);

  async function getTasks() {
    const { data, error } = await supabase.from("tasks").select();
    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data);
    }
  }

  const add = async (e: React.FormEvent, taskItem: string, due: string) => {
    e.preventDefault();

    if (taskItem.trim() === "") return;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not authenticated", userError);
      return;
    }

    const newTask = {
      user_id: user.id,
      item: taskItem,
      completed: values,
      task_due_date: due,
    };

    const { data, error } = await supabase.from("tasks").upsert([newTask]);

    if (error) {
      console.error("Error posting data:", error);
      return;
    }

    console.log("Data posted successfully:", data);

    setInput(""); // You can remove this if you're not using controlled inputs anymore
    await getTasks();
  };


  const taskCompleted = async (id: number) => {
    console.log(id);
    async function completed() {
      const { data } = await supabase
        .from("tasks")
        .select("completed")
        .eq("id", id);
      if (data) {
        const boolValue = data[0].completed;
        if (boolValue === false) {
          const { data, error } = await supabase
            .from("tasks")
            .update({ completed: true })
            .eq("id", id);

          if (error) {
            console.error("Error posting data:", error);
            return;
          }

          console.log("Data posted successfully:", data);
        } else {
          const { data, error } = await supabase
            .from("tasks")
            .update({ completed: false })
            .eq("id", id);

          if (error) {
            console.error("Error posting data:", error);
            return;
          }

          console.log("Data posted successfully:", data);
        }
      }
    }
    await completed();
    await getTasks();
  };

  const deleteTask = async (id: number) => {
    const response = await supabase.from("tasks").delete().eq("id", id);
    console.log("Response", response);
    await getTasks();
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error signing out: ", error);
    }

    navigate("/signIn");

  };

  const searchTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .ilike("item", searchValue);

    if (error) {
      console.log("Error searching task: ", error);
    } else {
      console.log("Result: ", data);
      setTasks(data);
    }
  };


const listTasks = tasks.map((task) => {
  const isOverdue =
    !task.completed && new Date(task.task_due_date) < new Date();

  return (
    <li
      key={task.id}
      style={{
        textDecoration: task.completed ? "line-through" : "none",
        color: task.completed ? "#888" : isOverdue ? "red" : "white",
        fontWeight: isOverdue ? "bold" : "normal",
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => taskCompleted(task.id)}
        style={{ marginLeft: "10px" }}
      />
      {task.item} -{" "}
      {new Date(task.task_due_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}
      <button className="btn2" onClick={() => deleteTask(task.id)}>
        🗑️
      </button>
    </li>
  );
});
  
  const PopUp = React.memo(() => {
    return (
      <div>
        <button onClick={() => setShowPopup(true)} className="btn1">
          Add Task
        </button>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2 style={{ color: "white" }}>Add a task</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const taskInput = formData.get("taskInput") as string;
                  const dateInput = formData.get("dueDate") as string;
                  setInput(taskInput);
                  setDueDate(dateInput);
                  add(e, taskInput, dateInput);
                  setShowPopup(false); 
                }}
              >
                <input
                  name="taskInput"
                  type="text"
                  className="input"
                  
                  defaultValue=""
                  placeholder="Add a new Task"
                />
                <input
                  name="dueDate"
                  
                  type="date"
                  className="input"
                  placeholder="Enter Due Date"
                  
                  defaultValue=""
                />
                <br />
                <button
                  className="btn1"
                  
                  type="submit"
                >
                  +
                </button>
              </form>
              <button onClick={() => setShowPopup(false)} className="btn2">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  });

  return (
    <div>
      <h1>Todo App</h1>
      <div className="container">
        <div>

          <PopUp />
        </div>
        <h2 style={{color: "white"}}>Tasks to do</h2>
        <form onSubmit={searchTask}>
          <input
            type="text"
            placeholder="Search a task"
            className="input"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="btn1" type="submit">
            Search
          </button>
          <button className="btn1" onClick={getTasks}>
            Reset
          </button>
        </form>

        <button className="btn2" onClick={signOut}>
          Sign Out
        </button>
        <ul className="items">{listTasks}</ul>
      </div>
    </div>
  );
};

export default Home;
