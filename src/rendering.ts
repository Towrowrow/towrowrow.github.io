import { createContext } from 'react';
/** SSR and the first browser render must both keep prerendered content visible.
 * Never hide existing HTML while waiting for an intersection observer or animation.
 */
export const StaticRenderingContext = createContext(true);
