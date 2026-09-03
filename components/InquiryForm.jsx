"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Mail, Sparkles, CheckCircle2, Calendar, Clock, MapPin, Users, Send } from "lucide-react";
import { siteConfig, services, packages } from "@/lib/data";

export default function InquiryForm() {
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get("service") || "";
  const preSelectedPackage = searchParams.get("package") || "";
  const preSelectedLook = searchParams.get("look") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventDate: "",
    readyByTime: "09:00 AM",
    location: "Toronto / GTA",
    serviceType: preSelectedService || "bridal-hair-makeup",
    packageChoice: preSelectedPackage || "",
    bridalPartyCount: "1 (Bride only)",
    needsDrapingJewelry: "Yes, full bridal draping & jewelry setting",
    heardFrom: "Instagram",
    notes: preSelectedLook ? `Interested in look: ${preSelectedLook}` : "",
  });

  const [submittedViaEmail, setSubmittedViaEmail] = useState(false);

  useEffect(() => {
    if (preSelectedService) {
      setFormData((prev) => ({ ...prev, serviceType: preSelectedService }));
    }
    if (preSelectedPackage) {
      setFormData((prev) => ({ ...prev, packageChoice: preSelectedPackage }));
    }
    if (preSelectedLook) {
      setFormData((prev) => ({
        ...prev,
        notes: prev.notes ? `${prev.notes}\nInspiration: ${preSelectedLook}` : `Inspiration: ${preSelectedLook}`,
      }));
    }
  }, [preSelectedService, preSelectedPackage, preSelectedLook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Build the clean WhatsApp message text
  const generateWhatsAppMessage = () => {
    const selectedServiceObj = services.find((s) => s.id === formData.serviceType);
    const serviceName = selectedServiceObj ? selectedServiceObj.title : formData.serviceType;
    const selectedPackageObj = packages.find((p) => p.id === formData.packageChoice);
    const packageName = selectedPackageObj ? selectedPackageObj.name : "Custom Request";

    const text = `✨ *BEAUTYBYKRIMSE BRIDAL INQUIRY* ✨
-----------------------------------------
👤 *Name:* ${formData.fullName || "Prospective Bride"}
📧 *Email:* ${formData.email || "Not specified"}
📱 *Phone:* ${formData.phone || "Not specified"}

📅 *Event Date:* ${formData.eventDate || "Date TBD"}
⏰ *Ready-by Time:* ${formData.readyByTime}
📍 *Getting-Ready Location:* ${formData.location}

💄 *Service Requested:* ${serviceName}
👑 *Package Interest:* ${packageName}
👥 *Bridal Party Size:* ${formData.bridalPartyCount}
🧷 *Dupatta/Jewelry Setting:* ${formData.needsDrapingJewelry}
📢 *Referral Source:* ${formData.heardFrom}

📝 *Notes & Inspiration:*
${formData.notes || "Looking forward to hearing from you regarding pricing and availability!"}
-----------------------------------------`;

    return encodeURIComponent(text);
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const encodedText = generateWhatsAppMessage();
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedText}`;
    window.open(url, "_blank");
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const selectedServiceObj = services.find((s) => s.id === formData.serviceType);
    const serviceName = selectedServiceObj ? selectedServiceObj.title : formData.serviceType;
    
    const subject = encodeURIComponent(`Bridal Booking Inquiry: ${formData.fullName} - ${formData.eventDate}`);
    const body = encodeURIComponent(
      `Hello BeautyByKrimse Team,

I would love to inquire about availability and pricing for my upcoming event.

Here are my event details:
- Full Name: ${formData.fullName}
- Phone Number: ${formData.phone}
- Email: ${formData.email}
- Event Date: ${formData.eventDate}
- Ready-by Time: ${formData.readyByTime}
- Getting-Ready Location: ${formData.location}
- Service Type: ${serviceName}
- Package: ${formData.packageChoice || "Standard"}
- Total People (Hair & Makeup): ${formData.bridalPartyCount}
- Dupatta / Veil & Jewelry Setting: ${formData.needsDrapingJewelry}
- Referral Source: ${formData.heardFrom}

Additional Notes / Questions:
${formData.notes}

Looking forward to your response!

Best regards,
${formData.fullName}`
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmittedViaEmail(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#141414]/90 border border-white/[0.1] rounded-3xl p-6 sm:p-10 md:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#E8C8CC]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9919A]/15 border border-[#C9919A]/30 text-[#E8C8CC] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
          <Sparkles className="w-3 h-3 text-[#C9919A]" />
          <span>Bridal Reservations</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl text-[#FAF8F6] uppercase font-light tracking-wide">
          Check Date & Request Proposal
        </h2>
        <p className="text-xs sm:text-sm text-[#FAF8F6]/70 mt-2 font-light">
          Complete the details below for an immediate WhatsApp concierge link or direct email dispatch.
        </p>
      </div>

      {submittedViaEmail && (
        <div className="mb-8 p-4 rounded-2xl bg-[#C9919A]/20 border border-[#C9919A]/40 flex items-center gap-3 text-sm text-[#FAF8F6]">
          <CheckCircle2 className="w-5 h-5 text-[#E8C8CC] shrink-0" />
          <div>
            <p className="font-medium text-[#FAF8F6]">Inquiry dispatched to our studio email!</p>
            <p className="text-xs text-[#FAF8F6]/70">
              We respond to all requests within 24 hours. For fastest instant replies, you can also click the WhatsApp button below.
            </p>
          </div>
        </div>
      )}

      <form className="space-y-6">
        {/* Row 1: Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] text-[#FAF8F6]/80 font-medium mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Simran Kaur"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#FAF8F6] placeholder-white/30 focus:outline-none focus:border-[#E8C8CC] focus:ring-1 focus:ring-[#E8C8CC] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] text-[#FAF8F6]/80 font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="simran@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#FAF8F6] placeholder-white/30 focus:outline-none focus:border-[#E8C8CC] focus:ring-1 focus:ring-[#E8C8CC] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] text-[#FAF8F6]/80 font-medium mb-2">
              Phone / Mobile *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="(647) 000-0000"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#FAF8F6] placeholder-white/30 focus:outline-none focus:border-[#E8C8CC] focus:ring-1 focus:ring-[#E8C8CC] transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Event Logistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] text-[#FAF8F6]/80 font-medium mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C9919A]" />
              <span>Event Date *</span>
            </label>
            <input
              type="date"
              name="eventDate"
              required
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#FAF8F6] focus:outline-none focus:border-[#E8C8CC] focus:ring-1 focus:ring-[#E8C8CC] transition-colors [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] text-[#FAF8F6]/80 font-medium mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C9919A]" />
              <span>Ready-By Time</span>
            </label>
            <input
              type="text"
              name="readyByTime"
              value={formData.readyByTime}
              onChange={handleChange}
              placeholder="e.g. 08:30 AM"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#FAF8F6] placeholder-white/30 focus:outline-none focus:border-[#E8C8CC] focus:ring-1 focus:ring-[#E8C8CC] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] text-[#FAF8F6]/80 font-medium mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C9919A]" />
              <span>Location / City *</span>
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="Toronto / Brampton / Vaughan"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#FAF8F6] placeholder-white/30 focus:outline-none focus:border-[#E8C8CC] focus:ring-1 focus:ring-[#E8C8CC] transition-colors"
            />
          </div>
        </div>

        {/* Row 3: Service Selection & Package */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] text-[#FAF8F6]/80 font-medium mb-2">
              Primary Service Needed *
            </label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-white/10 text-sm text-[#FAF8F6] focus:outline-none focus:border-[#E8C8CC] focus:ring-1 focus:ring-[#E8C8CC] transition-colors"
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title} ({service.duration})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] text-[#FAF8F6]/80 font-medium mb-2">
              Package Interest (Optional)
            </label>
            <select
              name="packageChoice"
              value={formData.packageChoice}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-white/10 text-sm text-[#FAF8F6] focus:outline-none focus:border-[#E8C8CC] focus:ring-1 focus:ring-[#E8C8CC] transition-colors"
            >
              <option value="">Standard Bespoke Quote</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} ({pkg.badge})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 4: Bridal Party & Draping details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] text-[#FAF8F6]/80 font-medium mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#C9919A]" />
              <span>Total Number of People</span>
            </label>
            <select
              name="bridalPartyCount"
              value={formData.bridalPartyCount}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-white/10 text-sm text-[#FAF8F6] focus:outline-none focus:border-[#E8C8CC] focus:ring-1 focus:ring-[#E8C8CC] transition-colors"
            >
              <option value="1 (Bride only)">1 (Bride only)</option>
              <option value="2-3 (Bride + Mom/Sister)">2–3 People</option>
              <option value="4-6 (Bride + Bridal Squad)">4–6 People</option>
              <option value="7+ (Large Bridal Party & Family)">7+ People (Full Bridal Party)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.18em] text-[#FAF8F6]/80 font-medium mb-2">
              Dupatta / Veil & Jewelry Setting
            </label>
            <select
              name="needsDrapingJewelry"
              value={formData.needsDrapingJewelry}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-white/10 text-sm text-[#FAF8F6] focus:outline-none focus:border-[#E8C8CC] focus:ring-1 focus:ring-[#E8C8CC] transition-colors"
            >
              <option value="Yes, full bridal draping & jewelry setting">
                Yes, full bridal draping & jewelry setting
              </option>
              <option value="Hair & Makeup only (No draping)">
                Hair & Makeup only (No draping)
              </option>
              <option value="Multiple dupattas & heavy jewelry">
                Multiple dupattas & heavy heirloom jewelry
              </option>
            </select>
          </div>
        </div>

        {/* Row 5: Notes & Inspiration */}
        <div>
          <label className="block text-[11px] uppercase tracking-[0.18em] text-[#FAF8F6]/80 font-medium mb-2">
            Wedding Vision, Timeline Notes & Pinterest Links
          </label>
          <textarea
            rows={3}
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Tell us about your outfit colors, jewelry style, photographer schedule, or any specific beauty preferences..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-[#FAF8F6] placeholder-white/30 focus:outline-none focus:border-[#E8C8CC] focus:ring-1 focus:ring-[#E8C8CC] transition-colors"
          />
        </div>

        {/* Dual Submission Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
          {/* Action 1: WhatsApp Instant Concierge */}
          <button
            type="button"
            onClick={handleWhatsAppSubmit}
            className="w-full sm:flex-1 py-4 px-6 rounded-full bg-[#25D366] text-[#0D0D0D] text-xs font-bold uppercase tracking-[0.18em] hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/20 group"
          >
            <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            <span>Submit via WhatsApp Concierge</span>
          </button>

          {/* Action 2: Email Proposal Dispatch */}
          <button
            type="button"
            onClick={handleEmailSubmit}
            className="w-full sm:flex-1 py-4 px-6 rounded-full bg-[#FAF8F6] text-[#0D0D0D] text-xs font-bold uppercase tracking-[0.18em] hover:bg-[#E8C8CC] transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-white/5 group"
          >
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Send Email Inquiry</span>
          </button>
        </div>

        <p className="text-center text-[11px] text-[#FAF8F6]/50 pt-2 font-light">
          Your information is strictly confidential. We reply to all inquiries within 24 business hours.
        </p>
      </form>
    </div>
  );
}
