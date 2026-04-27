"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

export default function ContactSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    /*
      TODO: Wire up form submission here.
      Options:
        A) Formspree — update the action URL on the <form> element below
           and remove this handler: <form action="https://formspree.io/f/YOUR_ID" method="POST">
        B) Custom API route — fetch("/api/contact", { method: "POST", body: formData })
        C) EmailJS — use emailjs-com package for client-side email sending
      For now, we show a success message to confirm the form works.
    */
    setSubmitted(true);
  }

  return (
    <section id="contact">
      <div>

        {/* Section label */}
        <p>
          06 — {t("contact_heading")}
        </p>

        <h2>
          {t("contact_heading")}
        </h2>

        <p>
          {t("contact_sub")}
        </p>

        {submitted ? (
          /* Success state */
          <div>
            <div>
              <div />
              <span>✓</span>
              <div />
            </div>
            <p>
              {/* TODO: Translate success message */}
              Mensaje enviado. Gracias por tu interés. / Message sent. Thank you.
            </p>
          </div>
        ) : (
          /*
            TODO: To use Formspree, replace the onSubmit handler and add:
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
            to the <form> element, then remove the onSubmit prop.
          */
          <form onSubmit={handleSubmit}>

            {/* Name row */}
            <div>
              <div>
                <label htmlFor="fname">
                  {t("contact_fname")} *
                </label>
                <input
                  id="fname"
                  name="fname"
                  type="text"
                  required
                  placeholder={t("contact_fname")}
                />
              </div>
              <div>
                <label htmlFor="lname">
                  {t("contact_lname")} *
                </label>
                <input
                  id="lname"
                  name="lname"
                  type="text"
                  required
                  placeholder={t("contact_lname")}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email">
                {t("contact_email")} *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="correo@ejemplo.com"
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject">
                {t("contact_subject")} *
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder={t("contact_subject")}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message">
                {t("contact_message")} *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder={t("contact_message")}
              />
            </div>

            {/* Submit */}
            <div>
              <button type="submit">
                {t("contact_submit")}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
