import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import "./territory.css";

const Territory = ({xBox, yBox, path, terId, data, params, clickHandler, selectedId}) => {
  const [click, setClick] = useState(0);
  const [color, setColor] = useState("white");
  const [fullPick, setFullPick] = useState(false);
  const users = useSelector(state=>state.users.collection);
  const territories = useSelector(state=>state.territories.collection);
  const name = params.name;
  const opac = "0.40";

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

  useEffect(()=>{
    setFullPick(!(territories.find((ter)=>ter.quantity === 0)))
  },[territories])

  console.log("%cFullPick", "font-size:20px; color: orange;", fullPick);

  const handleClick = async (e) => {
    console.log("%cClick", "font-size:20px; color: orange;", e.target.id);
    if(fullPick) {
      const ter = territories.find((ter)=>ter.name === e.target.id)
      const user = users.find((user)=>{return user?.name?.toLowerCase() === name });
      if(ter.user ===  user?._id) {
        clickHandler(e.target.id, data.id, user._id, user.color, (ter.quantity + 1));
        setColor(user.color);
        const qty = ter.quantity + 1;
        setClick(qty);
      }
      return;
    }
    else if(click > 0) {
      return;
    }

    if(name) {
      const user = users.find((user)=>{return user?.name?.toLowerCase() === name });
      if(user){ 
        clickHandler(e.target.id, data.id, user._id, user.color, 1);
        setColor(user.color);
        setClick(1);
      }
    }
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
