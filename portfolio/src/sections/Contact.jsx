import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";
import { Icon } from "@iconify/react/dist/iconify.js";

const Contact = () => {
  const text = `Have footage, a brief, or a content idea?
    I would love to help shape it into a
    polished video people remember`;
  const items = [
    "send the footage",
    "shape the story",
    "cut the rhythm",
    "polish the color",
    "deliver the edit",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle"); // idle, sending, success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", mobile: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1500);
  };

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);

  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"You shoot it, I shape it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        <div className="flex flex-col px-6 sm:px-10 gap-16 mb-16 text-white">
          {/* Contact Form Column (Centered at the top) */}
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
            <h3 className="text-lg md:text-xl uppercase tracking-wider text-gold font-bold">
              Send a message
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 text-base">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-wider text-white/70 font-bold"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="bg-transparent border-b border-white/20 focus:border-gold outline-none py-2 text-white placeholder-white/30 transition-colors duration-300 font-bold text-base"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-wider text-white/70 font-bold"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="bg-transparent border-b border-white/20 focus:border-gold outline-none py-2 text-white placeholder-white/30 transition-colors duration-300 font-bold text-base"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="mobile"
                  className="text-xs uppercase tracking-wider text-white/70 font-bold"
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  placeholder="+91 00000 00000"
                  className="bg-transparent border-b border-white/20 focus:border-gold outline-none py-2 text-white placeholder-white/30 transition-colors duration-300 font-bold text-base"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs uppercase tracking-wider text-white/70 font-bold"
                >
                  Message / Brief
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell me about your content idea..."
                  className="bg-transparent border-b border-white/20 focus:border-gold outline-none py-2 text-white placeholder-white/30 transition-colors duration-300 font-bold text-base resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "sending" || formStatus === "success"}
                className={`self-start px-8 py-3 rounded-full border border-white/30 uppercase text-xs tracking-widest font-bold transition-all duration-300 
                  ${
                    formStatus === "sending"
                      ? "bg-white/10 text-white/50 cursor-not-allowed"
                      : formStatus === "success"
                      ? "bg-gold border-gold text-black cursor-default font-bold"
                      : "hover:bg-white hover:text-black hover:border-white active:scale-95"
                  }`}
              >
                {formStatus === "idle" && "Send message"}
                {formStatus === "sending" && "Sending..."}
                {formStatus === "success" && "Message Sent!"}
              </button>
            </form>

          </div>

          {/* Contact Details (Below the form) */}
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 gap-10 pt-12 border-t border-white/10 uppercase md:grid-cols-3 md:gap-12">
            <div className="social-link flex flex-col items-start text-left">
              <h2 className="text-sm tracking-wider text-white/50 font-bold">Phone</h2>
              <div className="w-full h-px my-2 bg-white/20" />
              <a
                href="tel:+917261989875"
                className="text-base tracking-wider md:text-lg lg:text-xl font-normal mt-1 hover:text-gold transition-colors duration-200"
              >
                +91 72619 89875
              </a>
            </div>
            <div className="social-link flex flex-col items-start text-left">
              <h2 className="text-sm tracking-wider text-white/50 font-bold">E-mail</h2>
              <div className="w-full h-px my-2 bg-white/20" />
              <a
                href="mailto:iushworks@gmail.com"
                className="text-base tracking-wider lowercase md:text-lg lg:text-xl font-normal hover:text-gold transition-colors duration-200 mt-1"
              >
                iushworks@gmail.com
              </a>
            </div>
            <div className="social-link flex flex-col items-start text-left">
              <h2 className="text-sm tracking-wider text-white/50 font-bold">Social Media</h2>
              <div className="w-full h-px my-2 bg-white/20" />
              <div className="flex items-center gap-3 mt-1">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <Icon icon={social.icon} className="size-6 sm:size-7" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
