import { Container } from "react-bootstrap";
import ClientSignupForm from "../../components/ClientSignup";
import '../../App.css';
import {UserType} from "../../model/user";

interface Props {
    userType: UserType;
}
const SignupView = ({ userType }: Props) => {
  return <Container fluid>
    <ClientSignupForm />
  </Container>;
}

export default SignupView;