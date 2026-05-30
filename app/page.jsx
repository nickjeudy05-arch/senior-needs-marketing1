"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Bot,
  Building2,
  CalendarClock,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock,
  FileQuestion,
  Globe2,
  HeartPulse,
  Home,
  Landmark,
  LockKeyhole,
  Menu,
  MessageCircle,
  Phone,
  SearchCheck,
  ShieldCheck,
  Star,
  UserRound,
  UserRoundCheck,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { coveragePages, navLinks } from "./coverageData";
import ProductEducation from "./components/ProductEducation";

const services = [
  {
    title: "Life Insurance",
    detail: "Income replacement and family protection designed around real households in any state.",
    icon: ShieldCheck,
  },
  {
    title: "Mortgage Protection",
    detail: "Coverage that helps protect the home if death, disability, or serious illness changes the plan.",
    icon: Home,
  },
  {
    title: "Final Expense",
    detail: "Simple final-cost protection for families who want fewer surprises and clearer planning.",
    icon: Landmark,
  },
  {
    title: "Medicare Health Plans",
    detail: "Medicare Advantage, Supplement, and prescription drug guidance for eligible clients.",
    icon: HeartPulse,
  },
];

const faqs = {
  medicare:
    "Medicare options can include Medicare Advantage, Medicare Supplement, and Part D prescription plans. A licensed agent can help compare benefits, doctors, prescriptions, and total yearly cost based on your state.",
  mortgage:
    "Mortgage protection is life insurance designed around a home loan. If something happens to you, the benefit can help loved ones keep the house, pay off the loan, or stay current.",
  final:
    "Final expense coverage is usually smaller whole life insurance intended for funeral, cremation, medical balances, and last bills. It can be useful for anyone who wants a specific plan for final costs.",
  appointment:
    "You can book a phone or virtual appointment right here after submitting the quick form. A licensed agent will follow up by your preferred method.",
};

const advancedTopics = [
  {
    title: "Life insurance fit",
    text: "Compare term, whole life, universal life, final-cost policies, riders, beneficiaries, and ownership structure.",
    icon: ShieldCheck,
  },
  {
    title: "Mortgage protection strategy",
    text: "Review loan balance, household income, term length, disability concerns, and whether coverage should stay level.",
    icon: Home,
  },
  {
    title: "Medicare plan review",
    text: "Check doctors, prescriptions, county availability, pharmacies, dental, vision, travel, and yearly out-of-pocket exposure.",
    icon: HeartPulse,
  },
  {
    title: "Agent routing",
    text: "The form captures state, coverage type, contact preference, and timing so the right licensed agent can follow up.",
    icon: UserRoundCheck,
  },
  {
    title: "Quote readiness",
    text: "The assistant helps gather age range, health notes, dependents, debts, budget, and goals before the agent call.",
    icon: SearchCheck,
  },
  {
    title: "Decision support",
    text: "Visitors can ask scenario questions and get a clear next-step recommendation without being pushed into one product.",
    icon: FileQuestion,
  },
];

const stats = [
  ["50 states", "Agent routing"],
  ["4 core lines", "Life, mortgage, final expense, Medicare"],
  ["9 AM-10 PM", "Appointment windows"],
  ["1 intake", "Smarter follow-up"],
];

const marketplaceHighlights = [
  {
    title: "Carrier comparison mindset",
    text: "The experience is designed around comparing options instead of pushing one product.",
    icon: Building2,
  },
  {
    title: "State-aware routing",
    text: "The lead form captures state because insurance availability and Medicare plans vary by location.",
    icon: Globe2,
  },
  {
    title: "Secure-feeling intake",
    text: "The flow asks only for practical review details and keeps the next step clear.",
    icon: LockKeyhole,
  },
];

const scenarioCards = [
  {
    title: "Young family with a mortgage",
    need: "Protect income, home payments, and children.",
    path: "Start with term life and mortgage protection review.",
  },
  {
    title: "Self-employed professional",
    need: "Protect income and reduce pressure on family if plans change.",
    path: "Review life coverage, health status, and budget-sensitive options.",
  },
  {
    title: "Retiree reviewing Medicare",
    need: "Keep doctors, prescriptions, and yearly costs organized.",
    path: "Compare Medicare Advantage, Supplement, and Part D choices by state/county.",
  },
  {
    title: "Family planning final costs",
    need: "Avoid leaving funeral or final bills to loved ones.",
    path: "Review final expense or permanent life options.",
  },
];

