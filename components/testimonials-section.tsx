import { Star, Quote } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "LoopX helped us go from 3 to 10 touchpoints per lead without adding headcount.",
      author: "Sales Manager",
      company: "Mid-Market SaaS",
    },
    {
      quote: "It's like ChatGPT, Apollo, and Salesforce had a smart baby.",
      author: "Sales Rep",
      company: "Enterprise Software",
    },
    {
      quote: "We don't lose deals because we 'missed the basics' anymore.",
      author: "VP of Sales",
      company: "B2B Platform",
    },
  ]

  const outcomes = ["More qualified leads", "More confident reps", "Less wasted time"]

  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-normal text-black mb-8">{outcomes.join(". ")}</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200"
            >
              <Quote className="h-8 w-8 text-purple-600 mb-4" />
              <p className="text-lg text-gray-800 mb-6 italic font-light leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div>
                  <p className="font-medium text-black">{testimonial.author}</p>
                  <p className="text-sm text-gray-600 font-light">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
