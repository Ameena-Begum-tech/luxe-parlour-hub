import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SERVICES } from "@/lib/services";
import { submitContact } from "@/lib/sheets.functions";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nandhini Beauty Parlour, Kakinada" },
      { name: "description", content: "Get in touch with Nandhini Beauty Parlour. Call, WhatsApp, or send us a message about any of our services." },
      { property: "og:title", content: "Contact Nandhini Beauty Parlour" },
      { property: "og:description", content: "Reach us for bookings, pricing, or any question about our services." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [service, setService] = useState<string>("");
  const [serviceDetail, setServiceDetail] = useState<(typeof SERVICES)[number] | null>(null);
  const [loading, setLoading] = useState(false);
  const submit = useServerFn(submitContact);

  function onSelectService(v: string) {
    setService(v);
    setServiceDetail(SERVICES.find((s) => s.name === v) ?? null);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await submit({
        data: {
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          email: String(fd.get("email") ?? ""),
          service,
          message: String(fd.get("message") ?? ""),
        },
      });
      toast.success("Thank you! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
      setService("");
      setServiceDetail(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center max-w-2xl mx-auto">
        <p className="uppercase tracking-[0.3em] text-xs text-[color:var(--gold)]">Get in touch</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">Contact Us</h1>
        <div className="mx-auto mt-4 w-24 divider-gold" />
      </div>

      <div className="mt-14 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-5">
          {[
            { icon: MapPin, title: "Visit", body: "Wharf Road, Prasar Pet, Kakinada" },
            { icon: Phone, title: "Call / WhatsApp", body: "86887 68911 · 93900 59551" },
            { icon: Mail, title: "Email", body: "hello@nandhiniparlour.com" },
            { icon: Clock, title: "Working Hours", body: "9:00 AM – 8:00 PM (Everyday)" },
          ].map((c) => (
            <div key={c.title} className="flex gap-4 p-4 rounded-xl border border-[color:var(--gold-soft)] bg-white">
              <div className="h-11 w-11 rounded-full bg-gold-gradient text-white flex items-center justify-center shrink-0"><c.icon className="h-5 w-5" /></div>
              <div>
                <div className="text-sm text-[color:var(--gold)] uppercase tracking-widest">{c.title}</div>
                <div className="text-foreground/80 text-sm mt-1">{c.body}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="md:col-span-3 bg-white border border-[color:var(--gold-soft)] rounded-2xl p-8 grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2"><Label htmlFor="name">Name *</Label><Input id="name" name="name" required maxLength={100} /></div>
            <div className="grid gap-2"><Label htmlFor="phone">Phone *</Label><Input id="phone" name="phone" required type="tel" maxLength={20} /></div>
          </div>
          <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" maxLength={120} /></div>
          <div className="grid gap-2">
            <Label>Service you're interested in</Label>
            <Select value={service} onValueChange={onSelectService}>
              <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
              <SelectContent>
                {SERVICES.map((s) => (<SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          {serviceDetail && (
            <div className="rounded-lg border border-[color:var(--gold-soft)] bg-[color:var(--cream)] p-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="font-serif text-lg">{serviceDetail.name}</div>
                  <p className="text-sm text-muted-foreground mt-1">{serviceDetail.description}</p>
                </div>
                <span className="text-sm text-[color:var(--gold)] whitespace-nowrap">{serviceDetail.price}</span>
              </div>
            </div>
          )}
          <div className="grid gap-2"><Label htmlFor="message">Message *</Label><Textarea id="message" name="message" required rows={4} maxLength={1000} placeholder="Tell us how we can help…" /></div>
          <Button type="submit" disabled={loading} className="bg-gold-gradient text-white rounded-full justify-self-start px-8">
            {loading ? "Sending…" : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
}