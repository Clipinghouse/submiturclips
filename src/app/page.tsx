"use client";

import { useState } from "react";
import { Menu, X, Play, Heart, MessageCircle, Send, MoreHorizontal, MoreVertical, Music, ThumbsUp, ThumbsDown, Share2, Bookmark, Plus, CloudUpload, Info, UploadCloud } from "lucide-react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import SubmissionForm from "@/components/SubmissionForm";
import Image from "next/image";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden max-w-[100vw]">

      {/* 1st Viewport (Hero) */}
      <main className="flex flex-col min-h-[75vh] px-4 pt-6 pb-6 relative overflow-visible z-0 w-full max-w-lg mx-auto">
        {/* Deep Space Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black -z-10" />

        {/* Ambient Light Orbs for depth */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-lime-500/15 blur-[120px] pointer-events-none rounded-full -z-10" />
        <div className="absolute top-[40%] -right-20 w-80 h-80 bg-white/5 blur-[100px] pointer-events-none rounded-full -z-10" />

        {/* Header */}
        <header className="flex justify-between items-center pb-3 border-b border-zinc-700/50 z-50 w-full relative">
          <h1 className="text-lg font-poppins font-normal tracking-tight text-white leading-none z-50 relative">
            Submitclips
          </h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-[5px] border border-zinc-400 rounded-md hover:bg-zinc-800 transition-colors flex items-center justify-center z-50 relative"
          >
            {menuOpen ? <X className="w-[18px] h-[18px] text-white" /> : <Menu className="w-[18px] h-[18px] text-white" />}
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[48px] right-0 w-[240px] bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-5 shadow-2xl z-40"
              >
                <div className="flex flex-col gap-3">
                  <span className="text-lime-500/80 font-poppins font-semibold text-[10px] uppercase tracking-widest pl-1">Menu</span>
                  <div className="flex flex-col gap-1">
                    <a href="#" onClick={() => setMenuOpen(false)} className="font-poppins text-sm text-white hover:bg-zinc-900 rounded-lg px-3 py-2 transition-colors">Home</a>
                    <a href="#submission-section" onClick={() => setMenuOpen(false)} className="font-poppins text-sm text-white hover:bg-zinc-900 rounded-lg px-3 py-2 transition-colors">Submit Clips</a>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-zinc-800/60"></div>

                <div className="flex flex-col gap-3">
                  <span className="text-lime-500/80 font-poppins font-semibold text-[10px] uppercase tracking-widest pl-1">Legal</span>
                  <div className="flex flex-col gap-1">
                    <a href="/legal/privacy-policy" onClick={() => setMenuOpen(false)} className="font-poppins text-sm text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg px-3 py-2 transition-colors">Privacy Policy</a>
                    <a href="/legal/terms-of-service" onClick={() => setMenuOpen(false)} className="font-poppins text-sm text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg px-3 py-2 transition-colors">Terms of Service</a>
                    <a href="/legal/cookie-policy" onClick={() => setMenuOpen(false)} className="font-poppins text-sm text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg px-3 py-2 transition-colors">Cookie Policy</a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Center 3D Carousel Section */}
        <div className="relative w-full max-w-[320px] mx-auto flex justify-center items-center h-60 mt-12 z-10">

          {/* Left Side: Dropbox Icon */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M6 3.5L12 7l-6 3.5L0 7l6-3.5zm12 0L24 7l-6 3.5-6-3.5 6-3.5zM0 14l6 3.5 6-3.5L6 10.5 0 14zm12 0l6 3.5 6-3.5-6-3.5-6 3.5zM6 18.5L12 22l6-3.5-6-3.5-6 3.5z" />
            </svg>
            <span className="font-poor-story text-xs text-white">Dropbox</span>
          </div>

          {/* Right Side: Drive Icon */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-30">
            <Icon icon="mdi:google-drive" className="text-white text-xl" />
            <span className="font-poor-story text-xs text-white">Drive</span>
          </div>

          {/* Left Card - Instagram */}
          <div className="absolute w-32 h-44 bg-zinc-900 border-[1.5px] border-white rounded-xl transform -rotate-12 -translate-x-12 shadow-xl flex flex-col overflow-hidden">
            <div className="absolute -top-5 w-full text-center">
              <span className="text-[10px] font-poppins text-zinc-400">@Instagram</span>
            </div>

            {/* Mock Instagram Header */}
            <div className="w-full flex items-center justify-between p-1.5 pt-2 relative z-10">
              <div className="flex items-center gap-1">
                <div className="w-3.5 h-3.5 rounded-full bg-white/20 border-[0.5px] border-lime-500"></div>
                <div className="h-1 w-10 bg-white rounded-full"></div>
              </div>
              <MoreHorizontal className="w-3 h-3 text-white" />
            </div>

            <div className="flex-1"></div>

            {/* Bottom Left Info */}
            <div className="absolute bottom-2 left-2 flex flex-col gap-1.5 w-[70%] z-10">
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-16 bg-white font-bold rounded-full"></div>
                <div className="h-1.5 w-6 bg-transparent border border-white rounded-full"></div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="h-1 w-full bg-white/70 rounded-full"></div>
                <div className="h-1 w-10 bg-white/50 rounded-full"></div>
              </div>
            </div>

            {/* Right Action Stack */}
            <div className="absolute bottom-3 right-1.5 flex flex-col gap-2 items-center z-10">
              <Heart className="w-4 h-4 text-white" />
              <MessageCircle className="w-4 h-4 text-white" />
              <Send className="w-4 h-4 text-white" />
              <MoreVertical className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Right Card - Tiktok */}
          <div className="absolute w-32 h-44 bg-zinc-950 border border-zinc-600 rounded-xl transform rotate-12 translate-x-12 shadow-xl flex flex-col overflow-hidden">
            <div className="absolute -top-5 w-full text-center">
              <span className="text-[10px] font-poppins text-zinc-400">@Tiktok</span>
            </div>

            <div className="flex-1"></div>

            {/* Bottom Left Info */}
            <div className="absolute bottom-2 left-2 flex flex-col gap-1.5 z-10 w-[70%]">
              <div className="h-1.5 w-14 bg-white rounded-full"></div>
              <div className="flex flex-col gap-0.5">
                <div className="h-1 w-full bg-white/70 rounded-full"></div>
                <div className="h-1 w-16 bg-white/70 rounded-full"></div>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <Music className="w-2.5 h-2.5 text-white animate-pulse" />
                <div className="h-1 w-12 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Right Action Stack */}
            <div className="absolute bottom-3 right-1 flex flex-col gap-2.5 items-center z-10">
              <div className="relative mb-0.5">
                <div className="w-5 h-5 rounded-full bg-white/20 border-[1.5px] border-white"></div>
                <div className="absolute -bottom-1 -left-0.5 bg-lime-500 rounded-full w-2.5 h-2.5 flex items-center justify-center translate-x-[7px] border border-black"><Plus className="w-1.5 h-1.5 text-black stroke-[4px]" /></div>
              </div>
              <Heart className="w-4 h-4 text-white fill-current" />
              <MessageCircle className="w-4 h-4 text-white fill-current" />
              <Bookmark className="w-3.5 h-3.5 text-white fill-current" />
              <Share2 className="w-4 h-4 text-white fill-current" />

              <div className="w-5 h-5 mt-1 rounded-full bg-zinc-800 border-[4px] border-black flex items-center justify-center animate-spin">
                <div className="w-1.5 h-1.5 bg-lime-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Center Card - Youtube Shorts */}
          <div className="absolute w-40 h-52 bg-lime-500 rounded-xl shadow-[0_20px_50px_rgba(132,204,22,0.3)] flex flex-col z-20 overflow-hidden border border-lime-400">
            <div className="absolute -top-6 w-full text-center">
              <span className="text-xs font-poppins font-medium text-white shadow-black drop-shadow-md">@Youtube Shorts</span>
            </div>

            {/* Top subtle UI */}
            <div className="absolute top-2 left-0 w-full flex justify-between px-3 items-center z-10">
              <div className="flex gap-1">
                <div className="h-1 w-6 bg-black/40 rounded-full"></div>
                <div className="h-1 w-6 bg-black/10 rounded-full"></div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-black/60" />
            </div>

            <div className="flex-1 flex items-center justify-center relative">
              {/* Play button */}
              <div className="w-14 h-14 shrink-0 aspect-square rounded-full bg-white flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-transform z-20">
                <Play className="w-6 h-6 text-black fill-black ml-0.5" />
              </div>
            </div>

            {/* Bottom Left Info */}
            <div className="absolute bottom-3 left-2.5 flex flex-col gap-2 z-10 w-[70%]">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 shrink-0 aspect-square rounded-full bg-white/20 border border-black/30"></div>
                <div className="h-2 w-14 bg-black rounded-full"></div>
                <div className="h-3 w-10 bg-white rounded-sm text-black flex items-center justify-center font-bold text-[5px] uppercase tracking-wider">Sub</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="h-1.5 w-full bg-black/80 rounded-full"></div>
                <div className="h-1.5 w-20 bg-black/80 rounded-full"></div>
              </div>
            </div>

            {/* Right Action Stack */}
            <div className="absolute bottom-4 right-2 flex flex-col gap-3.5 items-center z-10">
              <div className="flex flex-col items-center gap-0.5">
                <ThumbsUp className="w-4 h-4 text-black fill-current" />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <ThumbsDown className="w-4 h-4 text-black fill-current" />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <MessageCircle className="w-4 h-4 text-black fill-current" />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <Share2 className="w-4 h-4 text-black fill-current" />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-4 flex flex-col items-center z-10 w-full text-center">
          <div className="flex flex-col items-center font-poor-story leading-none text-2xl mb-2">
            <span className="text-white tracking-wide whitespace-nowrap z-10">SUBMIT YOUR CLIPS</span>
            <span className="text-3xl -mt-1 flex items-center justify-center z-0">
              <span className="text-lime-500 mr-2">TO GET</span>
              <span className="text-white tracking-wide">FEATURED<span className="text-lime-500 text-2xl align-top font-sans ml-[1px]">*</span></span>
            </span>
          </div>

          <a href="#submission-section" className="mt-4 px-6 py-2.5 rounded-full border border-lime-500/30 bg-gradient-to-b from-lime-500/10 to-transparent hover:bg-lime-500/20 text-white font-poppins font-medium text-xs tracking-wide flex items-center justify-center gap-1.5 transition-all w-max mx-auto shadow-[0_0_15px_rgba(132,204,22,0.15)] cursor-pointer backdrop-blur-sm z-50">
            Scroll Down <span className="text-[10px] animate-bounce">↓</span>
          </a>
        </div>
      </main>

      {/* 2nd Viewport (Submission Engine) */}
      <section id="submission-section" className="min-h-screen w-full bg-black flex flex-col items-center px-6 pt-4 pb-6 relative z-10 overflow-hidden">
        {/* Deep Gradient Transition */}
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-zinc-900/40 via-zinc-900/10 to-transparent -z-10 pointer-events-none"></div>
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lime-500/20 to-transparent"></div>
        <div className="absolute top-0 w-[500px] h-96 bg-lime-500/5 blur-[100px] pointer-events-none rounded-full -z-10"></div>

        <div className="max-w-md w-full flex flex-col items-center z-10 mt-6">
          <div className="flex items-center justify-center -space-x-4 mb-5">
            {[
              { src: '/opusklips_new.png', platform: 'ig', url: 'https://instagram.com/opus.klips' },
              { src: '/theoneman.png', platform: 'ig', url: 'https://instagram.com/theclipman1054' }
            ].map((channel, i) => (
              <a key={i} href={channel.url} target="_blank" rel="noopener noreferrer" className="rounded-full border-[3px] border-black relative z-10 bg-black shadow-lg block hover:scale-105 hover:z-50 transition-all cursor-pointer" style={{ zIndex: 10 - i }}>
                <div className={`p-[2px] rounded-full ${channel.platform === 'ig' ? 'bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600' :
                  channel.platform === 'yt' ? 'bg-red-600' :
                    channel.platform === 'tiktok' ? 'bg-gradient-to-tr from-cyan-400 to-pink-500' : 'bg-zinc-700'
                  }`}>
                  <div className="w-11 h-11 rounded-full border-[2px] border-black bg-zinc-900 overflow-hidden relative">
                    <Image src={channel.src} alt={`Channel ${i}`} fill className="object-cover" sizes="44px" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <h2 className="text-3xl font-poor-story tracking-wide mb-2 mt-2">DROP YOUR LINKS</h2>
          <p className="text-zinc-400 text-sm font-poppins text-center mb-8 leading-relaxed">
            Submit your raw clips and let<br />our editors do the rest.
          </p>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-6"></div>

          <SubmissionForm />
        </div>

        {/* Footer */}
        <div className="w-full max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-8"></div>
        <footer className="w-full flex flex-col gap-6 pb-8 z-10 font-poppins max-w-md mx-auto relative px-4">
          <div className="flex flex-col gap-1 text-[13px] text-zinc-300">
            <span className="text-lime-500 font-semibold mb-1">Legal</span>
            <a href="/legal/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/legal/terms-of-service" className="hover:text-white transition-colors">Terms and Conditons</a>
            <a href="/legal/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>

          <div className="text-[12vw] sm:text-[48px] leading-none font-poor-story text-[#e2f0d9] tracking-wider font-bold mb-1">
            SUBMITYOUR CLIPS
          </div>

          <div className="w-full h-[1px] bg-zinc-700 mb-1"></div>

          <div className="flex justify-between items-center text-[10px] sm:text-xs text-zinc-400 w-full mb-4 font-poppins tracking-wide">
            <span>Submit Your Clips © 2026</span>
            <span>All Right Reserved</span>
          </div>
        </footer>
      </section>
    </div>
  );
}
