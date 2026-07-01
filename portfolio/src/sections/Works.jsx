import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import SectionHeading from "../components/SectionHeading";

const workCategories = [
  {
    id: "formal-edits",
    label: "01",
    title: "Formal Edits",
    kicker: "Clean delivery",
    description: (
      <>
        Polished <strong className="font-bold text-gold">corporate films</strong>, video testimonials, and high-impact <strong className="font-bold text-gold">brand storytelling</strong> edits.
      </>
    ),
    accent: "#9f8dff",
    cards: [
      {
        id: "formal-01",
        title: "Personal Edit",
        video:
          "https://res.cloudinary.com/dmjosipae/video/upload/q_auto/f_auto/v1781874739/black_kiya_reel_tnbruo.mp4",
      },
      {
        id: "formal-03",
        title: "Kinetic Cut",
        video:
          "https://res.cloudinary.com/dmjosipae/video/upload/q_auto/f_auto/v1781874600/anime_edit_srpe4p.mp4",
      },
      {
        id: "formal-02",
        title: "Portrait Edit",
        video:
          "https://res.cloudinary.com/dmjosipae/video/upload/q_auto/f_auto/v1781874565/personal_video_uvfct4.mp4",
      },
      {
        id: "formal-04",
        title: "Narrative Pacing",
        video:
          "https://res.cloudinary.com/dmjosipae/video/upload/q_auto/f_auto/v1781874539/storrytelling_edit_cr3tsd.mp4",
      },
      {
        id: "formal-05",
        title: "Trending Video",
        video:
          "https://res.cloudinary.com/dmjosipae/video/upload/v1782136358/preview_video_r3nbup.mp4",
      },
    ],
  },
  {
    id: "saas-animation",
    label: "02",
    title: "SaaS Animation",
    kicker: "Product motion",
    description: (
      <>
        Interface-led <strong className="font-bold text-gold">SaaS motion</strong> for high-converting <strong className="font-bold text-gold">product launches</strong>, dashboards, and explainers.
      </>
    ),
    accent: "#6fcf97",
    cards: [
      {
        id: "saas-03",
        title: "Spotify Motion",
        video:
          "https://res.cloudinary.com/dmjosipae/video/upload/q_auto/f_auto/v1781874616/spotify_animation_molxra.mp4",
      },
      {
        id: "saas-05",
        title: "Platform Explainer",
        video:
          "https://res.cloudinary.com/dmjosipae/video/upload/q_auto/f_auto/v1781874679/SAAS_ANIMATION_4_mqvmxm.mp4",
      },
      {
        id: "saas-04",
        title: "Line Art Concept",
        video:
          "https://res.cloudinary.com/dmjosipae/video/upload/q_auto/f_auto/v1781874546/line_animation_oigjih.mp4",
      },
      {
        id: "saas-01",
        title: "Dashboard Interaction",
        video:
          "https://res.cloudinary.com/dmjosipae/video/upload/q_auto/f_auto/v1781874680/1_vag0lm.mp4",
      },
      {
        id: "saas-02",
        title: "Product Walkthrough",
        video:
          "https://res.cloudinary.com/dmjosipae/video/upload/q_auto/f_auto/v1781874679/2_najimu.mp4",
      },
    ],
  },
  {
    id: "real-estate-animation",
    label: "03",
    title: "Real Estate Animation",
    kicker: "Property visuals",
    description: (
      <>
        Premium <strong className="font-bold text-gold">property reels</strong>, walkthroughs, and cinematic edits designed for <strong className="font-bold text-gold">luxury real estate brands</strong>.
      </>
    ),
    accent: "#cfa355",
    cards: [
      {
        id: "real-01",
        title: "Area Tracking",
        video:
          "https://res.cloudinary.com/dmjosipae/video/upload/q_auto/f_auto/v1781874800/tracking_animation_1_r7fjdj.mp4",
      },
      {
        id: "real-02",
        title: "real Estate Callout",
        video:
          "https://res.cloudinary.com/dmjosipae/video/upload/q_auto/f_auto/v1781874824/tracking_animation_2_awl4uh.mp4",
      },
      {
        id: "real-03",
        title: "Area Map Reveal",
        video:
          "https://res.cloudinary.com/dmjosipae/video/upload/q_auto/f_auto/v1781874687/tracking_animation_3_h4cvvy.mp4",
      },
      {
        id: "real-04",
        title: "Location Map Tracking",
        video:
          "https://res.cloudinary.com/dmjosipae/video/upload/q_auto/f_auto/v1781874727/tracking_animation_4_i5s8bl.mp4",
      },
    ],
  },
];

let activeVideoElement = null;

