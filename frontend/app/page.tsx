// frontend/app/page.tsx
export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 text-center">
      <h1 className="text-5xl font-extrabold mb-4">
        Análisis de Mercados Potenciado por IA
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Toma decisiones de inversión más inteligentes con nuestros datos exclusivos.
      </p>
      <a href="/signup" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
        Empieza Gratis
      </a>
    </main>
  );
}