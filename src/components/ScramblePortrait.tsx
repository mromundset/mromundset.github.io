import React, { useState, useEffect, useRef } from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

const ScramblePortrait: React.FC<{ targetAscii: string; active: boolean }> = ({ targetAscii, active }) => {
  const [displayAscii, setDisplayAscii] = useState(targetAscii);
  const frameRef = useRef<number>(0);
  const progressRef = useRef(active ? 1 : 0);
  const indicesRef = useRef<number[]>([]);
  const glitchesRef = useRef<{ index: number; char: string; life: number }[]>([]);

  // 1. Initialize & Shuffle Indices when target changes
  useEffect(() => {
    // A. Generate indices for the NEW length
    const indices = Array.from({ length: targetAscii.length }, (_, i) => i);
    
    // Fisher-Yates Shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    indicesRef.current = indices;
    
    // B. Force a "Hard Reset" to noise
    // Even if we are active, we want to start from 0 (Noise) and animate up to 1 (Face)
    // This creates the "Switching Channel" effect.
    progressRef.current = 0; 

    // C. Immediate Visual Update (Prevent Flash)
    // Fill the screen with noise of the NEW size immediately
    const initialNoise = targetAscii.split('').map(char => {
      if (char === '\n') return '\n';
      if (char === ' ') return ' ';
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');
    
    setDisplayAscii(initialNoise);
    
    // Clear glitches from previous image
    glitchesRef.current = [];

  }, [targetAscii]);

  // 2. Animation Loop
  useEffect(() => {
    const animate = () => {
      // Determine target progress based on active state
      // active = true -> Target is 1.0 (Fully Solved Face)
      // active = false -> Target is 0.0 (Fully Random Noise)
      const target = active ? 1 : 0;
      
      // Linear Interpolation (Lerp) for smoothness
      const dist = target - progressRef.current;
      
      // Snap to target if very close
      if (Math.abs(dist) < 0.001) {
        progressRef.current = target;
      } else {
        // Lower number = Slower animation (0.03 is smooth/heavy)
        progressRef.current += dist * 0.03; 
      }

      // 3. Construct the String
      const currentProgress = progressRef.current;
      const totalChars = targetAscii.length;
      const solvedCount = Math.floor(totalChars * currentProgress);
      const shuffled = indicesRef.current;

      // Create the frame array filled with NOISE first.
      // Then write the SOLVED characters into it.
      
      const frameArr = new Array(totalChars).fill('');
      
      // Step A: Fill with Noise or Target based on decision
      for (let i = 0; i < totalChars; i++) {
        // Default to Noise
        const originalChar = targetAscii[i];
        if (originalChar === '\n') {
          frameArr[i] = '\n'; // Always preserve layout
        } else if (originalChar === ' ') {
            // Keep spaces stable to preserve the "Face Shape" (optional but recommended)
            frameArr[i] = ' '; 
        } else {
           frameArr[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      // Step B: Overwrite the "Solved" portion
      // We take the first N indices from our shuffled list and make them "Real"
      for (let i = 0; i < solvedCount; i++) {
        const indexToSolve = shuffled[i];
        if (indexToSolve !== undefined) {
             frameArr[indexToSolve] = targetAscii[indexToSolve];
        }
      }

      // --- PERSISTENT FLICKER EFFECT ---
      if (active && progressRef.current > 0.99) {
        
        // 1. CLEANUP: Remove dead glitches
        // We keep glitches where life > 0
        glitchesRef.current = glitchesRef.current
          .map(g => ({ ...g, life: g.life - 1 }))
          .filter(g => g.life > 0);

        // 2. SPAWN: Increase frequency slightly
        // Chance increased from 0.8 to 0.7 (30% chance per frame)
        if (Math.random() > 0.7) { 
          const newGlitchesCount = Math.floor(Math.random() * 3) + 1; // Spawn 1-3 glitches
          
          for (let k = 0; k < newGlitchesCount; k++) {
            const randIdx = Math.floor(Math.random() * totalChars);
            
            // Only glitch active pixels (ink), never background
            if (targetAscii[randIdx] !== ' ' && targetAscii[randIdx] !== '\n') {
              glitchesRef.current.push({
                index: randIdx,
                char: CHARS[Math.floor(Math.random() * CHARS.length)],
                life: Math.floor(Math.random() * 10) + 5 // Lasts 5-15 frames (approx 100-250ms)
              });
            }
          }
        }

        // 3. APPLY: Overwrite the frame with active glitches
        glitchesRef.current.forEach(g => {
          frameArr[g.index] = g.char;
        });
      } else {
        // Clear glitches if we start scrambling/transitioning
        glitchesRef.current = [];
      }

      setDisplayAscii(frameArr.join(''));

      // Keep loop running if we haven't hit target
      // OR if we are active (so we can keep flickering)
      if (active || Math.abs(target - currentProgress) > 0.001) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, targetAscii]);

  return (
    <div 
      className="w-full h-full bg-white dark:bg-black overflow-hidden flex items-center justify-center"
      style={{ containerType: 'size' }}
    >
      <pre
        className="whitespace-pre text-left inline-block select-none text-gray-900 dark:text-white overflow-hidden"
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontWeight: 600,
          
          // PRESERVE TUNED CSS VALUES:
          fontSize: '2.82cqw',   
          lineHeight: '2.95cqw', 
          
          letterSpacing: '-0.02em',
          textShadow: 'none',
        }}
      >
        {displayAscii}
      </pre>
    </div>
  );
};

export default ScramblePortrait;
