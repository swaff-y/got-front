import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { setTerritory } from '../redux/apiCall';
import "./territory.css";

const Territory = ({xBox, yBox, path, terId, data, params, clickHandler, selectedId}) => {
  const [click, setClick] = useState(0);
  const [color, setColor] = useState("white");
  const users = useSelector(state=>state.users.collection);
  const name = params.name;

  useEffect(()=>{
    if(data.quantity > 0){
      setClick(data.quantity);
      setColor(data.color);
    }
  },[data])

  useEffect(()=>{
    if(terId !== selectedId) {
      setClick(data.quantity);
      setColor(data.color);
    }
  },[selectedId])

  const stk = "gray";
  const opac = "0.40";

  const handleClick = async (e) => {
    // console.log("%cClick", "font-size:20px; color: orange;", e.target.id);
    
    if(click > 0) return;
    let up;
    if(name) {
      const user = users.find((user)=>{return user?.name?.toLowerCase() === name });
      if(user){ 
        clickHandler(e.target.id, data.id, user._id, user.color, 1);
        setColor(user.color);
        setClick(1);
      }
    }
  }

  const saveTerritory = async (user) => {
    const ter = await setTerritory(data.id, {user: user._id, color: user.color, quantity: 1});
  }

   return(
          <g>
            {
              click === 0
              ?
              <path 
                fill={color} 
                fillOpacity="0.00" 
                d={path} 
                id={terId} 
                className="selections" 
                onClick={handleClick}
              ></path>
              :
              <>
              <foreignObject x={xBox} y={yBox} width="20" height="20">
                <div xmlns="http://www.w3.org/1999/xhtml">
                  <div className = "unitCounter">
                    {click}
                  </div>
                </div>
                </foreignObject>
                <path 
                  fill={color} 
                  fillOpacity={opac} 
                  d={path} 
                  id={terId} 
                  className="selections" 
                  onClick={handleClick}
                ></path>
              </>
            }

          </g>
   )
 }

export default Territory
