import React from "react"; /** this component is a child component of the App */
import { Duck } from "./demo";

interface Probs {
    duck: Duck;
}
export default function DuckItem({duck}: Probs) {
    return (
        <div key={duck.name}> 
          <span> {duck.name}</span>
          <button onClick={() => duck.makesound(duck.name + '   '+'quack')}> Make sound</button>
          </div>
    )
}