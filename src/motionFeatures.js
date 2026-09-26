// Animation features for <LazyMotion> in App.jsx, split into their own chunk so they load after the first
// render. domMax (not domAnimation) because the Work grid and ablation chart use layout animations.
export { domMax as default } from "framer-motion";
