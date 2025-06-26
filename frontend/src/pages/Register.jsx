import { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student');
  const [agencyCode, setAgencyCode] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert('Пароли не совпадают');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/register/', {
        email,
        username,
        password,
        password2,
        role,
        agency_code: agencyCode || null,
      });

      alert('Вы успешно зарегистрированы!');
    } catch (err) {
      console.error(err);
      alert('Ошибка регистрации. Попробуйте снова.');
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-blue-100">
      <div className="flex w-[900px] h-[650px] bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Левая часть */}
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
            <h2 className="text-center text-cyan-800 text-3xl font-judson mb-6">Sign Up</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block mb-1 text-cyan-800 text-lg font-judson">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border-2 border-sky-900 text-cyan-800 font-judson"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-cyan-800 text-lg font-judson">Email</label>
                <input
                  type="email"
                  placeholder="E-mail"
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border-2 border-sky-900 text-cyan-800 font-judson"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-cyan-800 text-lg font-judson">Repeat Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Repeat Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border-2 border-sky-900 text-cyan-800 font-judson"
                  required
                />
              </div>

              {/* Роль */}
              <div>
                <label className="block mb-1 text-cyan-800 text-lg font-judson">Who are you?</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border-2 border-sky-900 text-cyan-800 font-judson"
                >
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                </select>
              </div>

              {/* Код агентства */}
              <div>
                <label className="block mb-1 text-cyan-800 text-lg font-judson">Agency Code</label>
                <input
                  type="text"
                  placeholder="e.g. QWE123"
                  value={agencyCode}
                  onChange={(e) => setAgencyCode(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border-2 border-sky-900 text-cyan-800 font-judson"
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
                type="submit"
                className="w-full h-12 bg-cyan-800 text-white rounded-xl text-xl font-judson hover:bg-cyan-900"
              >
                Register
              </button>
            </form>

            <div className="mt-6 text-center text-cyan-800 text-sm font-judson">
              Already have an account?{' '}
              <a href="/login" className="underline">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
