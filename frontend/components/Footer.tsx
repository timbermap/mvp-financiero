// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t p-8 text-center text-gray-500">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} MVP Financiero. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="/terms" className="hover:underline">Términos de Servicio</a>
          <a href="/privacy" className="hover:underline">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
}