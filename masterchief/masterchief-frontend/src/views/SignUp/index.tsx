import ClientSignupForm from "../../components/ClientSignup";
import '../../App.css';
import {UserType} from "../../model/user";

interface Props {
    userType: UserType;
}
const SignupView = ({ userType }: Props) => {
    return <>
        <ClientSignupForm  onSubmitSuccess={console.log}/>
    </>;
}

export default SignupView;