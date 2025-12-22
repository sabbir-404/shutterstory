import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [status, setStatus] = useState("idle")
  // status: idle | sending | success | error

  const submit = async (e) => {
    e.preventDefault()
    setStatus("sending")

    // 1️⃣ Insert into database
    const { error } = await supabase
      .from("contact_messages")
      .insert([form])

    if (error) {
      console.error("DB insert error:", error)
      setStatus("error")
      return
    }

    // 2️⃣ Send email notification
    try {
      const res = await fetch(
        "https://rehivhbkyaopgsvaibdu.supabase.co/functions/v1/send-contact-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      )

      if (!res.ok) throw new Error("Email failed")

      setStatus("success")
    } catch (err) {
      console.error("Email error:", err)
      setStatus("error")
    }
  }

  return (
    <section className="py-32 px-6 max-w-xl mx-auto text-center">
      <h2 className="font-display text-4xl mb-10">
        Contact Me
      </h2>

      {status === "success" && (
        <p className="text-green-400">
          ✅ Message sent successfully. I’ll get back to you soon.
        </p>
      )}

      {status === "error" && (
        <p className="text-red-400">
          ❌ Something went wrong. Please try again.
        </p>
      )}

      {status !== "success" && (
        <form onSubmit={submit} className="space-y-6 mt-6">
          <input
            required
            placeholder="Name"
            className="w-full bg-panel p-4 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <input
            required
            type="email"
            placeholder="Email"
            className="w-full bg-panel p-4 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <textarea
            required
            rows="5"
            placeholder="Message"
            className="w-full bg-panel p-4 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <button
            disabled={status === "sending"}
            className={`
              px-10 py-4 rounded-full
              transition
              ${
                status === "sending"
                  ? "bg-gray-400 text-black cursor-not-allowed"
                  : "bg-white text-black hover:opacity-90"
              }
            `}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </section>
  )
}
