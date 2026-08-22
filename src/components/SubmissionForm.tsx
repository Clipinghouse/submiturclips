"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, ChevronRight, CheckCircle2, AlertCircle, AlertTriangle, ShieldCheck, Video, FileText, Lock, User, Link as LinkIcon, Loader2 } from "lucide-react";
import { createSubmission } from "@/app/actions";

export default function SubmissionForm() {
    const [step, setStep] = useState(1); // Starting at 1 since Step 0 is the landing content above

    // Form State
    const [creditedName, setCreditedName] = useState("");
    const [email, setEmail] = useState("");
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

    // Persist form state
    useEffect(() => {
        const saved = sessionStorage.getItem("submitklips_form_new");
        if (saved) {
            try {
                const data = JSON.parse(saved);
                setStep(data.step ?? 1);
                setCreditedName(data.creditedName ?? "");
                setEmail(data.email ?? "");
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
            sessionStorage.setItem("submitklips_form_new", JSON.stringify({
                step, creditedName, email, isAdult, guardianName, clipLink, description, selfFilmed, wantsCredit, rules
            }));
        }
    }, [step, creditedName, email, isAdult, guardianName, clipLink, description, selfFilmed, wantsCredit, rules]);

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => Math.max(1, s - 1));

    const submitForm = async () => {
        if (botField.length > 0) {
            nextStep();
            return;
        }

        setIsSubmitting(true);
        const result = await createSubmission({
            creditedName,
            email,
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
        email?.length > 3 &&
        /\S+@\S+\.\S+/.test(email) &&
        wantsCredit !== null &&
        selfFilmed !== null &&
        Object.values(rules).every(Boolean);

    const slideVariants = {
        initial: { x: 20, opacity: 0, scale: 0.98 },
        animate: { x: 0, opacity: 1, scale: 1 },
        exit: { x: -20, opacity: 0, scale: 0.98 },
    };

    return (
        <div className="w-full flex flex-col relative">

            {/* Navigation Header & Stepper */}
            <div className="w-full flex items-center justify-between z-20 mb-2 h-8">
                {step > 1 && step < 4 ? (
                    <button onClick={prevStep} className="text-sm font-poppins text-zinc-500 hover:text-lime-500 transition-colors flex items-center gap-1">
                        ← Back
                    </button>
                ) : (
                    <div className="w-10"></div>
                )}

                {step < 4 && (
                    <div className="flex items-center gap-2">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`h-1.5 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-lime-500 shadow-[0_0_12px_rgba(132,204,22,0.6)]' :
                                    s < step ? 'w-3 bg-lime-500/40' : 'w-3 bg-zinc-800'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence mode="wait">

                {step === 1 && (
                    <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-6 w-full max-w-sm mx-auto mt-6">
                        <div>
                            <h2 className="text-2xl font-poor-story tracking-wide mb-2 text-white">WHO GETS THE CREDIT?</h2>
                            <p className="text-zinc-400 font-poppins text-sm leading-relaxed">Enter the name or Instagram handle you'd like us to feature in the caption.</p>
                        </div>
                        <div className="relative group mt-4">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <span className="text-lime-500 font-medium text-base">@</span>
                            </div>
                            <input
                                type="text"
                                value={creditedName}
                                onChange={(e) => setCreditedName(e.target.value)}
                                placeholder="yourusername"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-9 pr-4 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-lime-500 transition-all placeholder:font-normal placeholder:text-zinc-600 shadow-inner"
                            />
                        </div>
                        <button
                            onClick={nextStep}
                            className="w-full mt-4 bg-lime-500 text-black font-poor-story tracking-wider text-lg py-3 rounded-xl hover:scale-[1.02] hover:bg-lime-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(132,204,22,0.3)]"
                        >
                            CONTINUE
                            <ChevronRight className="w-5 h-5 text-black" />
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-6 w-full max-w-sm mx-auto mt-6">
                        <div>
                            <h2 className="text-2xl font-poor-story tracking-wide mb-2 text-white">ARE YOU 18 OR OLDER?</h2>
                            <p className="text-zinc-400 font-poppins text-sm leading-relaxed">We need to check this for legal reasons before processing submissions.</p>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <button
                                onClick={() => setIsAdult(true)}
                                className={`flex-1 py-3 rounded-xl border-2 ${isAdult === true ? 'bg-zinc-800 border-lime-500 text-lime-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'} font-poppins font-semibold text-sm transition-all`}
                            >
                                Yes, I am
                            </button>
                            <button
                                onClick={() => setIsAdult(false)}
                                className={`flex-1 py-3 rounded-xl border-2 ${isAdult === false ? 'bg-zinc-800 border-lime-500 text-lime-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'} font-poppins font-semibold text-sm transition-all`}
                            >
                                No
                            </button>
                        </div>

                        {isAdult === false && (
                            <div className="animate-in fade-in slide-in-from-top-4 flex flex-col gap-4 bg-lime-500/10 border border-lime-500/20 p-5 rounded-xl mt-2">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="w-5 h-5 text-lime-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-zinc-300 font-poppins leading-relaxed">Since you're under 18, we need your parent or guardian's consent.</p>
                                </div>
                                <input
                                    type="text"
                                    value={guardianName}
                                    onChange={(e) => setGuardianName(e.target.value)}
                                    placeholder="Guardian's Full Legal Name"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-lime-500 text-white font-poppins placeholder:text-zinc-600"
                                />
                            </div>
                        )}

                        <button
                            onClick={nextStep}
                            disabled={isAdult === null || (isAdult === false && guardianName.length < 3)}
                            className="w-full bg-lime-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-poor-story tracking-wider text-lg py-3 rounded-xl hover:scale-[1.02] disabled:hover:scale-100 hover:bg-lime-400 disabled:hover:bg-zinc-800 active:scale-[0.98] transition-all mt-4 flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(132,204,22,0.2)]"
                        >
                            CONTINUE <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-6 w-full pb-12 mt-4">
                        <div>
                            <h2 className="text-3xl font-poor-story tracking-wide mb-1 text-white">FINAL DETAILS</h2>
                            <p className="text-zinc-400 font-poppins text-sm leading-relaxed">Paste your link and confirm the rights.</p>
                        </div>

                        <div className="space-y-6">
                            {/* Warning Card */}
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <p className="text-sm text-red-300 leading-relaxed font-poppins">
                                    <strong className="text-red-400 font-bold block mb-1">STRICT RULE: No Copyright Music</strong>
                                    Do NOT upload any clips containing copyrighted music, audio, or stolen content. All claims will result in immediate rejection.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-poppins font-semibold uppercase tracking-wider text-zinc-300 ml-1">
                                    <div className="w-4 h-4 text-lime-500 flex items-center justify-center">@</div> Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-poppins focus:outline-none focus:border-lime-500 placeholder:text-zinc-600 transition-all text-white shadow-inner"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-poppins font-semibold uppercase tracking-wider text-zinc-300 ml-1">
                                    <UploadCloud className="w-4 h-4 text-lime-500" /> Cloud Share Link
                                </label>
                                <input
                                    type="url"
                                    value={clipLink}
                                    onChange={(e) => setClipLink(e.target.value)}
                                    placeholder="https://drive.google.com/..."
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-poppins focus:outline-none focus:border-lime-500 placeholder:text-zinc-600 transition-all text-white shadow-inner"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-poppins font-semibold uppercase tracking-wider text-zinc-300 ml-1">
                                    <FileText className="w-4 h-4 text-lime-500" /> Short Description <span className="text-zinc-600 font-normal lowercase tracking-normal">(Optional)</span>
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="What's happening in this clip?"
                                    rows={2}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-poppins focus:outline-none focus:border-lime-500 placeholder:text-zinc-600 transition-all min-h-[80px] text-white shadow-inner resize-none"
                                />
                            </div>

                            <div className="space-y-3 border-t border-zinc-800 pt-6">
                                <label className="flex gap-2 text-sm font-poppins font-semibold text-zinc-300 ml-1 leading-tight">
                                    <Video className="w-4 h-4 text-lime-500 shrink-0" />
                                    <span>Is it yours, or did you get it from others?</span>
                                </label>
                                <div className="flex gap-3">
                                    <button onClick={() => setSelfFilmed(true)} className={`flex-1 py-3.5 rounded-xl border-2 ${selfFilmed === true ? 'bg-zinc-800 border-lime-500 text-white font-medium' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'} text-xs font-poppins transition-all`}>My Original Clip</button>
                                    <button onClick={() => setSelfFilmed(false)} className={`flex-1 py-3.5 rounded-xl border-2 ${selfFilmed === false ? 'bg-zinc-800 border-lime-500 text-white font-medium' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'} text-xs font-poppins transition-all`}>From Others</button>
                                </div>
                                {selfFilmed === false && (
                                    <div className="mt-2 p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg flex gap-3 text-xs text-zinc-400 leading-relaxed font-poppins">
                                        <AlertCircle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                                        <p>If you're sharing another clip for fun, make sure you've added your own substantial edits and mentioned it in the description.</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 pt-2">
                                <label className="flex items-center gap-2 text-sm font-poppins font-semibold text-zinc-300 ml-1">
                                    <CheckCircle2 className="w-4 h-4 text-lime-500" /> Do you want on-screen credit?
                                </label>
                                <div className="flex gap-3">
                                    <button onClick={() => setWantsCredit(true)} className={`flex-1 py-3.5 rounded-xl border-2 ${wantsCredit === true ? 'bg-zinc-800 border-lime-500 text-white font-medium' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'} text-xs font-poppins transition-all`}>Yes, Please</button>
                                    <button onClick={() => setWantsCredit(false)} className={`flex-1 py-3.5 rounded-xl border-2 ${wantsCredit === false ? 'bg-zinc-800 border-lime-500 text-white font-medium' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'} text-xs font-poppins transition-all`}>No Credit needed</button>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-zinc-800 space-y-4">
                                <label className="flex items-center gap-2 text-sm font-poppins font-bold text-white mb-2">
                                    <Lock className="w-4 h-4 text-lime-500" /> Required Confirmations
                                </label>

                                <label className="flex items-start gap-4 text-sm cursor-pointer group bg-zinc-900/50 p-4 rounded-xl border border-transparent hover:border-zinc-800 transition-all font-poppins">
                                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-zinc-700 text-lime-500 focus:ring-lime-500 bg-zinc-950 accent-lime-500 shrink-0 cursor-pointer" checked={rules.noCopyright} onChange={(e) => setRules({ ...rules, noCopyright: e.target.checked })} />
                                    <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors leading-snug">My clip does not contain copyrighted music, sound, or text overlays I don't have rights to use.</span>
                                </label>

                                <label className="flex items-start gap-4 text-sm cursor-pointer group bg-zinc-900/50 p-4 rounded-xl border border-transparent hover:border-zinc-800 transition-all font-poppins">
                                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-zinc-700 text-lime-500 focus:ring-lime-500 bg-zinc-950 accent-lime-500 shrink-0 cursor-pointer" checked={rules.noGraphic} onChange={(e) => setRules({ ...rules, noGraphic: e.target.checked })} />
                                    <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors leading-snug">My clip does not contain graphic violence, nudity, or sexually explicit content.</span>
                                </label>

                                <label className="flex items-start gap-4 text-sm cursor-pointer group bg-zinc-900/50 p-4 rounded-xl border border-transparent hover:border-zinc-800 transition-all font-poppins">
                                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-zinc-700 text-lime-500 focus:ring-lime-500 bg-zinc-950 accent-lime-500 shrink-0 cursor-pointer" checked={rules.noViolation} onChange={(e) => setRules({ ...rules, noViolation: e.target.checked })} />
                                    <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors leading-snug">My clip does not otherwise violate copyright law or anyone else's rights.</span>
                                </label>

                                <label className="flex items-start gap-4 text-sm cursor-pointer group bg-zinc-900/50 p-4 rounded-xl border border-transparent hover:border-zinc-800 transition-all font-poppins">
                                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-zinc-700 text-lime-500 focus:ring-lime-500 bg-zinc-950 accent-lime-500 shrink-0 cursor-pointer" checked={rules.agreedTerms} onChange={(e) => setRules({ ...rules, agreedTerms: e.target.checked })} />
                                    <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors leading-snug">
                                        I have read and agree to the <a href="/legal/content-submission-agreement" target="_blank" className="text-lime-500 hover:underline">Content Agreement</a> and <a href="/legal/terms-of-service" target="_blank" className="text-lime-500 hover:underline">Terms of Service</a>.
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Anti-spam Honeypot Field */}
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
                            className="w-full mt-6 bg-lime-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-poor-story tracking-wider text-lg py-4 rounded-xl hover:scale-[1.02] disabled:hover:scale-100 hover:bg-lime-400 disabled:hover:bg-zinc-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(132,204,22,0.3)] disabled:shadow-none"
                        >
                            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "COMPLETE SUBMISSION"}
                            {!isSubmitting && <CheckCircle2 className="w-5 h-5" />}
                        </button>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div key="step4" variants={slideVariants} initial="initial" animate="animate" className="flex flex-col items-center text-center gap-8 w-full max-w-sm mx-auto justify-center relative mt-10">
                        <div className="w-24 h-24 bg-lime-500/10 border border-lime-500/30 text-lime-500 rounded-full flex items-center justify-center z-10 shadow-[0_0_40px_rgba(132,204,22,0.2)]">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>

                        <div className="z-10 px-2 space-y-3">
                            <h2 className="text-4xl font-poor-story tracking-wide text-white">CLIP RECEIVED</h2>
                            <p className="text-zinc-400 font-poppins text-sm leading-relaxed">
                                Thanks for submitting, <strong className="text-lime-500">@{creditedName || "creator"}</strong>.<br />We'll review your clip and reach out if it gets selected.
                            </p>
                        </div>

                        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-left space-y-4 z-10 font-poppins mt-2">
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest text-center shadow-inner">Submission Summary</p>

                            <div className="space-y-3">
                                <div className="flex justify-between items-start text-sm">
                                    <span className="text-zinc-500 font-medium">Credited Name</span>
                                    <span className="text-white font-semibold text-right ml-4 truncate max-w-[180px]">@{creditedName || "Anonymous"}</span>
                                </div>
                                <div className="w-full h-px bg-zinc-800/50" />
                                <div className="flex justify-between items-start text-sm">
                                    <span className="text-zinc-500 font-medium">Clip Link</span>
                                    <span className="text-lime-500 font-medium hover:underline cursor-pointer text-right ml-4 truncate max-w-[180px]">{clipLink}</span>
                                </div>
                                <div className="w-full h-px bg-zinc-800/50" />
                                <div className="flex justify-between items-start text-sm">
                                    <span className="text-zinc-500 font-medium">On-Screen Credit</span>
                                    <span className="text-white font-semibold">{wantsCredit ? "Required" : "No"}</span>
                                </div>
                                <div className="w-full h-px bg-zinc-800/50" />
                                <div className="flex justify-between items-start text-sm">
                                    <span className="text-zinc-500 font-medium">Clip Origin</span>
                                    <span className="text-white font-semibold">{selfFilmed === true ? "Original" : selfFilmed === false ? "From Others" : "Not specified"}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                sessionStorage.removeItem("submitklips_form_new");
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
                                setStep(1);
                                document.getElementById('submission-section')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="mt-6 px-8 py-3.5 bg-zinc-900 border border-zinc-700/50 rounded-full text-sm text-zinc-300 font-poppins hover:text-white hover:border-lime-500 transition-all z-10 font-semibold shadow-xl"
                        >
                            Submit another clip
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
