import styles from './game.module.scss';
import Square from '../Square/Square'
import { useEffect, useState } from 'react';
import startArray from '../../StartArray';

export default function Game() {

   const [data, setData] = useState(startArray)

   useEffect(() => addNewSquare(data), [])
   useEffect(() => {
      const onKeyPress = ({ code }) => {
         if(code === 'ArrowLeft' || code === 'ArrowRight' || code === 'ArrowUp' || code === 'ArrowDown') return changes(code);
         
      }
      window.addEventListener('keydown', onKeyPress);

      return () => window.removeEventListener('keydown', onKeyPress);
   }, [data])


   function changes(code) {
      let dataCopy = JSON.parse(JSON.stringify(data));
      let newData;
      if (code === 'ArrowLeft') {
         dataCopy.forEach(el => el.reverse())
         newData = moveSquare(dataCopy);
         newData.forEach(el => el.reverse())
      } else if (code === 'ArrowRight') {
         newData = moveSquare(dataCopy)
      } else if (code === 'ArrowUp') {
         dataCopy = degArr(dataCopy, 'right')
         newData = degArr(moveSquare(dataCopy), 'left')
      } else if (code === 'ArrowDown') {
         dataCopy = degArr(dataCopy, 'left')
         newData = degArr(moveSquare(dataCopy), 'right')
      }

      addNewSquare(newData)
   }
   function moveSquare(value) {
      const newData = []
      value.forEach(element => {
         const arr = Array(4).fill(null)
         for (let i = element.length; i >= 0; i--) {
            const notEmpty = arr.filter(el => el != null);
            const moved = arr.length - notEmpty.length;

            if (element[i] === arr[moved] && notEmpty.length > 0) {
               arr[moved] *= 2;
            } else {
               arr[moved - 1] = element[i];
            }
         }
         newData.push(arr)
      });
      return newData;
   }
   function addNewSquare(data) {
      const dataCopy = JSON.parse(JSON.stringify(data));
      const arr = takeEmpty(data);
      const random = randomValue(arr.length);
      const position = arr[random].split(',');
      dataCopy[position[0]][position[1]] = 2;

      if (arr.length === 16) {
         arr.splice(random, 1);
         const position2 = arr[randomValue(arr.length)].split(',');
         dataCopy[position2[0]][position2[1]] = 2;
      }
      setData(dataCopy);
   }
   function degArr(arr, way = 'right') {
      const newArr = arr.map(() => []);
      for (let i = 0; i < arr.length; i++) {

         if (arr.length != arr[i].length) return console.error(new Error('this is not matrix'));

         for (let j = 0; j < arr[i].length; j++) {
            const mirror = arr.length - 1 - i
            if (way === "right") newArr[j][mirror] = arr[i][j];
            if (way === "left") newArr[arr.length - 1 - j][i] = arr[i][j];
         }
      }
      return newArr
   }
   function randomValue(value) {
      return Math.floor(Math.random() * value);
   }
   function takeEmpty(value) {
      if (!Array.isArray(value)) return

      const arr = [];

      for (let i = 0; i < 4; i++) {
         sec: for (let j = 0; j < 4; j++) {

            if (value[i][j] !== null) continue sec;

            arr.push(`${i},${j}`)
         }
      }
      return arr
   }


   let touchStart = null;
   const touchStartEv = (e) => {
      touchStart = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]
   }
   const touchEndEv = (e) => {
      const touchEnd = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]
      const difX = touchEnd[0] - touchStart[0]
      const difY = touchEnd[1] - touchStart[1]
      let direction = null
      if (Math.abs(difX) < Math.abs(difY)) {
         if (difY < 0) {
            direction = 'ArrowUp'
         } else {
            direction = 'ArrowDown'

         }
      } else if (Math.abs(difX) > Math.abs(difY)) {
         if (difX < 0) {
            direction = 'ArrowLeft'
         } else {
            direction = 'ArrowRight'
         }
      }
      changes(direction)
   }

   const output = []

   for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
         output.push({
            value: data[i][j],
            position: `${i + 1},${j + 1}`
         })
      }
   }

   return (
      <section onTouchStart={touchStartEv} onTouchEnd={touchEndEv} className={styles.game}>
         {output.map((el, i) => <Square info={el} key={i} />)}
      </section>
   )
}