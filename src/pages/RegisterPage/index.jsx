import { useEffect, useState } from "react";
import { register } from "../../utils/network-data";
import { Link, useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  useEffect(() => {
    formData.password === confirmPassword ? setPasswordMatch(true) : setPasswordMatch(false);
    console.log(passwordMatch);
  }, [confirmPassword])
  
  const navigate = useNavigate();
  const onNameChange = (event) => setFormData({ ...formData, name: event.target.value });
  const onEmailChange = (event) => setFormData({ ...formData, email: event.target.value });
  const onPasswordChange = (event) => setFormData({ ...formData, password: event.target.value });
  const onPasswordConfirmationChange = (event) => setConfirmPassword(event.target.value);
  const submitHandler = async (event) => {
    event.preventDefault();
    const {error} = await register(formData);
    if (!error) {
      navigate('/login');
    }
  };

  return (
    <form className='login-input text-white'>
        <p className="text-center">Register</p>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input onChange={onNameChange} className="form-control" type="name" placeholder='Name'/>
        </div>
        <div className="mb-3">
            <label className="form-label">Email</label>
            <input onChange={onEmailChange} className="form-control" type="email" placeholder='Email'/>
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input onChange={onPasswordChange} className="form-control" type="password" placeholder='Password'/>
        </div>
        <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input onChange={onPasswordConfirmationChange} className="form-control" type="password" placeholder='Confirm Password'/>
        </div>
        <button  disabled={!passwordMatch} onClick={submitHandler}>Register</button>
        <p>Dont have accounts yet? <Link to="/login" rel="noopener noreferrer">Login here</Link></p>
    </form>
  )
}

export default RegisterPage
