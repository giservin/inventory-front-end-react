import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setRole("admin");
  }, []);

  const saveUser = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/users`, {
            name,
            email,
            password,
            confirmPassword: confPassword,
            role
        });
        navigate("/users");
    } catch (err) {
        if(err.response) {
            setMsg(err.response.data.msg);
        }
    }
  }
  return (
    <div>
        <h1 className='title'>Users</h1>
        <h2 className='subtitle'>Add New User</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveUser}>
                    <p className='has-text-centered has-text-danger'>{msg}</p>
                    <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                    </div>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input type="email" className="input" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input type="password" className="input" placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Confirm Password</label>
                                <div className="control">
                                    <input type="password" className="input" placeholder='********' value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Role</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button type='submit' className="button is-success">Register</button>
                                </div>
                            </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddUser