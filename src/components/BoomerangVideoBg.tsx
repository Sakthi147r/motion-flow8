import React, { useEffect, useRef, useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260611_183632_c311af08-e4b7-458f-81e7-79847a49b3d3.mp4';

export const BoomerangVideoBg: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlayingCanvas, setIsPlayingCanvas] = useState<boolean>(false);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const isCapturingRef = useRef<boolean>(true);
  const loopTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    framesRef.current = [];
    isCapturingRef.current = true;
    setIsPlayingCanvas(false);

    let animationFrameId: number;

    const captureFrame = () => {
      if (!isCapturingRef.current || !video || video.ended || video.paused) {
        return;
      }

      if (video.videoWidth > 0 && video.videoHeight > 0) {
        try {
          const maxWidth = 960;
          const scale = Math.min(1, maxWidth / video.videoWidth);
          const w = Math.round(video.videoWidth * scale);
          const h = Math.round(video.videoHeight * scale);

          const offscreen = document.createElement('canvas');
          offscreen.width = w;
          offscreen.height = h;
          const offCtx = offscreen.getContext('2d');
          if (offCtx) {
            offCtx.drawImage(video, 0, 0, w, h);
            framesRef.current.push(offscreen);
          }
        } catch {
          // If CORS prevents canvas reading, stop capturing and fallback to video loop
          isCapturingRef.current = false;
        }
      }

      // Use requestVideoFrameCallback if supported, else requestAnimationFrame
      if ('requestVideoFrameCallback' in video && typeof (video as any).requestVideoFrameCallback === 'function') {
        (video as any).requestVideoFrameCallback(captureFrame);
      } else {
        animationFrameId = requestAnimationFrame(captureFrame);
      }
    };

    const handleVideoEnded = () => {
      isCapturingRef.current = false;
      const frames = framesRef.current;
      const canvas = canvasRef.current;

      if (frames.length > 3 && canvas) {
        // We have captured frames, transition to ping-pong canvas playback
        setIsPlayingCanvas(true);
        video.style.display = 'none';

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set display canvas resolution to matched frame resolution
        canvas.width = frames[0].width;
        canvas.height = frames[0].height;

        let currentIndex = 0;
        let step = 1;
        const targetFps = 30;
        const interval = 1000 / targetFps;

        let lastTime = performance.now();

        const pingPongLoop = (now: number) => {
          if (now - lastTime >= interval) {
            lastTime = now - ((now - lastTime) % interval);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(frames[currentIndex], 0, 0);

            currentIndex += step;
            if (currentIndex >= frames.length - 1) {
              currentIndex = frames.length - 1;
              step = -1;
            } else if (currentIndex <= 0) {
              currentIndex = 0;
              step = 1;
            }
          }
          loopTimerRef.current = requestAnimationFrame(pingPongLoop);
        };

        loopTimerRef.current = requestAnimationFrame(pingPongLoop);
      } else {
        // Fallback: loop video normally if frame capture was prevented
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    video.addEventListener('ended', handleVideoEnded);

    const startCapture = () => {
      if ('requestVideoFrameCallback' in video && typeof (video as any).requestVideoFrameCallback === 'function') {
        (video as any).requestVideoFrameCallback(captureFrame);
      } else {
        animationFrameId = requestAnimationFrame(captureFrame);
      }
    };

    video.addEventListener('play', startCapture);

    // Start playback
    video.play().catch(() => {
      // Autoplay with muted is allowed
    });

    return () => {
      isCapturingRef.current = false;
      video.removeEventListener('ended', handleVideoEnded);
      video.removeEventListener('play', startCapture);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (loopTimerRef.current) cancelAnimationFrame(loopTimerRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 scale-[1.08] origin-center overflow-hidden pointer-events-none select-none">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        autoPlay
        crossOrigin="anonymous"
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isPlayingCanvas ? 'opacity-0 absolute pointer-events-none' : 'opacity-100'
        }`}
      />
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover ${
          isPlayingCanvas ? 'opacity-100' : 'opacity-0 hidden'
        }`}
      />
      {/* Dark overlay gradient for readability */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />
    </div>
  );
};
