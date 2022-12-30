import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; //untuk redirect
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     dispatch(getMe());
    // }, [dispatch]);
    
    useEffect(() => {
        if(user || isSuccess){
            navigate("/dashboard");
        }
        // reset state
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    const Auth = (e) => {
        e.preventDefault();
        // setelah dispatch, state user akan ke set
        dispatch(LoginUser({email, password}));
    }

    return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-4">
                        <form onSubmit={Auth} className='box'>
                            {isError && <p className="has-text-centered has-text-danger">{message}</p>}
                            <div className="field">
                                <h1 className='title is-2'>Sign in</h1>
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
                            <div className="field mt-2">
                                <button type="submit" className="button is-success is-fullwidth">{isLoading ? 'Loading...' : 'Login'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Login