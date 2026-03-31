"use client";

import { useEffect, useRef, useState } from "react";
import { canAnimate } from "../utils/animation";
import useTextReveal from "../hooks/useTextReveal";
import useMagneticHover from "../hooks/useMagneticHover";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const submitBtnRef = useRef(null);
  const [status, setStatus] = useState("idle");

  useTextReveal(sectionRef);
  useMagneticHover(submitBtnRef);

  useEffect(() => {
    if (!canAnimate()) return;

    let ctx;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".contact-header",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".contact-header",
              start: "top 80%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".contact-form-wrapper",
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 0.9,
            scrollTrigger: {
              trigger: ".contact-form-wrapper",
              start: "top 85%",
              once: true,
            },
          }
        );
      }, sectionRef);
    };

    init();
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      formRef.current?.reset();

      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="light-beam left-1/4 -rotate-12 translate-y-[-20%]" />
        <div className="light-beam left-2/3 rotate-6 translate-y-[10%] opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 text-[25rem] font-[family-name:var(--font-headline)] font-black text-surface-container-lowest select-none pointer-events-none leading-none opacity-40">
          GK
        </div>
      </div>

      <div className="contact-header relative z-10 text-center mb-12 md:mb-16 max-w-4xl mx-auto">
        <span className="font-[family-name:var(--font-label)] text-xs uppercase tracking-[0.2em] text-primary mb-4 block">
          Let&apos;s Connect
        </span>
        <h2
          className="font-[family-name:var(--font-headline)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-4 md:mb-6 leading-[0.9]"
          data-reveal
        >
          Get In Touch
        </h2>
        <p className="font-[family-name:var(--font-body)] text-base md:text-lg text-on-surface-variant max-w-xl mx-auto opacity-80 leading-relaxed px-4">
          Have a project in mind? Drop a message and I&apos;ll get back to you within 24 hours.
        </p>
      </div>

      <div className="contact-form-wrapper relative z-10 w-full max-w-xl mx-auto">
        <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-surface-container border border-outline-variant/20 shadow-2xl backdrop-blur-xl">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="form-field relative">
                  <input
                    className="peer form-input w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 pt-6 pb-2 text-on-surface text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder=" "
                    required
                    autoComplete="name"
                  />
                  <label
                    className="form-label absolute left-4 top-4 text-sm text-on-surface-variant pointer-events-none transition-all duration-250 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest"
                    htmlFor="contact-name"
                  >
                    Full Name
                  </label>
                </div>

                <div className="form-field relative">
                  <input
                    className="peer form-input w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 pt-6 pb-2 text-on-surface text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder=" "
                    required
                    autoComplete="email"
                  />
                  <label
                    className="form-label absolute left-4 top-4 text-sm text-on-surface-variant pointer-events-none transition-all duration-250 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest"
                    htmlFor="contact-email"
                  >
                    Email Address
                  </label>
                </div>
              </div>

              <div className="form-field relative">
                <input
                  className="peer form-input w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 pt-6 pb-2 text-on-surface text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder=" "
                  required
                />
                <label
                  className="form-label absolute left-4 top-4 text-sm text-on-surface-variant pointer-events-none transition-all duration-250 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest"
                  htmlFor="contact-subject"
                >
                  Subject
                </label>
              </div>

              <div className="form-field relative">
                <textarea
                  className="peer form-textarea w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 pt-6 pb-2 text-on-surface text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300 resize-none min-h-[140px]"
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder=" "
                  required
                />
                <label
                  className="form-label absolute left-4 top-4 text-sm text-on-surface-variant pointer-events-none transition-all duration-250 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest"
                  htmlFor="contact-message"
                >
                  Your Message
                </label>
              </div>

              <button
                ref={submitBtnRef}
                type="submit"
                disabled={status === "sending"}
                className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-primary-container to-secondary-container text-on-surface font-[family-name:var(--font-headline)] font-bold py-4 rounded-xl active:scale-[0.98] shadow-lg shadow-primary/15 hover:shadow-primary/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="font-[family-name:var(--font-label)] text-sm uppercase tracking-widest">
                  {status === "sending"
                    ? "Sending..."
                    : status === "sent"
                    ? "Message Sent!"
                    : status === "error"
                    ? "Try Again"
                    : "Send Message"}
                </span>
                {status === "idle" && (
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                )}
                {status === "sent" && (
                  <span className="material-symbols-outlined text-lg">
                    check_circle
                  </span>
                )}
              </button>

              {status === "sent" && (
                <p className="text-center text-sm text-green-400 font-[family-name:var(--font-body)]">
                  Message sent successfully! I&apos;ll get back to you soon.
                </p>
              )}

              {status === "error" && (
                <p className="text-center text-sm text-red-400 font-[family-name:var(--font-body)]">
                  Failed to send. Please try again or email directly.
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full border border-primary/20 hidden sm:flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full border border-secondary/20 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-primary/10 blur-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
