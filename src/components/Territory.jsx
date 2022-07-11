import React, {useEffect, useState} from 'react';
import "./territory.css";

const Territory = ({xBox, yBox, path, terId}) => {
  const [click, setClick] = useState(0);

  const stk = "green";
  const opac = "0.00";

  const handleClick = (e) => {
    // console.log("%cClick", "font-size:20px; color: orange;", e.target.id);
    let up = click + 1;
    setClick(up)
  }

   return(
          <g>
            {
              click === 0
              ?
              <path fill="red" fillOpacity={opac} stroke={stk} d={path} id={terId} className="selections" onClick={handleClick}></path>
              :
              <>
              <foreignObject x={xBox} y={yBox} width="20" height="20">
                <div xmlns="http://www.w3.org/1999/xhtml">
                  <div style={{border: "1px solid red", color: "red", background: "white"}}>
                    {click}
                  </div>
                </div>
                </foreignObject>
                <path fill="red" fillOpacity={opac} stroke={stk} d={path} id={terId} className="selections" onClick={handleClick}></path>
              </>
            }

          </g>
   )
 }

export default Territory
