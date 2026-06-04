/** Centralized Framer Motion presets — matches Figma motion language */

export const spring = { type: 'spring' as const, stiffness: 300, damping: 30 };

export const easeOut = {
  type: 'tween' as const,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  duration: 0.3,
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: easeOut,
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 },
};

export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

/** Scale-in animation for cards and panels */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: easeOut,
};

/** Slide-in from right for panels */
export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: easeOut,
};

/** Slide-in from left for sidebar */
export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: easeOut,
};

/** Page transition wrapper */
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { type: 'tween' as const, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], duration: 0.3 },
};

/** Node activation animation for graph */
export const nodeActivation = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 25,
  duration: 0.4,
};

/** Skeleton pulse timing */
export const skeletonPulse = {
  transition: { duration: 1.5, ease: 'easeInOut' as const, repeat: Infinity },
};
