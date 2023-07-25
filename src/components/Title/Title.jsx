import styles from './title.module.scss'

function Title({score,children}){
   return <h3 className={styles.score}>{children}{score}</h3>
}

export default Title;