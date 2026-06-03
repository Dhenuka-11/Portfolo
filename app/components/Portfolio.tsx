'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '../../lib/sanityImage'

interface About {
  name: string
  role: string
  tagline: string
  gpa: string
  university: string
  graduationYear: string
  email: string
  gmail: string
  linkedin: string
  github: string
  availableFrom: string
  photo: any
}

interface Experience {
  role: string
  company: string
  location: string
  startDate: string
  endDate: string
  bullets: string[]
}

interface Project {
  title: string
  description: string
  githubUrl: string
  liveUrl: string
  tags: string[]
}

interface Certification {
  name: string
  issuer: string
  issuerType: string
  earnedDate: string
  expiryDate: string
  credentialUrl: string
  badgeImage: any
}

interface Education {
  degree: string
  school: string
  startDate: string
  endDate: string
  location: string
  gpa: string
  courses: string[]
  logo: any
}

interface Props {
  about: About
  experience: Experience[]
  projects: Project[]
  certifications: Certification[]
  education: Education[]
}

export default function Portfolio({ about, experience, projects, certifications, education }: Props) {
  useEffect(() => {
    // Theme from localStorage
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark')
    } catch(e) {}

    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    // Typewriter
    const el = document.getElementById('tw')
    if (el) {
      const phrases = [' Software Engineer', ' Analytics Engineer', ' AI Engineer', ' Data Engineer']
      let pi = 0, ci = 0, del = false, paused = false
      const type = () => {
        if (paused) return
        const ph = phrases[pi]
        if (!del) {
          el.textContent = ph.slice(0, ++ci)
          if (ci === ph.length) { paused = true; setTimeout(() => { paused = false; del = true }, 2200); return }
          setTimeout(type, 65)
        } else {
          el.textContent = ph.slice(0, --ci)
          if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(type, 380); return }
          setTimeout(type, 35)
        }
      }
      setTimeout(type, 800)
    }

    // Scroll progress + nav
    const onScroll = () => {
      const s = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      const bar = document.getElementById('spb')
      if (bar) bar.style.width = (s / max * 100) + '%'
      const nav = document.getElementById('nav')
      if (nav) nav.classList.toggle('scrolled', s > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Canvas particles
    const canvas = document.getElementById('bgc') as HTMLCanvasElement
    let animId: number
    if (canvas) {
      const ctx = canvas.getContext('2d')!
      let W = canvas.width = window.innerWidth
      let H = canvas.height = window.innerHeight
      const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
      window.addEventListener('resize', onResize)
      interface Pt { x: number; y: number; r: number; vx: number; vy: number; lf: number; sp: number; ci: number }
      const pts: Pt[] = Array.from({length: 60}, () => ({
        x: Math.random()*W, y: Math.random()*H, r: Math.random()*2+0.4,
        vx: (Math.random()-.5)*.35, vy: (Math.random()-.5)*.35,
        lf: Math.random()*Math.PI*2, sp: Math.random()*.007+.003, ci: Math.floor(Math.random()*3)
      }))
      const loop = () => {
        ctx.clearRect(0,0,W,H)
        const dark = document.documentElement.getAttribute('data-theme') === 'dark'
        const COLS = dark ? ['rgba(240,96,128,','rgba(62,207,184,','rgba(240,192,96,'] : ['rgba(123,45,62,','rgba(31,95,91,','rgba(139,100,24,']
        pts.forEach(p => {
          p.lf += p.sp; p.x += p.vx + Math.sin(p.lf)*.35; p.y += p.vy + Math.cos(p.lf)*.25
          if(p.x<-10) p.x=W+10; if(p.x>W+10) p.x=-10; if(p.y<-10) p.y=H+10; if(p.y>H+10) p.y=-10
        })
        for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++) {
          const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy)
          if(d<105) {
            ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y)
            ctx.strokeStyle=`rgba(${dark?'240,96,128':'123,45,62'},${(dark?.1:.05)*(1-d/105)})`
            ctx.lineWidth=.5; ctx.stroke()
          }
        }
        pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=COLS[p.ci]+(dark?.55:.32)+')'; ctx.fill() })
        animId = requestAnimationFrame(loop)
      }
      loop()
      return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
      }
    }
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const dark = document.documentElement.getAttribute('data-theme') !== 'dark'
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    const thumb = document.getElementById('ttThumb')
    const lbl = document.getElementById('ttLbl')
    if (thumb) thumb.textContent = dark ? '🌙' : '☀️'
    if (lbl) lbl.textContent = dark ? 'Dark' : 'Light'
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch(e) {}
  }

  const accentColors = ['#7b2d3e', '#1f5f5b', '#8b6418']

  const photoUrl = about?.photo ? urlFor(about.photo).width(720).height(860).fit('crop').url() : null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        [data-theme="light"]{--bg:#faf7f5;--surface:#fff;--b:#7b2d3e;--bl:#9c3d51;--bp:rgba(123,45,62,.08);--bm:rgba(123,45,62,.22);--t:#1f5f5b;--g:#8b6418;--s:#354a5c;--tx:#18100e;--tx2:#3d2830;--mu:#8a7080;--bd:rgba(123,45,62,.13);--bd2:rgba(123,45,62,.22);--nav:rgba(250,247,245,.93);--glow:rgba(123,45,62,.18);--sh:0 4px 24px rgba(123,45,62,.07)}
        [data-theme="dark"]{--bg:#060408;--surface:#110910;--b:#f06080;--bl:#ff85a0;--bp:rgba(240,96,128,.1);--bm:rgba(240,96,128,.26);--t:#3ecfb8;--g:#f0c060;--s:#80aadd;--tx:#f5eef0;--tx2:#c8a8b8;--mu:#806878;--bd:rgba(240,96,128,.13);--bd2:rgba(240,96,128,.24);--nav:rgba(6,4,8,.93);--glow:rgba(240,96,128,.22);--sh:0 4px 32px rgba(240,96,128,.1)}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:var(--bg);color:var(--tx);font-family:'Outfit',sans-serif;transition:background .5s,color .5s;overflow-x:hidden}
        #spb{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--b),var(--t),var(--g));z-index:500;width:0;box-shadow:0 0 8px var(--glow)}
        #bgc{position:fixed;inset:0;z-index:0;pointer-events:none}
        nav{position:fixed;top:0;left:0;right:0;z-index:200;height:64px;display:flex;justify-content:space-between;align-items:center;padding:0 3rem;background:var(--nav);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid var(--bd);transition:box-shadow .3s,background .5s}
        nav.scrolled{box-shadow:0 2px 28px var(--glow)}
        .logo{font-family:'Cormorant Garamond',serif;font-size:1.35rem;font-weight:700;color:var(--b);text-decoration:none}
        .nav-links{display:flex;list-style:none}
        .nav-links a{color:var(--mu);text-decoration:none;font-size:.77rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;padding:.4rem .8rem;transition:color .2s}
        .nav-links a:hover{color:var(--b)}
        .tt{width:52px;height:26px;background:var(--surface);border:1.5px solid var(--bd2);border-radius:20px;cursor:pointer;position:relative;flex-shrink:0;display:inline-block}
        .tt-thumb{position:absolute;top:2px;left:2px;width:20px;height:20px;background:var(--b);border-radius:50%;font-size:10px;display:flex;align-items:center;justify-content:center;transition:transform .4s cubic-bezier(.34,1.56,.64,1)}
        [data-theme="dark"] .tt-thumb{transform:translateX(26px)}
        section{padding:6rem 5rem;max-width:1280px;margin:0 auto;position:relative;z-index:2}
        .reveal{opacity:0;transform:translateY(24px);transition:opacity .65s,transform .65s}
        .reveal.visible{opacity:1;transform:none}
        .sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;margin-bottom:3rem;color:var(--tx)}
        .sec-title em{font-style:italic;color:var(--b)}
        .sec-label{font-family:'JetBrains Mono',monospace;font-size:.66rem;color:var(--b);letter-spacing:.3em;text-transform:uppercase;margin-bottom:.5rem}
        .pill{display:inline-block;background:var(--b);color:#fff;font-size:.72rem;font-weight:600;padding:.22rem .65rem;border-radius:3px;margin-right:.35rem}
        .btn{padding:.74rem 1.9rem;border-radius:2px;font-size:.78rem;font-weight:600;cursor:pointer;text-decoration:none;display:inline-block;letter-spacing:.1em;text-transform:uppercase;transition:all .3s;border:2px solid var(--b)}
        .btn-p{background:var(--b);color:#fff;box-shadow:0 4px 16px var(--glow)}
        .btn-p:hover{background:transparent;color:var(--b)}
        .btn-g{background:transparent;color:var(--tx2);border-color:var(--bd2)}
        .btn-g:hover{border-color:var(--b);color:var(--b)}
        .card{background:var(--surface);border:1.5px solid var(--bd);border-radius:3px;padding:1.75rem;transition:transform .3s,box-shadow .3s,background .5s}
        .card:hover{transform:translateY(-4px);box-shadow:0 12px 32px var(--glow)}
        .tag{display:inline-flex;align-items:center;gap:.4rem;background:var(--bg);border:1.5px solid var(--bd);color:var(--tx2);font-size:.72rem;padding:.3rem .6rem;border-radius:2px;font-family:'JetBrains Mono',monospace;transition:all .2s}
        .tag:hover{border-color:var(--bm);background:var(--bp)}
        .photo-wrap{position:relative;width:360px;height:430px;flex-shrink:0}
        .photo-bg2{position:absolute;bottom:-24px;right:-24px;width:100%;height:100%;background:var(--bm);opacity:.25;border-radius:4px;z-index:0}
        .photo-bg1{position:absolute;bottom:-12px;right:-12px;width:100%;height:100%;background:var(--bp);border:1.5px solid var(--bm);border-radius:4px;z-index:0}
        .photo-frame{position:relative;z-index:1;width:100%;height:100%;border-radius:4px;overflow:hidden;border:2px solid var(--bd2);box-shadow:var(--sh)}
        .photo-wrap:hover .photo-bg1{transform:translate(7px,7px);transition:transform .5s}
        .photo-wrap:hover .photo-bg2{transform:translate(14px,14px);transition:transform .5s}
        .photo-wrap:hover .photo-frame img{transform:scale(1.04);transition:transform .7s}
        .sdiv{height:1px;background:linear-gradient(90deg,transparent,var(--bd2),transparent)}
        @media(max-width:1080px){
          #hero-grid{grid-template-columns:1fr !important}
          .photo-wrap{width:280px;height:330px;margin:0 auto}
        }
        @media(max-width:768px){
          nav{padding:0 1.5rem}
          .nav-links{display:none}
          section{padding-left:1.5rem;padding-right:1.5rem}
        }
      `}</style>

      <div id="spb"></div>
      <canvas id="bgc"></canvas>

      {/* NAV */}
      <nav id="nav">
        <a className="logo" href="#hero">Dhenuka C.</a>
        <ul className="nav-links">
          {['about','experience','projects','certifications','education','contact'].map(s => (
            <li key={s}><a href={`#${s}`}>{s}</a></li>
          ))}
        </ul>
        <div style={{display:'flex',alignItems:'center',gap:'.75rem'}}>
          <span id="ttLbl" style={{fontFamily:'JetBrains Mono',fontSize:'.65rem',color:'var(--mu)',letterSpacing:'.1em',textTransform:'uppercase'}}>Light</span>
          <div className="tt" id="tt" onClick={toggleTheme}>
            <div className="tt-thumb" id="ttThumb">☀️</div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{minHeight:'100vh',paddingTop:'7rem'}}>
        <div id="hero-grid" style={{display:'grid',gridTemplateColumns:'1fr 420px',gap:'5rem',alignItems:'center'}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:'.6rem',fontFamily:'JetBrains Mono',fontSize:'.68rem',letterSpacing:'.22em',textTransform:'uppercase',color:'var(--b)',marginBottom:'1.75rem'}}>
              <div style={{width:'28px',height:'1.5px',background:'var(--b)'}}></div>
              Available for full-time roles · {about?.availableFrom || '2027'}
            </div>
            <h1 style={{fontFamily:'Cormorant Garamond',fontSize:'clamp(3rem,6vw,5.8rem)',fontWeight:700,lineHeight:1,marginBottom:'1.1rem'}}>
              {about?.name?.split(' ')[0] || 'Dhenuka'}<br/>
              <span style={{color:'var(--b)'}}>{about?.name?.split(' ')[1] || 'Chelumalla'}</span>
            </h1>
            <div style={{width:'56px',height:'2px',background:'linear-gradient(90deg,var(--b),var(--t))',marginBottom:'1.5rem',borderRadius:'2px'}}></div>
            <p style={{fontSize:'.98rem',color:'var(--tx2)',marginBottom:'1.6rem',lineHeight:1.7,minHeight:'2rem'}}>
              <span className="pill">{about?.role || 'Data Engineer'}</span>
              <span id="tw"></span>
            </p>
            <p style={{fontSize:'.85rem',color:'var(--mu)',lineHeight:2,marginBottom:'2.5rem',maxWidth:'480px',fontFamily:'JetBrains Mono'}}>
              {about?.tagline || 'MS Computer Science @ UGA · Microsoft Fabric DP-700 · Databricks Certified'}
            </p>
            <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
              <a href="#projects" className="btn btn-p">View Projects</a>
              <a href="#contact" className="btn btn-g">Get in Touch</a>
            </div>
          </div>

          {/* PHOTO */}
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'1.5rem'}}>
            <div className="photo-wrap">
              <div className="photo-bg2"></div>
              <div className="photo-bg1"></div>
              <div className="photo-frame">
                {photoUrl ? (
                  <Image src={photoUrl} alt={about?.name || 'Dhenuka'} width={360} height={430} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top',display:'block'}} priority/>
                ) : (
                  <div style={{width:'100%',height:'100%',background:'var(--surface2)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--mu)',fontFamily:'JetBrains Mono',fontSize:'.8rem',textAlign:'center',padding:'1rem'}}>
                    Add photo in<br/>Sanity Studio
                  </div>
                )}
              </div>
            </div>
            <div style={{display:'flex',gap:'.75rem',flexWrap:'wrap',justifyContent:'center'}}>
              {[`MS CS @ ${about?.university?.split(' ').pop() || 'UGA'}`, `GPA ${about?.gpa || '3.6'} / 4.0`, 'DP-700 Certified'].map((t,i) => (
                <div key={i} style={{background:'var(--surface)',border:'1.5px solid var(--bd2)',borderRadius:'3px',padding:'.48rem .9rem',fontFamily:'JetBrains Mono',fontSize:'.68rem',color:'var(--tx2)',display:'flex',alignItems:'center',gap:'.4rem',boxShadow:'var(--sh)'}}>
                  <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--b)',flexShrink:0}}></div>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="sdiv"></div>

      {/* ABOUT */}
      <section id="about">
        <div className="sec-label reveal">01 — About</div>
        <h2 className="sec-title reveal">About <em>Me</em></h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem'}} className="reveal">
          <div>
            <p style={{color:'var(--tx2)',lineHeight:2,fontSize:'.91rem',marginBottom:'1rem'}}>
              I&apos;m a Data Engineer and ML practitioner currently pursuing an MS in Computer Science at the {about?.university || 'University of Georgia'} (GPA {about?.gpa || '3.6'}/4.0), deepening my expertise in distributed systems, machine learning, and cloud-native data engineering.
            </p>
            <p style={{color:'var(--tx2)',lineHeight:2,fontSize:'.91rem'}}>
              I&apos;m actively seeking full-time roles as a Data Engineer, Analytics Engineer, or Software Engineer starting mid-{about?.graduationYear || '2027'}.
            </p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            {[
              {num: about?.gpa || '3.6', lab: 'MS GPA / 4.0', color: 'var(--b)'},
              {num: `${(certifications||[]).length || 5}+`, lab: 'Certifications', color: 'var(--t)'},
              {num: about?.graduationYear || '2027', lab: 'Graduating', color: 'var(--g)'},
              {num: 'UGA', lab: 'Athens, Georgia', color: 'var(--s)'},
            ].map((s,i) => (
              <div key={i} className="card" style={{textAlign:'center',borderTop:`2px solid ${s.color}`}}>
                <div style={{fontFamily:'Cormorant Garamond',fontSize:'2rem',fontWeight:700,color:s.color}}>{s.num}</div>
                <div style={{fontSize:'.68rem',color:'var(--mu)',marginTop:'.3rem',fontFamily:'JetBrains Mono',letterSpacing:'.08em',textTransform:'uppercase'}}>{s.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="sdiv"></div>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="sec-label reveal">02 — Experience</div>
        <h2 className="sec-title reveal">Work <em>Experience</em></h2>
        {(experience?.length > 0) ? experience.map((exp, i) => (
          <div key={i} className="card reveal" style={{marginBottom:'1.5rem',borderLeft:'2px solid var(--b)',paddingLeft:'2rem',position:'relative'}}>
            <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'.75rem',marginBottom:'1.25rem'}}>
              <div>
                <div style={{fontFamily:'Cormorant Garamond',fontSize:'1.4rem',fontWeight:700}}>{exp.role}</div>
                <div style={{color:'var(--b)',fontFamily:'JetBrains Mono',fontSize:'.78rem',marginTop:'.25rem'}}>{exp.company} · {exp.location}</div>
              </div>
              <div style={{fontFamily:'JetBrains Mono',fontSize:'.68rem',background:'var(--bp)',color:'var(--b)',padding:'.3rem .85rem',borderRadius:'2px',border:'1px solid var(--bm)',height:'fit-content'}}>{exp.startDate} – {exp.endDate}</div>
            </div>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'.7rem'}}>
              {(exp.bullets||[]).map((b,j) => (
                <li key={j} style={{fontSize:'.86rem',color:'var(--tx2)',paddingLeft:'1.25rem',position:'relative',lineHeight:1.8}}>
                  <span style={{position:'absolute',left:0,color:'var(--b)',fontWeight:700,top:'4px'}}>—</span>{b}
                </li>
              ))}
            </ul>
          </div>
        )) : (
          <div className="card reveal" style={{borderLeft:'2px solid var(--b)',paddingLeft:'2rem'}}>
            <p style={{color:'var(--mu)',fontFamily:'JetBrains Mono',fontSize:'.85rem'}}>Add experience in Sanity Studio → <a href="/studio" style={{color:'var(--b)'}}>open studio</a></p>
          </div>
        )}
      </section>
      <div className="sdiv"></div>

      {/* PROJECTS */}
      <section id="projects">
        <div className="sec-label reveal">03 — Projects</div>
        <h2 className="sec-title reveal">Featured <em>Projects</em></h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1.4rem'}}>
          {(projects?.length > 0) ? projects.map((p,i) => (
            <div key={i} className="card reveal" style={{display:'flex',flexDirection:'column',borderTop:`2px solid ${accentColors[i%accentColors.length]}`}}>
              <div style={{fontFamily:'JetBrains Mono',fontSize:'.62rem',color:'var(--mu)',letterSpacing:'.2em',marginBottom:'.75rem',textTransform:'uppercase'}}>Project {String(i+1).padStart(2,'0')}</div>
              <div style={{fontFamily:'Cormorant Garamond',fontSize:'1.3rem',fontWeight:700,marginBottom:'.8rem'}}>{p.title}</div>
              <div style={{fontSize:'.83rem',color:'var(--tx2)',lineHeight:1.85,flex:1,marginBottom:'1.25rem'}}>{p.description}</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'.4rem',marginBottom:'1.25rem'}}>
                {(p.tags||[]).map((t,j) => <span key={j} className="tag">{t}</span>)}
              </div>
              {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener" style={{fontFamily:'JetBrains Mono',fontSize:'.72rem',color:'var(--b)',textDecoration:'none',fontWeight:600,transition:'gap .2s'}}>→ View on GitHub</a>}
            </div>
          )) : (
            <div className="card reveal">
              <p style={{color:'var(--mu)',fontFamily:'JetBrains Mono',fontSize:'.85rem'}}>Add projects in Sanity Studio → <a href="/studio" style={{color:'var(--b)'}}>open studio</a></p>
            </div>
          )}
        </div>
      </section>
      <div className="sdiv"></div>

      {/* CERTIFICATIONS */}
      <section id="certifications">
        <div className="sec-label reveal">04 — Certifications</div>
        <h2 className="sec-title reveal">Certifi<em>cations</em></h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1.4rem'}}>
          {(certifications?.length > 0) ? certifications.map((c,i) => {
            const badgeUrl = c.badgeImage ? urlFor(c.badgeImage).width(300).height(200).fit('crop').url() : null
            return (
              <a key={i} href={c.credentialUrl} target="_blank" rel="noopener" className="card reveal"
                style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',gap:'.9rem',textDecoration:'none',color:'inherit',cursor:'pointer',position:'relative'}}>
                <span style={{position:'absolute',top:'.8rem',right:'.9rem',fontSize:'.8rem',color:'var(--b)'}}>↗</span>
                {badgeUrl ? (
                  <div style={{width:'100%',height:'120px',borderRadius:'3px',overflow:'hidden',border:'1.5px solid var(--bd)'}}>
                    <Image src={badgeUrl} alt={c.name} width={300} height={200} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  </div>
                ) : (
                  <div style={{width:'100%',height:'80px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2.5rem'}}>🏅</div>
                )}
                <div style={{fontSize:'.85rem',fontWeight:600,color:'var(--tx)',lineHeight:1.5}}>{c.name}</div>
                <div style={{fontFamily:'JetBrains Mono',fontSize:'.68rem',color:'var(--mu)'}}>{c.earnedDate}{c.expiryDate?` · Expires ${c.expiryDate}`:''}</div>
                <span style={{fontFamily:'JetBrains Mono',fontSize:'.67rem',padding:'.25rem .8rem',borderRadius:'2px',fontWeight:600,letterSpacing:'.07em',textTransform:'uppercase',background:'var(--bp)',color:'var(--b)',border:'1px solid var(--bm)'}}>{c.issuer}</span>
              </a>
            )
          }) : (
            <div className="card reveal">
              <p style={{color:'var(--mu)',fontFamily:'JetBrains Mono',fontSize:'.85rem'}}>Add certifications in Sanity Studio → <a href="/studio" style={{color:'var(--b)'}}>open studio</a></p>
            </div>
          )}
        </div>
      </section>
      <div className="sdiv"></div>

      {/* EDUCATION */}
      <section id="education">
        <div className="sec-label reveal">05 — Education</div>
        <h2 className="sec-title reveal">Edu<em>cation</em></h2>
        <div style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
          {(education?.length > 0) ? education.map((e,i) => {
            const logoUrl = e.logo ? urlFor(e.logo).width(120).height(120).fit('crop').url() : null
            return (
              <div key={i} className="card reveal" style={{borderLeft:`2px solid ${i===0?'var(--b)':'var(--t)'}`,paddingLeft:'2rem',display:'flex',gap:'2rem',alignItems:'flex-start'}}>
                {logoUrl && (
                  <div style={{width:'72px',height:'72px',borderRadius:'3px',background:'var(--bg)',border:'1.5px solid var(--bd)',display:'flex',alignItems:'center',justifyContent:'center',padding:'6px',flexShrink:0}}>
                    <Image src={logoUrl} alt={e.school} width={60} height={60} style={{width:'60px',height:'60px',objectFit:'contain'}}/>
                  </div>
                )}
                <div>
                  <div style={{fontFamily:'Cormorant Garamond',fontSize:'1.2rem',fontWeight:700,marginBottom:'.35rem'}}>{e.degree}</div>
                  <div style={{fontFamily:'JetBrains Mono',fontSize:'.78rem',color:i===0?'var(--b)':'var(--t)',marginBottom:'.4rem',fontWeight:600}}>{e.school}{e.gpa?` · GPA ${e.gpa}`:''}</div>
                  <div style={{color:'var(--mu)',fontFamily:'JetBrains Mono',fontSize:'.75rem',marginBottom:'1rem'}}>{e.startDate} – {e.endDate} · {e.location}</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'.4rem'}}>
                    {(e.courses||[]).map((c,j) => <span key={j} className="tag">{c}</span>)}
                  </div>
                </div>
              </div>
            )
          }) : (
            <div className="card reveal">
              <p style={{color:'var(--mu)',fontFamily:'JetBrains Mono',fontSize:'.85rem'}}>Add education in Sanity Studio → <a href="/studio" style={{color:'var(--b)'}}>open studio</a></p>
            </div>
          )}
        </div>
      </section>
      <div className="sdiv"></div>

      {/* CONTACT */}
      <section id="contact" style={{textAlign:'center'}}>
        <div className="sec-label reveal">06 — Contact</div>
        <h2 className="sec-title reveal">Let&apos;s <em>Connect</em></h2>
        <p className="reveal" style={{color:'var(--tx2)',fontSize:'.9rem',maxWidth:'480px',margin:'0 auto 2.5rem',lineHeight:2,fontFamily:'JetBrains Mono'}}>
          Actively seeking full-time opportunities — open to roles starting mid-{about?.graduationYear || '2027'}.
        </p>
        <div className="reveal" style={{display:'flex',justifyContent:'center',gap:'1rem',flexWrap:'wrap'}}>
          {[
            {label:'✉ UGA Email', href:`mailto:${about?.email||'Dhenuka.Chelumalla@uga.edu'}`},
            {label:'✉ Gmail', href:`mailto:${about?.gmail||'dhenuka555@gmail.com'}`},
            {label:'in LinkedIn', href:about?.linkedin||'https://www.linkedin.com/in/dhenuka-ch'},
            {label:'⌥ GitHub', href:about?.github||'https://github.com/Dhenuka-11'},
          ].map((l,i) => (
            <a key={i} href={l.href} target="_blank" rel="noopener"
              style={{display:'flex',alignItems:'center',gap:'.6rem',color:'var(--tx2)',textDecoration:'none',fontFamily:'JetBrains Mono',fontSize:'.78rem',fontWeight:500,padding:'.75rem 1.75rem',border:'1.5px solid var(--bd2)',borderRadius:'2px',background:'var(--surface)',transition:'all .25s',letterSpacing:'.05em'}}
              onMouseEnter={e=>{const t=e.currentTarget;t.style.borderColor='var(--b)';t.style.color='var(--b)'}}
              onMouseLeave={e=>{const t=e.currentTarget;t.style.borderColor='var(--bd2)';t.style.color='var(--tx2)'}}>
              {l.label}
            </a>
          ))}
        </div>
      </section>

      <footer style={{textAlign:'center',padding:'2rem',borderTop:'1px solid var(--bd)',fontFamily:'JetBrains Mono',fontSize:'.72rem',color:'var(--mu)',background:'var(--bg)',position:'relative',zIndex:2}}>
        <p>Dhenuka Chelumalla · {new Date().getFullYear()} · Built with Next.js & Sanity</p>
      </footer>
    </>
  )
}
