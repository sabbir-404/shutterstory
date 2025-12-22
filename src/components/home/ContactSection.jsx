import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()

    await supabase.from("contact_messages").insert([form])
    setSent(true)
  }

  return (
    <section className="py-32 px-6 max-w-xl mx-auto text-center">
      <h2 className="font-display text-4xl mb-10">
        Contact Me
      </h2>

      {sent ? (
        <p className="text-soft">
          Thank you. I’ll get back to you soon.
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-6">
          <input
            placeholder="Name"
            className="w-full bg-panel p-4 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <input
            placeholder="Email"
            type="email"
            className="w-full bg-panel p-4 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <textarea
            placeholder="Message"
            rows="5"
            className="w-full bg-panel p-4 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />
          <button
            className="
              px-10 py-4 rounded-full
              bg-white text-black
              hover:opacity-90 transition
            "
          >
            Send Message
          </button>
        </form>
      )}
    </section>
  )
}
