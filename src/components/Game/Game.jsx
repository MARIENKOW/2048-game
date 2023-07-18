import styles from './game.module.scss';
import Square from '../Square/Square'

export default function Game({data,updateData,over}) {



   let touchStart = null;
   const touchStartEv = (e) => {
      document.body.style.overflow='hidden';
      touchStart = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]
   }
   const touchEndEv = (e) => {
      document.body.style.overflow='';
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
      if(direction) return updateData(direction)
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
      <section onTouchMove={e=>e.preventDefault()} onTouchStart={touchStartEv} onTouchEnd={touchEndEv} className={styles.game}>
         {output.map((el, i) => <Square info={el} key={i} />)}
         <div style={over} className={styles.gameOver}>Game Over!</div>
      </section>
   )
}