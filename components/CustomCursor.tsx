
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trail1Ref = useRef<HTMLDivElement>(null);
  const trail2Ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [labelText, setLabelText] = useState('');

  useEffect(() => {
    // Check if the device is a touch device. If so, don't enable the custom cursor.
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const trail1 = trail1Ref.current;
    const trail2 = trail2Ref.current;
    const label = labelRef.current;
    const container = containerRef.current;

    // Safety check to ensure all refs are populated
    if (!dot || !ring || !trail1 || !trail2 || !label || !container) return;

    // Enable custom cursor styles in CSS (hides default cursor)
    document.body.classList.add('custom-cursor-active');

    // High performance following using quickTo with force3D for sharpness
    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    
    const xRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

    const xTrail1 = gsap.quickTo(trail1, "x", { duration: 0.6, ease: "power3.out" });
    const yTrail1 = gsap.quickTo(trail1, "y", { duration: 0.6, ease: "power3.out" });

    const xTrail2 = gsap.quickTo(trail2, "x", { duration: 0.8, ease: "power3.out" });
    const yTrail2 = gsap.quickTo(trail2, "y", { duration: 0.8, ease: "power3.out" });

    const xLabel = gsap.quickTo(label, "x", { duration: 0.2, ease: "power3.out" });
    const yLabel = gsap.quickTo(label, "y", { duration: 0.2, ease: "power3.out" });

    let hasMoved = false;

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (!hasMoved) {
        hasMoved = true;
        gsap.to(container, { opacity: 1, duration: 0.3 });
      }

      xDot(clientX);
      yDot(clientY);
      xRing(clientX);
      yRing(clientY);
      xTrail1(clientX);
      yTrail1(clientY);
      xTrail2(clientX);
      yTrail2(clientY);
      xLabel(clientX);
      yLabel(clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('.interactive, a, button') as HTMLElement;
      const cursorText = interactive?.getAttribute('data-cursor-text');
      const cursorType = interactive?.getAttribute('data-cursor-type');

      if (interactive) {
        const isProject = cursorType === 'project';
        const isConnect = cursorType === 'connect';
        
        const isSolid = cursorText || isProject || isConnect;
        
        // Reduced project scale from 2.5 to 1.8 for a more refined look
        // Ensure pure #ffffff and remove border to prevent aliasing noise
        const scale = isConnect ? 0.6 : (isProject ? 1.8 : (cursorText ? 3.5 : 2.2));
        
        gsap.to(ring, {
          scale: scale,
          backgroundColor: isSolid ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
          borderColor: isSolid ? 'transparent' : 'rgba(255, 255, 255, 0.8)',
          borderWidth: isSolid ? 0 : 1,
          mixBlendMode: isSolid ? 'normal' : 'difference',
          duration: 0.4,
          force3D: true,
          overwrite: "auto",
          // Adding a slight blur-fix for scaled objects
          rotationZ: 0.01,
        });
        
        // Hide dot and trails instantly for better performance in solid state
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
        gsap.to([trail1, trail2], { opacity: 0, duration: 0.1 });
        
        if (cursorText && !isConnect) {
          setLabelText(cursorText);
          gsap.to(label, { 
            opacity: 1, 
            scale: isProject ? 0.8 : 1, // Slightly smaller label if ring is smaller
            duration: 0.3, 
            force3D: true 
          });
        } else {
          gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.3 });
        }
      } else {
        // Restore default state
        gsap.to(ring, { 
          scale: 1, 
          backgroundColor: 'transparent', 
          borderColor: 'rgba(255, 255, 255, 0.4)',
          borderWidth: 1,
          mixBlendMode: 'difference', 
          duration: 0.4,
          force3D: true,
          rotationZ: 0,
          overwrite: "auto"
        });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to([trail1, trail2], { opacity: 1, duration: 0.4 });
        gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.3 });
      }
    };

    const handleMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.2 });
      
      const ripple = document.createElement('div');
      ripple.className = 'fixed w-4 h-4 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference';
      ripple.style.left = `${gsap.getProperty(dot, "x")}px`;
      ripple.style.top = `${gsap.getProperty(dot, "y")}px`;
      ripple.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(ripple);

      gsap.to(ripple, {
        scale: 15,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => ripple.remove()
      });
    };

    const handleMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      gsap.to(container, { opacity: 0, duration: 0.3 });
    };

    const handleMouseEnter = () => {
      if (hasMoved) {
        gsap.to(container, { opacity: 1, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[10000] opacity-0">
      {/* Ghost Trail 2 */}
      <div ref={trail2Ref} className="fixed w-10 h-10 border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 will-animate" style={{ backfaceVisibility: 'hidden' }} />
      {/* Ghost Trail 1 */}
      <div ref={trail1Ref} className="fixed w-10 h-10 border border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 will-animate" style={{ backfaceVisibility: 'hidden' }} />
      {/* Main Smooth Ring */}
      <div ref={ringRef} className="fixed w-10 h-10 border border-white/40 rounded-full -translate-x-1/2 -translate-y-1/2 will-animate mix-blend-difference" style={{ backfaceVisibility: 'hidden' }} />
      {/* Sharp Center Dot */}
      <div ref={dotRef} className="fixed w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference" style={{ backfaceVisibility: 'hidden' }} />
      {/* Contextual Label */}
      <div ref={labelRef} className="fixed opacity-0 -translate-x-1/2 -translate-y-1/2 z-[10001] flex items-center justify-center pointer-events-none">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">
          {labelText}
        </span>
      </div>
    </div>
  );
};

export default CustomCursor;
