"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, ChevronRight, CheckCircle2, AlertCircle, AlertTriangle, ShieldCheck, Video, FileText, Lock, Info, Loader2 } from "lucide-react";
import { createSubmission } from "@/app/actions";
import Image from "next/image";

export default function SubmissionForm() {
    const [step, setStep] = useState(1);

    // Form State
    const [creditedName, setCreditedName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdult, setIsAdult] = useState<boolean | null>(null);

    const [clipLink, setClipLink] = useState("");
    const [description, setDescription] = useState("");
    const [selfFilmed, setSelfFilmed] = useState<boolean | null>(null);
    const [isEdited, setIsEdited] = useState<boolean | null>(null);
    const [sourceChannel, setSourceChannel] = useState("");

    const [rules, setRules] = useState({
        noCopyright: false,
        noGraphic: false,
        noViolation: false,
        agreedTerms: false,
    });

    const [botField, setBotField] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const source = params.get("source") || params.get("utm_source");
            if (source) setSourceChannel(source);
        }
    }, []);

    // Hydrate form state
    useEffect(() => {
        const idSaved = localStorage.getItem("submitklips_identity");
        if (idSaved) {
            try {
                const idData = JSON.parse(idSaved);
                if (idData.creditedName) setCreditedName(idData.creditedName);
                if (idData.email) setEmail(idData.email);
                if (idData.isAdult !== undefined) setIsAdult(idData.isAdult);
            } catch { }
        }

        const draftSaved = sessionStorage.getItem("submitklips_draft_v3");
        if (draftSaved) {
            try {
                const draft = JSON.parse(draftSaved);
                if (draft.step) setStep(draft.step);
                if (draft.clipLink) setClipLink(draft.clipLink);
                if (draft.description) setDescription(draft.description);
                if (draft.selfFilmed !== undefined) setSelfFilmed(draft.selfFilmed);
                if (draft.isEdited !== undefined) setIsEdited(draft.isEdited);
                if (draft.rules) setRules(draft.rules);
            } catch { }
        }
    }, []);

    // Persist Identity (localStorage)
    useEffect(() => {
        localStorage.setItem("submitklips_identity", JSON.stringify({
            creditedName, email, isAdult
        }));
    }, [creditedName, email, isAdult]);

    // Persist Draft (sessionStorage)
    useEffect(() => {
        if (step < 7) {
            sessionStorage.setItem("submitklips_draft_v3", JSON.stringify({
                step, clipLink, description, selfFilmed, isEdited, rules
            }));
        }
    }, [step, clipLink, description, selfFilmed, isEdited, rules]);

    const nextStep = () => {
        if (step === 3 && selfFilmed === true) {
            setStep(5);
        } else {
            setStep((s) => s + 1);
        }
    };
    
    const prevStep = () => {
        if (step === 5 && selfFilmed === true) {
            setStep(3);
        } else {
            setStep((s) => Math.max(1, s - 1));
        }
    };

    const submitForm = async () => {
        if (botField.length > 0) {
            nextStep();
            return;
        }

        setIsSubmitting(true);
        const result = await createSubmission({
            creditedName,
            email,
            isAdult: true, // Only adults can reach this point
            clipLink,
            description,
            selfFilmed,
            isEdited,
            sourceChannel,
        });
        setIsSubmitting(false);
        if (result.success) {
            sessionStorage.removeItem("submitklips_draft_v3");
            setClipLink("");
            setDescription("");
            setSelfFilmed(null);
            setIsEdited(null);
            setRules({ noCopyright: false, noGraphic: false, noViolation: false, agreedTerms: false });
            nextStep();
        } else {
            alert(`Error: ${(result as any).details || result.error}`);
        }
    };

    const isFormValid =
        clipLink.length > 5 &&
        email?.length > 3 &&
        /\S+@\S+\.\S+/.test(email) &&
        Object.values(rules).every(Boolean);

    const slideVariants = {
        initial: { x: 20, opacity: 0, scale: 0.98 },
        animate: { x: 0, opacity: 1, scale: 1 },
        exit: { x: -20, opacity: 0, scale: 0.98 },
    };

    return (
        <div className="w-full flex flex-col relative" id="submission-section">
            {/* Navigation Header & Stepper */}
            <div className="w-full flex items-center justify-between z-20 mb-2 h-8">
                {step > 1 && step < 7 ? (
                    <button onClick={prevStep} className="text-sm font-poppins text-zinc-500 hover:text-lime-500 transition-colors flex items-center gap-1">
                        ← Back
                    </button>
                ) : (
                    <div className="w-10"></div>
                )}

                {step < 7 && (
                    <div className="flex items-center gap-1.5">
                        {(selfFilmed === false ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 5, 6]).map((s) => (
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
                            <h2 className="text-2xl font-poor-story tracking-wide mb-2 text-white uppercase">What is your Instagram Handle?</h2>
                            <p className="text-zinc-400 font-poppins text-sm leading-relaxed">Enter the handle of the account submitting the video.</p>
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
                            disabled={creditedName.length < 2}
                            className="w-full mt-4 bg-lime-500 text-black font-poor-story tracking-wider text-lg py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] hover:bg-lime-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(132,204,22,0.3)]"
                        >
                            CONTINUE
                            <ChevronRight className="w-5 h-5 text-black" />
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-6 w-full max-w-sm mx-auto mt-6">
                        <div>
                            <h2 className="text-2xl font-poor-story tracking-wide mb-2 text-white">ARE YOU OVER EIGHTEEN?</h2>
                            <p className="text-zinc-400 font-poppins text-sm leading-relaxed">We need to check this for legal reasons before processing submissions.</p>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <button
                                onClick={() => setIsAdult(true)}
                                className={`flex-1 py-3 rounded-xl border-2 ${isAdult === true ? 'bg-zinc-800 border-lime-500 text-lime-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'} font-poppins font-semibold text-sm transition-all`}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setIsAdult(false)}
                                className={`flex-1 py-3 rounded-xl border-2 ${isAdult === false ? 'bg-zinc-800 border-red-500 text-red-400' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'} font-poppins font-semibold text-sm transition-all`}
                            >
                                No
                            </button>
                        </div>

                        {isAdult === false && (
                            <div className="animate-in fade-in slide-in-from-top-4 flex flex-col gap-4 bg-black border border-red-500/30 p-5 rounded-xl mt-2 shadow-lg">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-white font-poppins leading-relaxed font-medium">Viewers under eighteen are not allowed to post or submit clips. This is our policy.</p>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={nextStep}
                            disabled={isAdult !== true}
                            className="w-full bg-lime-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-poor-story tracking-wider text-lg py-3 rounded-xl hover:scale-[1.02] disabled:hover:scale-100 hover:bg-lime-400 disabled:hover:bg-zinc-800 active:scale-[0.98] transition-all mt-4 flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(132,204,22,0.2)]"
                        >
                            CONTINUE <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-6 w-full max-w-sm mx-auto mt-6">
                        <div>
                            <h2 className="text-2xl font-poor-story tracking-wide mb-1 text-white">DID YOU FILM THIS CLIP?</h2>
                        </div>
                        
                        <div className="flex gap-4 mt-2">
                            <button onClick={() => { setSelfFilmed(true); setIsEdited(null); }} className={`flex-1 py-3.5 rounded-xl border-2 ${selfFilmed === true ? 'bg-zinc-800 border-lime-500 text-white font-medium' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'} text-xs font-poppins transition-all`}>Yes</button>
                            <button onClick={() => setSelfFilmed(false)} className={`flex-1 py-3.5 rounded-xl border-2 ${selfFilmed === false ? 'bg-zinc-800 border-lime-500 text-white font-medium' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'} text-xs font-poppins transition-all`}>No</button>
                        </div>
                        
                        <button
                            onClick={nextStep}
                            disabled={selfFilmed === null}
                            className="w-full bg-lime-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-poor-story tracking-wider text-lg py-3 rounded-xl hover:scale-[1.02] disabled:hover:scale-100 hover:bg-lime-400 disabled:hover:bg-zinc-800 active:scale-[0.98] transition-all mt-4 flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(132,204,22,0.2)]"
                        >
                            CONTINUE <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div key="step4" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-6 w-full max-w-sm mx-auto mt-6">
                        <div>
                            <h2 className="text-2xl font-poor-story tracking-wide mb-1 text-white">ANY EDITS OR CHANGES?</h2>
                            <p className="text-zinc-400 font-poppins text-sm leading-relaxed">Since you didn't film this, let us know if you modified it.</p>
                        </div>
                        
                        <div className="flex gap-4 mt-2">
                            <button onClick={() => setIsEdited(true)} className={`flex-1 py-3.5 rounded-xl border-2 ${isEdited === true ? 'bg-zinc-800 border-lime-500 text-white font-medium' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'} text-xs font-poppins transition-all`}>Yes, I edited it</button>
                            <button onClick={() => setIsEdited(false)} className={`flex-1 py-3.5 rounded-xl border-2 ${isEdited === false ? 'bg-zinc-800 border-lime-500 text-white font-medium' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'} text-xs font-poppins transition-all`}>No changes</button>
                        </div>

                        <button
                            onClick={nextStep}
                            disabled={isEdited === null}
                            className="w-full bg-lime-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-poor-story tracking-wider text-lg py-3 rounded-xl hover:scale-[1.02] disabled:hover:scale-100 hover:bg-lime-400 disabled:hover:bg-zinc-800 active:scale-[0.98] transition-all mt-4 flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(132,204,22,0.2)]"
                        >
                            CONTINUE <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}

                {step === 5 && (
                    <motion.div key="step5" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-6 w-full max-w-sm mx-auto mt-6 text-center">
                        <div className="w-20 h-20 bg-lime-500/10 border border-lime-500/30 rounded-full mx-auto flex items-center justify-center mb-0 relative overflow-hidden shadow-[0_0_20px_rgba(132,204,22,0.15)]">
                            {sourceChannel ? (
                                (() => {
                                    const srcLower = sourceChannel.toLowerCase();
                                    const imgSource = 
                                        srcLower.includes("opus") || srcLower.includes("klips") ? "/opusklips_new.png" : 
                                        srcLower.includes("clipman") || srcLower.includes("oneman") ? "/theoneman.png" : 
                                        null;
                                    
                                    if (imgSource) {
                                        return <Image src={imgSource} alt={sourceChannel} fill className="object-cover" sizes="80px" />;
                                    }
                                    return <span className="text-4xl font-anton tracking-wider text-lime-500 uppercase">{sourceChannel.charAt(0)}</span>;
                                })()
                            ) : (
                                <Info className="w-10 h-10 text-lime-500" />
                            )}
                        </div>
                        <p className="text-zinc-300 font-poppins text-[15px] leading-relaxed max-w-xs mx-auto">
                            If your clip is selected, it will be posted on our channel, and you will be notified through email.
                        </p>
                        
                        <button
                            onClick={nextStep}
                            className="w-full mt-6 bg-lime-500 text-black font-poor-story tracking-wider text-xl py-4 rounded-xl hover:scale-[1.02] hover:bg-lime-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(132,204,22,0.3)]"
                        >
                            PROCEED TO UPLOAD <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}

                {step === 6 && (
                    <motion.div key="step6" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-6 w-full pb-12 mt-4">
                        <div>
                            <h2 className="text-3xl font-poor-story tracking-wide mb-1 text-white">FINAL DETAILS</h2>
                            <p className="text-zinc-400 font-poppins text-sm leading-relaxed">Upload and paste your link below.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex gap-3 text-sm text-zinc-300 font-poppins leading-relaxed">
                                <Info className="w-5 h-5 text-lime-500 shrink-0 mt-0.5" />
                                <p>Upload your clip to a cloud platform like Google Drive or Dropbox, make the link accessible, then provide it here.</p>
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
                                    <div className="w-4 h-4 text-lime-500 flex items-center justify-center font-bold">@</div> Email Address
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
                                        I have read and agree to the <a href="/legal/content-submission-agreement" className="text-lime-500 hover:underline">Content Agreement</a> and <a href="/legal/terms-of-service" className="text-lime-500 hover:underline">Terms of Service</a>.
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
                            className="w-full mt-6 bg-lime-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-poor-story tracking-wider text-xl py-4 rounded-xl hover:scale-[1.02] disabled:hover:scale-100 hover:bg-lime-400 disabled:hover:bg-zinc-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(132,204,22,0.3)] disabled:shadow-none"
                        >
                            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "COMPLETE SUBMISSION"}
                            {!isSubmitting && <CheckCircle2 className="w-5 h-5" />}
                        </button>
                    </motion.div>
                )}

                {step === 7 && (
                    <motion.div key="step7" variants={slideVariants} initial="initial" animate="animate" className="flex flex-col items-center text-center gap-8 w-full max-w-sm mx-auto justify-center relative mt-10">
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
                                    <span className="text-zinc-500 font-medium">Instagram Handle</span>
                                    <span className="text-white font-semibold text-right ml-4 truncate max-w-[180px]">@{creditedName || "Anonymous"}</span>
                                </div>
                                <div className="w-full h-px bg-zinc-800/50" />
                                <div className="flex justify-between items-start text-sm">
                                    <span className="text-zinc-500 font-medium">Clip Link</span>
                                    <span className="text-lime-500 font-medium hover:underline cursor-pointer text-right ml-4 truncate max-w-[180px]">{clipLink}</span>
                                </div>
                                <div className="w-full h-px bg-zinc-800/50" />
                                <div className="flex justify-between items-start text-sm">
                                    <span className="text-zinc-500 font-medium">Clip Origin</span>
                                    <span className="text-white font-semibold flex flex-col items-end">
                                        <span>{selfFilmed === true ? "Original" : selfFilmed === false ? "From Others" : "Not specified"}</span>
                                        {selfFilmed === false && isEdited !== null && (
                                            <span className="text-xs text-zinc-400 mt-0.5">{isEdited ? "(Edited)" : "(Unedited)"}</span>
                                        )}
                                    </span>
                                </div>
                                {sourceChannel && (
                                    <>
                                        <div className="w-full h-px bg-zinc-800/50" />
                                        <div className="flex justify-between items-start text-sm">
                                            <span className="text-zinc-500 font-medium">From Page</span>
                                            <span className="text-lime-500 font-semibold">{sourceChannel}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                sessionStorage.removeItem("submitklips_draft_v3");
                                setClipLink("");
                                setDescription("");
                                setCreditedName("");
                                setIsAdult(null);
                                setSelfFilmed(null);
                                setIsEdited(null);
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
