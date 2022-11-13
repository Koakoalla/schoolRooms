import clsx from 'clsx';
import { WhitePlatte } from '../WhitePlatte';
import { Button } from '../../components/Button'


import styles from './EnterNameStep.module.scss';
import React from 'react';
import { MyContext} from '../../pages';

export const EnterNameStep = () => {
  const { onNextStep, userData, setFieldValue } = React.useContext(MyContext);
  const [inputValue, setInputValue] = React.useState<string>(userData!.fullname);
  const nextDisabled = !inputValue;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onClickNextStep = () => {
    setFieldValue('fullname', inputValue);
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
          Next
          <img className="d-ib ml-10" src="/static/arrow.svg" />
        </Button>
      </WhitePlatte>
    </div>
  );
};
