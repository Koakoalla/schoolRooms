import React from 'react';
import clsx from 'clsx';
import NumberFormat from 'react-number-format';
import { MyContext } from '../../pages';
import { Button } from '../../components/Button';
import { Info } from '../../components/Info';
import styles from './EnterPhone.module.scss';

import { Axios } from '../../core/axios';
import { WhitePlatte } from '../WhitePlatte';



type InputValueState = {
  formattedValue: string;
  value: string;
};

export const EnterPhone = () => {
  const { onNextStep, setFieldValue } = React.useContext(MyContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState<InputValueState>({} as InputValueState);

  const nextDisabled = !values.formattedValue || values.formattedValue.includes('_');

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await Axios.get(`/auth/sms?phone=${values.value}`);
      setFieldValue('phone', values.value);
      onNextStep();
    } catch (error) {
      console.warn('Возникла ошибка при отправке SMS', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.block}>
      <Info
        icon="/static/phone.png"
        title="Enter your phone #"
        description="Мы отправили Вам код подтверждения, проверьте телефон!"
      />
      <WhitePlatte className={clsx('m-auto mt-30', styles.whiteBlock)}>
        <div className={clsx('mb-30', styles.input)}>
          <img src="/static/russian-flag.png" alt="flag" width={24} />
          <NumberFormat
            className="field"
            format="+# (###) ###-##-##"
            mask="_"
            placeholder="+7 (999) 333-22-11"
            value={values.value}
            onValueChange={({ formattedValue, value }) => setValues({ formattedValue, value })}
          />
        </div>
        <Button disabled={isLoading || nextDisabled} onClick={onSubmit}>
          {isLoading ? (
            'Sending...'
          ) : (
            <>
              Next
              <img className="d-ib ml-10" src="/static/arrow.svg" />
            </>
          )}
        </Button>
        <p className={clsx(styles.policyText, 'mt-30')}>
          By entering your number, you’re agreeing to our Terms of Service and Privacy Policy.
          Thanks!
        </p>
      </WhitePlatte>
    </div>
  );
};
