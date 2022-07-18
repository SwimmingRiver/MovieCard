
import { DragDropContext } from "react-beautiful-dnd";
import Home from "./Home";


function App() {
  const onDragEnd = ()=>{}
  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <Home/>
        </DragDropContext>
    </div>
  );
}

export default App;
