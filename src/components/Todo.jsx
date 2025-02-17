// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./Home.css";

// const Todos = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState("");
//   const userId = localStorage.getItem("userId");
//   console.log(userId)

//  useEffect(() => {
//   const storedUserId = localStorage.getItem("userId");
//   console.log(storedUserId,"storeduserid")
//   if (storedUserId) {
//     axios.get(`http://localhost:5000/todos/${storedUserId}`)
//       .then((res) => {
//         if(res.data){
//             setTodos(res.data)
//         console.log(res.data)
//         }else{
//             console.log("No todos found")
//             // handleAddTodo();
//         }
        
//       })
//       .catch((error) => console.error(error));
//   }
// }, []);



//   const handleInputChange = (e) => {
//     setNewTodo(e.target.value);
//   };

//   const handleAddTodo = async () => {
//     console.log("in handleaddtodo")
//     if (!newTodo.trim()) return alert("Please enter a valid todo!");
//     try {
//       const res = await axios.post("http://localhost:5000/todos/add", { userId, task: newTodo });
//       setTodos([...todos, res.data]);
//       setNewTodo("");
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   const handleRemoveTodo = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/todos/${id}`);
//       setTodos(todos.filter((todo) => todo._id !== id));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <h1 className="todoheading">Your Todos</h1>
//       <div className="todoinp">
//         <label>Enter Todo:</label>
//         <input type="text" placeholder="Enter your todo" value={newTodo} onChange={handleInputChange} required />
//         <button className="add" onClick={handleAddTodo}>Add</button>
//       </div>
//       <ul className="todolist">
//         {todos.map((todo) => (
//           <li key={todo._id}>
//             {todo.task} {todo.completed ? "✅" : "❌"}
//             <button className="remove" onClick={() => handleRemoveTodo(todo._id)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default Todos;




// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./Home.css";

// // const Todos = () => {
// //   const [todos, setTodos] = useState([]);
// //   const [newTodo, setNewTodo] = useState("");
// //   const userId = localStorage.getItem("userId");

// //   // Ensure userId exists before making a request
// //   useEffect(() => {
// //     if (!userId) {
// //       console.error("User ID not found in localStorage");
// //       return;
// //     }

// //     const fetchTodos = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:5000/todos/${userId}`);
// //         setTodos(response.data);
// //       } catch (error) {
// //         console.error("Error fetching todos:", error);
// //       }
// //     };

// //     fetchTodos();
// //   }, [userId]);

// //   const handleInputChange = (e) => {
// //     setNewTodo(e.target.value);
// //   };

// //   const handleAddTodo = async () => {
// //     if (!newTodo.trim()) {
// //       alert("Please enter a valid todo!");
// //       return;
// //     }
// //     try {
// //       const response = await axios.post("http://localhost:5000/todo", {
// //         userId,
// //         task: newTodo,
// //       });

// //       setTodos([...todos, response.data.todo]);
// //       setNewTodo("");
// //     } catch (error) {
// //       console.error("Error adding todo:", error);
// //     }
// //   };

// //   const handleRemoveTodo = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/todo/${id}`);
// //       setTodos(todos.filter((todo) => todo._id !== id));
// //     } catch (error) {
// //       console.error("Error deleting todo:", error);
// //     }
// //   };

// //   return (
// //     <>
// //       <h1 className="todoheading">Your Todos</h1>
// //       <div className="todoinp">
// //         <label>Enter Todo:</label>
// //         <input
// //           type="text"
// //           placeholder="Enter your todo"
// //           value={newTodo}
// //           onChange={handleInputChange}
// //           required
// //         />
// //         <button className="add" onClick={handleAddTodo}>
// //           Add
// //         </button>
// //       </div>
// //       <ul className="todolist">
// //         {todos.map((todo) => (
// //           <li key={todo._id}>
// //             {todo.task} {todo.completed ? "✅" : "❌"}
// //             <button className="remove" onClick={() => handleRemoveTodo(todo._id)}>
// //               Remove
// //             </button>
// //           </li>
// //         ))}
// //       </ul>
// //     </>
// //   );
// // };

// // export default Todos;






import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/todos/${userId}`)
        .then((res) => {
          setTodos(res.data);
        })
        .catch((error) => console.error("Error fetching todos:", error));
    }
  }, [userId]); // Runs when userId changes

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return alert("Please enter a valid todo!");

    try {
      const res = await axios.post("http://localhost:5000/todos/add", { userId, task: newTodo });
      setTodos([...todos, res.data]); // Append the new todo from MongoDB
      setNewTodo(""); // Clear input field
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleRemoveTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id)); // Remove from UI after deletion
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      <h1 className="todoheading">Your Todos</h1>
      <div className="todoinp">
        <label>Enter Todo:</label>
        <input type="text" placeholder="Enter your todo" value={newTodo} onChange={handleInputChange} required />
        <button className="add" onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="todolist">
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task} {todo.completed ? "✅" : "❌"}
            <button className="remove" onClick={() => handleRemoveTodo(todo._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
