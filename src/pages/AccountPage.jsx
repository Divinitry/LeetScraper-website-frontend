import Login from '../components/Login'
import Logout from '../components/Logout'
import ResetPassword from '../components/ResetPassword'
import Signup from '../components/Signup'
import VerifyEmail from '../components/VerifyEmail'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'

const AccountPage = () => {
    const {action, key} = useParams();

    const findRoute = () => {
        switch(action){
            case 'signup':
                return <Signup/>
            case 'login':
                return <Login/>
            case 'logout':
                return <Logout/>
            case 'reset-password':
                return key ? <ResetPasswordConfirm key={key} /> : <ResetPassword />;
            case 'verify-email':
                return <VerifyEmail key={key}/>
        }
    }

    return(
        <div>
            <Header/>
            {findRoute()}
        </div>
    )
}

export default AccountPage