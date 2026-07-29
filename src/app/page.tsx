"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, ChevronRight, CheckCircle2, AlertCircle, AlertTriangle, ShieldCheck, Video, FileText, Lock } from "lucide-react";
import { createSubmission } from "./actions";

export default function Home() {
  const [step, setStep] = useState(0);

  // Form State
  const [creditedName, setCreditedName] = useState("");
  const [isAdult, setIsAdult] = useState<boolean | null>(null);
  const [guardianName, setGuardianName] = useState("");

  const [clipLink, setClipLink] = useState("");
  const [description, setDescription] = useState("");
  const [selfFilmed, setSelfFilmed] = useState<boolean | null>(null);
  const [wantsCredit, setWantsCredit] = useState<boolean | null>(null);

  const [rules, setRules] = useState({
    noCopyright: false,
    noGraphic: false,
    noViolation: false,
    agreedTerms: false,
  });

  const [botField, setBotField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Persist form state to sessionStorage so navigating to legal pages doesn't lose data
  useEffect(() => {
    const saved = sessionStorage.getItem("submitklips_form");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setStep(data.step ?? 0);
        setCreditedName(data.creditedName ?? "");
        setIsAdult(data.isAdult ?? null);
        setGuardianName(data.guardianName ?? "");
        setClipLink(data.clipLink ?? "");
        setDescription(data.description ?? "");
        setSelfFilmed(data.selfFilmed ?? null);
        setWantsCredit(data.wantsCredit ?? null);
        setRules(data.rules ?? { noCopyright: false, noGraphic: false, noViolation: false, agreedTerms: false });
      } catch { }
    }
  }, []);

  useEffect(() => {
    if (step < 4) {
      sessionStorage.setItem("submitklips_form", JSON.stringify({
        step, creditedName, isAdult, guardianName, clipLink, description, selfFilmed, wantsCredit, rules
      }));
    }
  }, [step, creditedName, isAdult, guardianName, clipLink, description, selfFilmed, wantsCredit, rules]);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(0, s - 1));

  const submitForm = async () => {
    if (botField.length > 0) {
      // Honeypot trapped a bot! Silently act like it worked.
      nextStep();
      return;
    }

    setIsSubmitting(true);
    const result = await createSubmission({
      creditedName,
      isAdult,
      guardianName,
      clipLink,
      description,
      selfFilmed,
      wantsCredit
    });
    setIsSubmitting(false);
    if (result.success) {
      nextStep();
    } else {
      alert("Something went wrong, please try again.");
    }
  };

  const isFormValid =
    clipLink.length > 5 &&
    wantsCredit !== null &&
    Object.values(rules).every(Boolean);

  const slideVariants = {
    initial: { x: 20, opacity: 0, scale: 0.98 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit: { x: -20, opacity: 0, scale: 0.98 },
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-neutral-500/30 overflow-x-hidden">
      {/* Top Navigation / Branding */}
      <header className="fixed top-0 w-full z-50 bg-neutral-950/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-md mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 relative">
            <div className="relative w-8 h-8">
              <Image
                src="/submitclips.png"
                alt="SubmitKlips Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-white">SubmitKlips</h1>
          </div>
          {step > 0 && step < 4 && (
            <button onClick={prevStep} className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              Back
            </button>
          )}
        </div>
      </header>

      <main className="max-w-md mx-auto pt-28 px-5 pb-16 min-h-screen flex flex-col relative">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-10"
            >
              {/* Enhanced Instagram Channels Showcase (Stories Style) */}
              <div className="flex flex-col items-center mt-2 w-full max-w-full">
                <div className="flex overflow-x-auto gap-3 w-full py-4 px-1 snap-x snap-mandatory scroll-smooth touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {/* The One Man */}
                  <a href="https://instagram.com/theclipman0154" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5 shrink-0 snap-start w-[76px]">
                    <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 transition-transform duration-300 group-hover:scale-105">
                      <div className="w-full h-full rounded-full bg-neutral-950 p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                          <Image src="/theoneman.png" alt="The One Man" fill sizes="64px" className="object-cover" />
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-400 group-hover:text-white font-medium tracking-wide w-full text-center truncate transition-colors px-1">theclipman0154</span>
                  </a>

                  {/* Opus Clips */}
                  <a href="https://instagram.com/opus.klips" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5 shrink-0 snap-start w-[76px]">
                    <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 transition-transform duration-300 group-hover:scale-105">
                      <div className="w-full h-full rounded-full bg-neutral-950 p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                          <Image src="/opusclips.png" alt="Opus Clips" fill sizes="64px" className="object-cover" />
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-400 group-hover:text-white font-medium tracking-wide w-full text-center truncate transition-colors px-1">opus.klips</span>
                  </a>

                  {/* Live Streaming */}
                  <a href="https://instagram.com/livestreaming.clips" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5 shrink-0 snap-start w-[76px]">
                    <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 transition-transform duration-300 group-hover:scale-105">
                      <div className="w-full h-full rounded-full bg-neutral-950 p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                          <Image src="/livestreaming.png" alt="Live Streaming" fill sizes="64px" className="object-cover" />
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-400 group-hover:text-white font-medium tracking-wide w-full text-center truncate transition-colors px-1">livestreaming.clips</span>
                  </a>

                  {/* Rich Hub */}
                  <a href="https://instagram.com/richhub.page" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5 shrink-0 snap-start w-[76px]">
                    <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 transition-transform duration-300 group-hover:scale-105">
                      <div className="w-full h-full rounded-full bg-neutral-950 p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                          <Image src="/richhub.page.png" alt="Rich Hub" fill sizes="64px" className="object-cover" />
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-400 group-hover:text-white font-medium tracking-wide w-full text-center truncate transition-colors px-1">richhub.page</span>
                  </a>

                  {/* Watch Clips */}
                  <a href="https://instagram.com/watchclips.page" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5 shrink-0 snap-start w-[76px]">
                    <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 transition-transform duration-300 group-hover:scale-105">
                      <div className="w-full h-full rounded-full bg-neutral-950 p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                          <Image src="/watchclips.page.png" alt="Watch Clips" fill sizes="64px" className="object-cover" />
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-400 group-hover:text-white font-medium tracking-wide w-full text-center truncate transition-colors px-1">watchclips.page</span>
                  </a>

                  {/* TikTok Accounts */}
                  {/* The One Man (TikTok) */}
                  <a href="https://tiktok.com/@theclipman79" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5 shrink-0 snap-start w-[76px]">
                    <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-tr from-[#00f2fe] via-neutral-800 to-[#fe0979] transition-transform duration-300 group-hover:scale-105">
                      <div className="w-full h-full rounded-full bg-neutral-950 p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                          <Image src="/theoneman.png" alt="The One Man TikTok" fill sizes="64px" className="object-cover" />
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-400 group-hover:text-white font-medium tracking-wide w-full text-center truncate transition-colors px-1">theclipman79</span>
                  </a>

                  {/* Live Streaming (TikTok) */}
                  <a href="https://tiktok.com/@livestreaming.clips" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5 shrink-0 snap-start w-[76px]">
                    <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-tr from-[#00f2fe] via-neutral-800 to-[#fe0979] transition-transform duration-300 group-hover:scale-105">
                      <div className="w-full h-full rounded-full bg-neutral-950 p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                          <Image src="/livestreaming.png" alt="Live Streaming TikTok" fill sizes="64px" className="object-cover" />
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-400 group-hover:text-white font-medium tracking-wide w-full text-center truncate transition-colors px-1">livestreaming.clips</span>
                  </a>

                  {/* Rich Hub (TikTok) */}
                  <a href="https://tiktok.com/@richhub.page" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5 shrink-0 snap-start w-[76px]">
                    <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-tr from-[#00f2fe] via-neutral-800 to-[#fe0979] transition-transform duration-300 group-hover:scale-105">
                      <div className="w-full h-full rounded-full bg-neutral-950 p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                          <Image src="/richhub.page.png" alt="Rich Hub TikTok" fill sizes="64px" className="object-cover" />
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-400 group-hover:text-white font-medium tracking-wide w-full text-center truncate transition-colors px-1">richhub.page</span>
                  </a>

                  {/* Watch Clips (TikTok) */}
                  <a href="https://tiktok.com/@watchclips.page" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5 shrink-0 snap-start w-[76px]">
                    <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-tr from-[#00f2fe] via-neutral-800 to-[#fe0979] transition-transform duration-300 group-hover:scale-105">
                      <div className="w-full h-full rounded-full bg-neutral-950 p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
                          <Image src="/watchclips.page.png" alt="Watch Clips TikTok" fill sizes="64px" className="object-cover" />
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-400 group-hover:text-white font-medium tracking-wide w-full text-center truncate transition-colors px-1">watchclips.page</span>
                  </a>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-white/10 rounded-[2rem] p-8 relative overflow-hidden backdrop-blur-md">
                <h2 className="text-3xl font-semibold mb-3 tracking-tight font-display">Got a relatable clip?</h2>
                <p className="text-neutral-400 mb-8 text-base leading-relaxed">
                  Submit it and get featured on Patrick James's Instagram. We don't host files directly. Drop a link to your cloud storage below.
                </p>

                <div className="flex flex-col gap-3 relative z-10">
                  <div className="flex items-center gap-4 text-sm text-neutral-300 bg-neutral-950 p-4 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                      <UploadCloud className="text-neutral-400 w-5 h-5" />
                    </div>
                    <span className="font-medium">Upload to Google Drive or Dropbox</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-neutral-300 bg-neutral-950 p-4 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-neutral-400 w-5 h-5" />
                    </div>
                    <span className="font-medium">Set sharing to "Anyone with the link"</span>
                  </div>
                </div>
              </div>

              <button
                onClick={nextStep}
                className="w-full bg-white text-neutral-950 font-bold py-5 rounded-[1.5rem] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
              >
                Start Submission
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-8 w-full max-w-sm mx-auto flex-1 justify-center relative">
              <div>
                <h2 className="text-4xl font-semibold mb-3 tracking-tight">Who gets the credit?</h2>
                <p className="text-neutral-400 text-lg">Enter the name or Instagram handle you'd like us to feature.</p>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="text-neutral-500 font-medium text-lg">@</span>
                </div>
                <input
                  type="text"
                  value={creditedName}
                  onChange={(e) => setCreditedName(e.target.value)}
                  placeholder="yourusername"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl pl-10 pr-5 py-5 text-lg font-medium text-white focus:outline-none focus:border-neutral-500 transition-all placeholder:font-normal placeholder:text-neutral-600"
                  autoFocus
                />
              </div>
              <button
                onClick={nextStep}
                className="w-full bg-white text-neutral-900 font-bold py-5 rounded-2xl active:scale-[0.98] transition-all"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-6 w-full max-w-sm mx-auto flex-1 justify-center">
              <div>
                <h2 className="text-4xl font-semibold mb-3 tracking-tight">Are you 18 or older?</h2>
                <p className="text-neutral-400 text-lg">We need to check this for legal reasons.</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsAdult(true)}
                  className={`flex-1 py-5 rounded-2xl border-2 ${isAdult === true ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'} font-semibold text-lg transition-all`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsAdult(false)}
                  className={`flex-1 py-5 rounded-2xl border-2 ${isAdult === false ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'} font-semibold text-lg transition-all`}
                >
                  No
                </button>
              </div>

              {isAdult === false && (
                <div className="animate-in fade-in slide-in-from-top-4 flex flex-col gap-4 bg-neutral-900/50 border border-neutral-800 p-5 rounded-2xl mt-2">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-neutral-300 leading-relaxed font-medium">Since you're under 18, we need your parent or guardian's consent.</p>
                  </div>
                  <input
                    type="text"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="Guardian's Full Legal Name"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-500 text-white placeholder:text-neutral-600"
                  />
                </div>
              )}

              <button
                onClick={nextStep}
                disabled={isAdult === null || (isAdult === false && guardianName.length < 3)}
                className="w-full bg-white disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-bold py-5 rounded-2xl active:scale-[0.98] transition-all mt-4 hover:scale-[1.02]"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-8 w-full pb-12">
              <div>
                <h2 className="text-3xl font-semibold mb-2 tracking-tight">Final Details</h2>
                <p className="text-neutral-400 text-base">Paste your link and confirm the rights.</p>
              </div>

              <div className="space-y-6">
                {/* Warning Card */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300 leading-relaxed">
                    <strong className="text-red-400 font-semibold block mb-1">STRICT RULE: No Copyright Music</strong>
                    Do NOT upload any clips containing copyrighted music, audio, or stolen content. All claims will result in immediate rejection.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-neutral-300 ml-1">
                    <UploadCloud className="w-4 h-4 text-neutral-500" /> Cloud Share Link
                  </label>
                  <input
                    type="url"
                    value={clipLink}
                    onChange={(e) => setClipLink(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-neutral-300 ml-1">
                    <FileText className="w-4 h-4 text-neutral-500" /> Short Description <span className="text-neutral-600 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What's happening in this clip?"
                    rows={2}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600 transition-all min-h-[80px]"
                  />
                </div>

                <div className="space-y-2 border-t border-white/5 pt-6">
                  <label className="flex gap-2 text-sm font-semibold text-neutral-300 ml-1 leading-tight">
                    <Video className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span>Is it yours, or did you get it from others? <span className="text-neutral-600 font-normal">(Optional)</span></span>
                  </label>
                  <div className="flex gap-3">
                    <button onClick={() => setSelfFilmed(true)} className={`flex-1 py-3 rounded-xl border-2 ${selfFilmed === true ? 'bg-neutral-800 border-neutral-700 text-white font-medium' : 'bg-neutral-900 border-neutral-800 text-neutral-400'} text-sm transition-all`}>My Original Clip</button>
                    <button onClick={() => setSelfFilmed(false)} className={`flex-1 py-3 rounded-xl border-2 ${selfFilmed === false ? 'bg-neutral-800 border-neutral-700 text-white font-medium' : 'bg-neutral-900 border-neutral-800 text-neutral-400'} text-sm transition-all`}>From Others</button>
                  </div>
                  {selfFilmed === false && (
                    <div className="mt-2 p-3.5 bg-neutral-900/50 border border-neutral-800 rounded-xl flex gap-3 text-xs text-neutral-400 leading-relaxed font-medium">
                      <AlertCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                      <p>If you're sharing another clip for fun, make sure you've added your own substantial edits and mentioned it in the description.</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-neutral-300 ml-1">
                    <CheckCircle2 className="w-4 h-4 text-neutral-500" /> Do you want on-screen credit?
                  </label>
                  <div className="flex gap-3">
                    <button onClick={() => setWantsCredit(true)} className={`flex-1 py-3 rounded-xl border-2 ${wantsCredit === true ? 'bg-neutral-800 border-neutral-700 text-white font-medium' : 'bg-neutral-900 border-neutral-800 text-neutral-400'} text-sm transition-all`}>Yes, Please</button>
                    <button onClick={() => setWantsCredit(false)} className={`flex-1 py-3 rounded-xl border-2 ${wantsCredit === false ? 'bg-neutral-800 border-neutral-700 text-white font-medium' : 'bg-neutral-900 border-neutral-800 text-neutral-400'} text-sm transition-all`}>No Credit needed</button>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-neutral-200 mb-1">
                    <Lock className="w-4 h-4 text-neutral-500" /> Required Confirmations
                  </label>

                  <label className="flex items-start gap-4 text-sm cursor-pointer group bg-neutral-900/40 p-4 rounded-xl border border-transparent hover:border-white/5 transition-all">
                    <input type="checkbox" className="mt-1 flex-shrink-0 appearance-none w-5 h-5 border-2 border-neutral-600 rounded-md checked:bg-neutral-100 checked:border-neutral-100 transition-all cursor-pointer relative after:content-[''] after:absolute after:hidden checked:after:block after:left-[6px] after:top-[2px] after:w-1.5 after:h-2.5 after:border-black after:border-r-2 after:border-b-2 after:rotate-45" checked={rules.noCopyright} onChange={(e) => setRules({ ...rules, noCopyright: e.target.checked })} />
                    <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors leading-snug">My clip does not contain copyrighted music, sound, or text overlays I don't have rights to use.</span>
                  </label>

                  <label className="flex items-start gap-4 text-sm cursor-pointer group bg-neutral-900/40 p-4 rounded-xl border border-transparent hover:border-white/5 transition-all">
                    <input type="checkbox" className="mt-1 flex-shrink-0 appearance-none w-5 h-5 border-2 border-neutral-600 rounded-md checked:bg-neutral-100 checked:border-neutral-100 transition-all cursor-pointer relative after:content-[''] after:absolute after:hidden checked:after:block after:left-[6px] after:top-[2px] after:w-1.5 after:h-2.5 after:border-black after:border-r-2 after:border-b-2 after:rotate-45" checked={rules.noGraphic} onChange={(e) => setRules({ ...rules, noGraphic: e.target.checked })} />
                    <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors leading-snug">My clip does not contain graphic violence, nudity, or sexually explicit content.</span>
                  </label>

                  <label className="flex items-start gap-4 text-sm cursor-pointer group bg-neutral-900/40 p-4 rounded-xl border border-transparent hover:border-white/5 transition-all">
                    <input type="checkbox" className="mt-1 flex-shrink-0 appearance-none w-5 h-5 border-2 border-neutral-600 rounded-md checked:bg-neutral-100 checked:border-neutral-100 transition-all cursor-pointer relative after:content-[''] after:absolute after:hidden checked:after:block after:left-[6px] after:top-[2px] after:w-1.5 after:h-2.5 after:border-black after:border-r-2 after:border-b-2 after:rotate-45" checked={rules.noViolation} onChange={(e) => setRules({ ...rules, noViolation: e.target.checked })} />
                    <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors leading-snug">My clip does not otherwise violate copyright law or anyone else's rights.</span>
                  </label>

                  <label className="flex items-start gap-4 text-sm cursor-pointer group bg-neutral-900/40 p-4 rounded-xl border border-transparent hover:border-white/5 transition-all">
                    <input type="checkbox" className="mt-1 flex-shrink-0 appearance-none w-5 h-5 border-2 border-neutral-600 rounded-md checked:bg-neutral-100 checked:border-neutral-100 transition-all cursor-pointer relative after:content-[''] after:absolute after:hidden checked:after:block after:left-[6px] after:top-[2px] after:w-1.5 after:h-2.5 after:border-black after:border-r-2 after:border-b-2 after:rotate-45" checked={rules.agreedTerms} onChange={(e) => setRules({ ...rules, agreedTerms: e.target.checked })} />
                    <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors leading-snug">I have read and agree to the <Link href="/legal/content-submission-agreement" className="text-neutral-200 hover:text-white underline underline-offset-2 font-medium">Content Agreement</Link> and <Link href="/legal/terms-of-service" className="text-neutral-200 hover:text-white underline underline-offset-2 font-medium">Terms</Link>.</span>
                  </label>
                </div>
              </div>

              {/* Anti-spam Honeypot Field (Hidden from real users) */}
              <input
                type="text"
                name="website_url"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="opacity-0 absolute -z-10 w-0 h-0"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
              />

              <button
                onClick={submitForm}
                disabled={!isFormValid || isSubmitting || botField !== ""}
                className="w-full mt-4 bg-white disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-bold py-5 rounded-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Submitting..." : "Submit Clip"}
                {!isSubmitting && <ChevronRight className="w-5 h-5" />}
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" variants={slideVariants} initial="initial" animate="animate" className="flex flex-col items-center text-center gap-8 w-full max-w-sm mx-auto flex-1 justify-center relative">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-neutral-900 border border-neutral-700/50 text-white rounded-full flex items-center justify-center z-10 shadow-2xl">
                <CheckCircle2 className="w-10 h-10 text-white/90" />
              </div>

              {/* Main Message */}
              <div className="z-10 px-2 space-y-3">
                <h2 className="text-4xl font-bold tracking-tight text-white">Clip Received!</h2>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Thanks for submitting, <strong className="text-white">@{creditedName || "friend"}</strong>. We'll review your clip and reach out if it gets selected.
                </p>
              </div>

              {/* Submission Summary Card */}
              <div className="w-full bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 text-left space-y-3 z-10">
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Submission Summary</p>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-neutral-500 font-medium">Credited Name</span>
                    <span className="text-neutral-200 font-semibold text-right ml-4 truncate max-w-[180px]">@{creditedName || "Anonymous"}</span>
                  </div>
                  <div className="w-full h-px bg-neutral-800" />
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-neutral-500 font-medium">Clip Link</span>
                    <span className="text-neutral-200 font-semibold text-right ml-4 truncate max-w-[180px]">{clipLink}</span>
                  </div>
                  <div className="w-full h-px bg-neutral-800" />
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-neutral-500 font-medium">On-Screen Credit</span>
                    <span className="text-neutral-200 font-semibold">{wantsCredit ? "Yes" : "No"}</span>
                  </div>
                  <div className="w-full h-px bg-neutral-800" />
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-neutral-500 font-medium">Clip Origin</span>
                    <span className="text-neutral-200 font-semibold">{selfFilmed === true ? "Original" : selfFilmed === false ? "From Others" : "Not specified"}</span>
                  </div>
                </div>
              </div>

              {/* Channels Reminder */}
              <p className="text-xs text-neutral-500 z-10 leading-relaxed">Your clip may be featured on <strong className="text-neutral-300">@theclipman0154</strong>, <strong className="text-neutral-300">@opus.klips</strong>, <strong className="text-neutral-300">@livestreaming.clips</strong>, <strong className="text-neutral-300">@richhub.page</strong>, or <strong className="text-neutral-300">@watchclips.page</strong></p>

              <button
                onClick={() => {
                  sessionStorage.removeItem("submitklips_form");
                  setClipLink("");
                  setDescription("");
                  setCreditedName("");
                  setGuardianName("");
                  setIsAdult(null);
                  setSelfFilmed(null);
                  setWantsCredit(null);
                  setRules({
                    noCopyright: false,
                    noGraphic: false,
                    noViolation: false,
                    agreedTerms: false,
                  });
                  setStep(0);
                }}
                className="mt-4 px-8 py-4 bg-transparent border border-neutral-700/50 rounded-full text-base text-neutral-300 hover:text-white hover:bg-neutral-800/50 transition-all z-10 font-semibold"
              >
                Submit another clip
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      {step === 0 && (
        <footer className="max-w-md mx-auto px-5 pb-10 flex flex-col items-center gap-5 text-sm text-neutral-500 relative z-10">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-2" />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-medium">
            <Link href="/legal/content-submission-agreement" className="hover:text-white transition-colors">Content Agreement</Link>
            <Link href="/legal/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/legal/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
          <p>Contact: <a href="mailto:submitklips@gmail.com" className="text-neutral-300 hover:text-white font-medium">submitklips@gmail.com</a></p>
        </footer>
      )}
    </div>
  );
}
