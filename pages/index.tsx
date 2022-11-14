import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/globals.module.css'
import {Welcome} from '../stepsreens/Welcome'
import React from 'react'
import { GithubCheck } from '../stepsreens/GithubCheck'
import { EnterUserName } from '../stepsreens/EnterUserName'
import { ChooseAvatarUser } from '../stepsreens/ChooseAvatarUser'
import { EnterPhone } from '../stepsreens/EnterPhone'
import { EnterCode } from '../stepsreens/CodeEnter'

const stepsComponents = {
  0: Welcome,
  1: GithubCheck,
  2: EnterUserName,
  3: ChooseAvatarUser,
  4: EnterPhone,
  5: EnterCode,
};

export type UserData = {
  id: number;
  fullname: string;
  avatarUrl: string;
  isActive: number;
  username: string;
  phone: string;
  token?: string;

};
type MyContextProps = {
  onNextStep: () => void;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setFieldValue: (field: keyof UserData, value: string) => void;
  step: number;
  userData?: UserData;
}

export const MyContext = React.createContext<MyContextProps>({} as MyContextProps);

const getUserData = (): UserData | null => {
  try {
    return JSON.parse(window.localStorage.getItem('userData'));
  } catch (error) {
    return null;
  }
};

const getFormStep = (): number => {
  const json = getUserData();
  // if (json) {
  //   if (json.phone) {
  //     return 5;
  //   } else {
  //     return 4;
  //   }
  // }
  return 0;
};

export default function Home() {
  const [step, setStep] = React.useState<number>(0);
  const [userData, setUserData] = React.useState<UserData>();
  const Step = stepsComponents[step];

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const setFieldValue = (field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const json = getUserData();
      if (json) {
        setUserData(json);
        setStep(getFormStep());
      }
    }
  }, []);

  React.useEffect(() => {
    if (userData) {
      window.localStorage.setItem('userData', JSON.stringify(userData));
      Axios.defaults.headers.Authorization = 'Bearer ' + userData.token;
    }
  }, [userData]);

  return (
    <MyContext.Provider value={{ step, onNextStep, userData, setUserData, setFieldValue }}>
      <Step />
    </MyContext.Provider>
  );
}


