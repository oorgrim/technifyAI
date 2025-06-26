function HomePage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden flex">
      {/* Боковая панель */}
      <aside className="w-52 h-full bg-blue-950 text-white flex flex-col p-4">
        <div className="text-3xl font-jura text-neutral-300 mb-10">Techify</div>
        <nav className="flex flex-col gap-6 text-xl font-gafata">
          <a href="#" className="hover:text-cyan-300">user’s guide</a>
          <a href="#" className="hover:text-cyan-300">our goals</a>
          <a href="#" className="hover:text-cyan-300">your account</a>
          <a href="#" className="hover:text-cyan-300">settings</a>
        </nav>
      </aside>

      {/* мэйн контент с фоном */}
      <main className="flex-1 relative">
        <img
            src="/images/bg.jpg"
          alt="Background"
          className="w-full h-full object-cover absolute top-0 left-0 z-0"
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-judson mb-6">
            Your data. Your tutor. Your pace.
          </h1>
          <p className="text-lg md:text-2xl font-jura mb-8 max-w-xl">
            Train your AI. Ask with confidence. Grow your mind.
          </p>

          {/* Кнопка */}
          <button className="flex items-center justify-center gap-3 bg-white text-neutral-600 text-lg font-lateef rounded-full w-56 h-14 hover:bg-gray-200 transition">
            START JOURNEY
            <div className="w-2 h-4 bg-neutral-600" />
          </button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
