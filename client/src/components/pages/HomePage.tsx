import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="text-4xl font-black my-6 font-comfortaa">
        Uplift
      </header>

      <section className="p-8 text-center max-w-lg component-style">
        <h1 className="text-2xl font-bold mb-4 font-comfortaa">
          Track Your Moods & Behaviours
        </h1>
        <p className="mb-4">
          Stay mindful of your emotions, recognize patterns, and gain insights
          into your well-being. Uplift your inner self.
        </p>
        <ul className="text-center list-none list-inside mb-6">
          <li>📊 Visualize mood trends over time</li>
          <li>📅 Set reminders for daily check-ins</li>
          <li>🔒 Secure and private journaling</li>
        </ul>
        <Link
          to="/dashboard"
          className="bg-primary hover:bg-primary/90 text-white h-9 px-4 py-2 rounded-md text-sm font-medium shadow-md inline-block"
        >
          Get Started
        </Link>
      </section>

      <footer className="mt-8 text-sm">© 2025 Uplift App</footer>
    </div>
  );
}

export default HomePage;
