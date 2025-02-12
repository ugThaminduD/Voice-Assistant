import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleLogin = async () => {
        setLoading(true); // Show loading indicator
        setError(""); // Clear previous errors


        try {

            const { data } = await axios.post("http://localhost:5000/login", {
                email,
                password,
            });
            

            localStorage.setItem("token", data.token); // Save token

            alert("Sign In successful, Wellcome! ");
            navigate("/"); 
            // window.location.href = "/dashboard";

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            
            <h2>Sign In</h2>
            {error && <div className="error-message">{error}</div>}{" "}

            <div className="input-container">
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
            </div>

            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>

            <p style={{ color: "black" }}>
                Not registered? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
