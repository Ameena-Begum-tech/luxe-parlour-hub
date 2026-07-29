import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur border-b border-[color:var(--gold-soft)]">
      <div className="hidden md:flex items-center justify-between px-8 py-2 text-xs text-muted-foreground border-b border-[color:var(--gold-soft)]/60">
        <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-[color:var(--gold)]" /> Wharf Road, Prasar Pet, Kakinada</div>
        <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-[color:var(--gold)]" /> 9:00 AM – 8:00 PM</div>
      </div>
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 md:px-8 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Nandhini logo" width={48} height={48} className="h-12 w-12" />
          <div className="leading-tight">
            <div className="font-serif text-xl tracking-wide text-gradient-gold">NANDHINI</div>
            <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Beauty Parlour & Makeovers</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm tracking-wide uppercase text-foreground/80 hover:text-[color:var(--gold)] transition-colors"
              activeProps={{ className: "text-[color:var(--gold)] border-b-2 border-[color:var(--gold)] pb-0.5" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild className="bg-gold-gradient text-white rounded-full px-6 shadow-md hover:opacity-90">
            <Link to="/services">Book Appointment</Link>
          </Button>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="md:hidden text-foreground" aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[color:var(--gold-soft)] px-4 py-4 flex flex-col gap-3">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-foreground/80">
              {n.label}
            </Link>
          ))}
          <Button asChild className="bg-gold-gradient text-white rounded-full">
            <Link to="/services" onClick={() => setOpen(false)}>Book Appointment</Link>
          </Button>
        </div>
      )}
    </header>
  );
}