import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  ExternalLink,
  MapPin,
  Briefcase,
  Code2,
  Sparkles,
  Download,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


// ------------------------------
// Data
// ------------------------------
const projects = [
  {
    title: "ProcastNo",
    desc: "A Pomodoro timer with authentication, custom intervals, and productivity tracking.",
    tags: ["ReactJS", "Firebase", "Chart.js"],
    link: "https://procrastno-e216a.web.app/",
    repo: "https://github.com/akatahin/procrastno",
  },
  {
    title: "Virtual Reality Basketball Game",
    desc: "Immersive Unity court with motion input, realistic ball physics, and scoring mechanics.",
    tags: ["Unity", "C#", "META XR SDK"],
    link: "#",
    repo: "#",
  },
  {
    title: "Autonomous Search & Rescue Robot",
    desc: "ROS2-based robot detecting AprilTags, navigating, and retrieving objects autonomously.",
    tags: ["ROS2", "Python", "Computer Vision"],
    link: "#",
    repo: "#",
  },
];

const experience = [
  {
    role: "Leadership Intern - STEM Initiative",
    company: "Mary Ann Shaw Center",
    time: "Jan 2023 – May 2025",
    bullets: [
      "Designed CS & IT lesson plans impacting 100+ students.",
      "Led 15 volunteers delivering hands-on education.",
      "Coordinated rosters, reports, and logistics.",
    ],
  },
  {
    role: "Technology Specialist",
    company: "S.I. Newhouse School of Public Communications",
    time: "Aug 2024 – May 2025",
    bullets: [
      "Managed labs/edit suites operations and troubleshooting.",
      "Maintained WordPress sites and handled help desk tickets.",
      "Provided technical support and equipment management.",
    ],
  },
  {
    role: "Summer Intern - Emerging Talent Program",
    company: "JPMorgan Chase & Co.",
    time: "Jul 2021 – Aug 2021",
    bullets: [
      "Created SQL data reports improving app performance by 15%.",
      "Built automated data validation tool reducing bugs by 25%.",
      "Performed advanced analysis that boosted engagement by 20%.",
    ],
  },
];

const skills = [
  "Java",
  "Python",
  "C/C++",
  "C#/.NET",
  "JavaScript",
  "TypeScript",
  "SQL",
  "ReactJS",
  "Node.js",
  "Spring",
  "Angular",
  "Flask",
  "Firebase",
  "ROS2",
  "Unity",
  "Linux",
  "Git",
  "Agile/Scrum",
  "Tailwind",
  "Framer Motion",
];

// ------------------------------
// Utilities & Components
// ------------------------------
import type { ReactNode, ComponentType, SVGProps } from "react";

type SectionProps = {
  id: string;
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: ReactNode;
};

const Section = ({ id, title, icon: Icon, children }: SectionProps) => (
  <section id={id} className="scroll-mt-24 py-16 sm:py-24">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex items-center gap-3 mb-10">
        <Icon className="w-6 h-6 text-sky-400" />
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
      </div>
      {children}
    </motion.div>
  </section>
);

function runSanityTests() {
  const assertions = [
    {
      name: "Projects array has 3 items",
      pass: Array.isArray(projects) && projects.length === 3,
    },
    {
      name: "ProcastNo has http link",
      pass: typeof projects[0].link === "string" && projects[0].link.startsWith("http"),
    },
    {
      name: "VR project has no demo (#)",
      pass: projects[1].link === "#",
    },
    {
      name: "Required sections exist in DOM",
      pass: ["home", "about", "projects", "experience", "contact"].every(
        (id) => !!document.getElementById(id)
      ),
    },
    // Added tests
    {
      name: "Footer has 3+ links",
      pass: document.querySelectorAll('footer a[href]').length >= 3,
    },
    {
      name: "Footer email link is mailto:",
      pass: Array.from(document.querySelectorAll('footer a[href]')).some(a => (a as HTMLAnchorElement).href.startsWith('mailto:')),
    },
  ];
  assertions.forEach((t) => {
    // eslint-disable-next-line no-console
    (t.pass ? console.log : console.warn)(`${t.pass ? "✅" : "⚠️"} ${t.name}`);
  });
}

