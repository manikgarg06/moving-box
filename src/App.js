import React, { useState, useRef, useEffect } from 'react';

import './App.css';

function App() {
  const [boxes, setBoxes] = useState([]);
  const [counter, setCounter] = useState(0);
  const [selectedBox, setSelectedBox] = useState();
  const fenceRef = useRef();

  const addBoxHandler = () => {

    setBoxes(prevBoxes => prevBoxes.concat({ id: Math.random(), zIndex: counter + 1 }))
    setCounter(prevCounter => prevCounter + 1);
  }
  const handleSelectedBox = (box) => {
    if (selectedBox) {
      if(selectedBox.id === box.id){
        document.getElementById(box.id).style.backgroundColor='white';
        setSelectedBox(undefined);
      }else{
        document.getElementById(box.id).style.backgroundColor='grey';
        document.getElementById(selectedBox.id).style.backgroundColor='white';
        setSelectedBox({ id: box.id });
      }
    } else {
      setSelectedBox({ id: box.id });
      document.getElementById(box.id).style.backgroundColor='grey';
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown) }
  })
  const handleKeyDown = (event) => {

    if (selectedBox) {
      const element = document.getElementById(selectedBox.id);
      switch (event.keyCode) {
        case 83://S
          element.style.top = `${fenceRef.current ? parseInt(element.style.top) + 5 : 2}px`;
          break;
        case 87: //W
          element.style.top = `${fenceRef.current ? parseInt(element.style.top) - 5 : 2}px`;
          break;
        case 65: //A
          element.style.left = `${fenceRef.current ? parseInt(element.style.left) - 5 : 2}px`;
          break;
        case 68: // D
          element.style.left = `${fenceRef.current ? parseInt(element.style.left) + 5 : 2}px`;
          break;
        default:
          break;
      }
    }
    // console.log(event.keyCode)
    // console.log(event.key)
  }
  // console.log(fenceRef)
  return (
    <div className="App-header">
      <div className="Fence" ref={fenceRef} >
        {boxes.map(box => {
          return (<div className="Box" id={box.id} onClick={() => handleSelectedBox(box)} style={{
            backgroundColor: 'white', zIndex: box.zIndex, top: fenceRef.current.offsetTop + 5 * (box.zIndex - 1),
            left: fenceRef.current.offsetLeft + 10 + 30 * (box.zIndex - 1)
          }} key={box.id}>
          </div>)
        })}
      </div>
      <input type="button" className="Button" value="Add Box !!" onClick={addBoxHandler} />
    </div>
  );
}

export default App;
