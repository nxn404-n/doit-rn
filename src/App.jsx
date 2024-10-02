import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import Authentication from './components/Authentication';

function App() {
  return (
    // className="bg-[#FAEBD7] w-3/4 h-4/5" apply this in desktop mode
    <div className='bg-[#D6D3C0] w-full h-full flex flex-col items-center'>
      <Navbar />
      <TodoList />
      <Authentication />
    </div>
  );
}

export default App;
