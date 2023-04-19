import SingUp from 'components/SingUp/SingUp'
import React from 'react'
import { Link } from 'react-router-dom'
import  styles from './register.module.scss'

const RegisterPage = () => {
  return (
    <div className={styles.register}>
      <SingUp/>
    </div>
  )
}

export default RegisterPage
