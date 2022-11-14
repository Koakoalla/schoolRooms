import clsx from 'clsx';
import { WhitePlatte } from '../WhitePlatte';
import styles from './EnterUserName.module.scss';
import React, {useState} from 'react';
import { UserData } from '../../pages';
import { MyContext } from '../../pages';
import { Button } from '../../components/Button';
import { setUserData } from '../../redux/slices/userSlice';
export const EnterNameStep = () => {
  const { onNextStep} = React.useContext(MyContext);
  const [inputValue, setInputValue] = React.useState<string>(userdata.fullName);
  const nextDisabled = !inputValue;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onClickNextStep = () => {
    onNextStep();
  };

  return (
    <div className={styles.block}>
      
      <WhitePlatte className={clsx('m-auto', styles.whiteBlock)}>

        <div className="mt-30 mb-30">
          <input
            onChange={handleChangeInput}
            value={inputValue}
            className="field"
            placeholder="Enter fullname"
          />
        </div>
        <Button disabled={nextDisabled} onClick={onClickNextStep}>
          next
        </Button>
      </WhitePlatte>
    </div>
  );
};
