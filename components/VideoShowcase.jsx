"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause, Volume2, VolumeX, Film, Sparkles, ArrowRight, Check } from "lucide-react";
import { videos } from "@/lib/data";

export default function VideoShowcase() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const activeVideo = videos[activeVideoIndex];

  // Guaranteed autoplay on mount & reel switch
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            video.muted = true;
            setIsMuted(true);
            video.play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          });
      }
    }
  }, [activeVideoIndex]);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSelectVideo = (idx) => {
    setActiveVideoIndex(idx);
    setIsPlaying(true);
  };

  return (
    <section className="py-20 sm:py-24 bg-[var(--bg-section)] relative overflow-hidden border-y border-[var(--border)]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-radial from-[var(--accent-rose)]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
            <Film className="w-3.5 h-3.5 text-[var(--accent-rose)]" />
            <span>Cinematic Artistry in 4K Motion</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light tracking-wide leading-tight">
            Beauty That Moves With You
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2.5 font-light max-w-xl mx-auto">
            Experience our bridal transformations in full uncropped 9:16 vertical motion. Witness real skin texture, seamless foundation hold, and immovable dupatta architecture.
          </p>
        </div>

        {/* Side-by-Side Flex / Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Full Uncropped 9:16 Portrait Video Screen (5 cols on desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-full max-w-[360px] aspect-[9/16] h-[540px] sm:h-[620px] rounded-3xl overflow-hidden bg-black border-2 border-[var(--border)] shadow-2xl group cursor-pointer"
              onClick={handleTogglePlay}
            >
              {/* 100% Uncropped Video Element */}
              <video
                ref={videoRef}
                key={activeVideo.src}
                src={activeVideo.src}
                poster={activeVideo.poster}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                className="w-full h-full object-contain bg-black"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Overlay Top Bar */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-auto">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[9px] uppercase tracking-[0.2em] text-[#E8C8CC] border border-white/10 font-medium">
                  {activeVideo.subtitle}
                </span>

                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#FAF8F6] hover:bg-black/90 transition-colors border border-white/10 shadow-lg"
                  aria-label={isMuted ? "Unmute Video" : "Mute Video"}
                  title={isMuted ? "Unmute Video" : "Mute Video"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-300" /> : <Volume2 className="w-4 h-4 text-emerald-300 animate-pulse" />}
                </button>
              </div>

              {/* Center Play/Pause Overlay Indicator */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-3.5 rounded-full bg-black/60 backdrop-blur-md text-[#FAF8F6] border border-white/20 shadow-2xl">
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </div>
              </div>

              {/* Bottom Scrim & Title on Video */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 pt-12 flex flex-col justify-end text-left pointer-events-none">
                <h3 className="font-editorial text-xl sm:text-2xl text-white font-light leading-tight">
                  {activeVideo.title}
                </h3>
                <p className="text-[11px] text-white/75 font-light line-clamp-2 mt-1">
                  {activeVideo.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Playlist Selection in Vertical Flex Stack (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--accent-rose)] font-semibold">
                Featured Motion Reels ({videos.length})
              </span>
              <span className="text-[11px] text-[var(--text-faint)]">
                Click any look to watch
              </span>
            </div>

            {/* Video Cards Flex Stack */}
            <div className="flex flex-col space-y-3">
              {videos.map((vid, idx) => {
                const isActive = activeVideoIndex === idx;
                return (
                  <button
                    key={vid.id}
                    onClick={() => handleSelectVideo(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between gap-4 ${
                      isActive
                        ? "bg-[var(--bg-card)] border-[var(--accent-rose)] shadow-lg shadow-[var(--shadow-accent)] translate-x-1 sm:translate-x-2"
                        : "bg-[var(--bg-card)]/70 border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card)]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      {/* Video Poster Thumbnail */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-[var(--border)] shrink-0 overflow-hidden relative">
                        <Image
                          src={vid.poster}
                          alt={vid.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className={`w-4 h-4 ${isActive ? "text-[var(--accent-blush)] fill-current" : "text-white/70"}`} />
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent-rose)] font-medium">
                          {vid.subtitle}
                        </div>
                        <h4 className="font-editorial text-base sm:text-lg text-[var(--text-primary)] font-light leading-snug">
                          {vid.title}
                        </h4>
                        <p className="text-[11px] text-[var(--text-muted)] font-light line-clamp-1">
                          {vid.description}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      <span className={`text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-full ${
                        isActive
                          ? "bg-[var(--accent-rose)] text-white shadow-sm"
                          : "text-[var(--text-muted)] border border-[var(--border)]"
                      }`}>
                        {isActive ? "Playing" : "Watch"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Action Link */}
            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/inquire"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--accent-blush)] hover:text-[var(--text-primary)] font-medium transition-colors group"
              >
                <span>Inquire For This Bridal Look</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <span className="text-[11px] text-[var(--text-faint)] font-light">
                4K Ultra-HD Video
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
