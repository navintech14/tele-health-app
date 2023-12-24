import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();
  return (
    <Button 
    onClick={() => navigate("/login")}
      variant="outline-primary"
      type="button">
        Login
    </Button>
  )
}

export default LoginButton