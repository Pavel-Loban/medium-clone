import React, { useState } from 'react';
import styles from './form.module.scss';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Props {
    title: string;
    titleButton: string;
    handlClick: (email: string, password: string,username: string) => void;
    subTitle: string;
    error: string;
    userError: string;
    userEmailError: string;
}


const Form: React.FC<Props> = ({ title, titleButton,
     handlClick,
    subTitle,
    userError,
    userEmailError,
     error }) => {

    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [name, setName] = useState<string>('');

    const [emailDirty, setEmailDirty] = useState<boolean>(false);
    const [passDirty, setPassDirty] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');


    const [formValid, setFormValid] = useState<boolean>(false)

    const location = useLocation();

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    React.useEffect(() => {
        if (email && pass) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [email, pass])



    const validForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (email && pass) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ((!re.test(String(email).toLocaleLowerCase()) || (pass.length < 8 || pass.length > 15))) {
                setEmailError('email or password is invalid')
                setEmailDirty(true);
                // console.log(1)
            } else {
                setEmailError('')
                handlClick(email, pass, name)

                setEmailDirty(false)
                console.log(name)
            }

        } else {
            console.log(3)

            // setFormValid(false)
        }
    }


    const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (email && pass) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(email).toLocaleLowerCase()) || (pass.length < 3 || pass.length > 8)) {
                setEmailError('email or password is invalid')
                setEmailDirty(true);
                // console.log(1)
            } else {

                setEmailError('')
                setEmailDirty(false)
            }
        }
        setEmailDirty(false)
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={validForm} >
                <h1 className={styles.title}>{title}</h1>
                {location.pathname.includes('/login')
                    ?
                    <Link to='/register'><div className={styles.subTitle}>{subTitle}</div> </Link>
                    :
                    <Link to='/login'><div className={styles.subTitle}>{subTitle}</div> </Link>}


{userError && <div style={{ color: 'red' }} >username {userError} </div>}
{userEmailError && <div style={{ color: 'red' }} >email {userEmailError} </div>}

                {location.pathname.includes('/register') ? <div>
                    <input className={styles.input}
                        name='name'
                        type='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        maxLength={15}
                    />
                </div> : ''}
                {(emailDirty || passDirty) && <div style={{ color: 'red' }} >{emailError} </div>}

                <div>
                    <input className={styles.input}
                        name='email'
                        type='email'
                        value={email}
                        // onBlur={(e) => blurHandler(e)}
                        // onChange={(e) => emailHandler(e)}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                    />
                </div>

                {/* {passDirty && <div style={{ color: 'red' }} >{passError} </div>} */}
                <div>
                    <input className={styles.input}
                        name='password'
                        type='password'
                        value={pass}
                        onBlur={(e) => blurHandler(e)}
                        // onChange={(e) => passHandler(e)}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder='Password'
                    />
                </div>
                <div className={styles.button_wrapper}>
                    <button disabled={!formValid} className={styles.button_login}
                        type='submit'
                    >
                        {titleButton}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;