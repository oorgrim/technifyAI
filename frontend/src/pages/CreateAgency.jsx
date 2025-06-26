import { useState } from 'react';
import axios from 'axios';

function CreateAgency() {
  const [name, setName] = useState('');
  const [code, setCode] = useState(null);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access');
      const res = await axios.post(
        'http://localhost:8000/api/agency/create/',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCode(res.data.code);
      alert('Агентство создано!');
    } catch (err) {
      console.error(err);
      alert('Ошибка создания агентства');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-judson text-cyan-800 text-center">Создать агентство</h2>
      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="text"
          placeholder="Название агентства"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-12 px-4 rounded-xl border-2 border-cyan-800"
          required
        />
        <button
          type="submit"
          className="w-full h-12 bg-cyan-800 text-white rounded-xl text-xl font-judson hover:bg-cyan-900"
        >
          Создать
        </button>
      </form>
      {code && (
        <div className="text-center text-green-700 font-jura">
          Код агентства: <strong>{code}</strong>
        </div>
      )}
    </div>
  );
}

export default CreateAgency;
