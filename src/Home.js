import { getMovies } from './api';
import {useQuery} from 'react-query';
import { makeImgPath } from './util';
import styled from 'styled-components';
import { Draggable, Droppable } from "react-beautiful-dnd";

const Card = styled.div`  
    background-image: url(${(props)=>props.bgPhoto});
    background-size:cover;
    background-position: center;
    border: solid 3px burlywood;
    border-radius: 2em;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 40vh;
    width: 15vw;
    box-shadow: 5px 5px 5px 5px black;
    position: absolute;
`;
const Box =styled.div`
    border: solid 5px slategray;
    border-radius: 2em;
    height: 30vh;
    width: 30vw;
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
 const {data,isLoading}=useQuery(["movies","nowPlaying"],getMovies)
    console.log(data,isLoading);
 return(
        <div>{isLoading?
            <h1>Loading...</h1>: (
            <>
            <h1>Home</h1>
            
            <AllSection>
             
                    <PartSection>
                       <Droppable draggableId='Like'>{
                       (provided)=><Box ref={provided.innerRef} {...provided.droppableProps}>LIke</Box>}
                       </Droppable>
                       <Droppable draggableId='DisLike'>{(provided)=> <Box ref={provided.innerRef} {...provided.droppableProps}>
                        DisLIke</Box>}
                        </Droppable>
                    </PartSection>
                
  
    <PartSection>
        <Droppable droppableId='Box'>
        {(provided)=><Box ref={provided.innerRef} {...provided.draggableProps}>
       {["0","1","2","3","4","5","6"].map( (item,index)=><Draggable draggableId={item}>  
              {(provided)=><Card 
              ref={provided.innerRef} 
              {...provided.draggableProps}
               {...provided.dragHandleProps}
                bgPhoto={makeImgPath(data?.results[index].backdrop_path||"")}>
            <CardTitle>{data?.results[index].title}</CardTitle>
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