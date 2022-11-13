import styles from './WhitePlatte.module.scss';
import clsx from 'clsx';
import React, {ReactNode} from 'react';

interface Props  {
children?: React.ReactNode;
className?:string;
};

export const WhitePlatte = ({ children, className }: Props) => {
 return <div className={clsx(styles.block, className)}>{children}</div>;
  };

