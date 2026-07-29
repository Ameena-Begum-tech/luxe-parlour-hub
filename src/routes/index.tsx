import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { AutoCarousel } from "@/components/site/AutoCarousel";
import { BookingDialog } from "@/components/site/BookingDialog";
import { SERVICES } from "@/lib/services";
import { Sparkles, Crown, Leaf, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nandhini Beauty Parlour — Bridal Makeup & Makeovers in Kakinada" },
      { name: "description", content: "Premium bridal makeup, hair, mehndi & skincare at Nandhini Beauty Parlour, Kakinada. Book at parlour or at home." },
      { property: "og:title", content: "Nandhini Beauty Parlour — Kakinada" },
      { property: "og:description", content: "Premium bridal makeup, hair, mehndi & skincare. Book at parlour or at home." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[color:var(--cream)]">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-10 items-center px-6 py-16 md:py-24">
          <div>
            <p className="uppercase tracking-[0.35em] text-[color:var(--gold)] text-xs mb-4">Est. Kakinada</p>
            <h1 className="font-serif text-5xl md:text-6xl leading-tight text-foreground">
              Enhancing your <span className="text-gradient-gold italic">natural beauty</span> with elegance
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Bridal makeup · Hairstyling · Mehndi · Facials · Skincare — crafted with premium products and a personal touch.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BookingDialog
                trigger={<Button size="lg" className="bg-gold-gradient text-white rounded-full px-8 shadow-lg">Book Appointment</Button>}
              />
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[color:var(--gold)] text-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-white">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
              <div><div className="font-serif text-2xl text-[color:var(--gold)]">10+</div>Years experience</div>
              <div><div className="font-serif text-2xl text-[color:var(--gold)]">5000+</div>Happy clients</div>
              <div><div className="font-serif text-2xl text-[color:var(--gold)]">1000+</div>Bridal makeovers</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gold-gradient opacity-20 blur-3xl rounded-full" />
            <img src={hero} alt="Nandhini bridal makeup" width={1600} height={1200} className="relative rounded-2xl shadow-2xl border-4 border-white object-cover aspect-[4/5]" />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg px-5 py-3 border border-[color:var(--gold-soft)]">
              <p className="font-script text-2xl text-[color:var(--gold)] leading-none">Nandhini</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Signature Bridal</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-xs text-[color:var(--gold)]">What we do</p>
          <h2 className="font-serif text-4xl mt-2">Our Signature Services</h2>
          <div className="mx-auto mt-4 w-24 divider-gold" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.slice(0, 8).map((s) => (
            <div key={s.id} className="group relative bg-white border border-[color:var(--gold-soft)] rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="h-12 w-12 rounded-full bg-gold-gradient/10 border border-[color:var(--gold)] flex items-center justify-center text-[color:var(--gold)] mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{s.description}</p>
              <p className="mt-3 text-sm text-[color:var(--gold)]">{s.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="rounded-full border-[color:var(--gold)] text-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-white">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </section>

      {/* GALLERY CAROUSEL */}
      <section className="py-20 bg-[color:var(--cream)]">
        <div className="text-center max-w-2xl mx-auto px-6">
          <p className="uppercase tracking-[0.3em] text-xs text-[color:var(--gold)]">Our work</p>
          <h2 className="font-serif text-4xl mt-2">Gallery</h2>
          <div className="mx-auto mt-4 w-24 divider-gold" />
          <p className="mt-4 text-muted-foreground">A glimpse of our recent makeovers, bridal looks and hair artistry.</p>
        </div>
        <div className="mt-12">
          <AutoCarousel />
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Crown, title: "Premium Brands", body: "Only trusted, salon-grade cosmetics." },
            { icon: Users, title: "5000+ Clients", body: "Trusted by brides across Kakinada." },
            { icon: Leaf, title: "Skin-Safe", body: "Products chosen for sensitive skin too." },
            { icon: Sparkles, title: "At Home Service", body: "Bridal & party bookings at your doorstep." },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-gold-gradient text-white flex items-center justify-center"><f.icon className="h-6 w-6" /></div>
              <h3 className="mt-4 font-serif text-xl">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-xs">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold-gradient text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="font-serif text-4xl">Ready for your signature look?</h2>
          <p className="mt-3 text-white/90">Book your appointment today — at parlour or at home.</p>
          <div className="mt-8">
            <BookingDialog
              trigger={<Button size="lg" className="bg-white text-[color:var(--gold)] hover:bg-white/90 rounded-full px-10 shadow-lg">Book Now</Button>}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
