
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { BoxContext } from "./context";
import Home from "./Home";


function App() {
 const [boxState,setBoxState]=useState({
  Like:[],
  DisLike:[],
  willWatch:[],
  never:[],
  Deck:['0','1','2','3','4','5']
 })
  const onDragEnd = (info)=>{
    const {destination,draggableId,source}=info;
    console.log(info);
    if(!destination){return;}

    if(destination.droppableId !== source.draggableId){
      setBoxState((allBoards)=>{
        console.log(boxState["Deck"]);
        const sourceBoard = [...allBoards[source.droppableId]];
        const destiBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index,1);
        destiBoard.splice(destination.index,0,draggableId);
        return{
          ...allBoards,
          [source.draggableId]:sourceBoard,
          [destination?.droppableId]:destiBoard,
        }
      })
    }
  }
  return (
    <div className="App">
      <BoxContext.Provider value={{boxState,setBoxState}}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Home/>
        </DragDropContext>
        </BoxContext.Provider>
    </div>
  );
}

export default App;
