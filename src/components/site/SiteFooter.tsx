import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { Instagram, Facebook, MessageCircle, Phone, MapPin, Clock } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[color:var(--gold-soft)] bg-[color:var(--cream)]">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Nandhini" width={44} height={44} className="h-11 w-11" loading="lazy" />
            <div>
              <div className="font-serif text-lg text-gradient-gold">NANDHINI</div>
              <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Beauty Parlour & Makeovers</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Enhancing your natural beauty with elegance.</p>
        </div>
        <div>
          <h4 className="text-sm tracking-widest uppercase text-[color:var(--gold)] mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[color:var(--gold)]">Home</Link></li>
            <li><Link to="/about" className="hover:text-[color:var(--gold)]">About</Link></li>
            <li><Link to="/services" className="hover:text-[color:var(--gold)]">Services</Link></li>
            <li><Link to="/contact" className="hover:text-[color:var(--gold)]">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm tracking-widest uppercase text-[color:var(--gold)] mb-4">Reach Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-[color:var(--gold)] mt-0.5" /> Wharf Road, Prasar Pet, Kakinada</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-[color:var(--gold)] mt-0.5" /> 86887 68911 · 93900 59551</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 text-[color:var(--gold)] mt-0.5" /> 9:00 AM – 8:00 PM (Everyday)</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm tracking-widest uppercase text-[color:var(--gold)] mb-4">Follow</h4>
          <div className="flex gap-3">
            {[Instagram, Facebook, MessageCircle].map((I, i) => (
              <a key={i} href="#" aria-label="Social link" className="h-10 w-10 rounded-full border border-[color:var(--gold)] text-[color:var(--gold)] flex items-center justify-center hover:bg-gold-gradient hover:text-white transition-colors">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[color:var(--gold-soft)] py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nandhini Beauty Parlour. All Rights Reserved.
      </div>
    </footer>
  );
}