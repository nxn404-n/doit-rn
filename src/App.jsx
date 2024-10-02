import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";

function App() {
  return (
    // className="bg-[#FAEBD7] w-3/4 h-4/5" apply this in desktop mode
    <div className='bg-[#FAEBD7] w-full h-full flex flex-col items-center'>
      <Navbar />
      <TodoList />
    </div>
  );
}

export default App;
