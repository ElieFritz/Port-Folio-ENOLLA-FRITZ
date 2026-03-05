import type { Project } from "@/data/projects";

export type Language = "fr" | "en";

export type LocalizedText = {
  fr: string;
  en: string;
};

export type SupportCard = {
  title: LocalizedText;
  description: LocalizedText;
};

export type ExpertiseItem = {
  title: LocalizedText;
  description: LocalizedText;
};

export type CertificationItem = {
  title: LocalizedText;
  description: LocalizedText;
  link?: string;
};

export type ContentImage = {
  src: string;
  alt: LocalizedText;
};

export type ShowcaseVideoKind = "mp4" | "youtube" | "vimeo";

export type ShowcaseVideo = {
  kind: ShowcaseVideoKind;
  src: string;
  title?: LocalizedText;
  poster?: ContentImage;
};

export type ShowcaseItem = {
  title: LocalizedText;
  description: LocalizedText;
  image?: ContentImage;
  video?: ShowcaseVideo;
  tag?: LocalizedText;
  link?: string;
};

export type ShowcaseSection = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  items: ShowcaseItem[];
};

export type ContactPoint = {
  label: LocalizedText;
  value: string;
  href?: string;
};

export type AboutSection = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  image?: ContentImage;
  bio: LocalizedText;
  badges: LocalizedText[];
  contactPoints: ContactPoint[];
};

export type ExperienceEntry = {
  company: string;
  period: string;
  role: LocalizedText;
  summary: LocalizedText;
  highlights: LocalizedText[];
};

export type EducationEntry = {
  period: string;
  institution: string;
  degree: LocalizedText;
  focus: LocalizedText;
};

export type HeroMetric = {
  value: string;
  label: LocalizedText;
};

export type HeroQuickLink = {
  label: LocalizedText;
  href: string;
};

export type HomePageContent = {
  hero: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    primaryCta: LocalizedText;
    secondaryCta: LocalizedText;
    profileImage?: ContentImage;
    proofMetrics?: HeroMetric[];
    quickLinks?: HeroQuickLink[];
  };
  supportCards: SupportCard[];
  strategicSignals: LocalizedText[];
  expertise: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    items: ExpertiseItem[];
  };
  certifications: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    items: CertificationItem[];
  };
  experienceSection?: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    items: ExperienceEntry[];
  };
  educationSection?: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    items: EducationEntry[];
  };
  aboutSection?: AboutSection;
  managedPagesSection?: ShowcaseSection;
  flyersSection?: ShowcaseSection;
  motionSection?: ShowcaseSection;
  contractProofSection?: ShowcaseSection;
  trainingSessionSection?: ShowcaseSection;
  systemsNetworkSection?: ShowcaseSection;
  projects: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
  };
};

export type PortfolioContent = {
  contactEmail: string;
  homePageContent: HomePageContent;
  projects: Project[];
};

export function getLanguage(value?: string | string[]): Language {
  if (Array.isArray(value)) {
    return getLanguage(value[0]);
  }

  return value === "en" ? "en" : "fr";
}

export function t(text: LocalizedText, language: Language) {
  return text[language];
}

