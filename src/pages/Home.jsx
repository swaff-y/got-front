import React, { useEffect, useState } from 'react';
import "./home.css";
import Territory from '../components/Territory';
import { useNavigate, useParams } from 'react-router';
import { getUsers, getTerritories, setTerritory, getGame, setGame, setUser } from '../redux/apiCall';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// const Button = styled.button`
//   position: absolute;
//   top: 10px;
//   left: 10px;
//   color: green;
// `
const ButtonText = styled.span`
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  &:after {
    content: "\\00bb";
    position: absolute;
    opacity: ${ props=>props.opc };
    top: 0;
    right: ${ props=>props.rt }px;
    transition: 0.5s;
  }
`

const Button = styled.button`
  position: absolute;
  top: 20px;
  left: 120px;
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  padding: 10px;
  width: 170px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;

  &:hover ${ButtonText} {
    padding-right: 25px;
  }
`
const UserColors = styled.div`
  position: absolute;
  top: 40px;
  left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const UserContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

const NextPlayer = styled.div`
  background: red;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-left: 10px;
`

const UserColor = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 4px;
  color: black;
  width: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

const CountDisp = styled.span`
width: 28px;
height: 28px;
text-align: center;
color: white;
font-weight: 800;
border: 1px solid white;
border-radius: 50%;
background-color: black;
display: flex;
align-items: center;
justify-content: center;
margin-left: 5px;
`

const Home = (props) => {
  const params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(state=>state.users.collection);
  const territories = useSelector(state=>state.territories.collection);
  const game = useSelector(state=>state.game.collection);
  const [selectedId, setSelectedId] = useState("");
  const [selectedTer, setSelectedTer] = useState({});
  const [nextUser, setNextUser] = useState("");
  const [opc, setOpc] = useState("0");
  const [rt, setRt] = useState("-15");

  useEffect(()=>{
    getUsers(dispatch);
    getTerritories(dispatch);
    getGame(dispatch)
  },[dispatch])

  useEffect(()=>{
    setNextUser(game[0]?.turn);
  },[game])

  const clickHandler = (terId, dataId, userId, userColor, qty) => {
    setSelectedId(terId);
    setSelectedTer({
      dataId,
      userId,
      userColor,
      qty
    })
  }

  const saveTerritory = async () => {
    setOpc("0"); setRt("-5");
    const ter = await setTerritory(selectedTer.dataId, {
      user: selectedTer.userId, 
      color: selectedTer.userColor, 
      quantity: selectedTer.qty
    });

    if(ter){
      const userIndex = game[0]?.gameOrder.indexOf(nextUser);
      const user = users.find((usr)=>usr._id === selectedTer.userId);
      let nextTurn;
      if((userIndex + 1) === game[0]?.gameOrder.length)
        nextTurn = game[0].gameOrder[0];
      else
        nextTurn = game[0].gameOrder[userIndex + 1];
      
      setGame(game[0]._id, { turn: nextTurn, saveCount: (game[0].saveCount + 1) }, ()=>{getGame(dispatch);})
      setUser(selectedTer.userId, (user.quantity - 1), ()=>{getUsers(dispatch);});
      setSelectedId("");
      navigate("/", {replace: true});
      getTerritories(dispatch);
      // getGame(dispatch);
    } 
  }

  const handleMove = (e) => {
    e.stopPropagation();
    const userName = e.target.getAttribute("action");
    navigate("/" + userName?.toLowerCase(), {replace: true});
  }


  // console.log("users", users);
  // console.log("params", params?.name);
  // console.log("territories", territories);
  // console.log("Game", game);
  // console.log("nextUser", nextUser);
  // console.log("Index", game[0].gameOrder , game[0]?.gameOrder.indexOf(nextUser));
  console.log("Selected:", opc);

   return(
    <div
      className="home__container"
      data-test="component-home"
    >
        <svg id="map" width="660px" height="1000px" border="1px solid orange">

        {
            territories.map((territory,index)=><Territory 
              key={territory._id} 
              xBox={territory.xBox} 
              yBox={territory.yBox} 
              path={territory.pathData} 
              terId={territory.name}
              data={{
                id: territory._id,
                color: (selectedTer && (territory._id === selectedTer.dataId) ) ? selectedTer.userColor : territory.color,
                quantity: (selectedTer && (territory._id === selectedTer.dataId) ) ? selectedTer.qty : territory.quantity,
                user: territory.user
              }}
              params={params}
              clickHandler={clickHandler}
              selectedId={selectedId}
            />)
        }

        </svg>

        {
          ((params.name?.toLowerCase() === game[0]?.turn?.toLowerCase()) && users.find((usr)=>usr.quantity > 0)) 
          && 
          <Button 
            onClick={saveTerritory} 
            disabled={(selectedId === "")}
            onMouseOver={()=>{setOpc("1"); setRt("0")}}
            onMouseOut={()=>{setOpc("0"); setRt("-5")}}
          >
            <ButtonText opc={opc} rt={rt}>
              Save Selection
            </ButtonText>
          </Button>
        }

        {
          <UserColors>
            {
              game[0]?.gameOrder.map((user, index)=> 
              <UserContainer
                key={index}
              >
                <UserColor 
                  style={ { backgroundColor: users.find((usr)=>usr.name === user)?.color } }
                  action={user}
                  onClick={(nextUser?.toLowerCase() === user?.toLowerCase()) ? handleMove : undefined}
                >
                  <span action={user}>
                    { user }
                  </span>
                  <CountDisp action={user}> 
                    { users.find((usr)=>usr.name === user)?.quantity }
                  </CountDisp>
                </UserColor>
                {
                  (nextUser?.toLowerCase() === user?.toLowerCase())
                  &&
                  <NextPlayer/>
                }
              </UserContainer>)
            } 
          </UserColors>
          
        }
        
    </div>
   )
 }

export default Home;