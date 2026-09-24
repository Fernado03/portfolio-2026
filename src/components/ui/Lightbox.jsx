import Dialog from "./Dialog";

// items: [{ src, srcSet?, alt, caption }]; index null means closed.
export default function Lightbox({ items, index, onIndexChange, onClose }) {
    const item = index === null ? null : items[index];
    const many = items.length > 1;
    const go = (delta) => onIndexChange((index + delta + items.length) % items.length);

    return (
        <Dialog
            open={Boolean(item)}
            onClose={onClose}
            labelledBy="lightbox-caption"
            onPrev={many ? () => go(-1) : undefined}
            onNext={many ? () => go(1) : undefined}
            counter={many && item ? `${index + 1} / ${items.length}` : null}
            className="[--dialog-w:68rem]"
        >
            {item && (
                <figure>
                    <div className="flex min-h-[40dvh] items-center justify-center bg-bg">
                        <img
                            key={item.src}
                            src={item.src}
                            srcSet={item.srcSet}
                            sizes="(min-width: 1100px) 1088px, 100vw"
                            alt={item.alt}
                            className="max-h-[78dvh] w-auto max-w-full animate-dialog-in object-contain"
                        />
                    </div>
                    <figcaption id="lightbox-caption" className="border-t border-line px-5 py-4 text-sm text-muted">
                        {item.caption}
                    </figcaption>
                </figure>
            )}
        </Dialog>
    );
}
