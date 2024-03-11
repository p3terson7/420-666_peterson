import { Container } from "react-bootstrap";
import ClientSignupForm from "../../components/ClientSignup";
import '../../App.css';

const SignupView = () => {
  return <Container fluid>
    <ClientSignupForm />
  </Container>;
}

export default SignupView;