export const defaultHomePageContent: HomePageContent = {
  hero: {
    eyebrow: {
      fr: "ENOLLA ELIE FRITZ DELANGUE",
      en: "ENOLLA ELIE FRITZ DELANGUE"
    },
    title: {
      fr: "Responsable Marketing & Communication Corporate",
      en: "Corporate Marketing & Communication Manager"
    },
    description: {
      fr: "Expert en marketing, communication et developpement d'affaires B2B avec une double competence technologique et manageriale. Ingenieur en administration systemes et reseaux, diplome d'un Master 2 en Marketing & Communication d'entreprise, avec un MBA en cours, je pilote des strategies de croissance, de marque et de partenariats en reliant vision business et execution operationnelle.",
      en: "Marketing, communication, and B2B business development leader with a dual technical and managerial profile. Trained in systems and network administration, holding a Master's degree in corporate marketing and communication, with an MBA in progress, I lead growth, brand, and partnership strategies by connecting business vision to operational execution."
    },
    primaryCta: {
      fr: "Decouvrir Mes Realisations",
      en: "Explore My Work"
    },
    secondaryCta: {
      fr: "Me Contacter",
      en: "Contact Me"
    },
    proofMetrics: [
      {
        value: "6+",
        label: {
          fr: "ans d'experience entrepreneuriale",
          en: "years of entrepreneurial experience"
        }
      },
      {
        value: "+40%",
        label: {
          fr: "leads qualifies en acquisition multicanale",
          en: "qualified leads from multichannel acquisition"
        }
      },
      {
        value: "TOP 3",
        label: {
          fr: "growth marketing & lead generation (Favikon)",
          en: "growth marketing & lead generation (Favikon)"
        }
      },
      {
        value: "5+",
        label: {
          fr: "evenements B2B pilotes",
          en: "B2B partner events delivered"
        }
      }
    ],
    quickLinks: [
      {
        label: {
          fr: "Voir mon CV",
          en: "View Resume"
        },
        href: "/documents/enolla-delangue-cv.pdf"
      },
      {
        label: {
          fr: "LinkedIn",
          en: "LinkedIn"
        },
        href: "https://www.linkedin.com/in/fritzenolla/"
      }
    ],
    profileImage: {
      src: "/images/profile/enolla-cv-profile.jpg",
      alt: {
        fr: "Portrait de Enolla Elie Fritz Delangue",
        en: "Portrait of Enolla Elie Fritz Delangue"
      }
    }
  },
  supportCards: [
    {
      title: {
        fr: "Profil Executif",
        en: "Executive Profile"
      },
      description: {
        fr: "Pilotage 360 de la communication corporate, de la croissance marketing et de la coordination business.",
        en: "360 leadership across corporate communication, marketing growth, and business coordination."
      }
    },
    {
      title: {
        fr: "Contact & Disponibilite",
        en: "Contact & Availability"
      },
      description: {
        fr: "Disponible pour missions marketing, communication corporate et developpement B2B en francais et en anglais.",
        en: "Available for marketing, corporate communication, and B2B development missions in French and English."
      }
    }
  ],
  strategicSignals: [
    {
      fr: "TOP 3 growth marketing & lead generation (Favikon)",
      en: "TOP 3 growth marketing & lead generation (Favikon)"
    },
    {
      fr: "Approche hybride: marketing, communication corporate et B2B",
      en: "Hybrid approach: marketing, corporate communication, and B2B"
    },
    {
      fr: "Culture de la preuve: resultats, cas reels et livrables concrets",
      en: "Proof-driven posture: results, real cases, and concrete deliverables"
    }
  ],
  expertise: {
    eyebrow: {
      fr: "Competences Cle",
      en: "Core Expertise"
    },
    title: {
      fr: "Un profil hybride pour piloter la marque, la croissance et la coordination technique.",
      en: "A hybrid profile built to lead brand, growth, and technical coordination."
    },
    description: {
      fr: "Mon parcours combine marketing operationnel, communication corporate, developpement commercial, creation de contenus et culture technique systemes & reseaux.",
      en: "My background combines operational marketing, corporate communication, business development, content production, and systems & network fluency."
    },
    items: [
      {
        title: {
          fr: "Marketing & Performance",
          en: "Marketing & Performance"
        },
        description: {
          fr: "Marketing operationnel, strategie digitale, go-to-market, lead generation, campagnes multicanales, pilotage KPI et ROI.",
          en: "Operational marketing, digital strategy, go-to-market, lead generation, multichannel campaigns, KPI and ROI management."
        }
      },
      {
        title: {
          fr: "Communication Corporate",
          en: "Corporate Communication"
        },
        description: {
          fr: "Relations presse, communication interne, copywriting FR/EN, success stories clients, emailing cible et coherence de marque.",
          en: "Press relations, internal communication, FR/EN copywriting, client success stories, targeted email campaigns, and brand consistency."
        }
      },
      {
        title: {
          fr: "Business Dev & Partenariats",
          en: "Business Development & Partnerships"
        },
        description: {
          fr: "Prospection B2B, apport d'affaires, gestion de portefeuille, negociation de contrats, partenariats et relation client strategique.",
          en: "B2B prospecting, deal sourcing, portfolio management, contract negotiation, partnerships, and strategic client relationships."
        }
      },
      {
        title: {
          fr: "Creation & Coordination Technique",
          en: "Creative & Technical Coordination"
        },
        description: {
          fr: "Adobe Creative Suite, Salesforce, HubSpot, Google Analytics, Office 365, avec une base solide en administration systemes et reseaux.",
          en: "Adobe Creative Suite, Salesforce, HubSpot, Google Analytics, Office 365, backed by solid systems and network administration foundations."
        }
      },
      {
        title: {
          fr: "Conception Logicielle",
          en: "Software Design"
        },
        description: {
          fr: "Conception d'applications web, structuration d'architecture fonctionnelle, modelisation de parcours utilisateurs et cadrage des specifications.",
          en: "Web application design, functional architecture structuring, user journey modeling, and specification framing."
        }
      }
    ]
  },
  certifications: {
    eyebrow: {
      fr: "Certifications & Montee En Competence",
      en: "Certifications & Continuous Learning"
    },
    title: {
      fr: "Des certifications qui renforcent mon credibilite marketing et technique.",
      en: "Certifications that reinforce both my marketing and technical credibility."
    },
    description: {
      fr: "Mon parcours est consolide par des certifications en media buying, strategie marketing, leadership et fondamentaux techniques.",
      en: "My profile is reinforced by certifications in media buying, strategic marketing, leadership, and technical fundamentals."
    },
    items: [
      {
        title: {
          fr: "Google Ateliers Numeriques",
          en: "Google Digital Workshops"
        },
        description: {
          fr: "Certification marketing digital (Google Ateliers Numeriques).",
          en: "Digital marketing certification (Google Digital Workshops)."
        },
        link: "/documents/certifications/google-atelier-numerique.pdf"
      },
      {
        title: {
          fr: "Google Analytics",
          en: "Google Analytics"
        },
        description: {
          fr: "Certification Google Analytics: mesure de performance, traffic et conversion.",
          en: "Google Analytics certification: performance, traffic, and conversion measurement."
        },
        link: "/documents/certifications/google-analytics-certification.pdf"
      },
      {
        title: {
          fr: "HubSpot Social Media Marketing",
          en: "HubSpot Social Media Marketing"
        },
        description: {
          fr: "Certifie au marketing des reseaux sociaux (HubSpot Academy, code ef9379213d554b89a1a67ac17664e9bd, validite: 28 avr. 2023 - 27 mai 2025).",
          en: "Certified in social media marketing (HubSpot Academy, code ef9379213d554b89a1a67ac17664e9bd, validity: Apr 28, 2023 - May 27, 2025)."
        }
      }
    ]
  },
  aboutSection: {
    eyebrow: {
      fr: "A Propos",
      en: "About"
    },
    title: {
      fr: "Un profil premium, a l'interface entre strategie, execution et leadership.",
      en: "A premium profile at the intersection of strategy, execution, and leadership."
    },
    description: {
      fr: "Cette section presente le proprietaire du portfolio avec une approche plus executive: photo, bio, contact direct et marqueurs de credibilite.",
      en: "This section introduces the portfolio owner with a more executive framing: photo, bio, direct contact, and credibility markers."
    },
    image: {
      src: "/images/profile/enolla-about.jpg",
      alt: {
        fr: "Portrait detaille de Enolla Elie Fritz Delangue",
        en: "Detailed portrait of Enolla Elie Fritz Delangue"
      }
    },
    bio: {
      fr: "Expert en marketing & communication dote d'une double competence technologique et manageriale. Fort de plus de 6 ans d'experience entrepreneuriale, je developpe des strategies de croissance, de marque et de partenariat en reliant equipes techniques, vision business et execution terrain.",
      en: "Marketing and communication expert with a dual technological and managerial profile. With more than 6 years of entrepreneurial experience, I build growth, brand, and partnership strategies by connecting technical teams, business vision, and field execution."
    },
    badges: [
      {
        fr: "Marketing Strategique",
        en: "Strategic Marketing"
      },
      {
        fr: "Communication Corporate",
        en: "Corporate Communication"
      },
      {
        fr: "Business Development B2B",
        en: "B2B Business Development"
      },
      {
        fr: "Administration Systemes & Reseaux",
        en: "Systems & Network Administration"
      },
      {
        fr: "Conception Logicielle",
        en: "Software Design"
      }
    ],
    contactPoints: [
      {
        label: {
          fr: "Email",
          en: "Email"
        },
        value: "enollafritz@gmail.com",
        href: "mailto:enollafritz@gmail.com"
      },
      {
        label: {
          fr: "Telephone",
          en: "Phone"
        },
        value: "+237 655750746",
        href: "tel:+237655750746"
      },
      {
        label: {
          fr: "Base",
          en: "Location"
        },
        value: "Douala PK12"
      }
    ]
  },
  experienceSection: {
    eyebrow: {
      fr: "Experiences",
      en: "Experience"
    },
    title: {
      fr: "Des experiences construites entre strategie, execution et croissance.",
      en: "A track record built across strategy, execution, and growth."
    },
    description: {
      fr: "Mon parcours combine responsabilites corporate, entrepreneuriat, developpement commercial et pilotage de dispositifs marketing complets.",
      en: "My background combines corporate leadership, entrepreneurship, business development, and full-funnel marketing execution."
    },
    items: [
      {
        company: "Lumina Africa",
        period: "Juin 2025 - Present",
        role: {
          fr: "Responsable Marketing & Communication",
          en: "Marketing & Communication Manager"
        },
        summary: {
          fr: "Je pilote la strategie marketing et communication d'une plateforme corporate, de la conception des offres au lancement de campagnes et a l'animation de la marque.",
          en: "I lead the marketing and communication strategy of a corporate platform, from offer design to campaign launches and brand activation."
        },
        highlights: [
          {
            fr: "Elaboration et execution de strategies marketing completes alignees aux objectifs de croissance.",
            en: "Designed and executed full marketing strategies aligned with growth goals."
          },
          {
            fr: "Encadrement d'une equipe marketing orientee resultats et collaboration.",
            en: "Led a results-driven marketing team with a collaborative operating model."
          },
          {
            fr: "Supervision de la coherence de marque sur les canaux et supports marketing.",
            en: "Maintained brand consistency across channels and marketing assets."
          },
          {
            fr: "+40% de leads qualifies via Facebook Ads, LinkedIn Ads et Google Ads.",
            en: "+40% qualified leads through Facebook Ads, LinkedIn Ads, and Google Ads."
          }
        ]
      },
      {
        company: "Vision Pub",
        period: "2022 - 2025",
        role: {
          fr: "Co-Fondateur & Responsable Strategie",
          en: "Co-Founder & Strategy Lead"
        },
        summary: {
          fr: "Comme co-fondateur d'une agence marketing et communication, j'ai combine developpement commercial, pilotage de projets et structuration de partenariats B2B.",
          en: "As co-founder of a marketing and communication agency, I combined business development, project leadership, and B2B partnership structuring."
        },
        highlights: [
          {
            fr: "Apport d'affaires, negociation de contrats B2B et gestion strategique de la relation client.",
            en: "Drove deal sourcing, B2B contract negotiation, and strategic client relationship management."
          },
          {
            fr: "Pilotage de projets marketing pluridisciplinaires et supervision operationnelle.",
            en: "Led cross-functional marketing projects and operational execution."
          },
          {
            fr: "Management d'equipes pluridisciplinaires et leadership.",
            en: "Managed multidisciplinary teams and leadership routines."
          },
          {
            fr: "Conception du plan marketing annuel et organisation de 5+ evenements partenaires.",
            en: "Built the annual marketing plan and delivered 5+ partner events."
          }
        ]
      }
    ]
  },
  educationSection: {
    eyebrow: {
      fr: "Formations",
      en: "Education"
    },
    title: {
      fr: "Un parcours qui relie technique, management et vision business.",
      en: "A learning path that connects technical depth, management, and business vision."
    },
    description: {
      fr: "Je me suis forme a la fois sur les dimensions techniques, marketing et manageriales afin de piloter des projets a l'interface entre business et execution.",
      en: "I trained across technical, marketing, and managerial disciplines to lead projects at the intersection of business and execution."
    },
    items: [
      {
        period: "2019 - 2022",
        institution: "IAI-CAMEROUN",
        degree: {
          fr: "Ingenieur des Travaux Informatique",
          en: "Engineering Degree in Information Technology"
        },
        focus: {
          fr: "Administration systemes et reseaux.",
          en: "Systems and network administration."
        }
      },
      {
        period: "2022 - 2024",
        institution: "ESSEC Business School Douala",
        degree: {
          fr: "Master 2",
          en: "Master's Degree"
        },
        focus: {
          fr: "Marketing & Communication d'entreprise.",
          en: "Corporate marketing and communication."
        }
      },
      {
        period: "2025 - En cours",
        institution: "Saylor Academy",
        degree: {
          fr: "MBA",
          en: "MBA"
        },
        focus: {
          fr: "Marketing international, leadership et progression continue.",
          en: "International marketing, leadership, and continuous professional growth."
        }
      }
    ]
  },
  managedPagesSection: {
    eyebrow: {
      fr: "Pages Gerees",
      en: "Managed Pages"
    },
    title: {
      fr: "Des pages et plateformes que j'ai pilotees, gerees ou optimisees.",
      en: "Pages and platforms I led, managed, or optimized."
    },
    description: {
      fr: "Une selection de sites et applications web que j'ai directement structures dans une logique de performance, de lisibilite et de credibilite de marque.",
      en: "A selection of websites and web applications I directly structured around performance, clarity, and brand credibility."
    },
    items: [
      {
        title: {
          fr: "Lumina Africa",
          en: "Lumina Africa"
        },
        description: {
          fr: "Pilotage du site corporate, de la structuration des offres et des campagnes de generation de leads.",
          en: "Led the corporate website, offer structuring, and lead generation campaigns."
        },
        image: {
          src: "/images/projects/lumina-africa/cover.jpg",
          alt: {
            fr: "Capture de la page Lumina Africa",
            en: "Lumina Africa page capture"
          }
        },
        tag: {
          fr: "Corporate & Performance",
          en: "Corporate & Performance"
        },
        link: "https://luminafrica.online"
      },
      {
        title: {
          fr: "Hublots",
          en: "Hublots"
        },
        description: {
          fr: "Mise en valeur produit, cadrage du parcours et renforcement de la perception premium.",
          en: "Product presentation, journey framing, and stronger premium perception."
        },
        image: {
          src: "/images/projects/hublots/cover.jpg",
          alt: {
            fr: "Capture de la page Hublots",
            en: "Hublots page capture"
          }
        },
        tag: {
          fr: "Showcase Premium",
          en: "Premium Showcase"
        },
        link: "https://hublots.co"
      },
        {
          title: {
            fr: "Sawa RH",
            en: "Sawa RH"
        },
        description: {
          fr: "Experience B2B orientee confiance, avec une meilleure clarte des services et une presentation plus mature.",
          en: "A trust-led B2B experience with clearer services and a more mature presentation."
        },
        image: {
          src: "/images/projects/sawa-rh/cover.jpg",
          alt: {
            fr: "Capture de la page Sawa RH",
            en: "Sawa RH page capture"
          }
        },
        tag: {
          fr: "Application Web RH",
          en: "HR Web App"
          },
          link: "https://sawa-rh-web.vercel.app/fr"
        },
        {
          title: {
            fr: "Wearing Mind",
            en: "Wearing Mind"
          },
          description: {
            fr: "Boutique e-commerce streetwear premium construite autour d'une identite forte, de drops limites et d'une experience d'achat plus directe.",
            en: "A premium streetwear e-commerce store built around a strong identity, limited drops, and a sharper buying journey."
          },
          image: {
            src: "/images/projects/wearing-mind/cover.jpg",
            alt: {
              fr: "Capture de la page Wearing Mind",
              en: "Wearing Mind page capture"
            }
          },
          tag: {
            fr: "E-commerce Streetwear",
            en: "Streetwear E-commerce"
          },
          link: "https://wearingmind.com"
        }
      ]
    },
  flyersSection: {
    eyebrow: {
      fr: "Flyers & Supports",
      en: "Flyers & Print Assets"
    },
    title: {
      fr: "Des supports graphiques penses pour vendre, informer et marquer les esprits.",
      en: "Graphic assets designed to sell, inform, and stay memorable."
    },
    description: {
      fr: "Une section dediee a mes flyers, supports promotionnels et visuels de communication. Les images sont remplacables a tout moment.",
      en: "A dedicated section for flyers, promotional assets, and communication visuals. The images can be replaced at any time."
    },
    items: [
      {
        title: {
          fr: "Flyers Campagne",
          en: "Campaign Flyers"
        },
        description: {
          fr: "Supports de promotion construits pour convertir rapidement une promesse en interet concret.",
          en: "Promotional assets built to quickly convert a promise into real audience interest."
        },
        image: {
          src: "/images/showcase/flyers/flyer-1.jpg",
          alt: {
            fr: "Apercu flyer campagne",
            en: "Campaign flyer preview"
          }
        },
        tag: {
          fr: "Acquisition",
          en: "Acquisition"
        }
      },
      {
        title: {
          fr: "Visuels Evenementiels",
          en: "Event Visuals"
        },
        description: {
          fr: "Visuels de communication evenementielle penses pour la visibilite et la force du message.",
          en: "Event communication visuals crafted for visibility and message impact."
        },
        image: {
          src: "/images/showcase/flyers/flyer-2.jpg",
          alt: {
            fr: "Apercu visuel evenementiel",
            en: "Event visual preview"
          }
        },
        tag: {
          fr: "Evenementiel",
          en: "Events"
        }
      },
      {
        title: {
          fr: "Supports Corporate",
          en: "Corporate Assets"
        },
        description: {
          fr: "Supports de presentation et de communication pour renforcer la lecture premium de l'offre.",
          en: "Presentation and communication assets created to strengthen premium offer perception."
        },
        image: {
          src: "/images/showcase/flyers/flyer-3.jpg",
          alt: {
            fr: "Apercu support corporate",
            en: "Corporate asset preview"
          }
        },
        tag: {
          fr: "Brand Support",
          en: "Brand Support"
        }
      },
      {
        title: {
          fr: "Flyer Bonne Semaine",
          en: "Happy Week Flyer"
        },
        description: {
          fr: "Visuel de lancement hebdomadaire pour stimuler l'engagement et renforcer la memorisation de marque.",
          en: "Weekly launch visual designed to boost engagement and strengthen brand recall."
        },
        image: {
          src: "/images/showcase/flyers/flyer-4.jpg",
          alt: {
            fr: "Flyer Vision Pub bonne semaine",
            en: "Vision Pub happy week flyer"
          }
        },
        tag: {
          fr: "Social Media",
          en: "Social Media"
        }
      },
      {
        title: {
          fr: "Flyer Community Management",
          en: "Community Management Flyer"
        },
        description: {
          fr: "Support promotionnel orientee community management pour valoriser l'offre et accelerer la conversion.",
          en: "Community management promotional asset focused on offer visibility and faster conversion."
        },
        image: {
          src: "/images/showcase/flyers/flyer-5.jpg",
          alt: {
            fr: "Flyer community management Vision Pub",
            en: "Vision Pub community management flyer"
          }
        },
        tag: {
          fr: "Community",
          en: "Community"
        }
      }
    ]
  },
  motionSection: {
    eyebrow: {
      fr: "Videos & Motion Design",
      en: "Video & Motion Design"
    },
    title: {
      fr: "Des contenus animes pour capter l'attention et intensifier la narration.",
      en: "Motion-led content built to capture attention and intensify storytelling."
    },
    description: {
      fr: "Capsules video, teasers et sequences motion design utilises pour enrichir la communication de marque et les campagnes.",
      en: "Video clips, teasers, and motion design sequences used to enrich brand communication and campaign performance."
    },
    items: [
      {
        title: {
          fr: "Teasers Promotionnels",
          en: "Promotional Teasers"
        },
        description: {
          fr: "Formats courts et dynamiques pour booster la memorisation et l'engagement.",
          en: "Short dynamic formats built to improve memorability and engagement."
        },
        video: {
          kind: "mp4",
          src: "/images/showcase/motion/teaser-0212.mp4"
        },
        tag: {
          fr: "Short Form",
          en: "Short Form"
        }
      },
      {
        title: {
          fr: "Motion De Marque",
          en: "Brand Motion"
        },
        description: {
          fr: "Habillage, transitions et composition motion pour donner plus de relief au discours de marque.",
          en: "Motion composition, transitions, and brand framing that give more depth to the brand story."
        },
        video: {
          kind: "mp4",
          src: "/images/showcase/motion/boost-performers.mp4"
        },
        tag: {
          fr: "Brand Motion",
          en: "Brand Motion"
        }
      },
      {
        title: {
          fr: "Videos De Communication",
          en: "Communication Videos"
        },
        description: {
          fr: "Formats audiovisuels utilises pour presenter, convaincre et accompagner les prises de parole digitales.",
          en: "Audiovisual formats used to present, persuade, and support digital communication touchpoints."
        },
        video: {
          kind: "mp4",
          src: "/images/showcase/motion/spot-pub.mp4"
        },
        tag: {
          fr: "Storytelling",
          en: "Storytelling"
        }
      }
    ]
  },
  contractProofSection: {
    eyebrow: {
      fr: "Contrats Signes - Vision Pub",
      en: "Signed Contracts - Vision Pub"
    },
    title: {
      fr: "Preuves terrain de signatures et de seances partenaires.",
      en: "Field proof of signatures and partner sessions."
    },
    description: {
      fr: "Photos reelles de signatures, rencontres et activations de contrats menees avec Vision Pub.",
      en: "Real photos from signature moments, meetings, and contract activations delivered with Vision Pub."
    },
    items: [
      {
        title: {
          fr: "Signature Partenaire Vision Pub #1",
          en: "Vision Pub Partner Signature #1"
        },
        description: {
          fr: "Poignee de main et validation d'accord commercial avec une partenaire Vision Pub.",
          en: "Handshake and commercial agreement validation with a Vision Pub partner."
        },
        image: {
          src: "/images/showcase/contracts/vision-pub-contract-1.jpeg",
          alt: {
            fr: "Signature de contrat Vision Pub 1",
            en: "Vision Pub contract signature 1"
          }
        },
        tag: {
          fr: "Contrat Signe",
          en: "Signed Contract"
        }
      },
      {
        title: {
          fr: "Rencontre D'Equipe Vision Pub",
          en: "Vision Pub Team Session"
        },
        description: {
          fr: "Photo de delegation lors d'une session de coordination et d'alignement projet.",
          en: "Delegation photo during a project coordination and alignment session."
        },
        image: {
          src: "/images/showcase/contracts/vision-pub-contract-2.jpeg",
          alt: {
            fr: "Session equipe Vision Pub",
            en: "Vision Pub team session"
          }
        },
        tag: {
          fr: "Session Projet",
          en: "Project Session"
        }
      },
      {
        title: {
          fr: "Remise Document Contractuel",
          en: "Contract Document Handover"
        },
        description: {
          fr: "Remise et validation de dossier contractuel pendant une seance officielle.",
          en: "Contract file handover and validation during an official session."
        },
        image: {
          src: "/images/showcase/contracts/vision-pub-contract-3.jpeg",
          alt: {
            fr: "Remise de document contractuel Vision Pub",
            en: "Vision Pub contract document handover"
          }
        },
        tag: {
          fr: "Validation",
          en: "Validation"
        }
      },
      {
        title: {
          fr: "Signature Partenaire Vision Pub #2",
          en: "Vision Pub Partner Signature #2"
        },
        description: {
          fr: "Nouvelle signature de partenariat lors d'un rendez-vous client.",
          en: "New partnership signature during a client meeting."
        },
        image: {
          src: "/images/showcase/contracts/vision-pub-contract-4.jpeg",
          alt: {
            fr: "Signature de contrat Vision Pub 2",
            en: "Vision Pub contract signature 2"
          }
        },
        tag: {
          fr: "Partenariat",
          en: "Partnership"
        }
      },
      {
        title: {
          fr: "Activation Client Vision Pub",
          en: "Vision Pub Client Activation"
        },
        description: {
          fr: "Photo de groupe d'une activation de mission avec les parties prenantes.",
          en: "Group photo from a mission activation with stakeholders."
        },
        image: {
          src: "/images/showcase/contracts/vision-pub-contract-5.jpeg",
          alt: {
            fr: "Activation client Vision Pub",
            en: "Vision Pub client activation"
          }
        },
        tag: {
          fr: "Activation",
          en: "Activation"
        }
      },
      {
        title: {
          fr: "Preuve Terrain - Signature Dossier",
          en: "Field Proof - Contract Dossier Signature"
        },
        description: {
          fr: "Verification terrain et finalisation de dossier de signature avec le partenaire.",
          en: "Field verification and signature dossier finalization with the partner."
        },
        image: {
          src: "/images/showcase/contracts/vision-pub-proof-terrain-1.jpeg",
          alt: {
            fr: "Preuve terrain signature Vision Pub 1",
            en: "Vision Pub field signature proof 1"
          }
        },
        tag: {
          fr: "Preuve Terrain",
          en: "Field Proof"
        }
      },
      {
        title: {
          fr: "Preuve Terrain - Brief Equipe",
          en: "Field Proof - Team Briefing"
        },
        description: {
          fr: "Session de briefing avec l'equipe dans le cadre d'une signature et activation de mission.",
          en: "Team briefing session as part of signature and mission activation."
        },
        image: {
          src: "/images/showcase/contracts/vision-pub-proof-terrain-2.jpeg",
          alt: {
            fr: "Preuve terrain signature Vision Pub 2",
            en: "Vision Pub field signature proof 2"
          }
        },
        tag: {
          fr: "Signature",
          en: "Signature"
        }
      }
    ]
  },
  trainingSessionSection: {
    eyebrow: {
      fr: "Session Formateur",
      en: "Trainer Session"
    },
    title: {
      fr: "Marketing, Communication et Ingenierie Logicielle",
      en: "Marketing, Communication, and Software Engineering"
    },
    description: {
      fr: "Moments reels de formation, remise d'attestations et accompagnement des apprenants.",
      en: "Real training moments, certificate handovers, and learner coaching sessions."
    },
    items: [
      {
        title: {
          fr: "Session Interactive",
          en: "Interactive Session"
        },
        description: {
          fr: "Animation d'un module pratique en marketing & communication avec les apprenants.",
          en: "Facilitating a practical marketing and communication module with learners."
        },
        image: {
          src: "/images/showcase/training/trainer-session-1.jpeg",
          alt: {
            fr: "Session formateur marketing communication 1",
            en: "Marketing communication trainer session 1"
          }
        },
        tag: {
          fr: "Formation",
          en: "Training"
        }
      },
      {
        title: {
          fr: "Remise D'Attestations",
          en: "Certificate Handover"
        },
        description: {
          fr: "Photo de fin de session avec remise des attestations aux participants.",
          en: "End-of-session group photo with certificate handovers to participants."
        },
        image: {
          src: "/images/showcase/training/trainer-session-2.jpeg",
          alt: {
            fr: "Remise attestations session formateur",
            en: "Trainer session certificate handover"
          }
        },
        tag: {
          fr: "Certification",
          en: "Certification"
        }
      },
      {
        title: {
          fr: "Cohorte Ingenierie Logicielle",
          en: "Software Engineering Cohort"
        },
        description: {
          fr: "Encadrement d'un groupe en ingenierie logicielle et validation des acquis.",
          en: "Coaching a software engineering cohort and validating learning outcomes."
        },
        image: {
          src: "/images/showcase/training/trainer-session-3.jpeg",
          alt: {
            fr: "Cohorte ingenierie logicielle",
            en: "Software engineering cohort"
          }
        },
        tag: {
          fr: "Ingenierie Logicielle",
          en: "Software Engineering"
        }
      },
      {
        title: {
          fr: "Atelier Pratique",
          en: "Hands-on Workshop"
        },
        description: {
          fr: "Accompagnement terrain sur des cas pratiques de communication et execution technique.",
          en: "Hands-on coaching on communication use cases and technical execution."
        },
        image: {
          src: "/images/showcase/training/trainer-session-4.jpeg",
          alt: {
            fr: "Atelier pratique formateur",
            en: "Trainer hands-on workshop"
          }
        },
        tag: {
          fr: "Atelier",
          en: "Workshop"
        }
      },
      {
        title: {
          fr: "Session Masterclass",
          en: "Masterclass Session"
        },
        description: {
          fr: "Masterclass orientee strategie, communication et performance des apprenants.",
          en: "Masterclass focused on strategy, communication, and learner performance."
        },
        image: {
          src: "/images/showcase/training/trainer-session-5.jpeg",
          alt: {
            fr: "Session masterclass formateur",
            en: "Trainer masterclass session"
          }
        },
        tag: {
          fr: "Masterclass",
          en: "Masterclass"
        }
      }
    ]
  },
  systemsNetworkSection: {
    eyebrow: {
      fr: "Travaux Techniques",
      en: "Technical Operations"
    },
    title: {
      fr: "Administration Systeme et Reseaux",
      en: "Systems and Network Administration"
    },
    description: {
      fr: "Interventions terrain en administration systeme et reseaux: cablage, maintenance, coordination technique et support operationnel.",
      en: "Field work in systems and network administration: cabling, maintenance, technical coordination, and operational support."
    },
    items: [
      {
        title: {
          fr: "Baie De Brassage",
          en: "Network Rack Operations"
        },
        description: {
          fr: "Cablage et organisation d'une baie reseau avec verification des connexions pour stabiliser l'infrastructure.",
          en: "Cabling and rack organization with connection checks to stabilize infrastructure."
        },
        image: {
          src: "/images/showcase/systemes-reseaux/systemes-reseaux-1.jpeg",
          alt: {
            fr: "Travaux baie reseau et cablage",
            en: "Network rack and cabling operations"
          }
        },
        tag: {
          fr: "Infrastructure",
          en: "Infrastructure"
        }
      },
      {
        title: {
          fr: "Intervention Site Industriel",
          en: "Industrial Site Intervention"
        },
        description: {
          fr: "Mission terrain en environnement industriel avec respect des protocoles securite et support reseau.",
          en: "On-site industrial mission following safety protocols and providing network support."
        },
        image: {
          src: "/images/showcase/systemes-reseaux/systemes-reseaux-2.jpeg",
          alt: {
            fr: "Intervention technique sur site industriel",
            en: "Technical intervention on industrial site"
          }
        },
        tag: {
          fr: "Terrain",
          en: "Field Work"
        }
      },
      {
        title: {
          fr: "Coordination Technique",
          en: "Technical Coordination"
        },
        description: {
          fr: "Travail d'equipe sur site pour la continuite d'exploitation et la resolution des operations techniques.",
          en: "On-site teamwork ensuring operational continuity and execution of technical tasks."
        },
        image: {
          src: "/images/showcase/systemes-reseaux/systemes-reseaux-3.jpeg",
          alt: {
            fr: "Coordination equipe travaux systeme reseaux",
            en: "Team coordination for systems and network work"
          }
        },
        tag: {
          fr: "Operations",
          en: "Operations"
        }
      },
      {
        title: {
          fr: "Installation Et Maintenance",
          en: "Installation and Maintenance"
        },
        description: {
          fr: "Installation et maintenance d'equipements avec diagnostic rapide pour maintenir la fiabilite du site.",
          en: "Equipment installation and maintenance with fast diagnostics to keep site reliability high."
        },
        image: {
          src: "/images/showcase/systemes-reseaux/systemes-reseaux-4.jpeg",
          alt: {
            fr: "Maintenance equipement sur echelle",
            en: "Equipment maintenance on ladder"
          }
        },
        tag: {
          fr: "Maintenance",
          en: "Maintenance"
        }
      }
    ]
  },
  projects: {
    eyebrow: {
      fr: "Realisations Digitales",
      en: "Digital Work"
    },
    title: {
      fr: "Sites et applications web realises, pilotes ou structures pour la performance.",
      en: "Websites and web applications I delivered, led, or structured for performance."
    },
    description: {
      fr: "Ces liens correspondent a des plateformes et experiences digitales que j'ai concues, pilotees ou structurees dans une logique de marque, de conversion et de croissance.",
      en: "These links represent digital platforms and experiences I designed, led, or structured with a clear brand, conversion, and growth objective."
    }
  }
};