const VideoCard = memo(({ card, accent, isPortrait }) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [shouldPreload, setShouldPreload] = useState(false);

  const handleTogglePlay = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (isPlaying) {
      video.pause();
      return;
    }

    if (!shouldPreload) {
      setShouldPreload(true);
      video.preload = "metadata";
      video.load();
    }

    if (activeVideoElement && activeVideoElement !== video) {
      activeVideoElement.pause();
    }

    video.play()
      .then(() => {
        activeVideoElement = video;
        setIsPlaying(true);
      })
      .catch(() => {});
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const cardNode = cardRef.current;
    const video = videoRef.current;

    if (!cardNode || !video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => {
      if (activeVideoElement === video) {
        activeVideoElement = null;
      }
      setIsPlaying(false);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Pause only after the card is almost fully off-screen to avoid
        // accidental pauses from small scroll movements on mobile.
        if (!entry?.isIntersecting || entry.intersectionRatio <= 0.02) {
          video.pause();
        }
      },
      { threshold: [0, 0.02, 0.1] }
    );

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldPreload(true);
          preloadObserver.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );

    observer.observe(cardNode);
    preloadObserver.observe(cardNode);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      observer.disconnect();
      preloadObserver.disconnect();

      if (activeVideoElement === video) {
        activeVideoElement = null;
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={`work-video-card group relative ${isPortrait ? "aspect-[9/15] sm:aspect-[9/16]" : "aspect-video"} overflow-hidden rounded-[1.5rem] border border-white/8 bg-black shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 cursor-pointer`}
      onClick={handleTogglePlay}
    >
      <video
        ref={videoRef}
        src={card.video}
        loop
        playsInline
        muted={isMuted}
        preload={shouldPreload ? "metadata" : "none"}
        className="h-full w-full object-contain bg-black transition-transform duration-700 ease-out group-hover:scale-101"
      />
      
      {/* Sleek Overlay */}
      <div className={`absolute inset-0 bg-black/25 transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`} />

      {/* Floating Badges */}
      <div className="absolute left-2 top-2 z-20 pointer-events-none transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 sm:left-4 sm:top-4">
        <span className="rounded-full border border-white/10 bg-black/70 px-2 py-1 font-mono text-[7px] uppercase tracking-widest text-white shadow-[0_8px_24px_rgba(0,0,0,0.24)] sm:px-3.5 sm:py-1.5 sm:text-[9px]">
          {card.title}
        </span>
      </div>

      {/* Floating Mute/Unmute Action */}
      <div className="work-video-control absolute bottom-2 right-2 z-40 sm:bottom-3 sm:right-3">
        <button
          type="button"
          onClick={handleToggleMute}
          className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-black/75 text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-colors duration-300 hover:bg-white/20 sm:size-9"
        >
          <Icon icon={isMuted ? "lucide:volume-x" : "lucide:volume-2"} className="size-3 sm:size-4" />
        </button>
      </div>

      {/* Modern Center Play / Pause Button */}
      <div
        className="work-video-control pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
      >
        <div
          className={`flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 sm:size-14 ${
            isPlaying ? "opacity-0 scale-90 group-hover:opacity-100" : "opacity-100 scale-100"
          }`}
          style={{
            boxShadow: `0 12px 32px rgba(0,0,0,0.3), 0 0 25px ${accent}22`,
          }}
        >
          {isPlaying ? (
            <Icon icon="lucide:pause" className="size-4 sm:size-5 transition-transform duration-300 group-hover:scale-110" />
          ) : (
            <Icon icon="lucide:play" className="size-4 sm:size-5 transition-transform duration-300 group-hover:scale-110" />
          )}
        </div>
      </div>

      {/* Information Banner (Slick slide-up on hover) */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <div className="space-y-0.5">
          <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-widest text-white/50">Selected Work</span>
          <h4 className="font-amiamie text-xs sm:text-base uppercase tracking-wider leading-none">{card.title}</h4>
        </div>
      </div>
    </motion.div>
  );
});

const VideoGrid = memo(({ category }) => {
  const isPortrait = category.id === "formal-edits";
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className={
        isPortrait
          ? "work-video-grid grid grid-cols-2 gap-2 sm:gap-6 w-full"
          : "work-video-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-12 w-full"
      }
    >
      {category.cards.map((card) => (
        <VideoCard key={card.id} card={card} accent={category.accent} isPortrait={isPortrait} />
      ))}
    </motion.div>
  );
});

const WorkCategory = memo(({ category }) => (
  <section className="relative border-t border-white/8 py-16 sm:py-20 lg:py-28">
    <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
      
      <div className="grid gap-12 grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] lg:items-start">
        
        {/* Left Column (Sticky on desktop) */}
        <div className="space-y-6 lg:sticky lg:top-32 lg:pr-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3rem] text-white/40">
                {category.label}
              </span>
              <span
                className="h-px w-10"
                style={{ backgroundColor: category.accent }}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.3rem] text-white/40">
                {category.kicker}
              </span>
            </div>
            <h3 className="font-amiamie text-[8vw] sm:text-[40px] lg:text-[54px] uppercase leading-[0.95] tracking-tight text-white">
              {category.title}
            </h3>
          </div>

          <p className="text-base sm:text-lg leading-relaxed text-white/70 font-light">
            {category.description}
          </p>

        </div>

        {/* Right Column (Video grid/stack) */}
        <div className="w-full">
          <VideoGrid category={category} />
        </div>
      </div>
      
    </div>
  </section>
));

const Works = () => {
  const sectionRef = useRef(null);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="works-section section-shell relative bg-[#0e0e0d] text-white"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-24 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Selected work"
          title="Video categories built for different outcomes"
          description=""
          theme="dark"
        />
      </div>

      {workCategories.map((category) => (
        <WorkCategory key={category.id} category={category} />
      ))}
    </section>
  );
};

export default Works;
