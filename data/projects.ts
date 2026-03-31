import type { LocalizedText } from "@/data/site-content";

export type ProjectImage = {
  src: string;
  alt: LocalizedText;
  caption: LocalizedText;
};

export type Project = {
  slug: string;
  title: string;
  website: string;
  category: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  role: LocalizedText;
  results: LocalizedText;
  technologies: string[];
  coverImage: string;
  heroImage: string;
  images: ProjectImage[];
  challenge: LocalizedText;
  strategy: LocalizedText;
  execution: LocalizedText;
  outcome: LocalizedText;
  metrics: LocalizedText[];
};

export const defaultProjects: Project[] = [
  {
    slug: "nemalia-crm",
    title: "nemalia-crm.vercel.app",
    website: "https://nemalia-crm.vercel.app",
    category: {
      fr: "Logiciel CRM & Operations Omnicanales",
      en: "CRM & Omnichannel Operations Software"
    },
    shortDescription: {
      fr: "CRM sur-mesure concu pour piloter la performance commerciale, le booking, le POS et les operations omnicanales de Nemalia.",
      en: "Custom-built CRM designed to drive commercial performance, booking, POS, and omnichannel operations for Nemalia."
    },
    description: {
      fr: "Conception et deploiement d'un outil CRM interne complet pour Nemalia, integrant gestion des contacts, pipeline commercial, systeme de booking, point de vente et pilotage des operations omnicanales — le tout dans un environnement securise pour l'equipe.",
      en: "Design and deployment of a full internal CRM tool for Nemalia, integrating contact management, sales pipeline, booking system, point of sale, and omnichannel operations management — all within a secure team environment."
    },
    role: {
      fr: "Responsable Marketing & Commercial — Concepteur produit, architecte fonctionnel, pilotage du developpement",
      en: "Marketing & Commercial Director — Product designer, functional architect, development lead"
    },
    results: {
      fr: "Centralisation des donnees clients, automatisation du suivi commercial, reduction du temps de gestion operationnelle et meilleure visibilite sur les KPI business.",
      en: "Centralized customer data, automated sales follow-up, reduced operational management time, and better visibility on business KPIs."
    },
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Prisma", "PostgreSQL", "NextAuth", "Framer Motion"],
    coverImage: "/images/projects/nemalia-crm/cover.jpg",
    heroImage: "/images/projects/nemalia-crm/cover.jpg",
    images: [
      {
        src: "/images/projects/nemalia-crm/screen-1.jpg",
        alt: {
          fr: "Dashboard principal du CRM Nemalia",
          en: "Nemalia CRM main dashboard"
        },
        caption: {
          fr: "Vue d'ensemble des KPI commerciaux et de l'activite en temps reel",
          en: "Real-time overview of commercial KPIs and activity"
        }
      },
      {
        src: "/images/projects/nemalia-crm/screen-2.jpg",
        alt: {
          fr: "Module de booking et gestion des reservations",
          en: "Booking and reservation management module"
        },
        caption: {
          fr: "Systeme de reservation integre pour les operations terrain",
          en: "Integrated booking system for field operations"
        }
      }
    ],
    challenge: {
      fr: "Nemalia operait sans outil centralise : les donnees clients, le suivi commercial et les operations etaient disperses entre tableurs, emails et outils tiers non connectes.",
      en: "Nemalia operated without a centralized tool: customer data, sales tracking, and operations were scattered across spreadsheets, emails, and disconnected third-party tools."
    },
    strategy: {
      fr: "Concevoir un outil unifie couvrant l'ensemble du cycle commercial — du premier contact a la vente, en passant par le booking et le suivi post-achat — avec une interface pensee pour l'equipe terrain.",
      en: "Design a unified tool covering the entire commercial cycle — from first contact to sale, through booking and post-purchase follow-up — with an interface built for field teams."
    },
    execution: {
      fr: "Developpement full-stack en Next.js avec base PostgreSQL, authentification securisee, modules CRM (contacts, pipeline, taches), POS, booking, et tableaux de bord analytics — deploye sur Vercel.",
      en: "Full-stack Next.js development with PostgreSQL, secure authentication, CRM modules (contacts, pipeline, tasks), POS, booking, and analytics dashboards — deployed on Vercel."
    },
    outcome: {
      fr: "L'equipe Nemalia dispose desormais d'un outil unique pour piloter l'ensemble de son activite commerciale, avec une reduction significative du temps de gestion et une meilleure prise de decision basee sur les donnees.",
      en: "The Nemalia team now has a single tool to manage all commercial activity, with significant reduction in management time and better data-driven decision making."
    },
    metrics: [
      {
        fr: "Donnees clients centralisees en un point unique",
        en: "Customer data centralized in one single source"
      },
      {
        fr: "Pipeline commercial visible et pilotable en temps reel",
        en: "Sales pipeline visible and manageable in real time"
      },
      {
        fr: "Operations omnicanales unifiees (CRM + POS + Booking)",
        en: "Unified omnichannel operations (CRM + POS + Booking)"
      }
    ]
  },
  {
    slug: "lumina-africa",
    title: "luminafrica.online",
    website: "https://luminafrica.online",
    category: {
      fr: "Plateforme De Croissance De Marque",
      en: "Brand Growth Platform"
    },
    shortDescription: {
      fr: "Une narration premium pour une plateforme panafricaine, pensee pour transformer une vision en confiance.",
      en: "A premium growth narrative for a pan-African platform, designed to turn vision into trust."
    },
    description: {
      fr: "L'etude de cas Lumina Africa presente un environnement de marque structure qui transforme un positionnement strategique en experience convaincante pour partenaires, talents et decideurs.",
      en: "The Lumina Africa case study presents a polished brand environment that turns strategic positioning into a compelling experience for partners, talent, and decision-makers."
    },
    role: {
      fr: "Growth Strategist, lead communication marketing, architecte UX de narration",
      en: "Growth Strategist, marketing communication lead, UX storytelling architect"
    },
    results: {
      fr: "Positionnement plus clair, perception executive renforcee et parcours plus oriente conversion.",
      en: "Sharper positioning, stronger executive perception, and a more conversion-ready journey."
    },
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    coverImage: "/images/projects/lumina-africa/cover.jpg",
    heroImage: "/images/projects/lumina-africa/cover.jpg",
    images: [
      {
        src: "/images/projects/lumina-africa/screen-1.jpg",
        alt: {
          fr: "Section dashboard Lumina Africa",
          en: "Lumina Africa dashboard section"
        },
        caption: {
          fr: "Un cadrage strategique qui rend la proposition plus credible",
          en: "Strategic framing that makes the proposition more credible"
        }
      },
      {
        src: "/images/projects/lumina-africa/cover-2.jpg",
        alt: {
          fr: "Presentation responsive Lumina Africa",
          en: "Lumina Africa responsive presentation"
        },
        caption: {
          fr: "Une narration mobile lisible pour partenaires et investisseurs",
          en: "A clean mobile narrative for partners and investors"
        }
      }
    ],
    challenge: {
      fr: "La marque devait exprimer ambition et maturite operationnelle sans tomber dans un discours generique.",
      en: "The brand needed to express ambition and operational maturity without slipping into generic messaging."
    },
    strategy: {
      fr: "Un systeme de narration structure a ete deploye pour aligner promesse, preuve de service et discours executive.",
      en: "A structured storytelling system was introduced to align promise, service proof, and executive messaging."
    },
    execution: {
      fr: "L'interface combine hierarchie visuelle, signaux de confiance image-led et cadrage strategique concis pour produire un effet boardroom-ready.",
      en: "The interface combines visual hierarchy, image-led trust cues, and concise strategic framing to create a boardroom-ready effect."
    },
    outcome: {
      fr: "Le resultat ouvre une entree plus convaincante pour les discussions commerciales, les partenariats et le trafic qualifie.",
      en: "The result creates a more persuasive entry point for sales conversations, partnerships, and qualified traffic."
    },
    metrics: [
      {
        fr: "Positionnement plus executive",
        en: "Sharper executive positioning"
      },
      {
        fr: "Confiance percue plus forte au premier regard",
        en: "Stronger first-view trust perception"
      },
      {
        fr: "Structure narrative reutilisable",
        en: "Reusable storytelling structure"
      }
    ]
  },
  {
    slug: "hublots",
    title: "hublots.co",
    website: "https://hublots.co",
    category: {
      fr: "Experience Commerce Premium",
      en: "Premium Commerce Experience"
    },
    shortDescription: {
      fr: "Une vitrine visuelle raffinee qui transforme la consultation produit en parcours de decouverte premium.",
      en: "A refined visual showcase that turns product browsing into a premium discovery journey."
    },
    description: {
      fr: "Ce cas met en scene une experience qui combine communication merchandising et storytelling de marque pour soutenir engagement et conversion.",
      en: "This case study blends merchandising communication and brand storytelling to support both engagement and conversion."
    },
    role: {
      fr: "Growth Strategist, planification communication, conseil en storytelling produit",
      en: "Growth Strategist, communication planner, product storytelling consultant"
    },
    results: {
      fr: "Hierarchie produit plus claire, signaux merchandising plus forts et memorisation de marque renforcee.",
      en: "Clearer product hierarchy, stronger merchandising signals, and stronger brand memorability."
    },
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    coverImage: "/images/projects/hublots/cover.jpg",
    heroImage: "/images/projects/hublots/cover.jpg",
    images: [
      {
        src: "/images/projects/hublots/screen-1.jpg",
        alt: {
          fr: "Galerie premium Hublots",
          en: "Hublots premium gallery"
        },
        caption: {
          fr: "Une decouverte produit pilotee par l'image",
          en: "Image-led product discovery"
        }
      },
      {
        src: "/images/projects/hublots/screen-2.jpg",
        alt: {
          fr: "Page detail Hublots",
          en: "Hublots detail page"
        },
        caption: {
          fr: "Une hierarchie d'information qui preserve le caractere aspirationnel",
          en: "Information hierarchy that preserves aspiration"
        }
      }
    ],
    challenge: {
      fr: "Le parcours devait concilier exigence esthetique, comprehension rapide de la valeur et intention d'achat.",
      en: "The journey had to balance strong aesthetic expectations, fast value comprehension, and purchase intent."
    },
    strategy: {
      fr: "L'experience a ete reoriente e autour d'images premium, de preuves concises et d'un flux plus lisible vers la decision.",
      en: "The experience was reorganized around premium imagery, concise proof points, and a cleaner flow toward decision."
    },
    execution: {
      fr: "Les modules de contenu fonctionnent comme des stories editoriales produit, soutenues par des layouts responsives et une navigation image-led.",
      en: "Content modules work like editorial product features, supported by responsive layouts and image-led navigation."
    },
    outcome: {
      fr: "La plateforme presente des produits avec plus d'autorite et soutient une perception de qualite plus forte.",
      en: "The platform now presents products with more authority and supports a stronger quality perception."
    },
    metrics: [
      {
        fr: "Credibilite produit accrue",
        en: "Higher product credibility"
      },
      {
        fr: "Parcours plus court vers l'intention",
        en: "Faster path to intent"
      },
      {
        fr: "Souvenir de marque plus premium",
        en: "More premium brand recall"
      }
    ]
  },
  {
    slug: "boost-performers",
    title: "boost-performers.com",
    website: "https://boost-performers.com",
    category: {
      fr: "Positionnement Performance Marketing",
      en: "Performance Marketing Positioning"
    },
    shortDescription: {
      fr: "Une narration plus incisive, construite pour la conversion, le coaching premium et l'engagement scalable.",
      en: "A sharper conversion narrative built for premium coaching and scalable engagement."
    },
    description: {
      fr: "Boost Performers demandait un recit portfolio axe resultats, capable de transmettre elan, discipline et transformation avec impact visuel.",
      en: "Boost Performers required a results-driven portfolio story that communicates momentum, discipline, and transformation with visual impact."
    },
    role: {
      fr: "Growth Strategist, specialiste funnel, lead narration de marque",
      en: "Growth Strategist, funnel specialist, brand narrative lead"
    },
    results: {
      fr: "Offre plus lisible, lien de confiance plus fort entre promesse, autorite et passage a l'action.",
      en: "A clearer offer structure and a stronger trust bridge between promise, authority, and action."
    },
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    coverImage: "/images/projects/boost-performers/cover.jpg",
    heroImage: "/images/projects/boost-performers/cover.jpg",
    images: [
      {
        src: "/images/projects/boost-performers/screen-1.jpg",
        alt: {
          fr: "Section offre Boost Performers",
          en: "Boost Performers offer section"
        },
        caption: {
          fr: "Un discours conversion-led aligne sur des codes premium",
          en: "Conversion-led messaging aligned with premium cues"
        }
      },
      {
        src: "/images/projects/boost-performers/screen-2.jpg",
        alt: {
          fr: "Funnel mobile Boost Performers",
          en: "Boost Performers mobile funnel"
        },
        caption: {
          fr: "Un flux mobile clair pour soutenir l'action",
          en: "A clean mobile flow designed for action"
        }
      }
    ],
    challenge: {
      fr: "La marque devait inspirer confiance tres vite, tout en conservant une sensation d'aspiration et de progression.",
      en: "The brand needed to build trust quickly while preserving a sense of aspiration and progress."
    },
    strategy: {
      fr: "Le message a ete reconstruit autour de marqueurs d'autorite, de langage de transformation et de preuves visuelles mieux distribuees.",
      en: "The message framework was rebuilt around authority markers, transformation language, and better distributed visual proof."
    },
    execution: {
      fr: "L'interface privilegie des appels a l'action affirmes, des presentations visuelles couchees et des blocs de contenu qui soutiennent l'elan.",
      en: "The interface prioritizes decisive calls to action, layered visuals, and content blocks that support momentum."
    },
    outcome: {
      fr: "Le recit final rend l'offre plus simple a comprendre, plus facile a croire et plus simple a activer.",
      en: "The final narrative makes the offer easier to understand, trust, and activate."
    },
    metrics: [
      {
        fr: "Ecran d'ouverture plus conversion-ready",
        en: "More conversion-ready opening screen"
      },
      {
        fr: "Lien plus fort entre promesse et preuve",
        en: "Stronger link between promise and proof"
      },
      {
        fr: "Clarte amelioree sur mobile et desktop",
        en: "Improved clarity across mobile and desktop"
      }
    ]
  },
  {
    slug: "sawa-rh",
    title: "sawa-rh-web.vercel.app",
    website: "https://sawa-rh-web.vercel.app/fr",
    category: {
      fr: "Communication Plateforme RH",
      en: "HR Platform Communication"
    },
    shortDescription: {
      fr: "Une narration executive pour une plateforme RH, construite pour paraitre stable, credible et operationnelle.",
      en: "An executive-grade platform story built to feel stable, credible, and operational."
    },
    description: {
      fr: "Sawa RH necessitait un recit digital propre et rassurant, ou la confiance, la clarte des services et la maturite operationnelle restent visibles a chaque etape.",
      en: "Sawa RH needed a clean and reassuring digital story where trust, service clarity, and operational maturity stay visible at every step."
    },
    role: {
      fr: "Growth Strategist, architecte communication B2B, lead UX content",
      en: "Growth Strategist, B2B communication architect, UX content lead"
    },
    results: {
      fr: "Lecture de l'offre amelioree, signaux de confiance enterprise plus nets et presentation plus mature.",
      en: "Improved offer readability, clearer enterprise trust signals, and a more mature presentation."
    },
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    coverImage: "/images/projects/sawa-rh/cover.jpg",
    heroImage: "/images/projects/sawa-rh/cover.jpg",
    images: [
      {
        src: "/images/projects/sawa-rh/screen-1.jpg",
        alt: {
          fr: "Vue d'ensemble services Sawa RH",
          en: "Sawa RH service overview"
        },
        caption: {
          fr: "Une communication de service orientee confiance decideur",
          en: "Service communication designed for decision-maker trust"
        }
      },
      {
        src: "/images/projects/sawa-rh/screen-2.png",
        alt: {
          fr: "Vue mobile Sawa RH",
          en: "Sawa RH mobile view"
        },
        caption: {
          fr: "Une presentation mobile claire et rassurante",
          en: "A clear and reassuring mobile presentation"
        }
      }
    ],
    challenge: {
      fr: "La plateforme devait communiquer fiabilite operationnelle et approche humaine sans glisser vers des codes corporate fades.",
      en: "The platform had to communicate operational reliability and a human approach without slipping into bland corporate patterns."
    },
    strategy: {
      fr: "L'architecture narrative a combine rythme visuel stable et messages strategiques concis pour rendre le service a la fois professionnel et accessible.",
      en: "The storytelling architecture paired a stable visual rhythm with concise strategic messaging to make the service feel both professional and accessible."
    },
    execution: {
      fr: "Des sections claires, des preuves choisies et une progression guidee ont ete utilisees pour produire une experience plus executive-facing.",
      en: "Clear sections, selective proof points, and guided progression were used to create a more executive-facing experience."
    },
    outcome: {
      fr: "La marque projette desormais une credibilite plus forte pour les conversations clients et l'onboarding de parties prenantes.",
      en: "The brand now projects stronger credibility for client conversations and stakeholder onboarding."
    },
    metrics: [
      {
        fr: "Presentation enterprise plus credible",
        en: "More credible enterprise-facing presentation"
      },
      {
        fr: "Comprendre le service plus vite",
        en: "Clearer service understanding"
      },
      {
        fr: "Blocs de communication reutilisables",
        en: "More reusable communication blocks"
      }
    ]
  },
  {
    slug: "ln-foot",
    title: "ln-foot.com",
    website: "https://ln-foot.com",
    category: {
      fr: "Plateforme Editoriale Audience",
      en: "Audience Content Platform"
    },
    shortDescription: {
      fr: "Une experience narrative orientee contenu, qui combine energie editoriale et UX propre orientee performance.",
      en: "A storytelling-first content experience combining editorial energy with clean, performance-minded UX."
    },
    description: {
      fr: "LN Foot a ete pense comme une destination editoriale dynamique mais credible, ou la rapidite des contenus reste maitrisee par une mise en scene premium.",
      en: "LN Foot was positioned as an energetic yet credible editorial destination where fast-moving content still feels premium."
    },
    role: {
      fr: "Growth Strategist, conseil UX editorial, lead communication marketing",
      en: "Growth Strategist, editorial UX consultant, marketing communication lead"
    },
    results: {
      fr: "Narration de publication plus claire, hierarchie visuelle plus forte et identite de contenu plus memorable.",
      en: "A cleaner publishing narrative, stronger visual hierarchy, and a more memorable content identity."
    },
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    coverImage: "/images/projects/ln-foot/cover.jpg",
    heroImage: "/images/projects/ln-foot/cover.jpg",
    images: [
      {
        src: "/images/projects/ln-foot/screen-1.jpg",
        alt: {
          fr: "Homepage editoriale LN Foot",
          en: "LN Foot editorial homepage"
        },
        caption: {
          fr: "Une narration editoriale energique mais structuree",
          en: "Editorial storytelling that stays energetic yet structured"
        }
      },
      {
        src: "/images/projects/ln-foot/screen-2.jpg",
        alt: {
          fr: "Vue mobile LN Foot",
          en: "LN Foot mobile view"
        },
        caption: {
          fr: "Une lecture responsive plus fluide et plus scan-friendly",
          en: "A more fluid and scan-friendly responsive layout"
        }
      }
    ],
    challenge: {
      fr: "L'experience devait rester dynamique et riche en contenus sans devenir bruyante ni confuse.",
      en: "The experience needed to stay dynamic and content-rich without becoming noisy or confusing."
    },
    strategy: {
      fr: "Le systeme de contenu a ete repense autour d'une hierarchie editoriale plus nette, d'un scan guide par l'image et de reperes a fort contraste.",
      en: "The content system was redesigned around clearer editorial hierarchy, image-led scanning, and stronger directional cues."
    },
    execution: {
      fr: "Les modules visuels rythment l'attention pour rendre plus lisibles les contenus mis en avant, la recence et les clusters thematiques.",
      en: "Visual modules pace attention, making featured content, recency, and thematic clusters easier to parse."
    },
    outcome: {
      fr: "La plateforme soutient une meilleure engagement audience tout en conservant une signature editoriale premium.",
      en: "The platform supports stronger audience engagement while preserving a premium editorial signature."
    },
    metrics: [
      {
        fr: "Consommation de contenu plus structuree",
        en: "More structured content consumption"
      },
      {
        fr: "Mise en avant plus differenciante",
        en: "Better differentiation for featured stories"
      },
      {
        fr: "Perception de finition plus elevee",
        en: "Higher perceived polish"
      }
    ]
  }
];
