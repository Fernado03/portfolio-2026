const PREV = new Set(["ArrowLeft", "ArrowUp"]);
const NEXT = new Set(["ArrowRight", "ArrowDown"]);

// Keyboard model for ARIA tablists and radiogroups (roving tabindex): arrows move selection and focus
// together and wrap; Home/End jump to the ends. Items must be sibling elements in display order.
export function rovingKeyDown(e, index, count, select, { horizontal = false } = {}) {
    const key = horizontal && (e.key === "ArrowUp" || e.key === "ArrowDown") ? null : e.key;
    let next;
    if (PREV.has(key)) next = (index - 1 + count) % count;
    else if (NEXT.has(key)) next = (index + 1) % count;
    else if (key === "Home") next = 0;
    else if (key === "End") next = count - 1;
    else return;
    e.preventDefault();
    select(next);
    e.currentTarget.parentElement.children[next]?.focus();
}
