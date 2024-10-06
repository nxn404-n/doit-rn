import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import Authentication from "./components/Authentication";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import AccountCenter from "./components/AccountCenter";

function App() {
  // decides if its gonna show the todo list or not
  const [showTodo, setShowTodo] = useState(false);

  // decides if its gonna show the account center or not
  const [showAccCenter, setShowAccCenter] = useState(false);

  // If its true thn shows the signup form and if its false thn shows the login form
  const [signUp, setSignUp] = useState(true);

  const [loggedIn, setLoggedIn] = useState(() => {
    // Lazy intialization in useState to check if there are any loggedIn data in localStorage when the component first reneders
    try {
      const savedLoginData = localStorage.getItem("loggedIn");
      return savedLoginData ? JSON.parse(savedLoginData) : false;
    } catch (error) {
      console.error("Error parsing userData from localStorage", error);
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  return (
    <div className='bg-[#D6D3C0] w-full h-full'>
      <Navbar />
      {/* className="bg-[#FAEBD7] w-3/4 h-4/5" apply this in desktop mode */}
      <div className=' w-full h-full flex border-2 border-black'>
        <Sidebar
          setShowTodo={setShowTodo}
          setShowAccCenter={setShowAccCenter}
        />

        {showTodo && <TodoList loggedIn={loggedIn} />}

        {showAccCenter && (
          <AccountCenter
            setLoggedIn={setLoggedIn}
            setSignUp={setSignUp}
            loggedIn={loggedIn}
            showTodo={showTodo}
          />
        )}

        {loggedIn === false && (
          <Authentication
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            signUp={signUp}
            setSignUp={setSignUp}
            setShowTodo={setShowTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
