import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import Authentication from "./components/Authentication";
import { useEffect, useState } from "react";

function App() {
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
    // className="bg-[#FAEBD7] w-3/4 h-4/5" apply this in desktop mode
    <div className='bg-[#D6D3C0] w-full h-full flex flex-col items-center'>
      <Navbar />
      <TodoList
        setLoggedIn={setLoggedIn}
        setSignUp={setSignUp}
        loggedIn={loggedIn}
      />
      {loggedIn === false && (
        <Authentication
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          signUp={signUp}
          setSignUp={setSignUp}
        />
      )}
    </div>
  );
}

export default App;
