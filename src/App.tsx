import type { ReactNode } from 'react';
import { useEffect, useState, useContext, Component } from 'react';
import { StaticRenderingContext } from './rendering';
import { seoFor } from './data/seo';
import { motion, MotionConfig } from 'motion/react';
import { ArrowUpRight, Github, Code2, Database, Layers3, Sparkles, Check, Menu, X, Mail, Linkedin, Braces, Terminal } from 'lucide-react';
import { profile, yearsOfExperience } from './data/profile';
import type { Locale } from './data/profile';
import { expertise } from './data/skills';
import type { Domain } from './data/skills';
import { projects } from './data/projects';
import { copy } from './data/content';
import { CinematicHero, ArchitectureExplorer, AgentWorkflow } from './components/EngineeringExperience';
import { assetUrl } from './utils/assets';
import './styles.css';
import './v2.css';

const icons = [Code2, Database, Layers3, Sparkles];

const ids = ['expertise', 'approach', 'ai', 'projects'];
function initialLocale(): Locale { return typeof window !== 'undefined' && window.location.pathname.startsWith('/en/') ? 'en' : 'fr'; }
function Reveal({ children, className = '' }: {children: ReactNode; className?: string}) { const isStatic = useContext(StaticRenderingContext); return <motion.div className={className} initial={isStatic ? false : {opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.12}} transition={{duration:0.55}}>{children}</motion.div>; }
export function App({initialLanguage}: {initialLanguage?: Locale}) {
 const [locale] = useState<Locale>(initialLanguage ?? initialLocale);
 const [menu,setMenu] = useState(false);
 const [filter,setFilter] = useState<Domain|'all'>('all');
 const [projectFilter,setProjectFilter] = useState<Domain|'all'>('all');


 const t = copy[locale];
 const years = yearsOfExperience(profile.careerStart,profile.initialExperience);
 useEffect(()=>{ const seo = seoFor(locale); document.documentElement.lang=locale; document.title=seo.title; document.querySelector('meta[name="description"]')?.setAttribute('content',seo.description); },[locale]);
 return <MotionConfig reducedMotion="user"><a className="skip" href="#main">{t.skip}</a><header className="header"><a href="#" className="wordmark" aria-label={locale === 'fr' ? 'Rémi Tilmant — accueil' : 'Rémi Tilmant — home'}>{profile.name}<span>.</span></a><nav aria-label={locale==='fr'?'Navigation principale':'Main navigation'} className={menu?'nav open':'nav'}>{t.nav.map((name,i)=><a key={ids[i]} href={`#${ids[i]}`} onClick={()=>setMenu(false)}>{name}</a>)}</nav><div className="header-actions"><a className="language" href={locale === 'fr' ? '/en/' : '/'} hrefLang={locale === 'fr' ? 'en' : 'fr'} aria-label={locale==='fr'?'FR / EN — Switch to English':'FR / EN — Passer en français'}><span className={locale==='fr'?'active':''}>FR</span><span className="divider">/</span><span className={locale==='en'?'active':''}>EN</span></a><a href={`mailto:${profile.email}`} className="contact-link">{t.contact}<ArrowUpRight size={15}/></a><button className="menu-toggle" aria-label={locale==='fr'?'Menu de navigation':'Navigation menu'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></header>
 <main id="main"><CinematicHero locale={locale} years={years}/>
 <section id="about" className="about section wrap"><Reveal><p className="eyebrow">{t.aboutLabel}</p><h2>{t.aboutTitle}</h2></Reveal><Reveal className="about-copy"><p>{t.about}</p><p>{t.about2}</p><div className="signature">Rémi Tilmant <span>/ Software Engineer</span></div></Reveal></section>
 <section id="expertise" className="section expertise-section"><div className="wrap"><Reveal><p className="eyebrow">{t.expertLabel}</p><h2>{t.expertTitle}</h2><p className="section-intro">{t.expertIntro}</p></Reveal><div className="expertise-grid">{expertise.map((item,i)=>{ const Icon=icons[i]; return <Reveal className={`expertise-card domain-${item.id}`} key={item.id}><div className="card-top"><Icon size={24}/><span>0{i+1}</span></div><h3>{item.title}</h3><h4>{item.subtitle[locale]}</h4><p>{item.description[locale]}</p><div className="tags">{item.stack.slice(0,4).map(s=><span key={s}>{s}</span>)}</div></Reveal>;})}</div>
 <Reveal><ArchitectureExplorer locale={locale}/></Reveal>
 <Reveal className="toolkit"><div className="toolkit-header"><h3>{t.tech}</h3><div className="filters" role="group" aria-label={t.tech}>{(['all','frontend','backend','architecture','ai'] as const).map(f=><button key={f} aria-pressed={filter===f} className={filter===f?'selected':''} onClick={()=>setFilter(f)}>{f==='all'?t.all:f==='ai'?'AI & Automation':f[0].toUpperCase()+f.slice(1)}</button>)}</div></div><div className="tech-list">{expertise.filter(e=>filter==='all'||e.id===filter).flatMap(e=>e.stack.map(s=><span key={`${e.id}-${s}`}><i className={`dot-${e.id}`}/>{s}</span>))}</div></Reveal></div></section>
 <section id="approach" className="section wrap approach"><Reveal><p className="eyebrow">{t.approachLabel}</p><h2>{t.approachTitle}</h2><div className="approach-decoration" aria-hidden="true"><Terminal size={38}/><span>problem → clarity<br/>clarity → software</span></div></Reveal><div className="steps">{t.steps.map((step,i)=><Reveal className="step" key={step}><span className="step-number">0{i+1}</span><div><h3>{step}</h3><p>{t.stepDetails[i]}</p></div><Check size={16}/></Reveal>)}</div></section>
 <section id="ai" className="section ai-section"><div className="wrap"><Reveal className="ai-heading"><div><p className="eyebrow">{t.aiLabel}</p><h2>{t.aiTitle}</h2></div><p className="section-intro">{t.aiText}</p></Reveal><Reveal><AgentWorkflow locale={locale}/></Reveal></div></section>
 <section id="projects" className="section wrap"><Reveal><p className="eyebrow">{t.projectsLabel}</p><h2>{t.projectsTitle}</h2></Reveal>{projects.length===0?<Reveal className="empty-state"><div className="empty-symbol"><Braces size={36}/><span>+</span></div><div><h3>{t.emptyTitle}</h3><p>{t.emptyText}</p><a href={profile.github} target="_blank" rel="noreferrer" className="text-link">{t.emptyLink}<ArrowUpRight size={16}/></a></div><span className="empty-index">NEXT / 001</span></Reveal>:<><div className="filters project-filters" role="group" aria-label={t.projectsTitle}>{(['all',...expertise.map(e=>e.id)] as const).map(f=><button key={f} aria-pressed={projectFilter===f} className={projectFilter===f?'selected':''} onClick={()=>setProjectFilter(f)}>{f==='all'?t.all:expertise.find(e=>e.id===f)?.title}</button>)}</div><div className="project-grid">{projects.filter(p=>projectFilter==='all'||p.category===projectFilter).map(p=><article className="project-card" key={p.id}><img loading="lazy" src={assetUrl(p.image, import.meta.env.BASE_URL)} alt={p.imageAlt[locale]}/><div><span className="eyebrow">{p.category}</span><h3>{p.name}</h3><p>{p.description[locale]}</p><div className="tags">{p.stack.map(s=><span key={s}>{s}</span>)}</div><div className="project-links"><a href={p.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15}/></a>{p.demo&&<a href={p.demo} target="_blank" rel="noreferrer">Demo <ArrowUpRight size={15}/></a>}</div></div></article>)}</div></>}</section>
 <section id="contact" className="section contact-section wrap"><Reveal><p className="eyebrow">{t.contactLabel}</p><h2>{t.contactTitle}</h2><p className="section-intro">{t.contactText}</p><div className="contact-actions"><a className="button primary" href={profile.github} target="_blank" rel="noreferrer"><Github size={18}/>GitHub<ArrowUpRight size={18}/></a>{profile.email&&<a className="button" href={`mailto:${profile.email}`}><Mail size={18}/>{profile.email}<ArrowUpRight size={18}/></a>}{profile.linkedin&&<a className="button" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/>LinkedIn</a>}</div></Reveal><span className="contact-monogram" aria-hidden="true">Hello.</span></section></main><footer className="wrap footer"><a className="wordmark" href="#">{profile.name}<span>.</span></a><span>© {new Date().getFullYear()} Rémi Tilmant</span><span>{t.footer}</span><a href="#" aria-label={locale==='fr'?'Retour en haut':'Back to top'}><ArrowUpRight size={20}/></a></footer></MotionConfig>;
}
export class ErrorBoundary extends Component<{children:ReactNode},{failed:boolean}> { state={failed:false}; static getDerivedStateFromError(){return {failed:true};} render(){const t=copy[initialLocale()];return this.state.failed?<main className="wrap section"><h1>{t.error}</h1><button className="button primary" onClick={()=>location.reload()}>{t.retry}</button></main>:this.props.children;} }
