import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './settings.module.scss';
import { useAuth } from 'hooks/use-auth';
import axios from 'axios';
import { useAppDispatch} from 'hooks/redux-hooks';
import { setUser, removeUser } from 'store/userSlice';


interface Props {
    userName: string
}
const Settings: React.FC = () => {

    const { userName,userEmail, isAuth, userToken } = useAuth();
    // console.log(userName)
    const dispatch = useAppDispatch();
    const push = useNavigate();
    const [name, setName] = React.useState<string>('');
    const [avatar, setAvatar] = React.useState<string>('');
    const [bio, setBio] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [errorName,setErrorName] = React.useState<boolean>(false);
    const [errorEmail,setErrorEmail] = React.useState<boolean>(false);



    const getUser = async () => {
        try {
            const token = localStorage.getItem('tokenData');
            if (token !== null) {
                // axios.interceptors.request.use((config: any) => {
                //     const token = localStorage.getItem('tokenData')
                //     config.headers.Authorization = `Token ${token}`;
                //     return config;
                // });
                await axios
                    .get('https://conduit.productionready.io/api/user ', {headers: {
                        Authorization: `Token ${token}`,
                      }
                    }
                    ).then((response) => {
                        localStorage.setItem('tokenData', response.data.user.token)
                        dispatch(setUser({
                            userEmail: response.data.user.email,
                            userToken: response.data.user.token,
                            userName: response.data.user.username,
                        }))
                        setName(response.data.user.username);
                        setEmail(response.data.user.email);
                        setAvatar(response.data.user.image)
                        response.data.user.bio === null ? setBio('') : setBio(response.data.user.bio)
                        console.log(response)
                    })
            } else {
                push('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getUser()
    }, [])


    const validForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errorCount = 5;
        const validName = () => {
            if(name.replace(/\s+/g, ' ').trim() !== ''){
                setErrorName(false)
                errorCount--
                console.log(errorCount)
            }else{
                setErrorName(true)
                 errorCount = 5
            }
        }

        const validEmail = () => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(String(email).toLocaleLowerCase())){
                setErrorEmail(false);
                errorCount--
                console.log(errorCount)
            }else{
                setErrorEmail(true);
                errorCount = 5
            }
        }


        validName();
        validEmail();

        const apdateUser = async () => {

            // axios.interceptors.request.use((config: any) => {
            //         const token = localStorage.getItem('tokenData')
            //         config.headers.Authorization = `Token ${token}`;
            //         return config;
            //     });
            const token = localStorage.getItem('tokenData')
                const user = {
                username: name.replace(/\s+/g, ' ').trim(),
                bio: bio.replace(/\s+/g, ' ').trim(),
                email:email,
                password:password,
                image: avatar,
            }
                await axios.put('https://conduit.productionready.io/api/user ',  {user, headers: {
                    Authorization: `Token ${token}`,
                  },});
                getUser();
        }
        if(errorCount === 3){
            console.log(errorCount)
            apdateUser();

            errorCount = 5;

            console.log('ok')
        }else{
            console.log('bad');
            console.log(errorCount)
        }
    }


    // console.log(isAuth,userEmail,userToken)
    const logOut =  () => {
        localStorage.removeItem('tokenData');
        dispatch(removeUser());
        console.log(isAuth,userEmail,userToken)
        push('/');
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                Your Settings
            </div>
            <form onSubmit={validForm} className={styles.form} >
                <input
                    className={styles.input_avatar}
                    name='avatar'
                    type='avatar'
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder='URL of profile picture'
                // maxLength={15}
                />

                <p className={errorName ? styles.error : styles.hide}>
                Name</p>

                <input
                    className={styles.input_name}
                    name='name'
                    type='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={name}
                    maxLength={15}
                />
                <textarea
                    className={styles.input_textarea}
                    name='text'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder='Short bio about you'>

                </textarea>

                <p className={errorEmail ? styles.error : styles.hide}>
                Email</p>
                <input
                    className={styles.input_name}
                    name='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={email}
                // maxLength={15}
                />
                <input
                    className={styles.input_name}
                    name='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={password}
                    minLength={8}
                />
                <div className={styles.button_wrapper}>
                    <button type='submit' className={styles.button} >Update Settings</button>
                </div>
                <div className={styles.btn_logout_wrapper}>
                    <button className={styles.button_logout} onClick={logOut} >Or click here to logout.</button>
                </div>

            </form>

        </div>
    )
}

export default Settings