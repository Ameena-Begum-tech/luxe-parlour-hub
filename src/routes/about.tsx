import { createFileRoute } from "@tanstack/react-router";
import about from "@/assets/about.jpg";
import { Sparkles, Crown, Leaf } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nandhini Beauty Parlour, Kakinada" },
      { name: "description", content: "Meet the team behind Nandhini Beauty Parlour — 10+ years of bridal & beauty artistry in Kakinada." },
      { property: "og:title", content: "About Nandhini Beauty Parlour" },
      { property: "og:description", content: "10+ years of bridal & beauty artistry in Kakinada." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-3 bg-gold-gradient opacity-20 blur-2xl rounded-full" />
          <img src={about} alt="Nandhini artist" width={1000} height={1200} loading="lazy" className="relative rounded-2xl border-4 border-white shadow-xl aspect-[4/5] object-cover" />
        </div>
        <div>
          <p className="uppercase tracking-[0.3em] text-xs text-[color:var(--gold)]">About us</p>
          <h1 className="font-serif text-4xl md:text-5xl mt-2">Welcome to Nandhini</h1>
          <div className="mt-4 w-24 divider-gold" />
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Nandhini Beauty Parlour & Makeovers is Kakinada's trusted destination for bridal makeup,
            hairstyling, mehndi, facials and skincare. With over a decade of hands-on experience and
            more than 1,000 bridal makeovers, we blend traditional artistry with modern techniques.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Every look we craft is personal — matched to your skin, features, outfit and the moment
            you're preparing for. From your engagement day to your grand reception, we're honoured
            to be part of your story.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[{ i: Crown, t: "Premium" }, { i: Sparkles, t: "Personal" }, { i: Leaf, t: "Skin-Safe" }].map((v) => (
              <div key={v.t} className="rounded-lg border border-[color:var(--gold-soft)] p-4 text-center">
                <v.i className="h-5 w-5 text-[color:var(--gold)] mx-auto" />
                <div className="mt-2 text-sm">{v.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}