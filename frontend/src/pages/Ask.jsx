import { useState } from 'react';

function Ask() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [source, setSource] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/ask/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnswer(data.answer);
        setSource(data.source || "Контекст неизвестен");
      } else {
        setAnswer("Ошибка: " + (data.error || "неизвестная"));
      }
    } catch (err) {
      console.error(err);
      setAnswer("Ошибка соединения с сервером");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h2 className="text-3xl font-bold mb-4">❓ Задать вопрос ИИ</h2>

      <textarea
        rows="4"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Введите свой вопрос..."
        className="w-full max-w-xl p-4 border border-gray-300 rounded mb-4"
      />

      <button
        onClick={handleAsk}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
      >
        Спросить
      </button>

      {answer && (
        <div className="mt-8 w-full max-w-xl bg-white shadow-md p-6 rounded">
          <h3 className="text-lg font-semibold mb-2">Ответ:</h3>
          <p className="text-gray-800 mb-2">{answer}</p>
          <p className="text-sm text-gray-500 italic">Источник: {source}</p>
        </div>
      )}
    </div>
  );
}

export default Ask;
