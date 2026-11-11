import type { Localized } from './profile';
import type { Domain } from './skills';
export interface Project { id: string; name: string; description: Localized; stack: string[]; image: string; imageAlt: Localized; github: string; demo?: string; category: Domain }
export const projects: Project[] = [];
