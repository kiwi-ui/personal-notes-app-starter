import { useState } from 'react'
import { getUserLogged, login, putAccessToken } from '../../utils/network-data';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = ({onLoginSuccess}) => {
  const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const onEmailChange = (event) => setFormData({ ...formData, email: event.target.value });
    const onPasswordChange = (event) => setFormData({ ...formData, password: event.target.value });
    const navigate = useNavigate();
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    const submitHandler = async (event) => {
      event.preventDefault();
      const {error, data} = await login(formData);

      if (!error) {
        putAccessToken(data.accessToken);
        onLoginSuccess(data)
        navigate('/home')
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });

      } 
    };
    
    return (
      <form className='login-input text-white'>
          <p className="text-center">Login</p>
          <div className="mb-3">
              <label className="form-label">Email</label>
              <input onChange={onEmailChange} className="form-control" type="email" placeholder='Email'/>
          </div>
          <div className="mb-3">
              <label className="form-label">Password</label>
              <input onChange={onPasswordChange} className="form-control" type="password" placeholder='Password'/>
          </div>
          <button onClick={submitHandler}>Login</button>
          <p>Dont have accounts yet? <Link to="/register" rel="noopener noreferrer">Register here</Link></p>
      </form>
    )
  }


export default LoginPage
