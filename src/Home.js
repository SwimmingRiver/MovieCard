import { getMovies } from './api';
import {useQuery} from 'react-query';
import { makeImgPath } from './util';
import styled from 'styled-components';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useContext, React } from 'react';
import { BoxContext } from './context';

const Card = styled.div`  
    background-image: url(${(props)=>props.bgPhoto});
    background-size:cover;
    background-position: center;
    border: solid 3px burlywood;
    border-radius: 2em;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 10vh;
    width: 18vw;
    box-shadow: 5px 5px 5px 5px black;
    position: absolute;
`;
const Box =styled.div`
    border: solid 5px slategray;
    border-radius: 2em;
    height: 30vh;
    width: 30vw;
    text-align: center;
`
const CardTitle= styled.h1`
    color: white;
    font-size: 30px;
    text-align: center;
`;
const CardText= styled.h2`
    color: white;
    text-align: center;
    font-size: 10px;
`;
const AllSection = styled.div`
    display: flex;
    border: solid 3px blue;
    width: 95vw;
    background-color: whitesmoke;

`;
const PartSection = styled.div`
    border: solid 1px black;
`;

function Home(){
    const {boxState,setBoxState}=useContext(BoxContext);
 const {data,isLoading}=useQuery(["movies","nowPlaying"],getMovies)
    // console.log(data,isLoading);
 return(
        <div>{isLoading?
            <h1>Loading...</h1>: (
            <>
            <h1>Home</h1>
            
            <AllSection>
             
                    <PartSection>
                       <Droppable droppableId='Like'>{
                       (provided)=><Box ref={provided.innerRef} {...provided.droppableProps}>
                        Like
                        {boxState['Like'].map( (item,index)=><Draggable draggableId={item} key={index} index={index}>  
                        {(provided)=><Card 
                                ref={provided.innerRef} 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        bgPhoto={makeImgPath(data?.results[item].backdrop_path||"")}
                        >
                    <CardTitle>{data?.results[item].title}</CardTitle>
            {/* <CardText>{data?.results[index].overview}</CardText> */}
        </Card>}
        </Draggable>)}
                        </Box>
                       }
                       </Droppable>
                       <Droppable droppableId='DisLike'>{
                       (provided)=><Box ref={provided.innerRef} {...provided.droppableProps}>
                        DisLike
                        {boxState['DisLike'].map( (item,index)=><Draggable draggableId={item} key={index} index={index}>  
                        {(provided)=><Card 
                                ref={provided.innerRef} 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        bgPhoto={makeImgPath(data?.results[item].backdrop_path||"")}
                        >
                    <CardTitle>{data?.results[item].title}</CardTitle>
            {/* <CardText>{data?.results[item].overview}</CardText> */}
        </Card>}
        </Draggable>)}
                        </Box>
                       }
                       </Droppable>
                    </PartSection>
                
  
    <PartSection>
        <Droppable droppableId='Box'>
        {(provided)=><Box ref={provided.innerRef} {...provided.draggableProps}>
       {boxState['Deck'].map( (item,index)=><Draggable draggableId={item} key={index} index={index}>  
              {(provided)=><Card 
              ref={provided.innerRef} 
              {...provided.draggableProps}
               {...provided.dragHandleProps}
                bgPhoto={makeImgPath(data?.results[item].backdrop_path||"")}>
            <CardTitle>{data?.results[item].title}</CardTitle>
            {/* <CardText>{data?.results[index].overview}</CardText> */}
        </Card>}
        </Draggable>)}
        </Box>}
          </Droppable>
        </PartSection>
  
    <PartSection>
        <Box>willwatch</Box>
        <Box>x</Box>
    </PartSection>

</AllSection>
            </>
            )}</div>
    )
}
export default Home;