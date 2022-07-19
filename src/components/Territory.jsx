import React, {useEffect, useState} from 'react';
import "./territory.css";

const Territory = ({xBox, yBox, path, terId}) => {
  const [click, setClick] = useState(0);

  const stk = "gray";
  const opac = "0.40";

  const handleClick = (e) => {
    console.log("%cClick", "font-size:20px; color: orange;", e.target.id);
    let up = click + 1;
    setClick(up)
  }

   return(
          <g>
            {
              click === 0
              ?
              <path fill="white" fillOpacity="0.00" d={path} id={terId} className="selections" onClick={handleClick}></path>
              :
              <>
              <foreignObject x={xBox} y={yBox} width="20" height="20">
                <div xmlns="http://www.w3.org/1999/xhtml">
                  <div className = "unitCounter">
                    {click}
                  </div>
                </div>
                </foreignObject>
                <path fill="white" fillOpacity={opac} d={path} id={terId} className="selections" onClick={handleClick}></path>
              </>
            }

          </g>
   )
 }

export default Territory
