import { WhitePlatte } from "../WhitePlatte";
import styles from "./Welcome.module.scss"
import React from "react";
import {Button} from '../../components/Button'
import { MyContext } from "../../pages";



export const Welcome = () => {

    const { onNextStep } = React.useContext(MyContext);
   
 
  return (
    <WhitePlatte className={styles.block}>
      <h3 className={styles.title}>
        <img className={styles.handWaveImg} src="/static/hand-wave.png" alt="Celebration" />
        Добро пожаловать в SchoolRoom!
      </h3>
      <p className={styles.paragraph}>
        Привет, мы команда SchoolRoom! Мы делаем приложение для школьников и студентов для практики иностранного языка! Зарегестрировавшись, вы попадете в классы, которые разделены по группам. Вы можете разделяться на несколько групп для командных игр или комнат для обсуждения тем!
        Команда SchoolRoom.
      </p>
      <div>
        <Button>
          Выберите юзернейм
        </Button>
      </div>
      <p className={styles.paragraph}>
        Желаем Вам веселья! 😎</p>
      <div className="link mt-50 cup d-ib">Have an invite text? Sign in</div>
    </WhitePlatte>
    
  )
}

