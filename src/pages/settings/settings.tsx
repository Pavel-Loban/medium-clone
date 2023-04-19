import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './settings.module.scss';
import { useAuth } from 'hooks/use-auth';
import { Formik } from 'formik';
import axios from 'axios';
import { useAppDispatch,useAppSelector } from 'hooks/redux-hooks';
import { setUser, removeUser } from 'store/userSlice';
import { VisiblePass } from 'components/visible-pass/visible-pass';
import { RootState } from 'store';
import { SchemaUpdate } from 'validations-shema';
import { updateInfoUser } from 'api/api';



const Settings: React.FC = () => {


    const {userEmail,userBio, userName, userImage} = useAppSelector((state: RootState) => state.user );

    const dispatch = useAppDispatch();
    const push = useNavigate();
    const [name, setName] = React.useState<string>('');
    const [bio, setBio] = React.useState<string>('');
    const [userImg, setUserImg] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [errorName,setErrorName] = React.useState<boolean>(false);
    const [errorEmail,setErrorEmail] = React.useState<boolean>(false);
    const [errorUpdateUser,setErrorUpdateUser] = React.useState<boolean>(false);
    const [errorPassword,setErrorPassword] = React.useState<boolean>(false);
    const [visiblePass, setVisiblePass] = React.useState<boolean>(false);


    React.useEffect(() => {
        setName(userName);
        setEmail(userEmail);
        if(userBio !== null){
            setBio(userBio);
        }
        setUserImg(userImage);
    }, [userName, userEmail, userBio, userImage]);

    const getVisibilityPassword = () => {
        setVisiblePass(!visiblePass);
    }

    const validForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorUpdateUser(false);
        setErrorName(false);
        setErrorEmail(false);
        setErrorPassword(false);

        let errorCount = 5;
        const validName = () => {
            if(name.replace(/\s+/g, ' ').trim() !== ''){

                errorCount--
            }else{
                setErrorName(true)
                 errorCount = 5
            }
        }

        const validEmail = () => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(String(email).toLocaleLowerCase())){

                errorCount--
            }else{
                setErrorEmail(true);
                errorCount = 5;
            }
        }

        const validPassword = () => {

            if(password.length >= 8 && password.length <= 16){

                errorCount--
            }else{
                setErrorPassword(true)
                 errorCount = 5
            }
        }


        validName();
        validEmail();
        validPassword()



        if(errorCount === 2){
            if(userImg === ''){
                setUserImg('https://api.realworld.io/images/smiley-cyrus.jpeg')
            }

            const user = {
                username: name.replace(/\s+/g, ' ').trim(),
                bio: bio.replace(/\s+/g, ' ').trim(),
                email:email,
                password:password,
                image: userImg,
            }
                updateInfoUser(user)
                .then((response) => {
                    console.log(response)
                    push('/');
 })
 .catch((err) => {
    setErrorUpdateUser(true);
          console.log(err)
  })
            errorCount = 5;
        }
    }


    const logOut =  () => {
        localStorage.removeItem('tokenConduit');
        localStorage.removeItem('userConduit');
        dispatch(removeUser());
        push('/');
    }


 const updateUser = async (e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
                const user = {
                username: name.replace(/\s+/g, ' ').trim(),
                bio: bio.replace(/\s+/g, ' ').trim(),
                email:email,
                password:password,
                image: userImg,
            }
                updateInfoUser(user)
                .then((response) => {
                    console.log(response)
                    push('/');
 })
 .catch((err) => {

          console.log(err)
  })
        }




    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                Your Settings
            </div>

            {/* <Formik
                initialValues={{
                    image: '',
                    // email: '',
                    // password: '',
                    // username: '',
                    // bio: '',
                }}
                validationSchema={SchemaUpdate}
                onSubmit={(values) => console.log(values.image)}
            >
                {({
                    values,
                    errors,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    dirty,
                    touched,
                    isValid,
                }) => {


                    return ( */}


            <form
            // onSubmit={updateUser}
            onSubmit={validForm}
            // onSubmit={handleSubmit}
            className={styles.form} >
                <input
                    className={styles.input_avatar}
                    name='image'
                    type='text'
                    // value={values.image}
                    value={userImg}

                     onChange={(e) => setUserImg(e.target.value)}
                    // onChange={handleChange}
                    placeholder='URL of profile picture'
                />

                <p className={errorName ? styles.error : styles.hide}>
                cannot be empty</p>

                <input
                    className={styles.input_name}
                    name='username'
                    type='text'
                    // value={values.username }
                    value={name }
                    onChange={(e) => setName(e.target.value)}
                    // onChange={handleChange}
                    placeholder='Your name'
                    maxLength={15}
                />
                <textarea
                    className={styles.input_textarea}
                    name='bio'
                    // value={values.bio}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    // onChange={handleChange}
                    placeholder='Short bio about you'>

                </textarea>

                <p className={errorEmail ? styles.error : styles.hide}>
                Please enter a valid e-mail</p>
                <input
                    className={styles.input_name}
                    name='email'
                    type='email'
                    // value={values.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // onChange={handleChange}
                    placeholder='Email'
                // maxLength={15}
                />
                 <p className={errorPassword ? styles.error : styles.hide}>
                Password must be more than 8 characters</p>

                <div className={styles.input_changepass_wrapper}>

                <input
                    className={styles.input_name}
                    name='password'
                    type={visiblePass ? 'text' : 'password'}
                    // value={values.password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // onChange={handleChange}
                    placeholder='New password'
                    minLength={8}
                />
                <VisiblePass visiblePass={visiblePass} value={password} getVisibilityPassword={getVisibilityPassword} />
                </div>
                <p className={errorUpdateUser ? styles.error : styles.hide}>
                Something went wrong</p>
                <div className={styles.button_wrapper}>
                    <button type='submit' className={styles.button} >Update Settings</button>
                </div>

                <div className={styles.btn_logout_wrapper}>
                    <button className={styles.button_logout} onClick={logOut} >Or click here to logout.</button>
                </div>

            </form>

{/* );
}}
</Formik> */}

        </div>
    )
}

export default Settings