import Layout from "./layout";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <Layout>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] bg-white text-black px-6">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between py-24 gap-16">
          {/* Text Section */}
          <div className="flex flex-col max-w-xl text-left">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 ">
              Delightful events <br />
              <span className="bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                start here.
              </span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Set up an event page, invite friends and sell tickets.
              Host a memorable event today.
            </p>
            <button className="px-6 py-3 bg-black text-white font-medium rounded-full shadow hover:bg-gray-800 transition">
              Create Your First Event
            </button>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 max-w-md">
              <img
                src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80"
                alt="Event Preview"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
