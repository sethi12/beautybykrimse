"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  MessageCircle, Mail, Sparkles, CheckCircle2, Calendar, Clock,
  MapPin, Users, ArrowRight, ArrowLeft, User, Send, Edit3, Check
} from "lucide-react";
import { siteConfig, serviceDropdownOptions, whyBookWithUs } from "@/lib/data";
import ClockTimePicker from "@/components/ClockTimePicker";

const STEPS = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "Event Info", icon: Calendar },
  { id: 3, label: "Services", icon: Sparkles },
  { id: 4, label: "Details", icon: Users },
  { id: 5, label: "Review & Send", icon: Send },
];

const EVENT_TYPES = [
  "Wedding", "Engagement", "Reception", "Pre-Wedding Event",
  "Special Event", "Photoshoot", "Celebration", "Other"
];

const PEOPLE_OPTIONS = [
  "1 (Just me)", "2", "3", "4", "5", "6", "7", "8", "9", "10+"
];

export default function BookingForm() {
  const searchParams = useSearchParams();
  const preService = searchParams.get("service") || "";

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phoneNumber: "",
    // Event Information
    eventDate: "",
    readyByTime: "",
    locationCity: "",
    // Service Information
    serviceNeeded: preService || "south-asian-bridal",
    numberOfPeople: "1 (Just me)",
    eventType: "Wedding",
    // Additional Information
    messageInspiration: "",
  });

  useEffect(() => {
    if (preService) {
      setForm((prev) => ({ ...prev, serviceNeeded: preService }));
    }
  }, [preService]);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // --- Validation ---
  const validateStep = (s) => {
    const errs = {};
    if (s === 1) {
      if (!form.fullName.trim()) errs.fullName = "Please enter your full name";
      if (!form.email.trim()) errs.email = "Please enter your email";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Please enter a valid email";
      if (!form.phoneNumber.trim()) errs.phoneNumber = "Please enter your phone number";
    }
    if (s === 2) {
      if (!form.eventDate) errs.eventDate = "Please select your event date";
      if (!form.readyByTime.trim()) errs.readyByTime = "Please specify your ready-by time";
      if (!form.locationCity.trim()) errs.locationCity = "Please enter getting ready location / city";
    }
    if (s === 3) {
      if (!form.serviceNeeded) errs.serviceNeeded = "Please select a service";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 5));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 1));
  const goToStep = (s) => setStep(s);

  // --- Build Dispatch message ---
  const getServiceLabel = (id) => {
    const found = serviceDropdownOptions.find((s) => s.id === id);
    return found ? found.label : id;
  };

  const buildMessage = () => {
    return `✨ *BEAUTY BY KRIMSE BOOKING INQUIRY* ✨
-----------------------------------------
 *Full Name:* ${form.fullName}
 *Email:* ${form.email}
 *Phone Number:* ${form.phoneNumber}

 *Event Date:* ${form.eventDate}
 *Ready-By Time:* ${form.readyByTime}
 *Getting Ready Location / City:* ${form.locationCity}

 *Service Needed:* ${getServiceLabel(form.serviceNeeded)}
 *Number of People:* ${form.numberOfPeople}
 *Event Type:* ${form.eventType}

 *Message / Inspiration Details:*
${form.messageInspiration || "No additional notes provided."}
-----------------------------------------`;
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Booking Inquiry: ${form.fullName} — ${form.eventDate}`);
    const body = encodeURIComponent(buildMessage().replace(/\*/g, "").replace(/✨/g, ""));
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const progress = (step / 5) * 100;

  // --- Submitted State ---
  if (submitted) {
    return (
      <div className="w-full max-w-3xl mx-auto bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[var(--whatsapp)]/15 border border-[var(--whatsapp)]/30 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[var(--whatsapp)]" />
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] font-light">
          Inquiry Sent Successfully
        </h2>
        <p className="text-sm text-[var(--text-muted)] font-light max-w-md mx-auto">
          Thank you, {form.fullName}! We will review your event details and get back to you within 24–48 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            setForm({
              fullName: "",
              email: "",
              phoneNumber: "",
              eventDate: "",
              readyByTime: "",
              locationCity: "",
              serviceNeeded: "south-asian-bridal",
              numberOfPeople: "1 (Just me)",
              eventType: "Wedding",
              messageInspiration: "",
            });
          }}
          className="text-xs uppercase tracking-[0.2em] text-[var(--accent-blush)] hover:text-[var(--text-primary)] transition-colors"
        >
          Submit Another Booking Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-visible">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[var(--accent-rose)]/10 to-transparent blur-3xl pointer-events-none rounded-3xl overflow-hidden" />

      {/* ===== PROGRESS BAR ===== */}
      <div className="relative mb-10">
        <div className="hidden sm:flex items-center justify-between mb-3">
          {STEPS.map((s) => {
            const isCompleted = step > s.id;
            const isCurrent = step === s.id;
            return (
              <button
                key={s.id}
                onClick={() => s.id < step && goToStep(s.id)}
                disabled={s.id > step}
                className={`flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-medium transition-colors ${isCurrent
                    ? "text-[var(--accent-blush)]"
                    : isCompleted
                      ? "text-[var(--accent-rose)] cursor-pointer hover:text-[var(--accent-blush)]"
                      : "text-[var(--text-faint)]"
                  }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border transition-all ${isCurrent
                      ? "bg-[var(--accent-rose)] text-white border-[var(--accent-rose)]"
                      : isCompleted
                        ? "bg-[var(--badge-bg)] text-[var(--accent-rose)] border-[var(--badge-border)]"
                        : "bg-[var(--bg-input)] text-[var(--text-faint)] border-[var(--border)]"
                    }`}
                >
                  {isCompleted ? <Check className="w-3 h-3" /> : s.id}
                </div>
                <span className="hidden md:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Progress track */}
        <div className="w-full h-1 bg-[var(--bg-input)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--accent-rose)] to-[var(--accent-blush)] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Mobile step indicator */}
        <div className="sm:hidden flex items-center justify-between mt-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--accent-blush)] font-medium">
            {STEPS[step - 1].label}
          </span>
          <span className="text-[11px] text-[var(--text-faint)]">
            Step {step} of 5
          </span>
        </div>
      </div>

      {/* ===== STEP CONTENT ===== */}
      <div className="min-h-[320px]">
        {/* STEP 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-light">
                Personal Information
              </h2>
              <p className="text-xs text-[var(--text-muted)] font-light">
                Please enter your contact details so we can reach out to you.
              </p>
            </div>

            <div className="space-y-4">
              <FormField label="Full Name" required error={errors.fullName}>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="e.g. Simran Kaur"
                  className="form-input"
                />
              </FormField>

              <FormField label="Email" required error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="name@example.com"
                  className="form-input"
                />
              </FormField>

              <FormField label="Phone Number" required error={errors.phoneNumber}>
                <input
                  type="tel"
                  value={form.phoneNumber}
                  onChange={(e) => update("phoneNumber", e.target.value)}
                  placeholder="+1 (437) 000-0000"
                  className="form-input"
                />
              </FormField>
            </div>
          </div>
        )}

        {/* STEP 2: Event Information */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-light">
                Event Information
              </h2>
              <p className="text-xs text-[var(--text-muted)] font-light">
                Tell us about your event date, location, and timeline.
              </p>
            </div>

            <div className="space-y-4">
              <FormField label="Event Date" required error={errors.eventDate} icon={Calendar}>
                <input
                  type="date"
                  value={form.eventDate}
                  onChange={(e) => update("eventDate", e.target.value)}
                  className="form-input"
                />
              </FormField>

              <FormField label="Ready-By Time" required error={errors.readyByTime}>
                <ClockTimePicker
                  value={form.readyByTime}
                  onChange={(timeStr) => update("readyByTime", timeStr)}
                  error={errors.readyByTime}
                  placeholder="Click to pick ready-by time"
                  id="booking-ready-by-time"
                />
              </FormField>

              <FormField
                label="Getting Ready Location / City"
                required
                error={errors.locationCity}
                icon={MapPin}
              >
                <input
                  type="text"
                  value={form.locationCity}
                  onChange={(e) => update("locationCity", e.target.value)}
                  placeholder="e.g. Toronto / Brampton / Mississauga / Hotel Suite"
                  className="form-input"
                />
              </FormField>
            </div>
          </div>
        )}

        {/* STEP 3: Service Information */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-light">
                Service Information
              </h2>
              <p className="text-xs text-[var(--text-muted)] font-light">
                Select the service you need for your booking.
              </p>
            </div>

            <div className="space-y-4">
              <FormField label="Service Needed" required error={errors.serviceNeeded}>
                <select
                  value={form.serviceNeeded}
                  onChange={(e) => update("serviceNeeded", e.target.value)}
                  className="form-input"
                >
                  {serviceDropdownOptions.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.label}
                    </option>
                  ))}
                </select>
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Number of People" icon={Users}>
                  <select
                    value={form.numberOfPeople}
                    onChange={(e) => update("numberOfPeople", e.target.value)}
                    className="form-input"
                  >
                    {PEOPLE_OPTIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Event Type">
                  <select
                    value={form.eventType}
                    onChange={(e) => update("eventType", e.target.value)}
                    className="form-input"
                  >
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Additional Information */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-light">
                Additional Information
              </h2>
              <p className="text-xs text-[var(--text-muted)] font-light">
                Share any inspiration, outfit colors, or details regarding your vision.
              </p>
            </div>

            <div className="space-y-4">
              <FormField label="Message / Inspiration Details">
                <textarea
                  rows={4}
                  value={form.messageInspiration}
                  onChange={(e) => update("messageInspiration", e.target.value)}
                  placeholder="Share outfit style, colors, jewelry, Pinterest inspiration, or special requests..."
                  className="form-input resize-none"
                />
              </FormField>
            </div>
          </div>
        )}

        {/* STEP 5: Review & Send */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-light">
                Review Your Booking Details
              </h2>
              <p className="text-xs text-[var(--text-muted)] font-light">
                Please verify your information before sending.
              </p>
            </div>

            <div className="space-y-4">
              <ReviewSection title="Personal Information" stepNum={1} onEdit={() => goToStep(1)}>
                <ReviewRow label="Full Name" value={form.fullName} />
                <ReviewRow label="Email" value={form.email} />
                <ReviewRow label="Phone Number" value={form.phoneNumber} />
              </ReviewSection>

              <ReviewSection title="Event Information" stepNum={2} onEdit={() => goToStep(2)}>
                <ReviewRow label="Event Date" value={form.eventDate} />
                <ReviewRow label="Ready-By Time" value={form.readyByTime} />
                <ReviewRow label="Location / City" value={form.locationCity} />
              </ReviewSection>

              <ReviewSection title="Service Information" stepNum={3} onEdit={() => goToStep(3)}>
                <ReviewRow label="Service Needed" value={getServiceLabel(form.serviceNeeded)} />
                <ReviewRow label="Number of People" value={form.numberOfPeople} />
                <ReviewRow label="Event Type" value={form.eventType} />
              </ReviewSection>

              <ReviewSection title="Additional Information" stepNum={4} onEdit={() => goToStep(4)}>
                <ReviewRow
                  label="Message / Inspiration Details"
                  value={form.messageInspiration || "None provided"}
                />
              </ReviewSection>
            </div>

            {/* Send Actions */}
            <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full sm:flex-1 py-4 px-6 rounded-full bg-[var(--whatsapp)] text-[#0D0D0D] text-xs font-bold uppercase tracking-[0.18em] hover:brightness-110 transition-all flex items-center justify-center gap-2.5 shadow-lg group"
              >
                <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span>Send via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleEmail}
                className="w-full sm:flex-1 py-4 px-6 rounded-full bg-[var(--accent-rose)] text-white text-xs font-bold uppercase tracking-[0.18em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all flex items-center justify-center gap-2.5 shadow-lg group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Send via Email</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== NAVIGATION BUTTONS ===== */}
      {step < 5 && (
        <div className="pt-8 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          <button
            type="button"
            onClick={goNext}
            className="px-8 py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all flex items-center gap-2 group shadow-lg"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      )}

      <p className="text-center text-[11px] text-[var(--text-faint)] pt-6 font-light">
        We review all inquiries and get back to you within 24–48 hours.
      </p>

      {/* Global form input styles */}
      <style jsx global>{`
        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          border-radius: 0.875rem;
          background: var(--bg-input);
          border: 1px solid var(--border);
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 300;
          transition: border-color 0.2s, background 0.2s;
          outline: none;
          font-family: var(--font-sans);
        }
        .form-input::placeholder {
          color: var(--text-faint);
        }
        .form-input:focus {
          border-color: var(--accent-blush);
          background: var(--bg-input-focus);
          box-shadow: 0 0 0 2px var(--accent-rose)/15;
        }
        .form-input option {
          background: var(--bg-card);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}

function FormField({ label, required, error, icon: Icon, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)] font-medium mb-2">
        {Icon && <Icon className="w-3.5 h-3.5 text-[var(--accent-rose)]" />}
        <span>{label}{required && " *"}</span>
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-400 font-light flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function ReviewSection({ title, stepNum, onEdit, children }) {
  return (
    <div className="p-5 rounded-2xl bg-[var(--bg-input)] border border-[var(--border)]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--accent-rose)] font-semibold">
          {title}
        </h3>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-[var(--accent-blush)] hover:text-[var(--text-primary)] transition-colors font-medium"
        >
          <Edit3 className="w-3 h-3" />
          <span>Edit</span>
        </button>
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className="text-[var(--text-faint)] font-light w-28 shrink-0">{label}</span>
      <span className="text-[var(--text-primary)] font-light">{value || "—"}</span>
    </div>
  );
}
