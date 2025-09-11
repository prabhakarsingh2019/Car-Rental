import Image from "next/image";
import bg from "../public/bg.jpg";
import Link from "next/link";

async function Home() {
  return (
    <main className="relative min-h-screen bg-brand-900 text-brand-50">
      <Image
        src={bg}
        alt="Luxury Car Background"
        fill
        priority
        quality={75}
        className="object-cover object-top blur-[4px]"
      />
      <div className="z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-accent-400 drop-shadow-lg">
          LuxDrive Car Rentals
        </h2>
        <p className="text-base sm:text-lg max-w-2xl text-brand-100 mb-8 drop-shadow-md">
          Experience premium luxury cars at unbeatable prices. At LuxDrive, we
          believe every drive should be memorable. Whether it&#39;s for
          business, leisure, or adventure — we&#39;ve got the perfect car
          waiting for you.
        </p>
        <p className="text-sm sm:text-base text-brand-300 drop-shadow-md">
          🚗 Trusted by 10,000+ customers worldwide
        </p>
        <Link
          href="/cars"
          className="z-20 bg-accent-500 hover:bg-accent-600 text-white px-5 py-3 rounded-lg shadow-md mt-8 text-sm sm:text-base"
        >
          Book now
        </Link>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid gap-6 sm:gap-8 md:grid-cols-3 mt-12">
          <div className="z-20 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/car1.jpg"
              alt="Ferrari"
              width={500}
              height={300}
              className="object-cover w-full h-48 sm:h-56 md:h-64 hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="z-20 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/car2.jpg"
              alt="Mercedes"
              width={500}
              height={300}
              className="object-cover w-full h-48 sm:h-56 md:h-64 hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="z-20 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/car3.jpg"
              alt="Range Rover"
              width={500}
              height={300}
              className="object-cover w-full h-48 sm:h-56 md:h-64 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
