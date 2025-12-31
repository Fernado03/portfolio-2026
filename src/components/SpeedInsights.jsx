import { SpeedInsights } from '@vercel/speed-insights/react';

/**
 * SpeedInsights Component
 * 
 * Wrapper component for Vercel Speed Insights tracking.
 * This component integrates performance monitoring into the application
 * to track Core Web Vitals and other performance metrics.
 * 
 * @component
 * @returns {JSX.Element} SpeedInsights tracking component
 */
export default function SpeedInsightsComponent() {
  return <SpeedInsights />;
}
