
import { ContactForm } from "@/components/ContactForm";
import { Facebook, Phone, Mail, MapPin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section className="w-full min-h-screen pt-24 pb-12 bg-gradient-to-br from-white via-white to-startup-blue-light">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title and subtitle */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-startup-blue mb-2">Contactez-nous</h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Nous sommes impatients de vous lire ! Remplissez le formulaire ou contactez-nous directement.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-10 bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          {/* Left: Info */}
          <div className="md:w-2/5 w-full px-8 py-10 bg-gradient-to-b from-startup-blue to-startup-blue-light text-white flex flex-col justify-between">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-semibold mb-5 font-heading">Informations</h2>
              <ul className="space-y-4 text-base">
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 opacity-90" />
                  <span>+237 651 172 706</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M17 2h-14a1 1 0 0 0 -1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-14a1 1 0 0 0 -1-1zm-1 2-5 4.997-5-4.997zm-12 12v-11.367l5.803 5.794c.291.29.677.435 1.073.435s.782-.145 1.073-.435l5.803-5.794v11.367z"/></svg>
                  <span>startupconception3.0@gmail.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 opacity-90" />
                  <span>Yaoundé, Ekounou-Ekie-Concentré</span>
                </li>
              </ul>
              <div className="mt-8">
                <h3 className="text-lg font-heading font-bold mb-2">WhatsApp</h3>
                <a 
                  href="https://wa.me/237691200242"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white bg-startup-blue-light px-4 py-2 rounded-md hover:bg-white hover:text-startup-blue transition"
                  >
                  +237 691 200 242
                </a>
              </div>
            </div>
            {/* Socials */}
            <div className="mt-10">
              <h3 className="text-lg font-heading font-bold mb-2">Réseaux sociaux</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@Bertini.tlcom.3.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  {/* TikTok SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-tiktok" viewBox="0 0 16 16"><path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/></svg>
                </a>
              </div>
            </div>
          </div>
          {/* Right: Form */}
          <div className="md:w-3/5 w-full p-8 bg-white flex flex-col justify-center">
            <h2 className="text-xl font-bold text-startup-blue mb-4 font-heading">Envoyez-nous un message</h2>
            <ContactForm />
          </div>
        </div>
        {/* Call to action */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-block px-8 py-3 rounded-lg bg-startup-blue text-white font-semibold text-lg hover:bg-startup-blue/90 transition hover:scale-105"
          >
            Découvrez nos services
          </Link>
        </div>
      </div>
    </section>
  );
}
