import { use, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomePage from './HomePage';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const redirect = () => {
    navigate('/');
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/token/', {
        email,
        password,
      });

      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('ошибка входа, введите логин и пароль');
    }
  };


  return (
    <div className="w-screen h-screen flex items-center justify-center bg-blue-100">
      {/* этл центрированный контейнер */}
      <div className="flex w-full max-w-4xl h-[500px] bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* лефт часть */}
        <div className="w-1/2 h-full hidden md:block relative">
          <img
            src="/images/bg.jpg"
            alt="Welcome"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 text-white font-bold text-xl font-jura">
            Techify
          </div>
          <div className="absolute top-20 left-6 text-white text-3xl font-judson">Welcome!</div>
          <div className="absolute bottom-6 left-6 text-white text-sm font-jura w-[80%]">
            Learn faster. Think deeper. Own your knowledge.
          </div>
        </div>

        {/* Правая часть */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center px-8 bg-white">
          <div className="w-full max-w-[300px]">
            <h2 className="text-center text-cyan-800 text-3xl font-judson mb-6">Sign In</h2>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block mb-1 text-cyan-800 text-lg font-judson">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border-2 border-sky-900 text-cyan-800 font-judson"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-cyan-800 text-lg font-judson">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border-2 border-sky-900 text-cyan-800 font-judson"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="w-4 h-4 accent-cyan-800"
                />
                <label className="text-cyan-700 text-sm font-judson">Show password</label>
              </div>

              <button
              onClick={redirect}
                type="submit"
                className="w-full h-12 bg-cyan-800 text-white rounded-xl text-xl font-judson hover:bg-cyan-900"
              >
                Log In
              </button>
            </form>

            <div className="mt-6 text-center text-cyan-800 text-sm font-judson">
              Use other ways to register
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;