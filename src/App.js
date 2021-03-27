import { useState, useEffect } from "react"; //usEffect loads API when page loads
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
// import { stringify, v4 as uuidv4 } from "uuid";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    //runs when page loads
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []); //empty array is dependancy

  //Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  //Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  //Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json", //specifies data type
      },
      body: JSON.stringify(task), //changes data from JS object to JSON
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = uuidv4();
    // const newTask = {
    //   id,
    //   ...task,
    // };
    // setTasks([...tasks, newTask]);
  };

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" }); //goes to task server and then uses method DELETE
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
  };

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updtask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/JSON",
      },
      body: JSON.stringify(updtask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  //Toggle Add
  const showAdd = () => {
    setShowAddTask(!showAddTask);
  };



  return (
    <Router>
      <div className="container">
        <Header onAdd={showAdd} showAddTask={showAddTask} />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask ? <AddTask onAdd={addTask} /> : ""}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                <h3>You have completed all your tasks!</h3>
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
