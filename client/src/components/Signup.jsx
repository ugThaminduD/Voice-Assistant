import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSignUp = async () => {
        setLoading(true);
        setError(""); // Clear previous errors

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            alert("Signup successful! Please log in.");
            navigate("/login"); // Redirect to login page
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Sign Up</h2>
            {error && <div className="error-message">{error}</div>} {/* Show error if any */}
            
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
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

            <button onClick={handleSignUp} disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
            </button>

            <p style={{ color: "black" }}>
                Already registered? <Link to="/login">Sign In</Link>
            </p>
        </div>
    );
};

export default SignUp;
