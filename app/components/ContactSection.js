"use client";

import { useEffect, useRef, useState } from "react";
import { canAnimate } from "../utils/animation";
import useTextReveal from "../hooks/useTextReveal";
import useMagneticHover from "../hooks/useMagneticHover";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const submitBtnRef = useRef(null);
  const fillRef = useRef(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, sending, sent, error
  const [focusedField, setFocusedField] = useState(null);

  // Hooks
  useTextReveal(sectionRef);
  useMagneticHover(submitBtnRef);

  // Form entrance animation
  useEffect(() => {
    if (!canAnimate()) return;

    let ctx;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Header entrance
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

        // Form slide up
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

  // Submit button hover fill
  const handleBtnEnter = async () => {
    if (!canAnimate() || !fillRef.current) return;
    const gsap = (await import("gsap")).default;
    fillRef.current.style.transformOrigin = "left";
    gsap.to(fillRef.current, {
      scaleX: 1,
      ease: "power3.out",
      duration: 0.4,
    });
  };

  const handleBtnLeave = async () => {
    if (!canAnimate() || !fillRef.current) return;
    const gsap = (await import("gsap")).default;
    fillRef.current.style.transformOrigin = "right";
    gsap.to(fillRef.current, {
      scaleX: 0,
      ease: "power3.in",
      duration: 0.3,
    });
  };

  // Float label handlers
  const handleFocus = async (fieldName, labelEl) => {
    setFocusedField(fieldName);
    if (!canAnimate() || !labelEl) return;
    const gsap = (await import("gsap")).default;
    gsap.to(labelEl, {
      y: -24,
      scale: 0.72,
      color: "#acc7ff",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleBlur = async (fieldName, labelEl, value) => {
    setFocusedField(null);
    if (!canAnimate() || !labelEl) return;
    if (value) return; // Keep label in floated position if field has value
    const gsap = (await import("gsap")).default;
    gsap.to(labelEl, {
      y: 0,
      scale: 1,
      color: "#8c909e",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );
      setStatus("sent");
      setFormState({ name: "", email: "", message: "" });

      // Success particle burst
      if (canAnimate() && submitBtnRef.current) {
        const gsap = (await import("gsap")).default;
        const btnRect = submitBtnRef.current.getBoundingClientRect();
        const particles = [];

        for (let i = 0; i < 20; i++) {
          const particle = document.createElement("div");
          particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #acc7ff;
            pointer-events: none;
            z-index: 9999;
            left: ${btnRect.left + btnRect.width / 2}px;
            top: ${btnRect.top + btnRect.height / 2}px;
          `;
          document.body.appendChild(particle);
          particles.push(particle);
        }

        gsap.to(particles, {
          x: () => (Math.random() - 0.5) * 200,
          y: () => (Math.random() - 0.5) * 200,
          scale: 0,
          opacity: 0,
          stagger: 0.025,
          duration: 0.9,
          ease: "power2.out",
          onComplete: () => {
            particles.forEach((p) => p.remove());
          },
        });
      }

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
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden"
    >
      {/* Subtle Beam Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="light-beam left-1/4 -rotate-12 translate-y-[-20%]" />
        <div className="light-beam left-2/3 rotate-6 translate-y-[10%] opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 text-[25rem] font-[family-name:var(--font-headline)] font-black text-surface-container-lowest select-none pointer-events-none leading-none opacity-40">
          GK
        </div>
      </div>

      {/* Header */}
      <div className="contact-header relative z-10 text-center mb-16 max-w-4xl mx-auto">
        <span className="font-[family-name:var(--font-label)] text-xs uppercase tracking-[0.2em] text-primary mb-4 block">
          Let&apos;s Connect
        </span>
        <h2
          className="font-[family-name:var(--font-headline)] text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6 leading-[0.9]"
          data-reveal
        >
          Let&apos;s Build Something
        </h2>
        <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-on-surface-variant max-w-xl mx-auto opacity-80 leading-relaxed">
          Have a project in mind? Let&apos;s talk about how we can turn your
          vision into a cinematic digital reality.
        </p>
      </div>

      {/* Contact Form */}
      <div className="contact-form-wrapper relative z-10 w-full max-w-[600px] mx-auto">
        <div className="p-8 md:p-10 rounded-xl bg-on-surface/5 backdrop-blur-[20px] border border-outline-variant/20 shadow-2xl">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="float-field">
                <input
                  className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-lg px-4 py-4 pt-6 text-on-surface focus:outline-none focus:border-primary transition-colors solaris-transition"
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={(e) =>
                    handleFocus(
                      "name",
                      e.target.parentElement.querySelector(".float-label")
                    )
                  }
                  onBlur={(e) =>
                    handleBlur(
                      "name",
                      e.target.parentElement.querySelector(".float-label"),
                      e.target.value
                    )
                  }
                />
                <label
                  className="float-label font-[family-name:var(--font-label)] text-[0.7rem] uppercase tracking-widest text-on-surface-variant/60"
                  htmlFor="contact-name"
                >
                  Full Name
                </label>
              </div>

              {/* Email Field */}
              <div className="float-field">
                <input
                  className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-lg px-4 py-4 pt-6 text-on-surface focus:outline-none focus:border-primary transition-colors solaris-transition"
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={(e) =>
                    handleFocus(
                      "email",
                      e.target.parentElement.querySelector(".float-label")
                    )
                  }
                  onBlur={(e) =>
                    handleBlur(
                      "email",
                      e.target.parentElement.querySelector(".float-label"),
                      e.target.value
                    )
                  }
                />
                <label
                  className="float-label font-[family-name:var(--font-label)] text-[0.7rem] uppercase tracking-widest text-on-surface-variant/60"
                  htmlFor="contact-email"
                >
                  Email Address
                </label>
              </div>
            </div>

            {/* Message Field */}
            <div className="float-field">
              <textarea
                className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-lg px-4 py-4 pt-6 text-on-surface focus:outline-none focus:border-primary transition-colors solaris-transition resize-none"
                id="contact-message"
                name="message"
                rows="5"
                required
                value={formState.message}
                onChange={handleChange}
                onFocus={(e) =>
                  handleFocus(
                    "message",
                    e.target.parentElement.querySelector(".float-label")
                  )
                }
                onBlur={(e) =>
                  handleBlur(
                    "message",
                    e.target.parentElement.querySelector(".float-label"),
                    e.target.value
                  )
                }
              />
              <label
                className="float-label font-[family-name:var(--font-label)] text-[0.7rem] uppercase tracking-widest text-on-surface-variant/60"
                htmlFor="contact-message"
              >
                Your Message
              </label>
            </div>

            {/* Submit Button with fill animation */}
            <button
              ref={submitBtnRef}
              type="submit"
              disabled={status === "sending"}
              onMouseEnter={handleBtnEnter}
              onMouseLeave={handleBtnLeave}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-primary-container to-secondary-container text-on-surface font-[family-name:var(--font-headline)] font-bold py-4 rounded-xl solaris-transition active:scale-95 shadow-[0_0_20px_rgba(80,143,248,0.2)] hover:shadow-[0_0_30px_rgba(80,143,248,0.4)] transition-shadow disabled:opacity-50"
            >
              {/* Fill layer */}
              <div
                ref={fillRef}
                className="absolute inset-0 bg-white/15"
                style={{ transform: "scaleX(0)", transformOrigin: "left" }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {status === "sending"
                  ? "Sending..."
                  : status === "sent"
                  ? "Message Sent! ✓"
                  : status === "error"
                  ? "Error. Try Again"
                  : "Send Message"}
                {status === "idle" && (
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Floating Decoration */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full border border-secondary/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 blur-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
