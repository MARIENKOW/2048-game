import styles from './App.module.scss'
import Game from './components/Game/Game'
import { useEffect, useState } from 'react';
import startArray from './StartArray';
import help from './heplfulScripts'

function App() {
  const [data, setData] = useState(startArray)
  const [score, setScore] = useState(0)

  useEffect(() => addNewSquare(data), [])

  useEffect(() => {
    const onKeyPress = ({ code }) => {
      document.body.style.overflow='hidden'
      if (code === 'ArrowLeft' || code === 'ArrowRight' || code === 'ArrowUp' || code === 'ArrowDown') return addNewSquare(changes(code, data));

    }
    window.addEventListener('keydown', onKeyPress);

    return () => {
      window.removeEventListener('keydown', onKeyPress);
    }
  }, [data])
  useEffect(() => {
    const onKeyPress = ({ code }) => {
      document.body.style.overflow=''
    }
    window.addEventListener('keyup', onKeyPress);

    return () => {
      window.removeEventListener('keyup', onKeyPress);
    }
  }, [data])
  useEffect(() => {
    if (help.takeEmpty(data).length === 0 && !changes('ArrowLeft', data) && !changes('ArrowRight', data) && !changes('ArrowUp', data) && !changes('ArrowDown', data)) {
      alert('end');
    }
  }, [data])


  function changes(code, dataLink) {
    if(!code || !dataLink) return;

    let dataCopy = JSON.parse(JSON.stringify(dataLink));
    let newData;

    if (code === 'ArrowLeft') {
      dataCopy.forEach(el => el.reverse())
      newData = moveSquare(dataCopy);
      newData.forEach(el => el.reverse())
    } else if (code === 'ArrowRight') {
      newData = moveSquare(dataCopy)
    } else if (code === 'ArrowUp') {
      dataCopy = help.degArr(dataCopy, 'right')
      newData = help.degArr(moveSquare(dataCopy), 'left')
    } else if (code === 'ArrowDown') {
      dataCopy = help.degArr(dataCopy, 'left')
      newData = help.degArr(moveSquare(dataCopy), 'right')
    }

    if (help.checkIdentically(newData, data)) return

    return newData
  }
  function moveSquare(value) {
    const newData = []
    let scoreCopy = score
    if(!value)return
    value.forEach(element => {
      const arr = Array(4).fill(null)
      let changed = null;
      for (let i = element.length; i >= 0; i--) {
        const notEmpty = arr.filter(el => el != null);
        const moved = arr.length - notEmpty.length;

        if (element[i] === arr[moved] && notEmpty.length > 0 && changed !== moved) {
          const newValue = arr[moved] * 2;
          arr[moved] = newValue
          scoreCopy += newValue;
          changed = moved;
        } else {
          arr[moved - 1] = element[i];
        }
      }
      newData.push(arr)
    });

    setScore(scoreCopy)
    return newData;
  }
  function addNewSquare(value) {
    if (!value) return

    const dataCopy = JSON.parse(JSON.stringify(value));
    const arr = help.takeEmpty(value);

    if(arr.length === 0) return setData(dataCopy);
    
    const random = help.randomValue(arr.length);
    const position = arr[random].split(',');
    dataCopy[position[0]][position[1]] = 2;

    if (arr.length === 16) {
      arr.splice(random, 1);
      const position2 = arr[help.randomValue(arr.length)].split(',');
      dataCopy[position2[0]][position2[1]] = 2;
    }
    setData(dataCopy);
  }

  return (
    <div className="App">
      <h3 className={styles.score}>Score : {score}</h3>
      <Game updateData={(value) => addNewSquare(changes(value, data))} data={data} />
      <button></button>
    </div>
  );
}

export default App;
