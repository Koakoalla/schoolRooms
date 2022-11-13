import React from 'react'
import { WhitePlatte } from "../WhitePlatte";
import { Button } from "../../components/Button";
import Cookies from 'js-cookie'
import styles from './GitHubCheck.module.scss'
import { MyContext, UserData } from '../../pages';
import clsx from 'clsx';

export const GithubCheck = () => {
    const {onNextStep, setUserData} = React.useContext(MyContext);

    const onClickAuth = () => {
        window.open(
            'http://localhost:3001/auth/github',
            'Auth',
            'width=500, height=500, status=yes, toolbar=no, location=no, menubar=no',    
        );
    };

    React.useEffect(() => {
        window.addEventListener('message', ({ data, origin }) => {
          const user: string = data;
          if (typeof user === 'string' && user.includes('avatarUrl')) {
            Cookies.remove('token');
            const json: UserData = JSON.parse(user);
            setUserData(json);
            onNextStep();
            Cookies.set('token', json.token!);
          }
        });
      }, []);

      return(
        <div className={styles.block}>
      
      <WhitePlatte className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <Button
          onClick={onClickAuth}
          className={clsx(styles.button, 'd-i-flex align-items-center')}>
          <img className="d-ib mr-10" src="" />
          Импорт с GitHub
          <img className="d-ib ml-10" src="" />
        </Button>
        <div className="link mt-20 cup d-ib">Enter my info manually</div>
      </WhitePlatte>
    </div>
      )
};