import { useState } from 'react'
import { getUserLogged, login, putAccessToken } from '../../utils/network-data';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingPage from '../../components/LoadingPage/LoadingPage';

const LoginPage = ({onLoginSuccess}) => {
  const [formData, setFormData] = useState({
      email: '',
      password: '',
  });
  const [loading, setLoading] = useState(false);
  const onEmailChange = (event) => setFormData({ ...formData, email: event.target.value });
  const onPasswordChange = (event) => setFormData({ ...formData, password: event.target.value });
  const Navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const {data} = await login(formData);
      putAccessToken(data.accessToken);
      onLoginSuccess(data)
      Navigate('/home')
    } catch (error) {
      alert(error);
    }
  };
    
    return (
      <section className="vh-100">
        <form className='h-100 resgister-input text-white d-flex flex-column justify-content-center w-75 mx-auto'>
            <h1 className="text-center">Login</h1>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input onChange={onEmailChange} className="form-control" type="email" placeholder='Email'/>
                {formData.email === '' && <p className='text-danger mb-0'>Email harus diisi</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input onChange={onPasswordChange} className="form-control" type="password" placeholder='Password'/>
                {formData.password === '' && <p className='text-danger mb-0'>Password harus diisi</p>}
            </div>
            <div>
                <button className="btn btn-sbmt mb-1" onClick={submitHandler}>
                  {loading ? <LoadingPage /> : "Login"}
                </button>
                <p>Dont have accounts yet? <Link to="/register" rel="noopener noreferrer">Register here</Link></p>
            </div>
        </form>
      </section>
    )
  }


export default LoginPage
