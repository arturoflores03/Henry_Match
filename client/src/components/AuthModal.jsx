import { useState } from "react";

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setShowModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Hay un error con la contraseña");
      }
      console.log("request a la db");
    } catch {
      console.log("error");
    }
  };
  return (
    <div className="auth-modal">
      <div onClick={handleClick}>x</div>
      <h2>{isSignUp ? "create account" : "log in"}</h2>
      <p>
        Al hacer click aceptas nuestros terminos y condiciones o nuestras normas
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="correo electronico"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="contraseña"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <input
            type="password-check"
            id="password-check"
            name="password-check"
            placeholder="confirmar contraseña"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input type="submit" />
        <p>{error}</p>
      </form>
    </div>
  );
};

export default AuthModal;
