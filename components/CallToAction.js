export default function CallToAction() {
  return (
    <section className="py-20 bg-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to Schedule Your Detail?
        </h2>
        <p className="mt-4 text-xl text-red-100">
          Call us today for a personalized quote
        </p>
        <div className="mt-8">
          <a href="tel:(619) 745-4634" className="bg-white hover:bg-gray-100 text-red-600 font-bold px-8 py-4 rounded-lg text-lg transition-colors inline-block">
            (619) 745-4634
          </a>
        </div>
      </div>
    </section>
  )
}
