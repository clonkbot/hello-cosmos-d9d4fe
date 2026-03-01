import { useEffect, useState, useRef } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
}

function App() {
  const [stars, setStars] = useState<Star[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate stars
    const generateStars = () => {
      const newStars: Star[] = [];
      const count = window.innerWidth < 768 ? 50 : 100;
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          animationDelay: Math.random() * 3,
        });
      }
      setStars(newStars);
    };

    generateStars();

    // Trigger reveal animation
    const timer = setTimeout(() => setIsRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, #12121a 0%, #0a0a0f 50%, #050508 100%)',
      }}
    >
      {/* Starfield */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: '2s',
            }}
          />
        ))}
      </div>

      {/* Cosmic glow behind text */}
      <div
        className={`absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full transition-all duration-[2000ms] ease-out ${
          isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(147, 112, 219, 0.15) 0%, rgba(70, 130, 180, 0.08) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Secondary glow ring */}
      <div
        className={`absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full transition-all duration-[2500ms] delay-300 ease-out ${
          isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(255, 200, 150, 0.1) 0%, transparent 60%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Main content */}
      <main className="relative z-10 text-center px-4">
        {/* Transmission marker */}
        <div
          className={`mb-6 md:mb-8 transition-all duration-1000 delay-500 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span
            className="text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] text-[#6b7280] font-mono uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ▸ Transmission Received
          </span>
        </div>

        {/* Hello World text */}
        <h1
          className={`text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tight transition-all duration-[1500ms] delay-200 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: '#f8f4f0',
            textShadow: '0 0 60px rgba(147, 112, 219, 0.4), 0 0 120px rgba(70, 130, 180, 0.2)',
          }}
        >
          Hello, World
        </h1>

        {/* Decorative line */}
        <div
          className={`mx-auto mt-6 md:mt-8 h-px bg-gradient-to-r from-transparent via-[#6b7280] to-transparent transition-all duration-1000 delay-700 ${
            isRevealed ? 'opacity-100 w-32 md:w-48' : 'opacity-0 w-0'
          }`}
        />

        {/* Subtext */}
        <p
          className={`mt-6 md:mt-8 text-sm md:text-base tracking-[0.15em] md:tracking-[0.2em] text-[#9ca3af] transition-all duration-1000 delay-[900ms] ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          The first words across the void
        </p>

        {/* Blinking cursor */}
        <div
          className={`mt-8 md:mt-12 transition-all duration-1000 delay-[1100ms] ${
            isRevealed ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span
            className="inline-block w-3 h-5 md:w-4 md:h-6 bg-[#9370db] animate-pulse"
            style={{
              animationDuration: '1s',
              boxShadow: '0 0 10px rgba(147, 112, 219, 0.8), 0 0 20px rgba(147, 112, 219, 0.4)',
            }}
          />
        </div>
      </main>

      {/* Orbital rings decoration */}
      <div
        className={`absolute w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full border border-[#ffffff08] transition-all duration-[2000ms] delay-500 ${
          isRevealed ? 'opacity-100 scale-100 rotate-12' : 'opacity-0 scale-75 rotate-0'
        }`}
        style={{ transform: isRevealed ? 'rotate(12deg)' : 'rotate(0deg)' }}
      />
      <div
        className={`absolute w-[500px] h-[500px] md:w-[900px] md:h-[900px] rounded-full border border-[#ffffff05] transition-all duration-[2500ms] delay-700 ${
          isRevealed ? 'opacity-100 scale-100 -rotate-6' : 'opacity-0 scale-75 rotate-0'
        }`}
      />

      {/* Corner accents */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 text-[#4b5563]">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#9370db] animate-pulse" />
        <span
          className="text-[9px] md:text-[10px] tracking-widest font-mono uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Origin Point
        </span>
      </div>

      <div className="absolute top-4 right-4 md:top-8 md:right-8 text-right">
        <span
          className="text-[9px] md:text-[10px] text-[#4b5563] tracking-widest font-mono"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {new Date().toISOString().split('T')[0]}
        </span>
      </div>

      {/* Footer */}
      <footer
        className={`absolute bottom-4 md:bottom-6 left-0 right-0 text-center transition-all duration-1000 delay-[1300ms] ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p
          className="text-[10px] md:text-xs text-[#4b5563] tracking-wide"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Requested by <span className="text-[#6b7280]">@web-user</span> · Built by <span className="text-[#6b7280]">@clonkbot</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
