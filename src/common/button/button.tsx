import React from 'react';

import styles from './button.module.scss';

// type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {}

interface Props {
    title: string,
    handleClick?: () => void,
    typeSubmit: boolean,

}

export const Button:React.FC<Props> = ({title, handleClick, typeSubmit}) => {
  return (
    <button className={styles.button} onClick={handleClick} type={typeSubmit ? 'submit' : 'button'} >
        {title}
    </button>
  )
}