const professionalFaqs = [
  [
    "Do I have to know what product I need?",
    "No. The intake and assistant are built for people who are unsure. Share your situation and a licensed agent can help narrow the path.",
  ],
  [
    "Why does the form ask for my state?",
    "Insurance products, carriers, rates, and Medicare plan availability can vary by state and county. State helps route the review correctly.",
  ],
  [
    "Will I be pressured to apply?",
    "The goal is a review first. A licensed agent should explain options, costs, eligibility, and next steps before any application.",
  ],
  [
    "Can I book outside business hours?",
    "Yes. The calendar supports appointment windows from 9:00 AM through 10:00 PM so people can choose a time that fits their schedule.",
  ],
];

const assistantExamples = [
  "I'm 42, married, two kids, $310k mortgage, and $90/month budget. What should I review?",
  "Explain term vs whole life and when each one makes sense.",
  "My parent is 67 and wants burial or cremation coverage. What details matter?",
  "I'm turning 65 soon. How do Medicare Advantage, Supplement, and Part D compare?",
  "I have diabetes and high blood pressure. Can I still get life insurance?",
  "How much life insurance should I think about if my spouse depends on my income?",
  "I already have life insurance through work. What gaps should I check?",
  "What information does an agent need before giving me a real quote?",
];

const siteImages = {
  hero:
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1500&q=85",
  family:
    "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=1200",
  planning:
    "https://images.pexels.com/photos/7821701/pexels-photo-7821701.jpeg?auto=compress&cs=tinysrgb&w=1200",
  advisor:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
  process:
    "https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1300",
  appointment:
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1400&q=85",
};

const initialLead = {
  name: "",
  email: "",
  phone: "",
  state: "",
  dob: "",
  beneficiary: "",
  hobbies: "",
  coverage: "Life Insurance",
  contactPreference: "Text me",
};

const consentLanguage =
  "By submitting this form, I agree Senior Needs Marketing may contact me by phone, text, or email about my insurance request. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out and HELP for help. Consent is not required to buy.";

function Field({ label, name, type = "text", value, onChange, placeholder, required = true }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

function LeadForm({ onSubmitted }) {
  const [lead, setLead] = useState(initialLead);
  const [status, setStatus] = useState("idle");

  function updateLead(event) {
    const { name, value } = event.target;
    setLead((current) => ({ ...current, [name]: value }));
  }

  async function submitLead(event) {
    event?.preventDefault();
    if (!lead.name || !lead.email || !lead.phone || !lead.state || !lead.dob || !lead.beneficiary) {
      setStatus("missing");
      return;
    }
    setStatus("sending");
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        consentAccepted: true,
        consentLanguage,
        consentTimestamp: new Date().toISOString(),
        sourceUrl: window.location.href,
      }),
    });
    const outreach = await response.json();
    if (!response.ok) {
      setStatus("failed");
      return;
    }
    const submittedLead = { ...lead, id: outreach.lead_id };
    setStatus("sent");
    onSubmitted(submittedLead, outreach);
  }

  return (
    <form className="lead-form" onSubmit={submitLead}>
      <div className="form-head">
        <span>Start Here</span>
        <h1>Insurance help built around your life, state, and goals.</h1>
        <p>
          Tell us the basics. Senior Needs Marketing will route your request
          to a licensed agent who can review options for your state.
        </p>
      </div>

      <div className="form-grid">
        <Field label="Name" name="name" value={lead.name} onChange={updateLead} placeholder="Full name" />
        <Field label="Email" name="email" type="email" value={lead.email} onChange={updateLead} placeholder="you@example.com" />
        <Field label="Phone" name="phone" type="tel" value={lead.phone} onChange={updateLead} placeholder="Best phone number" />
        <Field label="State" name="state" value={lead.state} onChange={updateLead} placeholder="Florida, Texas, PA..." />
        <Field label="Date of Birth" name="dob" value={lead.dob} onChange={updateLead} placeholder="MM/DD/YYYY" />
        <Field label="Beneficiary" name="beneficiary" value={lead.beneficiary} onChange={updateLead} placeholder="Spouse, child, estate..." />
        <Field label="Hobbies" name="hobbies" value={lead.hobbies} onChange={updateLead} placeholder="Travel, gardening, golf..." required={false} />
      </div>

      <div className="segmented" aria-label="Coverage interest">
        {services.map((service) => (
          <button
            className={lead.coverage === service.title ? "selected" : ""}
            key={service.title}
            type="button"
            onClick={() => setLead((current) => ({ ...current, coverage: service.title }))}
          >
            {service.title}
          </button>
        ))}
      </div>

      <div className="preference">
        <label>
          <input
            type="radio"
            name="contactPreference"
            value="Text me"
            checked={lead.contactPreference === "Text me"}
            onChange={updateLead}
          />
          Text me
        </label>
        <label>
          <input
            type="radio"
            name="contactPreference"
            value="Call me"
            checked={lead.contactPreference === "Call me"}
            onChange={updateLead}
          />
          Call me
        </label>
      </div>

      <label className="consent">
        <input required type="checkbox" />
        <span>
          {consentLanguage} View our <Link href="/privacy">Privacy Policy</Link> and{" "}
          <Link href="/sms-terms">SMS Terms</Link>.
        </span>
      </label>

      {status === "missing" && (
        <p className="form-alert">Please complete name, email, phone, state, date of birth, and beneficiary.</p>
      )}
      {status === "failed" && (
        <p className="form-alert">We could not save your request yet. Please try again in a moment.</p>
      )}

      <button className="primary-submit" disabled={status === "sending"} type="button" onClick={submitLead}>
        {status === "sending" ? "Preparing..." : "Get My Review"}
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </form>
  );
}

