import { useAppSelector } from "./redux-hooks";

export function useAuth () {
    const {userEmail,userName} = useAppSelector(state => state.user)
    return {
        isAuth: !!userEmail,
        userEmail,
        userName,
    };
}