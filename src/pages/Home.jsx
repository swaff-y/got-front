import React, { useEffect, useState } from 'react';
import "./home.css";
import Territory from '../components/Territory';
import { useNavigate, useParams } from 'react-router';
import { getUsers, getTerritories, setTerritory, getGame } from '../redux/apiCall';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  color: green;
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
    const ter = await setTerritory(selectedTer.dataId, {user: selectedTer.userId, color: selectedTer.userColor, quantity: selectedTer.qty});
    if(ter){
      let userIndex = game[0]?.gameOrder.indexOf(nextUser);
      navigate("/", {replace: true});
    } 
  }


  // console.log("users", users);
  // console.log("params", params?.name);
  // console.log("territories", territories);
  console.log("Game", game);
  console.log("nextUser", nextUser);
  console.log("Index", game[0].gameOrder , game[0]?.gameOrder.indexOf(nextUser));
  console.log("Selected:", selectedId, selectedTer);

   return(
    <div
      className="home__container"
      data-test="component-home"
    >
        <svg id="map" width="660px" height="1000px" border="1px solid orange">

        {
            territories.map((territory,index)=><Territory 
              key={index} 
              xBox={territory.xBox} 
              yBox={territory.yBox} 
              path={territory.pathData} 
              terId={territory.name}
              data={{
                id: territory._id,
                color: territory.color,
                quantity: territory.quantity,
                user: territory.user
              }}
              params={params}
              clickHandler={clickHandler}
              selectedId={selectedId}
            />)
        }

        </svg>

        {
          (params.name?.toLowerCase() === game[0]?.turn?.toLowerCase()) && <Button onClick={saveTerritory}>Save Selection</Button>
        }

        {
          <UserColors>
            {
              users.map((user)=> 
              <UserContainer>
                <UserColor style={{ backgroundColor: user.color }}>{ user.name }</UserColor>
                {
                  (nextUser?.toLowerCase() === user.name?.toLowerCase())
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