// ------------------------------
// Main component
// ------------------------------
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollPercent, setScrollPercent] = useState(0);

  // Initialize theme on mount from localStorage or system preference
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = stored ? stored === "dark" : prefersDark;
      setDark(isDark);
      document.documentElement.classList.toggle("dark", isDark);
      console.log("Theme init:", isDark ? "dark" : "light");
    } catch (_) {}
  }, []);

  // Footer typewriter animation (auto-updating year)
  const fullFooterText = `© ${new Date().getFullYear()} Nahid Kalam. All rights reserved.`;
  const [footerText, setFooterText] = useState("");
  useEffect(() => {
    try {
      const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) { setFooterText(fullFooterText); return; }
      let i = 0;
      let cancelled = false;
      const type = () => {
        if (cancelled) return;
        if (i <= fullFooterText.length) {
          setFooterText(fullFooterText.slice(0, i));
          i += 1;
          setTimeout(type, 35);
        } else {
          setTimeout(() => {
            i = 0;
            setFooterText("");
            setTimeout(type, 200);
          }, 1200);
        }
      };
      type();
      return () => { cancelled = true; };
    } catch (_) {
      setFooterText(fullFooterText);
    }
  }, []);

  // Smooth scroll with sticky-header offset
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    const headerOffset = 72;
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  // Scroll-spy
  useEffect(() => {
    const ids = ["home", "about", "projects", "experience", "contact"];
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px 0px -60% 0px",
      threshold: 0.2,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, options);
    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  // Run tests after mount
  useEffect(() => {
    try { runSanityTests(); } catch (_) {}
  }, []);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollPercent(Math.max(0, Math.min(100, p)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-white text-slate-900 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white transition-colors scroll-smooth">
        {/* subtle background grid overlay */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 [background:linear-gradient(0deg,transparent_24px,rgba(148,163,184,0.05)_25px),linear-gradient(90deg,transparent_24px,rgba(148,163,184,0.05)_25px)] [background-size:25px_25px]" />
        {/* Nav */}
        <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
          {/* scroll progress bar */}
          <div className="absolute left-0 right-0 top-0 h-0.5 bg-transparent">
            <div className="h-full bg-gradient-to-r from-sky-400 to-indigo-400" style={{ width: `${scrollPercent}%` }} />
          </div>
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("home");
              }}
              className="font-bold tracking-tight text-xl flex items-center gap-2 text-sky-400"
            >
              <Sparkles className="w-5 h-5" />
              <span>Nahid Kalam</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-8 text-sm font-medium">
              {[
                { id: "about", label: "About" },
                { id: "projects", label: "Projects" },
                { id: "experience", label: "Experience" },
                { id: "contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(link.id);
                  }}
                  aria-current={activeSection === link.id ? "page" : undefined}
                  className={`hover:text-sky-300 transition-colors ${
                    activeSection === link.id ? "text-sky-300" : ""
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="default" asChild>
                {/* Put your PDF in /public/resume.pdf */}
                <a href="/resume.pdf" className="inline-flex items-center gap-2 rounded-md shadow-md hover:shadow-xl hover:scale-[1.05] transition-transform transition-shadow" download>
                  <Download className="w-4 h-4" /> Resume
                </a>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="default"
                size="icon"
                className="sm:hidden bg-sky-500 hover:bg-sky-600 text-white rounded-full"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle navigation"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </nav>

          {/* Mobile drawer */}
          {mobileOpen && (
            <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
              <div className="max-w-6xl mx-auto px-4 py-4 grid gap-3">
                {["about", "projects", "experience", "contact"].map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToId(id)}
                    className={`text-left px-3 py-3 rounded-md border ${
                      activeSection === id
                        ? 'bg-slate-800 text-sky-300 border-sky-700/40'
                        : 'text-slate-200 border-transparent hover:bg-slate-800 hover:border-sky-700/40'
                    }`}
                    aria-current={activeSection === id ? "page" : undefined}
                  >
                    {id[0].toUpperCase() + id.slice(1)}
                  </button>
                ))}
                <a
                  href="/resume.pdf"
                  download
                  className="w-full text-center px-3 py-3 rounded-md bg-sky-500 text-white font-medium hover:bg-sky-600"
                >
                  Resume
                </a>
                <a
                  href="mailto:nkalam12@outlook.com"
                  className="px-3 py-3 rounded-md hover:bg-slate-800 text-slate-200 text-center"
                >
                  Email
                </a>
              </div>
            </div>
          )}
        </header>

        {/* Hero */}
        <section id="home" className="relative overflow-hidden py-28 sm:py-40">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),transparent_70%)] animate-pulse" />
            {/* floating orbs */}
            <motion.div
              className="absolute -top-10 -left-10 h-36 w-36 rounded-full blur-3xl bg-sky-400/20"
              animate={{ x: [0, 20, -10, 0], y: [0, 10, -10, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full blur-3xl bg-indigo-400/20"
              animate={{ x: [0, -15, 10, 0], y: [0, -10, 10, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm uppercase tracking-widest text-sky-300 mb-4">Hello, I’m</p>
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Nahid Kalam
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">
                I'm a Computer Science graduate with experience in full-stack development, data-driven systems, and scalable applications. I enjoy solving complex problems and building reliable, high-performing technology.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <Button asChild size="lg">
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("projects");
                    }}
                  >
                    Explore Projects
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("contact");
                    }}
                    className="text-white border border-white bg-transparent"
                  >
                    Get in Touch
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About */}
        <Section id="about" title="About" icon={MapPin}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <Card className="lg:col-span-2 bg-white border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:border-sky-400 transition ring-2 ring-sky-500/20 hover:ring-sky-400/60 hover:scale-[1.02]">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-sky-600 dark:text-sky-300">Who I am</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-slate-600 dark:text-slate-300">
                <p>
                  I am a Computer Science graduate from Syracuse University with a strong foundation in software development and systems thinking. I enjoy working across the technology stack, creating intuitive user experiences, and exploring how technology can responsibly shape society. My academic and professional experiences have given me the chance to grow skills in programming, problem solving, and teamwork across different groups.

Outside of my technical background, I have interests that keep me balanced and curious. I am a big soccer fan who follows the sport closely and enjoy the strategy and teamwork it represents. I also like cooking, running through the city, and hiking for fresh air. I am a sports enthusiast in general and value the lessons in resilience and adaptability that come from athletics. Living in New York City, I am always looking for ways to grow, mentor others, and be part of communities that value innovation and learning.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:border-sky-400 transition ring-2 ring-sky-500/20 hover:ring-sky-400/60 hover:scale-[1.02]">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-sky-600 dark:text-sky-300">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-3">
                  {skills.map((s) => (
                    <li
                      key={s}
                      className="inline-flex items-center rounded-full px-3 py-1 text-sm border border-sky-500/50 bg-sky-400/10 text-sky-200"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" title="Projects" icon={Code2}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((p) => (
              <motion.div
                key={p.title}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <Card className="h-full bg-white border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:border-sky-400 transition ring-2 ring-sky-500/20 hover:ring-sky-400/60 hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between gap-3 text-lg font-semibold text-slate-900 dark:text-white">
                      <span>{p.title}</span>
                      {p.link && p.link !== "#" ? (
                        <a
                          href={p.link}
                          className="text-sm inline-flex items-center gap-1 hover:text-sky-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : null}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-full px-3 py-1 text-sm border border-sky-500/50 bg-sky-400/10 text-sky-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-3">
                      {p.repo && p.repo !== "#" ? (
                        <Button variant="secondary" asChild size="sm">
                          <a
                            href={p.repo}
                            className="inline-flex items-center gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4" /> Code
                          </a>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          Code
                        </Button>
                      )}
                      {p.link && p.link !== "#" ? (
                        <Button variant="outline" asChild size="sm">
                          <a
                            href={p.link}
                            className="inline-flex items-center gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4" /> Demo
                          </a>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" title="Experience" icon={Briefcase}>
          <div className="space-y-10">
            {experience.map((e) => (
              <Card
                key={e.role}
                className="bg-white border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:border-sky-400 transition ring-2 ring-sky-500/20 hover:ring-sky-400/60 hover:scale-[1.02]"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                    <div>
                      <span>{e.role}</span>
                      <span className="block sm:inline text-slate-500 dark:text-slate-400 sm:ml-2">@ {e.company}</span>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{e.time}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact" icon={Mail}>
          <Card className="bg-white border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:border-sky-400 transition ring-2 ring-sky-500/20 hover:ring-sky-400/60 hover:scale-[1.02]">
            <CardContent className="py-10 px-4 sm:px-10">
              <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-14 text-center sm:text-left">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-sky-600 dark:text-sky-300 mb-3">Let’s connect</h3>
                  <p className="text-slate-600 dark:text-slate-300 max-w-lg mb-6 mx-auto sm:mx-0">
                    I’m open to software engineering roles, collaborations, and impactful projects. Reach out via email or LinkedIn.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 w-full">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <a href="mailto:nkalam12@outlook.com" className="inline-flex items-center gap-2 justify-center">
                        <Mail className="w-5 h-5" /> Email me
                      </a>
                    </Button>
                    <Button variant="outline" asChild size="lg" className="w-full sm:w-auto">
                      <a
                        href="https://www.linkedin.com/in/nahidkalam"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 justify-center"
                      >
                        <Linkedin className="w-5 h-5" /> LinkedIn
                      </a>
                    </Button>
                    <Button variant="secondary" asChild size="lg" className="w-full sm:w-auto">
                      <a
                        href="https://github.com/nahidkalam"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 justify-center"
                      >
                        <Github className="w-5 h-5" /> GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Footer */}
        <footer className="py-10 text-center text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 mt-16">
          <div className="flex justify-center gap-6 mb-3">
            <a href="mailto:nkalam12@outlook.com" aria-label="Email" className="hover:text-sky-300 transition transform hover:scale-110 hover:shadow-lg hover:shadow-sky-400/30 rounded-full p-2">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com/nahidkalam" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-sky-300 transition transform hover:scale-110 hover:shadow-lg hover:shadow-sky-400/30 rounded-full p-2">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/nahidkalam" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-sky-300 transition transform hover:scale-110 hover:shadow-lg hover:shadow-sky-400/30 rounded-full p-2">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <div className="text-xs text-slate-500" aria-live="polite">
            {footerText}
            <span className="ml-1 animate-pulse" aria-hidden="true">|</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
