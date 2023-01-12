import { useAppSelector } from "./redux-hooks";

export function useAuth () {
    const {userEmail,userToken,userName} = useAppSelector(state => state.user)
    return {
        isAuth: !!userEmail,
        userEmail,
        userToken,
        userName,
        // id,
    };
}