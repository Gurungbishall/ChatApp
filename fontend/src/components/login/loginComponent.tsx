import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() == "") {
      alert("Please enter the username");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem("username", username);
      navigate("/App");
    }, 4000);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center gap-2 "
      >
        <div className="text-2xl font-bold xl:text-4xl">Chat Application</div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="p-2 mt-3 border-2 border-black xl:w-72 xl:text-2xl"
        />
        <button
          type="submit"
          disabled={loading}
          className={`p-2 font-bold rounded-2xl ${
            loading ? "bg-green-600" : "bg-black text-white"
          } xl:w-28 xl:text-xl`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
