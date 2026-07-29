import { createFileRoute } from "@tanstack/react-router";
import { SERVICES } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/site/BookingDialog";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Pricing — Nandhini Beauty Parlour" },
      { name: "description", content: "Bridal makeup, hairstyling, mehndi, facials, threading, waxing & skincare. Book at parlour or at home." },
      { property: "og:title", content: "Services — Nandhini Beauty Parlour" },
      { property: "og:description", content: "Full menu of bridal & beauty services in Kakinada." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center max-w-2xl mx-auto">
        <p className="uppercase tracking-[0.3em] text-xs text-[color:var(--gold)]">Our menu</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">Services & Pricing</h1>
        <div className="mx-auto mt-4 w-24 divider-gold" />
        <p className="mt-4 text-muted-foreground">Choose a service and book at parlour or request home service.</p>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <article key={s.id} className="group relative bg-white rounded-2xl border border-[color:var(--gold-soft)] p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-full bg-gold-gradient text-white flex items-center justify-center"><Sparkles className="h-5 w-5" /></div>
              <span className="text-sm text-[color:var(--gold)] font-medium">{s.price}</span>
            </div>
            <h3 className="mt-4 font-serif text-2xl">{s.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground flex-1">{s.description}</p>
            <div className="mt-6">
              <BookingDialog
                defaultService={s.name}
                trigger={<Button className="w-full bg-gold-gradient text-white rounded-full">Book This Service</Button>}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}