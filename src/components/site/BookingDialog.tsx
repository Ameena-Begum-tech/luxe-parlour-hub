import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SERVICES } from "@/lib/services";
import { submitBooking } from "@/lib/sheets.functions";

type Props = {
  trigger: React.ReactNode;
  defaultService?: string;
};

export function BookingDialog({ trigger, defaultService }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState(defaultService ?? "");
  const [location, setLocation] = useState<"At Parlour" | "At Home">("At Parlour");
  const submit = useServerFn(submitBooking);

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
          date: String(fd.get("date") ?? ""),
          time: String(fd.get("time") ?? ""),
          location,
          address: String(fd.get("address") ?? ""),
          notes: String(fd.get("notes") ?? ""),
        },
      });
      toast.success("Appointment requested! We'll call you shortly to confirm.");
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (o && defaultService) setService(defaultService); }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-gradient-gold">Book Your Appointment</DialogTitle>
          <DialogDescription>Fill in your details and we'll confirm shortly on WhatsApp / call.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2"><Label htmlFor="name">Full name *</Label><Input id="name" name="name" required maxLength={100} /></div>
            <div className="grid gap-2"><Label htmlFor="phone">Phone *</Label><Input id="phone" name="phone" required type="tel" maxLength={20} /></div>
          </div>
          <div className="grid gap-2"><Label htmlFor="email">Email (optional)</Label><Input id="email" name="email" type="email" maxLength={120} /></div>
          <div className="grid gap-2">
            <Label>Service *</Label>
            <Select value={service} onValueChange={setService} required>
              <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
              <SelectContent>
                {SERVICES.map((s) => (<SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2"><Label htmlFor="date">Preferred date *</Label><Input id="date" name="date" required type="date" min={new Date().toISOString().slice(0, 10)} /></div>
            <div className="grid gap-2"><Label htmlFor="time">Preferred time *</Label><Input id="time" name="time" required type="time" /></div>
          </div>
          <div className="grid gap-2">
            <Label>Where would you like the service?</Label>
            <RadioGroup value={location} onValueChange={(v) => setLocation(v as "At Parlour" | "At Home")} className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="At Parlour" id="loc-parlour" /> At Parlour</label>
              <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="At Home" id="loc-home" /> At Home</label>
            </RadioGroup>
          </div>
          {location === "At Home" && (
            <div className="grid gap-2"><Label htmlFor="address">Address *</Label><Textarea id="address" name="address" required={location === "At Home"} maxLength={300} rows={2} placeholder="Full address for home visit" /></div>
          )}
          <div className="grid gap-2"><Label htmlFor="notes">Notes (optional)</Label><Textarea id="notes" name="notes" maxLength={500} rows={2} placeholder="Anything else we should know?" /></div>
          <DialogFooter>
            <Button type="submit" disabled={loading || !service} className="bg-gold-gradient text-white rounded-full px-8">
              {loading ? "Submitting…" : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}