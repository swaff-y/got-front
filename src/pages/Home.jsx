import React, { useEffect } from 'react';
import "./home.css";
import Territory from '../components/Territory';
import { 
  a1, a2, a3, a4, 
  b1, b2, b3, b4, b5, b6, b7,
  c1, c2, c3, c4, 
  d1, d2, d3, d4,
  e1, e2, e3, e4, e5,
  f1, f2,
  g1, g2, g3, g4, g5,
  h1, h2, h3, h4,
  i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13
} from "../pathData";
import { useParams } from 'react-router';
import { getUsers } from '../redux/apiCall';
import { useDispatch, useSelector } from "react-redux";

const Home = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const users = useSelector(state=>state.users.collection);

  useEffect(()=>{
    getUsers(dispatch);
  },[dispatch])

  console.log("users", users)
  console.log("params", params?.name)

   return(
    <div
      className="home__container"
      data-test="component-home"
    >
        <svg id="map" width="660px" height="1000px" border="1px solid orange">

          <g>
            <Territory xBox="480" yBox="865" path={a1} terId="a1" />
            <Territory xBox="378" yBox="865" path={a2} terId="a2" />
            <Territory xBox="270" yBox="865" path={a3} terId="a3" />
            <Territory xBox="270" yBox="800" path={a4} terId="a4" />
          </g>

          <g>
            <Territory xBox="160" yBox="845" path={b1} terId="b1" />
            <Territory xBox="98" yBox="895"  path={b2} terId="b2" />
            <Territory xBox="145" yBox="790" path={b3} terId="b3" />
            <Territory xBox="238" yBox="760" path={b4} terId="b4" />
            <Territory xBox="340" yBox="688" path={b5} terId="b5" />
            <Territory xBox="310" yBox="640" path={b6} terId="b6" />
            <Territory xBox="200" yBox="690" path={b7} terId="b7" />
          </g>

          <g>
            <Territory xBox="360" yBox="740" path={c1} terId="c1" />
            <Territory xBox="443" yBox="766" path={c2} terId="c2" />
            <Territory xBox="455" yBox="700" path={c3} terId="c3" />
            <Territory xBox="521" yBox="703" path={c4} terId="c4" />
          </g>

          <g>
            <Territory xBox="420" yBox="665" path={d1} terId="d1" />
            <Territory xBox="392" yBox="598" path={d2} terId="d2" />
            <Territory xBox="483" yBox="590" path={d3} terId="d3" />
            <Territory xBox="450" yBox="565" path={d4} terId="d4" />
          </g>

          <g>
            <Territory xBox="210" yBox="617" path={e1} terId="e1" />
            <Territory xBox="152" yBox="645" path={e2} terId="e2" />
            <Territory xBox="180" yBox="585" path={e3} terId="e4" />
            <Territory xBox="215" yBox="555" path={e4} terId="e5" />
            <Territory xBox="188" yBox="518" path={e5} terId="e6" />
          </g>

          <g>
            <Territory xBox="170" yBox="468" path={f1} terId="f1" />
            <Territory xBox="133" yBox="478" path={f2} terId="f2" />
          </g>

          <g>
            <Territory xBox="265" yBox="590" path={g1} terId="g1" />
            <Territory xBox="295" yBox="520" path={g2} terId="g2" />
            <Territory xBox="339" yBox="565" path={g3} terId="g3" />
            <Territory xBox="298" yBox="468" path={g4} terId="g4" />
            <Territory xBox="260" yBox="420" path={g5} terId="g5" />
          </g>

          <g>
            <Territory xBox="434" yBox="498" path={h1} terId="h1" />
            <Territory xBox="480" yBox="497" path={h2} terId="h2" />
            <Territory xBox="387" yBox="483" path={h3} terId="h3" />
            <Territory xBox="432" yBox="396" path={h4} terId="h4" />
          </g>

          <g>
            <Territory xBox="280" yBox="360" path={i1} terId="i1" />
            <Territory xBox="185" yBox="360" path={i2} terId="i2" />
            <Territory xBox="385" yBox="290" path={i3} terId="i3" />
            <Territory xBox="430" yBox="230" path={i4} terId="i4" />
            <Territory xBox="389" yBox="180" path={i5} terId="i5" />
            <Territory xBox="468" yBox="150" path={i6} terId="i6" />
            <Territory xBox="498" yBox="50"  path={i7} terId="i7" />
            <Territory xBox="375" yBox="70"  path={i8} terId="i8" />
            <Territory xBox="320" yBox="190" path={i9} terId="i9" />
            <Territory xBox="218" yBox="185" path={i10} terId="i10" />
            <Territory xBox="218" yBox="265" path={i11} terId="i11" />
            <Territory xBox="145" yBox="280" path={i12} terId="i12" />
            <Territory xBox="210" yBox="100" path={i13} terId="i13" />
          </g>
        </svg>
    </div>
   )
 }

export default Home