function BookingPanel({ lead, onBooked }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [bookingStatus, setBookingStatus] = useState("idle");

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 9; hour <= 22; hour += 1) {
      for (let minute of [0, 30]) {
        if (hour === 22 && minute === 30) continue;
        const value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        slots.push(value);
      }
    }
    return slots;
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  function formatDate(value) {
    if (!value) return "";
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatTime(value) {
    const [hourText, minute] = value.split(":");
    const hour = Number(hourText);
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute} ${suffix}`;
  }

  const [monthOffset, setMonthOffset] = useState(0);
  const visibleMonth = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  }, [monthOffset]);
  const monthLabel = visibleMonth.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
  const monthDays = useMemo(() => {
    const firstDay = visibleMonth.getDay();
    const daysInMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + 1,
      0,
    ).getDate();
    const blanks = Array.from({ length: firstDay }, (_, index) => ({
      key: `blank-${index}`,
      blank: true,
    }));
    const days = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const value = `${visibleMonth.getFullYear()}-${String(
        visibleMonth.getMonth() + 1,
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      return { key: value, day, value, disabled: value < today };
    });
    return [...blanks, ...days];
  }, [today, visibleMonth]);

  const [meetingType, setMeetingType] = useState("Phone review");
  const [duration, setDuration] = useState("30 minutes");
  const [timezone, setTimezone] = useState("Local time");

  async function confirmAppointment() {
    if (!date || !time) {
      setError("Choose a date and time first.");
      return;
    }

    const [hourText, minuteText] = time.split(":");
    const hour = Number(hourText);
    const minute = Number(minuteText);
    if (hour < 9 || hour > 22 || (hour === 22 && minute > 0)) {
      setError("Please choose a time between 9:00 AM and 10:00 PM.");
      return;
    }

    const appointment = `${formatDate(date)} at ${formatTime(time)}`;
    setError("");
    setBookingStatus("saving");

    const response = await fetch("/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lead_id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        coverage: lead.coverage,
        state: lead.state,
        appointment_date: date,
        appointment_time: time,
        appointment_label: appointment,
        meeting_type: meetingType,
        duration,
        timezone,
      }),
    });

    if (!response.ok) {
      setBookingStatus("idle");
      setError("We could not save that appointment yet. Please try again.");
      return;
    }

    setBookingStatus("saved");
    setConfirmed(appointment);
    onBooked(appointment);
    setTimeout(() => {
      document.querySelector(".appointment-confirmation")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  }

  return (
    <section className="booking-panel">
      <div>
        <p className="eyebrow">Request Received</p>
        <h2>{lead.name ? `${lead.name}, choose your agent appointment.` : "Choose your agent appointment."}</h2>
        <p>
          Your {lead.coverage} request is ready for {lead.state || "your state"}. Pick any date and any time
          between 9:00 AM and 10:00 PM. The assistant will queue a{" "}
          {lead.contactPreference.toLowerCase()} confirmation.
        </p>
      </div>
      <div className="calendar-card pro-calendar">
        <div className="calendar-controls">
          <label>
            <span>Meeting Type</span>
            <select value={meetingType} onChange={(event) => setMeetingType(event.target.value)}>
              <option>Phone review</option>
              <option>Virtual appointment</option>
              <option>Text-first follow-up</option>
            </select>
          </label>
          <label>
            <span>Duration</span>
            <select value={duration} onChange={(event) => setDuration(event.target.value)}>
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
            </select>
          </label>
          <label>
            <span>Timezone</span>
            <select value={timezone} onChange={(event) => setTimezone(event.target.value)}>
              <option>Local time</option>
              <option>Eastern</option>
              <option>Central</option>
              <option>Mountain</option>
              <option>Pacific</option>
            </select>
          </label>
        </div>
        <div className="month-picker">
          <div className="month-header">
            <button type="button" onClick={() => setMonthOffset((value) => Math.max(0, value - 1))}>
              Previous
            </button>
            <strong>{monthLabel}</strong>
            <button type="button" onClick={() => setMonthOffset((value) => value + 1)}>
              Next
            </button>
          </div>
          <div className="weekday-row">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="day-grid">
            {monthDays.map((day) =>
              day.blank ? (
                <span className="day-cell blank" key={day.key} />
              ) : (
                <button
                  type="button"
                  key={day.key}
                  className={date === day.value ? "day-cell selected-day" : "day-cell"}
                  disabled={day.disabled}
                  onClick={() => setDate(day.value)}
                >
                  {day.day}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="calendar-top">
          <label>
            <span>Exact Time</span>
            <input
              type="time"
              min="09:00"
              max="22:00"
              step="60"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </label>
          <div className="appointment-summary">
            <span>Selected</span>
            <strong>{date ? formatDate(date) : "Choose a date"}</strong>
            <p>{formatTime(time)} | {duration} | {meetingType}</p>
          </div>
        </div>
        <div className="time-strip" aria-label="Popular times between 9 AM and 10 PM">
          {timeSlots.map((slot) => (
            <button
              type="button"
              key={slot}
              className={time === slot ? "slot active" : "slot"}
              onClick={() => setTime(slot)}
            >
              {formatTime(slot)}
            </button>
          ))}
        </div>
        {error && <p className="calendar-error">{error}</p>}
        {confirmed && (
          <div className="appointment-confirmation">
            <div className="confirmation-icon">
              <Check size={24} aria-hidden="true" />
            </div>
            <div>
              <strong>You are booked to speak with a licensed agent</strong>
              <p>{confirmed}</p>
              <span>
                We received your appointment request for {lead.coverage}. A
                licensed agent will use your preferred contact method to
                confirm details, review options for {lead.state || "your state"},
                and answer questions before any application is started.
              </span>
            </div>
          </div>
        )}
        <button type="button" className="confirm" onClick={confirmAppointment} disabled={bookingStatus === "saving"}>
          {confirmed ? <Check size={18} aria-hidden="true" /> : <CalendarClock size={18} aria-hidden="true" />}
          {bookingStatus === "saving" ? "Saving Appointment..." : confirmed ? "Appointment Booked" : "Confirm Appointment"}
        </button>
      </div>
    </section>
  );
}

function ChatBot({ lead, bookedTime }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi, I am the Senior Needs Assistant. Tell me your situation in plain English and I can help you think through what to review with a licensed agent.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const hasUserMessage = messages.some((message) => message.from === "user");

  const suggestions = useMemo(() => assistantExamples, []);

  function hasAny(text, words) {
    return words.some((word) => text.includes(word));
  }

  function extractAge(text) {
    const match = text.match(/\b([1-9][0-9])\b/);
    return match ? Number(match[1]) : null;
  }

  function buildFollowUps(signals) {
    const questions = [];
    if (!signals.state) questions.push("What state are you in?");
    if (!signals.budget) questions.push("What monthly payment would feel comfortable?");
    if (!signals.health) questions.push("Any major health history an agent should know about?");
    if (signals.life && !signals.dependents) questions.push("Who depends on your income or care?");
    if (signals.mortgage) questions.push("About how much is left on the mortgage?");
    if (signals.medicare) questions.push("Are your doctors and prescriptions your biggest concern?");
    return questions.slice(0, 3);
  }

  function analyzeSituation(text) {
    const lower = text.toLowerCase();
    const age = extractAge(lower);
    const signals = {
      state:
        /\b(alabama|alaska|arizona|arkansas|california|colorado|connecticut|delaware|florida|georgia|hawaii|idaho|illinois|indiana|iowa|kansas|kentucky|louisiana|maine|maryland|massachusetts|michigan|minnesota|mississippi|missouri|montana|nebraska|nevada|new hampshire|new jersey|new mexico|new york|north carolina|north dakota|ohio|oklahoma|oregon|pennsylvania|rhode island|south carolina|south dakota|tennessee|texas|utah|vermont|virginia|washington|west virginia|wisconsin|wyoming)\b/.test(lower),
      medicare:
        age >= 64 ||
        hasAny(lower, ["medicare", "medicaid", "part a", "part b", "part d", "advantage", "supplement", "doctor", "prescription"]),
      mortgage: hasAny(lower, ["mortgage", "house", "home loan", "foreclosure", "condo", "property"]),
      final: hasAny(lower, ["burial", "funeral", "cremation", "final expense", "fixed income", "final bills"]),
      life: hasAny(lower, ["life insurance", "kids", "children", "wife", "husband", "spouse", "beneficiary", "income", "family", "dependent"]),
      dependents: hasAny(lower, ["kids", "children", "spouse", "wife", "husband", "parent", "family", "dependent"]),
      health: hasAny(lower, ["health", "diabetes", "heart", "cancer", "medication", "blood pressure", "stroke", "copd"]),
      budget: hasAny(lower, ["budget", "cheap", "affordable", "expensive", "monthly", "$", "dollar"]),
      business: hasAny(lower, ["business", "employee", "group", "owner", "self-employed", "contractor"]),
      workCoverage: hasAny(lower, ["through work", "work policy", "employer", "job coverage", "company coverage"]),
      termWhole: hasAny(lower, ["term", "whole", "permanent", "cash value", "universal"]),
      quote: hasAny(lower, ["quote", "application", "underwriting", "need to know", "apply"]),
    };

    const matches = [];
    if (age && age < 60 && signals.dependents) {
      matches.push("Family protection: term life is often a practical first review when income, children, or a spouse would need support.");
    }
    if (age && age >= 60 && !signals.medicare) {
      matches.push("Later-life planning: review existing coverage, final-cost goals, beneficiaries, and whether any permanent coverage makes sense.");
    }
    if (signals.medicare) {
      matches.push("Medicare review: compare doctors, prescriptions, dental/vision extras, networks, and total yearly cost based on your state and ZIP code.");
    }
    if (signals.mortgage) {
      matches.push("Mortgage protection: consider coverage tied to the home loan so family has money to keep, sell, or pay down the house.");
    }
    if (signals.final) {
      matches.push("Final expense: consider a smaller whole-life style policy for funeral, cremation, medical balances, and last bills.");
    }
    if (signals.life) {
      matches.push("Life insurance: review coverage for spouse, children, income replacement, debts, and named beneficiaries.");
    }
    if (signals.health && !signals.medicare) {
      matches.push("Health history review: health conditions can affect available life insurance options, so underwriting type matters.");
    }
    if (signals.budget) {
      matches.push("Budget check: decide the maximum comfortable monthly premium before comparing coverage amounts.");
    }
    if (signals.business) {
      matches.push("Business or self-employed need: review personal coverage, key-person protection, or group-style options depending on state and carrier availability.");
    }
    if (signals.workCoverage) {
      matches.push("Employer coverage check: work life insurance can be useful, but it may not be portable and may not be enough by itself.");
    }
    if (signals.termWhole) {
      matches.push("Policy type review: term is usually temporary and budget-friendly; whole/permanent coverage is designed for longer-term needs if premiums stay paid.");
    }
    if (signals.quote) {
      matches.push("Quote readiness: an agent usually needs age, state, tobacco status, health history, medications, coverage goal, beneficiaries, and budget.");
    }

    if (!matches.length) return "";

    const followUps = buildFollowUps(signals);
    return `Here is how I would frame your situation for an agent:\n\n${matches
      .map((match, index) => `${index + 1}. ${match}`)
      .join("\n")}\n\nSmart next questions:\n${followUps
      .map((question) => `- ${question}`)
      .join("\n")}\n\nThis is educational guidance, not a final recommendation. A licensed agent can compare actual options for your state, budget, health questions, and beneficiaries.`;
  }

  function answerQuestion(text) {
    const lower = text.toLowerCase();
    if (["hi", "hello", "hey", "good morning", "good afternoon"].includes(lower.trim())) {
      return "Hi. I can help you think through coverage in plain English. Tell me your age range, state, who depends on you, debts or mortgage, health/Medicare status, and what you want protected.";
    }
    if (lower.includes("thank")) {
      return "You're welcome. If you want, tell me your state, age range, who depends on you, and what payment would feel comfortable monthly. I can help you prepare for the agent conversation.";
    }
    if (lower.includes("text") || lower.includes("sms") || lower.includes("call me")) {
      return "After you submit the form or book an appointment, a licensed agent can follow up using your selected contact preference. The goal is to answer questions and review options before any application is started.";
    }
    if (lower.includes("claim")) {
      return "For claims, the beneficiary or policy owner usually contacts the carrier, provides policy information, and submits required documents such as a claim form and death certificate. An agent can help explain the process, but the carrier pays approved claims.";
    }
    if (lower.includes("how much") || lower.includes("coverage amount")) {
      return "A common starting point is to add debts, mortgage balance, final costs, income replacement needs, and any legacy goal, then subtract savings or existing coverage. For final expense, people often look at a smaller amount tied to funeral and last-bill estimates.";
    }
    if (lower.includes("work") || lower.includes("employer")) {
      return "Coverage through work can be helpful, but ask three questions: does it stay if you leave the job, is the amount enough, and can your family keep it if your employment changes? Many people review a personal policy to avoid relying only on employer benefits.";
    }
    if (lower.includes("beneficiary")) {
      return "A beneficiary is the person or entity you name to receive the policy benefit. It is worth reviewing primary and contingent beneficiaries, spelling, relationship, and whether minor children need a trust or guardian conversation.";
    }
    if (lower.includes("tobacco") || lower.includes("smoke") || lower.includes("vape")) {
      return "Tobacco or nicotine use can affect pricing and eligibility. An agent will usually ask what product you use, how often, and when you last used it. Be accurate, because underwriting can verify health and prescription history.";
    }
    if (lower.includes("no exam") || lower.includes("exam")) {
      return "Some policies may offer no-exam or simplified underwriting, while others require a medical exam or deeper review. No-exam can be faster, but the best fit depends on age, health, amount requested, and carrier rules.";
    }
    if (lower.includes("cancel") || lower.includes("change appointment")) {
      return "If you need a different time, choose another appointment window in the calendar or tell the agent when they follow up. The goal is to make the review convenient, not rushed.";
    }
    if (lower.includes("term") && lower.includes("whole")) {
      return "Term life is usually lower-cost temporary coverage for a set period. Whole life is designed to last permanently if premiums are paid and may build cash value. The better fit depends on budget, health, age, and whether the need is temporary or lifelong.";
    }
    const situationAnswer = analyzeSituation(text);
    if (situationAnswer) return situationAnswer;
    if (lower.includes("medicare") || lower.includes("health")) return faqs.medicare;
    if (lower.includes("mortgage")) return faqs.mortgage;
    if (lower.includes("final") || lower.includes("funeral") || lower.includes("expense")) return faqs.final;
    if (lower.includes("book") || lower.includes("appointment") || lower.includes("call")) return faqs.appointment;
    if (lead?.name) {
      return `Thanks, ${lead.name}. I saved your interest in ${lead.coverage}${lead.state ? ` for ${lead.state}` : ""}. A licensed agent can review options and follow up at ${lead.phone || "your phone number"}.`;
    }
    return "I can help with most insurance planning questions at a high level. Try asking something like: 'I'm 42, married, two kids, $250k mortgage, $80/month budget. What should I review?' The more context you give me, the more useful I can be.";
  }

  async function sendMessage(text = draft) {
    if (!text.trim()) return;
    const userText = text.trim();
    const nextMessages = [
      ...messages,
      { from: "user", text: userText },
    ];

    setMessages(nextMessages);
    setDraft("");
    setIsThinking(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          messages,
          lead,
          bookedTime,
        }),
      });
      const data = await response.json();
      const reply = data.reply || answerQuestion(userText);
      setMessages((current) => [
        ...current,
        { from: "bot", text: reply },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { from: "bot", text: answerQuestion(userText) },
      ]);
    } finally {
      setIsThinking(false);
    }
  }

  return (
    <aside className={open ? "chat open" : "chat"}>
      <button className="chat-toggle" type="button" onClick={() => setOpen((value) => !value)}>
        {open ? <X size={20} /> : <MessageCircle size={22} />}
        <span>{open ? "Close" : "Ask"}</span>
      </button>
      {open && (
        <div className="chat-window">
          <div className="chat-title">
            <Bot size={22} aria-hidden="true" />
            <div>
              <strong>Senior Needs Assistant</strong>
              <span>Compares situations and helps book.</span>
            </div>
          </div>
          <div className="messages">
            {messages.map((message, index) => (
              <p className={message.from} key={`${message.from}-${index}`}>
                {message.text}
              </p>
            ))}
            {isThinking && <p className="bot">Thinking through your situation...</p>}
          </div>
          {!hasUserMessage && (
            <div className="quick-actions">
              {suggestions.map((item) => (
                <button type="button" key={item} onClick={() => sendMessage(item)}>
                  {item}
                </button>
              ))}
            </div>
          )}
          <div className="chat-input">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !isThinking) sendMessage();
              }}
              placeholder="Ask a question..."
            />
            <button type="button" disabled={isThinking} onClick={() => sendMessage()}>
              {isThinking ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default function HomePage() {
  const [lead, setLead] = useState(null);
  const [bookedTime, setBookedTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLeadSubmitted(nextLead) {
    setLead(nextLead);
  }

  function handleBooked(nextBookedTime) {
    setBookedTime(nextBookedTime);
  }

  return (
    <main>
  <header className="topbar">
        <Link href="/" className="wordmark logo-wordmark" aria-label="Senior Needs Marketing home">
          <img src="/snm-logo.svg" alt="Senior Needs Marketing" />
        </Link>
        <nav aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
          <a href="#start">Match With Agent</a>
        </nav>
        <button
          className="menu-button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        {menuOpen && (
          <nav className="mobile-dropdown" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
                <ChevronRight size={15} aria-hidden="true" />
              </Link>
            ))}
            <a href="#start" onClick={() => setMenuOpen(false)}>
              Match With Agent
              <ChevronRight size={15} aria-hidden="true" />
            </a>
          </nav>
        )}
      </header>

      <section className="hero-new" id="start">
        <div className="hero-art">
          <img
            src={siteImages.hero}
            alt="Family reviewing financial paperwork at home"
          />
          <div className="floating-card card-one">
            <BadgeCheck size={22} aria-hidden="true" />
            Licensed agent guidance
          </div>
          <div className="floating-card card-two">
            <Phone size={22} aria-hidden="true" />
            Any state. A licensed agent follows up.
          </div>
        </div>
        <LeadForm onSubmitted={handleLeadSubmitted} />
      </section>

      {lead && <BookingPanel lead={lead} onBooked={handleBooked} />}

      {bookedTime && (
        <section className="booked-banner" aria-live="polite">
          <div className="booked-badge">
            <Check size={34} aria-hidden="true" />
          </div>
          <div>
            <p className="eyebrow">Appointment Booked</p>
            <h2>You are scheduled to speak with a licensed agent.</h2>
            <p>
              Appointment: <strong>{bookedTime}</strong>. An agent will follow
              up using your selected contact preference to confirm and prepare
              your coverage review.
            </p>
          </div>
        </section>
      )}

      <section className="stat-strip" aria-label="Senior Needs Marketing highlights">
        {stats.map(([value, label]) => (
          <div key={value}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="coverage" id="coverage">
        <div className="section-heading">
          <p className="eyebrow">Coverage Built For Your Next Chapter</p>
          <h2>One brokerage. Four major protection needs.</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon;
            const href =
              service.title === "Life Insurance"
                ? "/life-insurance"
                : service.title === "Mortgage Protection"
                  ? "/mortgage-protection"
                  : service.title === "Final Expense"
                    ? "/final-expense"
                    : "/medicare";
            return (
              <article className="service-card" key={service.title}>
                <Icon size={34} aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.detail}</p>
                <Link href={href}>
                  Learn more <ChevronRight size={16} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="marketplace-section">
        <div className="marketplace-hero">
          <p className="eyebrow">Professional Marketplace Experience</p>
          <h2>Designed to feel like a brokerage, not a landing page.</h2>
          <p>
            The site gathers enough context to support a serious coverage
            conversation: state, age, beneficiaries, goals, timing, and product
            interest. That gives the follow-up agent a stronger starting point.
          </p>
        </div>
        <div className="marketplace-grid">
          {marketplaceHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title}>
                <Icon size={30} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="education-library" id="learn">
        <div className="section-heading">
          <p className="eyebrow">Insurance Learning Center</p>
          <h2>Clear educational slides for every major coverage path.</h2>
        </div>
        <div className="education-stack">
          {[
            coveragePages["life-insurance"],
            coveragePages["mortgage-protection"],
            coveragePages["final-expense"],
            coveragePages.medicare,
          ].map((page) => (
            <ProductEducation page={page} key={page.slug} />
          ))}
        </div>
      </section>

      <section className="advanced-info">
        <div className="section-heading">
          <p className="eyebrow">More Than a Quote Form</p>
          <h2>A guided insurance intake built for real conversations.</h2>
        </div>
        <div className="advanced-grid">
          {advancedTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <article key={topic.title}>
                <Icon size={28} aria-hidden="true" />
                <h3>{topic.title}</h3>
                <p>{topic.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="scenario-section">
        <div className="section-heading">
          <p className="eyebrow">Common Client Situations</p>
          <h2>Different needs should lead to different conversations.</h2>
        </div>
        <div className="scenario-grid">
          {scenarioCards.map((scenario) => (
            <article key={scenario.title}>
              <div className="scenario-icon">
                <Users size={22} aria-hidden="true" />
              </div>
              <h3>{scenario.title}</h3>
              <p>{scenario.need}</p>
              <strong>{scenario.path}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="comparison-section">
        <div>
          <p className="eyebrow">How the Matching Works</p>
          <h2>From question to agent follow-up.</h2>
          <p>
            Senior Needs Marketing does not force everyone into one product.
            The site collects context, explains common paths, and prepares a
            licensed agent to follow up with state-aware options.
          </p>
        </div>
        <div className="comparison-table">
          {[
            ["Family income", "Term or permanent life review"],
            ["Home loan", "Mortgage protection strategy"],
            ["Final bills", "Final expense or whole life review"],
            ["Medicare", "State/county plan comparison"],
            ["Unsure", "Assistant asks follow-up questions"],
          ].map(([need, path]) => (
            <div key={need}>
              <strong>{need}</strong>
              <span>{path}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="image-story">
        <div>
          <img
            src={siteImages.family}
            alt="Family smiling together outdoors"
          />
          <span>Family protection</span>
        </div>
        <div>
          <img
            src={siteImages.planning}
            alt="Financial paperwork and planning notes"
          />
          <span>Clear plan reviews</span>
        </div>
        <div>
          <img
            src={siteImages.advisor}
            alt="Professional advisor in a meeting"
          />
          <span>Professional guidance</span>
        </div>
      </section>

      <section className="process" id="process">
        <img
          src={siteImages.process}
          alt="Advisor reviewing plan options with a client"
        />
        <div>
          <p className="eyebrow">A Smarter Follow-Up Flow</p>
          <h2>Submit once, then the assistant keeps the conversation moving.</h2>
          <ul>
            <li><Check size={19} /> Your form creates a lead record.</li>
            <li><Check size={19} /> You are offered appointment times immediately.</li>
            <li><Check size={19} /> The chatbot answers questions before and after booking.</li>
            <li><Check size={19} /> A licensed agent receives the context needed for a focused follow-up.</li>
          </ul>
        </div>
      </section>

      <section className="trust-gallery">
        <article>
          <img src={siteImages.appointment} alt="Calendar appointment planning" />
          <div>
            <Clock size={24} aria-hidden="true" />
            <h3>Evening appointments available</h3>
            <p>Visitors can choose any date and book from 9:00 AM through 10:00 PM.</p>
          </div>
        </article>
        <article>
          <img
            src="https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Couple looking at documents together"
          />
          <div>
            <ShieldCheck size={24} aria-hidden="true" />
            <h3>Needs-based coverage review</h3>
            <p>The site guides people toward life, mortgage, final expense, or Medicare support.</p>
          </div>
        </article>
      </section>

      <section className="professional-proof">
        <div className="proof-card dark">
          <ClipboardCheck size={34} aria-hidden="true" />
          <h3>Prepared Review</h3>
          <p>
            The form and assistant collect the details agents usually need:
            state, product interest, appointment timing, beneficiaries, and
            household context.
          </p>
        </div>
        <div className="proof-card">
          <WalletCards size={34} aria-hidden="true" />
          <h3>Budget-Aware</h3>
          <p>
            Visitors can ask about monthly cost, coverage amounts, and what
            type of policy may fit before committing to a formal quote.
          </p>
        </div>
        <div className="proof-card">
          <Star size={34} aria-hidden="true" />
          <h3>Clear Next Step</h3>
          <p>
            Every path leads to one action: get matched with a licensed agent
            who can review real availability and eligibility.
          </p>
        </div>
      </section>

      <section className="faq-section">
        <div>
          <p className="eyebrow">Questions Before Booking</p>
          <h2>Helpful answers before a licensed agent follows up.</h2>
        </div>
        <div className="faq-list">
          {professionalFaqs.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="advisor" id="about">
        <div>
          <p className="eyebrow">National Agent Routing</p>
          <h2>A licensed agent reaches out based on your state and needs.</h2>
          <p>
            Senior Needs Marketing helps families, homeowners, working adults,
            retirees, and Medicare clients compare coverage across the country
            without pressure or one-size-fits-all recommendations.
          </p>
          <a className="call-link" href="#start">
            <UserRoundCheck size={20} aria-hidden="true" />
            Match With an Agent
          </a>
        </div>
        <div className="advisor-panel">
          <UserRound size={42} aria-hidden="true" />
          <h3>What people can ask the bot</h3>
          <p>Eligibility, plan types, state availability, beneficiaries, appointment times, Medicare basics, and what information is needed for a quote.</p>
        </div>
      </section>

      <footer>
        <div>
          <strong>Senior Needs Marketing</strong>
          <p>Life Insurance | Mortgage Protection | Final Expense | Medicare Health Insurance</p>
          <div className="footer-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/sms-terms">SMS Terms</Link>
          </div>
        </div>
        <p>Serving clients nationwide | Licensed agent follow-up</p>
      </footer>

      <ChatBot lead={lead} bookedTime={bookedTime} />
    </main>
  );
}
