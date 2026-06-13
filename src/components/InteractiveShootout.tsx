import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, ShieldCheck, RefreshCw, Volume2, VolumeX, Sparkles, Flame, Target, Star, Shield, AlertCircle } from "lucide-react";

type ShootSpot = "TL" | "TR" | "C" | "BL" | "BR";

interface Scoreboard {
  goals: number;
  attempts: number;
  streak: number;
  bestStreak: number;
}

export default function InteractiveShootout() {
  const [scoreboard, setScoreboard] = useState<Scoreboard>({
    goals: 0,
    attempts: 0,
    streak: 0,
    bestStreak: 0,
  });

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState<ShootSpot | null>(null);
  const [goalkeeperSpot, setGoalkeeperSpot] = useState<ShootSpot | null>(null);
  const [gameResult, setGameResult] = useState<"goal" | "saved" | "miss" | null>(null);
  const [ballRotating, setBallRotating] = useState(false);

  // Web Audio Synth for retro sports sound effects
  const playSoundEffect = (type: "swoosh" | "goal" | "save" | "click") => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      if (type === "click") {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } else if (type === "swoosh") {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, audioCtx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === "save") {
        // Flat dull thump
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else if (type === "goal") {
        // High pitched cheer synth
        const duration = 1.0;
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc1.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc1.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.1);
        osc1.frequency.linearRampToValueAtTime(660, audioCtx.currentTime + 0.3);
        
        osc2.frequency.setValueAtTime(554.37, audioCtx.currentTime); // C#
        osc2.frequency.linearRampToValueAtTime(1108.73, audioCtx.currentTime + 0.15);
        osc2.frequency.linearRampToValueAtTime(830.61, audioCtx.currentTime + 0.45);
        
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        
        osc1.start();
        osc2.start();
        osc1.stop(audioCtx.currentTime + duration);
        osc2.stop(audioCtx.currentTime + duration);
      }
    } catch (e) {
      console.warn("Audio Context not supported or allowed", e);
    }
  };

  const handleShoot = (spot: ShootSpot) => {
    if (selectedSpot !== null) return; // Wait for current kick to reset

    setSelectedSpot(spot);
    setBallRotating(true);
    playSoundEffect("swoosh");

    // Randomize goalkeeper choice
    const spots: ShootSpot[] = ["TL", "TR", "C", "BL", "BR"];
    const goalieChoice = spots[Math.floor(Math.random() * spots.length)];
    setGoalkeeperSpot(goalieChoice);

    setTimeout(() => {
      let outcome: "goal" | "saved" | "miss";
      
      // 10% chance to miss entirely on difficult top corner kicks
      if ((spot === "TL" || spot === "TR") && Math.random() < 0.12) {
        outcome = "miss";
      } else if (goalieChoice === spot) {
        outcome = "saved";
      } else {
        outcome = "goal";
      }

      setGameResult(outcome);
      setBallRotating(false);

      if (outcome === "goal") {
        playSoundEffect("goal");
        setScoreboard((prev) => {
          const newStreak = prev.streak + 1;
          return {
            goals: prev.goals + 1,
            attempts: prev.attempts + 1,
            streak: newStreak,
            bestStreak: Math.max(prev.bestStreak, newStreak),
          };
        });
      } else {
        playSoundEffect("save");
        setScoreboard((prev) => ({
          ...prev,
          attempts: prev.attempts + 1,
          streak: 0,
        }));
      }
    }, 1000);
  };

  const resetGame = () => {
    playSoundEffect("click");
    setSelectedSpot(null);
    setGoalkeeperSpot(null);
    setGameResult(null);
  };

  const clearScoreboard = () => {
    playSoundEffect("click");
    setScoreboard({
      goals: 0,
      attempts: 0,
      streak: 0,
      bestStreak: 0,
    });
    resetGame();
  };

  const spotsMeta: { id: ShootSpot; label: string; x: string; y: string }[] = [
    { id: "TL", label: "Top Left", x: "12%", y: "15%" },
    { id: "TR", label: "Top Right", x: "88%", y: "15%" },
    { id: "C", label: "Center", x: "50%", y: "40%" },
    { id: "BL", label: "Bottom Left", x: "12%", y: "75%" },
    { id: "BR", label: "Bottom Right", x: "88%", y: "75%" },
  ];

  return (
    <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden">
      
      {/* Decorative Sporty Corner Brackets */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FEDD00] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#009739] pointer-events-none" />
      
      {/* Top Controls & Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 z-10 relative">
        <div>
          <h3 className="font-display text-xl text-[#FEDD00] font-bold flex items-center gap-2">
            <Trophy className="text-[#FEDD00] w-5 h-5 animate-pulse" />
            Shootout Challenge
          </h3>
          <p className="text-xs text-gray-300">
            Anonto Rishi invites you! Choose a target to kick the penalty.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-yellow-400"
            title={soundEnabled ? "Disable Sound" : "Enable Sound"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            onClick={clearScoreboard}
            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-all flex items-center gap-1"
          >
            Reset Scores
          </button>
        </div>
      </div>

      {/* Grid Game Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Score Board Panel */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#009739] flex items-center gap-1.5">
              <ShieldCheck size={14} /> Scoreboard
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/[0.04] p-3 rounded-lg border border-white/10 text-center">
                <div className="text-2xl font-mono font-bold text-[#FEDD00]">
                  {scoreboard.goals}
                </div>
                <div className="text-[10px] text-gray-400 uppercase">Goals Scored</div>
              </div>
              <div className="bg-white/[0.04] p-3 rounded-lg border border-white/10 text-center">
                <div className="text-2xl font-mono font-bold text-white">
                  {scoreboard.attempts}
                </div>
                <div className="text-[10px] text-gray-400 uppercase">Total Shots</div>
              </div>
            </div>

            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-xs text-gray-300 bg-white/[0.02] p-2 rounded-md border border-white/5 items-center">
                <span>Active Streak:</span>
                <span className="font-mono text-yellow-300 font-bold flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-sm border border-amber-500/20">
                  <Flame size={12} className="text-amber-500 animate-pulse" /> {scoreboard.streak} Goal{scoreboard.streak !== 1 && "s"}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-300 bg-white/[0.02] p-2 rounded-md border border-white/5 items-center">
                <span>Best Streak Record:</span>
                <span className="font-mono text-[#FEDD00] font-bold text-[#009739] flex items-center gap-1 bg-yellow-400/10 px-2 py-0.5 rounded-sm border border-yellow-400/20">
                  <Trophy size={11} className="text-[#FEDD00]" /> {scoreboard.bestStreak}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-[11px] text-[#009739] leading-relaxed italic bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
              &ldquo;Brazil supporters live for the penalty shootout chills. Try to keep a streak going up to 5 stars!&rdquo; - Supporter Hub
            </div>
          </div>
        </div>

        {/* The Pitch & Goal Goalpost System */}
        <div className="md:col-span-2 bg-white/[0.02] rounded-xl border border-white/10 p-4 relative flex flex-col items-center justify-center min-h-[300px]">
          
          {/* Goalpost Container */}
          <div className="w-full max-w-[400px] h-[180px] border-4 border-b-0 border-white relative rounded-t-xl bg-gradient-to-t from-[#009739]/10 to-transparent">
            
            {/* Goal net mesh overlay */}
            <div 
              className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                backgroundSize: '12px 12px'
              }}
            />

            {/* Simulated Goalkeeper Head/Gloves */}
            <motion.div
              className="absolute w-12 h-12 flex items-center justify-center pointer-events-none"
              animate={
                goalkeeperSpot === "TL" ? { x: "12%", y: "15%", scale: 1.1 } :
                goalkeeperSpot === "TR" ? { x: "88%", y: "15%", scale: 1.1 } :
                goalkeeperSpot === "C" ? { x: "50%", y: "40%", scale: 1.1 } :
                goalkeeperSpot === "BL" ? { x: "12%", y: "70%", scale: 1.1 } :
                goalkeeperSpot === "BR" ? { x: "88%", y: "70%", scale: 1.1 } :
                { x: "50%", y: "50%", scale: 1 }
              }
              style={{
                left: "-24px",
                top: "-24px",
              }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
            >
              <div className="bg-yellow-400 text-yellow-950 p-1.5 rounded-full shadow-lg border-2 border-white flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold font-mono">GK</span>
                <Star className="w-2.5 h-2.5 fill-yellow-950 text-yellow-950" />
              </div>
            </motion.div>

            {/* Clickable Shooting Spot Buttons (Absolute Overlay) */}
            {spotsMeta.map((spot) => (
              <button
                key={spot.id}
                onClick={() => handleShoot(spot.id)}
                disabled={selectedSpot !== null}
                className="absolute w-12 h-12 rounded-full border border-dashed border-yellow-300/60 hover:border-yellow-300 hover:bg-yellow-300/20 active:scale-95 transition-all text-xs font-mono font-bold text-white flex items-center justify-center"
                style={{
                  left: spot.x,
                  top: spot.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {selectedSpot === spot.id ? "" : <Target size={16} className="text-[#FEDD00] animate-pulse" />}
              </button>
            ))}

            {/* Result Banners */}
            <AnimatePresence>
              {gameResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm z-30 bg-black/40"
                >
                  {gameResult === "goal" && (
                    <div className="text-center animate-bounce">
                      <div className="font-display text-4xl text-yellow-400 font-extrabold flex items-center justify-center gap-1 drop-shadow-lg">
                        <Sparkles className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                        GOAL!!!
                      </div>
                      <p className="text-xs text-green-300 uppercase tracking-widest font-bold mt-1">
                        Anonto Rishi Celebrates!
                      </p>
                    </div>
                  )}
                  {gameResult === "saved" && (
                    <div className="text-center flex flex-col items-center justify-center">
                      <Shield className="w-8 h-8 text-red-400 animate-bounce mb-1" />
                      <div className="font-display text-3xl text-red-400 font-extrabold uppercase drop-shadow">
                        SAVED!
                      </div>
                      <p className="text-xs text-gray-300 mt-1">Excellent defensive reflex.</p>
                    </div>
                  )}
                  {gameResult === "miss" && (
                    <div className="text-center flex flex-col items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-amber-500 animate-pulse mb-1" />
                      <div className="font-display text-2xl text-amber-500 font-extrabold uppercase drop-shadow">
                        OVER THE BAR!
                      </div>
                      <p className="text-xs text-gray-300 mt-1">Power was a bit too high.</p>
                    </div>
                  )}

                  <button
                    onClick={resetGame}
                    className="mt-4 px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-all transform hover:scale-105 flex items-center gap-1 shadow-md border border-emerald-400/20"
                  >
                    <RefreshCw size={12} /> Shoot Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* The Football Ball (Animated on Kick) */}
          <div className="w-full flex justify-center mt-8">
            <motion.div
              className={`w-14 h-14 bg-white rounded-full border-2 border-emerald-950 shadow-2xl relative flex items-center justify-center ${ballRotating ? "animate-spin" : ""}`}
              animate={
                selectedSpot === "TL" ? { x: "-120px", y: "-190px", scale: 0.4 } :
                selectedSpot === "TR" ? { x: "120px", y: "-190px", scale: 0.4 } :
                selectedSpot === "C" ? { x: "0px", y: "-150px", scale: 0.4 } :
                selectedSpot === "BL" ? { x: "-120px", y: "-110px", scale: 0.4 } :
                selectedSpot === "BR" ? { x: "120px", y: "-110px", scale: 0.4 } :
                { x: "0px", y: "0px", scale: 1 }
              }
              transition={{ type: "tween", duration: 0.9, ease: "easeOut" }}
            >
              {/* Soccer Ball Pattern */}
              <div className="absolute inset-0 rounded-full border border-gray-300 overflow-hidden opacity-80"
                style={{
                  backgroundImage: `radial-gradient(circle, transparent 40%, rgba(0,0,0,0.1) 100%)`
                }}
              >
                {/* Visual pentagon overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-950 transform rotate-12 clip-path-polygon" />
                <div className="absolute top-1 left-2 w-3 h-3 bg-emerald-900 rounded-full" />
                <div className="absolute bottom-1 right-2 w-3 h-1 bg-emerald-900 rounded-full" /> 
                <div className="absolute top-2 right-1 w-2 h-2 bg-emerald-950 rounded" />
              </div>
              <span className="text-[9px] select-none pointer-events-none z-10 text-emerald-950 font-black uppercase tracking-widest">BRA</span>
            </motion.div>
          </div>

          {/* Instructions and kick hints */}
          <div className="mt-3 text-center text-xs text-emerald-200">
            {selectedSpot === null ? (
              <span className="animate-pulse flex items-center gap-1.5 justify-center">
                <Sparkles size={12} className="text-yellow-400" /> Click any of the target spots in the goal post to release a kick!
              </span>
            ) : (
              <span>Kick powered up ... calculating trajectories ...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
