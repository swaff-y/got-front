import React, { useEffect } from 'react';
import "./home.css";
import Territory from '../components/Territory';
import { useParams } from 'react-router';
import { getUsers, getTerritories } from '../redux/apiCall';
import { useDispatch, useSelector } from "react-redux";

const Home = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const users = useSelector(state=>state.users.collection);
  const territories = useSelector(state=>state.territories.collection);

  useEffect(()=>{
    getUsers(dispatch);
    getTerritories(dispatch);
  },[dispatch])

  console.log("users", users);
  console.log("params", params?.name);
  console.log("territories", territories);

   return(
    <div
      className="home__container"
      data-test="component-home"
    >
        <svg id="map" width="660px" height="1000px" border="1px solid orange">

        {
            territories.map((territory,index)=><Territory key={index} xBox={territory.xBox} yBox={territory.yBox} path={territory.pathData} terId={territory.name} />)
        }

        </svg>
    </div>
   )
 }

export default Home

// {
//   territories.map((territory,index)=><Territory xBox={territory.xBox} yBox={territory.yBox} path={eval(territory.name)} terId={territory.name} />)
// }