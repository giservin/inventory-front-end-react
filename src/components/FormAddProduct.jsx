import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const saveProduct = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`${process.env.API_URL}:${process.env.API_PORT}/products`, {
            name,
            price
        });
        navigate("/products");
    } catch (err) {
        if(err.response) {
            setMsg(err.response.data.msg);
        }
    }
  }

  return (
    <div>
        <h1 className='title'>Products</h1>
        <h2 className='subtitle'>Add New Product</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveProduct}>
                    <p className='has-text-centered'>{msg}</p>
                    <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                    </div>
                            <div className="field">
                                <label className="label">Price</label>
                                <div className="control">
                                    <input type="number" className="input" placeholder='Price in Rp.' value={price} onChange={(e) => setPrice(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button type='submit' className="button is-success">Add</button>
                                </div>
                            </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddProduct