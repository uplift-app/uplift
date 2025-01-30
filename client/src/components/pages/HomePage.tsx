import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className='flex flex-col items-center justify-center px-6'>
      <header className='text-4xl font-extrabold my-6'>Uplift</header>

      <section className='bg-white text-gray-900 p-8 rounded-2xl shadow-lg text-center max-w-lg'>
        <h1 className='text-2xl font-bold mb-4'>
          Track Your Moods & Behaviors
        </h1>
        <p className='text-gray-600 mb-4'>
          Stay mindful of your emotions, recognize patterns, and gain insights
          into your well-being. Uplift your inner self.
        </p>
        <ul className='text-gray-700 text-center list-none list-inside mb-6'>
          <li>📊 Visualize mood trends over time</li>
          <li>📅 Set reminders for daily check-ins</li>
          <li>🔒 Secure and private journaling</li>
        </ul>
        <Link
          to='/dashboard'
          className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md inline-block'
        >
          Get Started
        </Link>
      </section>

      <footer className='mt-8 text-sm text-gray-200'>© 2025 Uplift App</footer>
    </div>
  );
}

export default HomePage;
