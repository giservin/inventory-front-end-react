import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const FormEditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const getProductById = async () => {
        try {
            const response = await axios.get(`${process.env.API_URL}:${process.env.API_PORT}/products/${id}`);
            setName(response.data.name);
            setPrice(response.data.price);
        } catch(err) {
            if(err.response) {
                setMsg(err.response.data.msg);
            }
        }
    }
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`${process.env.API_URL}:${process.env.API_PORT}/products/${id}`, {
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
        <h2 className='subtitle'>Edit Product</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={updateProduct}>
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
                                    <button type='submit' className="button is-success">Update</button>
                                </div>
                            </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormEditProduct