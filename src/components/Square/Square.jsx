import styles from './square.module.scss'
import Base from '../../ColorBase'

export default function Square({info}){
   let [row,column] = info.position.split(',')
   return(
      <button 
      style={{gridRowStart:row,gridColumnStart:column,background:Base[info.value]}} 
      className={styles.btn}
      >{info.value}
      </button>
   )
}