import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <StatsSection />
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-chime">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Accelerate Your R&D?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto font-normal px-4">
            Start discovering world-class researchers and labs today
          </p>
          <a
            href="/search?q=artificial%20intelligence"
            className="inline-block px-8 sm:px-10 py-4 sm:py-5 bg-white text-chime-teal font-bold text-lg sm:text-xl rounded-full hover:bg-gray-50 active:shadow-[0_0_0_4px_rgba(0,212,170,0.3),0_4px_12px_rgba(0,0,0,0.15)] transition-all"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 text-center text-gray-600">
          <p className="mb-2 text-base">
            Powered by{" "}
            <a
              href="https://openalex.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-chime-teal font-semibold hover:underline"
            >
              OpenAlex
            </a>
          </p>
          <p className="text-base">
            Convergent - Connecting tech companies with research excellence
          </p>
        </div>
      </footer>
    </main>
  );
}

