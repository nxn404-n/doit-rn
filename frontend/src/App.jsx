import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import Authentication from "./components/Authentication";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import AccountCenter from "./components/AccountCenter";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // decides if its gonna show the todo list or not
  const [showTodo, setShowTodo] = useState(true);

  // decides if its gonna show the account center or not
  const [showAccCenter, setShowAccCenter] = useState(false);

  // If its true thn shows the signup form and if its false thn shows the login form
  const [signUp, setSignUp] = useState(true);

  // Shows if user logged in or not
  const [loggedIn, setLoggedIn] = useState(false);

  // Save user data
  const [user, setUser] = useState({});

  // Function to authenticate
  const checkUserAuth = async () => {
    try {
      // Send a request to the protected route to check if the user is still logged in
      const response = await axios.get(
        "https://doit-rn-backend.onrender.com/api/auth",
        { withCredentials: true },
      );

      // If the response is successful, the user is logged in and the user data is saved
      setUser(response.data);
      setLoggedIn(true);
    } catch {
      // If authentication fails thn it asks user to login again
      setLoggedIn(false);
      setShowTodo(false);
    }
  };

  // Fetches loggedIn data from localStorage and authenticates the user
  useEffect(() => {
    checkUserAuth();
    const loggedInData = localStorage.getItem("loggedIn");
    if (loggedInData === "true") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center border-2 border-black bg-[#D6D3C0] sm:h-4/5 sm:w-3/4">
      <Navbar />
      <div className="flex h-full w-full gap-6">
        {loggedIn && (
          <Sidebar
            setShowTodo={setShowTodo}
            setShowAccCenter={setShowAccCenter}
          />
        )}

        {showTodo && user && loggedIn && (
          <TodoList
            loggedIn={loggedIn}
            userData={user}
          />
        )}

        {showAccCenter && (
          <AccountCenter
            setSignUp={setSignUp}
            loggedIn={loggedIn}
            showTodo={showTodo}
            user={user}
            setUser={setUser}
            setLoggedIn={setLoggedIn}
          />
        )}

        {loggedIn === false && (
          <Authentication
            signUp={signUp}
            setSignUp={setSignUp}
            setShowTodo={setShowTodo}
            setLoggedIn={setLoggedIn}
          />
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
