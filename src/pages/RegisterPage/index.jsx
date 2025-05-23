import { useEffect, useState } from "react";
import { register } from "../../utils/network-data";
import { Link, useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage/LoadingPage";


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    formData.password === confirmPassword  ? setPasswordMatch(true) : setPasswordMatch(false);
  }, [confirmPassword])
  
  const Navigate = useNavigate();
  const onNameChange = (event) => setFormData({ ...formData, name: event.target.value });
  const onEmailChange = (event) => setFormData({ ...formData, email: event.target.value });
  const onPasswordChange = (event) => setFormData({ ...formData, password: event.target.value });
  const onPasswordConfirmationChange = (event) => setConfirmPassword(event.target.value);
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const {error} = await register(formData);
      !error && Navigate('/');
      setLoading(false);
    } catch (error) {
      setLoading(true);
      alert(error.message);
      setLoading(false);
      Navigate('/register');
    }
  };

  return (
    <section className="vh-100">
        <form className='h-100 resgister-input text-white d-flex flex-column justify-content-center w-75 mx-auto'>
            <h1 className="text-center">Register</h1>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input onChange={onNameChange} className="form-control" type="name" placeholder='Name'/>
                {formData.name === '' && <p className="text-danger mb-0">Name is required</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input onChange={onEmailChange} className="form-control" type="email" placeholder='Email'/>
                {formData.email === '' && <p className="text-danger mb-0">Email is required</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input onChange={onPasswordChange} className="form-control" type="password" placeholder='Password'/>
                {formData.password === '' && <p className="text-danger mb-0">Password is required</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input onChange={onPasswordConfirmationChange} className="form-control" type="password" placeholder='Confirm Password'/>
                {!passwordMatch ? <p className="text-danger mb-0">Password not match</p> : <p className="text-success mb-0">Password match</p>}
            </div>
            <div>
                <button className="btn btn-sbmt mb-1" disabled={!passwordMatch} onClick={submitHandler}>
                  {loading ? <LoadingPage/> : "Register"}
                </button>
                <p>Already have an accounts? <Link to="/login" rel="noopener noreferrer">Login here</Link></p>
            </div>
        </form>
    </section>
  )
}

export default RegisterPage
