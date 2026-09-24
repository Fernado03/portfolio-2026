import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Close } from "./Icons";

const toolButton =
    "flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-muted/60 hover:text-ink";

// Native <dialog> gives focus trapping, Escape-to-close and inertness for free; this wrapper syncs it
// with React state and adds backdrop-click dismissal plus optional prev/next navigation.
export default function Dialog({ open, onClose, labelledBy, onPrev, onNext, counter, scrollKey, className = "", children }) {
    const ref = useRef(null);
    const scroller = useRef(null);

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    useEffect(() => {
        if (scroller.current) scroller.current.scrollTop = 0;
    }, [scrollKey]);

    const onKeyDown = (e) => {
        if (e.key === "ArrowLeft" && onPrev) onPrev();
        else if (e.key === "ArrowRight" && onNext) onNext();
        else return;
        e.preventDefault();
    };

    return (
        <dialog
            ref={ref}
            aria-labelledby={labelledBy}
            onClose={onClose}
            onKeyDown={onKeyDown}
            onClick={(event) => {
                if (event.target === ref.current) onClose();
            }}
            className={`m-auto max-h-[92dvh] w-[min(100%_-_1.5rem,var(--dialog-w,56rem))] max-w-none overflow-hidden rounded-2xl border border-line bg-surface p-0 text-ink shadow-2xl shadow-black/60 open:animate-dialog-in ${className}`}
        >
            {open && (
                <div ref={scroller} className="relative max-h-[92dvh] overflow-y-auto overscroll-contain">
                    <div className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-line bg-surface/90 px-3 py-2 backdrop-blur">
                        <span className="px-2 font-mono text-[11px] text-muted" aria-live="polite">
                            {counter}
                        </span>
                        <div className="flex gap-2">
                            {onPrev && (
                                <button type="button" onClick={onPrev} className={toolButton} aria-label="Previous">
                                    <ChevronLeft width={16} height={16} />
                                </button>
                            )}
                            {onNext && (
                                <button type="button" onClick={onNext} className={toolButton} aria-label="Next">
                                    <ChevronRight width={16} height={16} />
                                </button>
                            )}
                            <button type="button" onClick={onClose} className={toolButton} aria-label="Close">
                                <Close width={16} height={16} />
                            </button>
                        </div>
                    </div>
                    {children}
                </div>
            )}
        </dialog>
    );
}
