import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const { data } = await axios.post("http://localhost:5000/login", { email, password });
        localStorage.setItem("token", data.token);
    };

    return (
        <div>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
