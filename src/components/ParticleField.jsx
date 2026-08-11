import { useEffect, useRef } from "react";

const COUNT = 96;
const REPEL_RADIUS = 120;
const SPRING_K = 0.012;
const DAMPING = 0.9;

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ParticleField = ({ className = "" }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduced = prefersReducedMotion();
        const pointer = { x: 0, y: 0, active: false };
        let dots = [];
        let rafId = null;
        let ro = null;
        let io = null;
        let themeObserver = null;
        let disposed = false;
        let isIntersecting = typeof IntersectionObserver === "undefined";
        let width = 0;
        let height = 0;
        let particleWidth = 0;
        let particleHeight = 0;
        let dpr = 1;
        let bounds = { left: 0, top: 0, right: 0, bottom: 0 };
        let colors = { ink: "", accent2: "" };

        const refreshColors = () => {
            const styles = getComputedStyle(document.documentElement);
            colors = {
                ink: `rgb(${styles.getPropertyValue("--ink-rgb").trim()} / 0.55)`,
                accent2: `rgb(${styles.getPropertyValue("--accent2-rgb").trim()})`,
            };
        };

        const initDots = () => {
            dots = Array.from({ length: COUNT }, () => {
                const x = Math.random() * width;
                const y = Math.random() * height;
                return {
                    x, y, homeX: x, homeY: y,
                    vx: 0, vy: 0,
                    r: 0.6 + Math.random() * 1.8,
                    accent2: Math.random() < 0.12,
                };
            });
            particleWidth = width;
            particleHeight = height;
        };

        const drawFrame = () => {
            if (width <= 0 || height <= 0) return;
            ctx.clearRect(0, 0, width, height);
            for (const dot of dots) {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
                ctx.fillStyle = dot.accent2 ? colors.accent2 : colors.ink;
                ctx.fill();
            }
        };

        const stopAnimation = () => {
            if (rafId === null) return;
            cancelAnimationFrame(rafId);
            rafId = null;
        };

        const scheduleFrame = () => {
            if (
                disposed || reduced || !isIntersecting ||
                width <= 0 || height <= 0 || rafId !== null
            ) return;
            rafId = requestAnimationFrame(step);
        };

        const resize = () => {
            if (disposed) return;
            const rect = canvas.getBoundingClientRect();
            const nextWidth = rect.width;
            const nextHeight = rect.height;
            const nextDpr = Math.min(window.devicePixelRatio || 1, 2);

            width = nextWidth;
            height = nextHeight;
            dpr = nextDpr;
            bounds = {
                left: rect.left,
                top: rect.top,
                right: rect.left + width,
                bottom: rect.top + height,
            };

            const pixelWidth = Math.floor(width * dpr);
            const pixelHeight = Math.floor(height * dpr);
            if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
            if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (width <= 0 || height <= 0) {
                pointer.active = false;
                stopAnimation();
                return;
            }

            if (dots.length === 0) {
                initDots();
            } else if (width !== particleWidth || height !== particleHeight) {
                const scaleX = width / particleWidth;
                const scaleY = height / particleHeight;
                for (const dot of dots) {
                    dot.x *= scaleX;
                    dot.homeX *= scaleX;
                    dot.y *= scaleY;
                    dot.homeY *= scaleY;
                }
                particleWidth = width;
                particleHeight = height;
            }

            drawFrame();
            scheduleFrame();
        };

        const step = () => {
            rafId = null;
            if (
                disposed || reduced || !isIntersecting ||
                width <= 0 || height <= 0
            ) return;

            for (const dot of dots) {
                dot.vx += (dot.homeX - dot.x) * SPRING_K;
                dot.vy += (dot.homeY - dot.y) * SPRING_K;
                if (pointer.active) {
                    const dx = dot.x - pointer.x;
                    const dy = dot.y - pointer.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < REPEL_RADIUS && dist > 0) {
                        const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * 2.2;
                        dot.vx += (dx / dist) * force;
                        dot.vy += (dy / dist) * force;
                    }
                }
                dot.vx *= DAMPING;
                dot.vy *= DAMPING;
                dot.x += dot.vx;
                dot.y += dot.vy;
            }
            drawFrame();
            scheduleFrame();
        };

        const onPointerMove = (event) => {
            if (
                width <= 0 || height <= 0 ||
                event.clientX < bounds.left || event.clientX > bounds.right ||
                event.clientY < bounds.top || event.clientY > bounds.bottom
            ) {
                pointer.active = false;
                return;
            }
            pointer.x = event.clientX - bounds.left;
            pointer.y = event.clientY - bounds.top;
            pointer.active = true;
        };
        const clearPointer = () => { pointer.active = false; };

        refreshColors();
        resize();

        if (!reduced) {
            window.addEventListener("pointermove", onPointerMove, { passive: true });
            window.addEventListener("pointerleave", clearPointer);
            window.addEventListener("blur", clearPointer);
        }

        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(resize);
            ro.observe(canvas);
        } else {
            window.addEventListener("resize", resize);
        }

        if (typeof IntersectionObserver !== "undefined") {
            io = new IntersectionObserver((entries) => {
                if (disposed) return;
                const entry = entries[entries.length - 1];
                if (!entry) return;

                const entryRect = entry.boundingClientRect;
                bounds = {
                    left: entryRect.left,
                    top: entryRect.top,
                    right: entryRect.left + width,
                    bottom: entryRect.top + height,
                };

                const nextIntersecting = entry.isIntersecting;
                if (nextIntersecting === isIntersecting) return;
                isIntersecting = nextIntersecting;
                if (!isIntersecting) {
                    clearPointer();
                    stopAnimation();
                } else if (reduced) {
                    drawFrame();
                } else {
                    scheduleFrame();
                }
            });
            io.observe(canvas);
        }

        if (typeof MutationObserver !== "undefined") {
            themeObserver = new MutationObserver(() => {
                if (disposed) return;
                refreshColors();
                drawFrame();
                scheduleFrame();
            });
            themeObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ["class"],
            });
        }

        scheduleFrame();

        return () => {
            disposed = true;
            stopAnimation();
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerleave", clearPointer);
            window.removeEventListener("blur", clearPointer);
            window.removeEventListener("resize", resize);
            if (ro) ro.disconnect();
            if (io) io.disconnect();
            if (themeObserver) themeObserver.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`pointer-events-none ${className}`}
        />
    );
};

export default ParticleField;
