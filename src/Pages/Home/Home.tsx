import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://ohegciuzbnobpqonduik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZWdjaXV6Ym5vYnBxb25kdWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTA5MzAsImV4cCI6MjA2MDI4NjkzMH0.bH8Tmh0EuxzkUk0-mum6EU-tCeWJjRz2ZFHIpZ_9u0Y"
);
import { useNavigate } from "react-router-dom";
import { IoSearch, IoTrashBin } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";
import "./Home.css";
import "../../App.css";

const Home = () => {
  const [, setInput] = useState("");
  const [, setDueDate] = useState("");
  const [, setPriorityValues] = useState(0);
  const [values] = useState(false);
  const [sortBy, setSortBy] = useState("priority");

  const [showAddPopup, setAddShowPopup] = useState(false);
  const [, setEditShowPopup] = useState(false);

  const [editTaskData, setEditTaskData] = useState<any>(null);

  const [tasks, setTasks] = useState<
    {
      id: number;
      item: string;
      completed: boolean;
      task_due_date: string;
      priority: number;
    }[]
  >([]);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const checkUser = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    console.log(session);
    if (error) {
      console.log(error);
    }
    if (!session) {
      navigate("/intro");
    }
  };
  useEffect(() => {
    checkUser();
    if (sortBy === "priority") {
      getTasks("priority", false);
    } else if (sortBy === "dueDate") {
      getTasks("dueDate", false);
    } else if (sortBy === "alpha") {
      getTasks("alpha", true);
    }
  }, [sortBy]);

  async function getTasks(sortField = "priority", ascending = false) {
    var toSort;
    if (sortField === "dueDate") {
      toSort = "task_due_date";
    } else if (sortField === "alpha") {
      toSort = "item";
    } else {
      toSort = "priority";
    }

    const { data, error } = await supabase
      .from("tasks")
      .select()
      .order(toSort, { ascending });

    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data);
    }
  }

  const add = async (
    e: React.FormEvent,
    taskItem: string,
    due: string,
    priority: number
  ) => {
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
      priority: priority,
      task_due_date: due,
    };

    const { data, error } = await supabase.from("tasks").upsert([newTask]);

    if (error) {
      console.error("Error posting data:", error);
      return;
    }

    console.log("Data posted successfully:", data);

    setInput("");
    await getTasks("priority", false);
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
    await getTasks("priority", false);
  };

  const deleteTask = async (id: number) => {
    const response = await supabase.from("tasks").delete().eq("id", id);
    console.log("Response", response);
    await getTasks("priority", false);
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
      .textSearch("item", searchValue);

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
        })}{" "}
        - {task.priority}
        <button className="btn2 editBtn" onClick={() => editPopUp(task)}>
          <FaRegEdit />
        </button>
        <button className="btn2 deleteBtn" onClick={() => deleteTask(task.id)}>
          <IoTrashBin />
        </button>
      </li>
    );
  });

  const AddTasksPopUp = React.memo(() => {
    return (
      <div>
        <button onClick={() => setAddShowPopup(true)} className="btn1">
          Add Task
        </button>

        {showAddPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2 style={{ color: "white" }}>Add a task</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const taskInput = formData.get("taskInput") as string;
                  const dateInput = formData.get("dueDate") as string;
                  const priorityInput = Number(formData.get("priority"));

                  setInput(taskInput);
                  setDueDate(dateInput);
                  setPriorityValues(priorityInput);
                  add(e, taskInput, dateInput, priorityInput);
                  setAddShowPopup(false);
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
                <input
                  type="number"
                  name="priority"
                  placeholder="Priority"
                  className="input"
                  defaultValue=""
                />
                <br />
                <button className="btn1" type="submit">
                  +
                </button>
              </form>
              <button onClick={() => setAddShowPopup(false)} className="btn2">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  });

  const editPopUp = (task: any) => {
    setEditTaskData(task);
    setEditShowPopup(true);
  };

  const EditTasksPopUp = React.memo(() => {
    if (!editTaskData) return null;
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2 style={{ color: "white" }}>Edit Task</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updatedTask = {
                item: formData.get("taskInput"),
                task_due_date: formData.get("dueDate"),
                priority: Number(formData.get("priority")),
              };

              const { error } = await supabase
                .from("tasks")
                .update(updatedTask)
                .eq("id", editTaskData.id);

              if (error) {
                console.error("Error updating task:", error);
              } else {
                setEditShowPopup(false);
                setEditTaskData(null);
                await getTasks(sortBy, false);
              }
            }}
          >
            <input
              name="taskInput"
              type="text"
              className="input"
              defaultValue={editTaskData.item}
            />
            <input
              name="dueDate"
              type="date"
              className="input"
              defaultValue={editTaskData.task_due_date}
            />
            <input
              type="number"
              name="priority"
              className="input"
              defaultValue={editTaskData.priority}
            />
            <br />
            <button className="btn1" type="submit">
              Save
            </button>
          </form>
          <button onClick={() => setEditShowPopup(false)} className="btn2">
            Close
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 className="inlineBlock">Todo App</h1>
      <button className="btn2 signOutBtn" onClick={signOut}>
        <FaSignOutAlt />
      </button>
      <div className="container">
        <div>
          <AddTasksPopUp />
          <EditTasksPopUp />
        </div>
        <h2 className="tasksToDoText inlineBlock white">Tasks to do</h2>
        <p className="sortText inlineBlock white">Sort by:</p>
        <select
          className="dropdown "
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
          <option value="alpha">Alphabetical order</option>
        </select>
        <form onSubmit={searchTask} className="searchContainer">
          <input
            type="text"
            placeholder="Search a task"
            className="input inlineBlock"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="btn1 searchBtn inlineBlock" type="submit">
            <IoSearch />
          </button>
          <button
            className="btn1 resetBtn inlineBlock"
            onClick={() => {
              setSearchValue("");
              getTasks("priority", false);
            }}
          >
            <RiResetLeftLine />
          </button>
        </form>
        <ul className="items">{listTasks}</ul>
      </div>
    </div>
  );
};

export default Home;
