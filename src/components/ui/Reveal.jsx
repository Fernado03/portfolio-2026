import { motion } from "framer-motion";

export default function Reveal({ delay = 0, className, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1], delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
