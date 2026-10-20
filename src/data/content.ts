export interface Business {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  details: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
  accent: string;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  period: string;
  description: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export interface UpcomingVenture {
  id: string;
  title: string;
  tagline: string;
  description: string;
  solutions: string[];
  badge: string;
}

export interface MilestoneItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag?: string;
  hasImages?: boolean;
}

export const SITE_CONTENT = {
  seo: {
    title: "Pritam Dutta | Entrepreneur, Founder & Digital Marketing Strategist",
    description:
      "Discover Pritam Dutta, entrepreneur and founder of Cyption, Offroute, and Course to Excellence. Explore his journey, digital marketing expertise, AI automation consulting, and business ventures.",
    keywords: [
      "Pritam Dutta",
      "Pritam Dutta Entrepreneur",
      "Pritam Dutta Cyption",
      "Digital Marketing Strategist",
      "AI Automation Consultant",
      "Business Consultant India",
      "Entrepreneur in Durgapur",
    ],
    h1: "Pritam Dutta — Entrepreneur, Founder & Business Builder",
    openGraphDescription:
      "Meet Pritam Dutta — an entrepreneur building businesses across technology, digital marketing, travel, education, and AI automation. Discover the journey, ventures, and vision behind the work.",
    siteUrl: "https://pritamdutta.com", // REPLACE with your live custom domain
    author: "Pritam Dutta",
    locale: "en_US",
  },

  hero: {
    name: "PRITAM DUTTA",
    tagline: "Entrepreneur. Founder. Business Builder.",
    headline: "I Turn Ideas Into Businesses, and Possibilities Into Progress.",
    subCopy1:
      "From technology and digital marketing to travel, education, and artificial intelligence, my journey is about building businesses, solving problems, and turning ambitious ideas into meaningful ventures.",
    subCopy2:
      "What started with curiosity in 2022 has evolved into an entrepreneurial journey driven by creativity, technology, and the desire to build something bigger.",
    ctaPrimary: "Explore My Journey",
    ctaSecondary: "Work With Me",
    founderLine: "Founder of Cyption · Offroute · Course to Excellence",
    microScroll: "(Scroll, gently)",
    statusBadge: "Available for strategic ventures & consulting",
  },

  about: {
    sectionIndex: "01",
    label: "About Me",
    headline: "I'm Pritam. I Build, Experiment, and Grow.",
    paragraphs: [
      "I'm an entrepreneur, digital marketing strategist, and business builder passionate about turning ideas into practical solutions.",
      "My journey began in 2022 with freelancing, digital marketing, and the exploration of online business opportunities. Over time, my interest grew beyond individual projects into building businesses, developing brands, and creating opportunities across different industries.",
      "Today, my entrepreneurial journey spans technology and marketing, travel, academic guidance, and the emerging possibilities of AI automation.",
      "I believe entrepreneurship is not just about starting a business. It's about identifying problems, learning continuously, bringing people together, and building solutions that create lasting value.",
    ],
    pullQuote:
      "This is more than a portfolio of what I do. It's the story of what I'm building.",
    stats: [
      { label: "Active Journey", value: "Since 2022", micro: "Foundation Year" },
      { label: "Cyption Launched", value: "Jan 2025", micro: "Flagship Venture" },
      { label: "Industries Served", value: "6+", micro: "Multi-sector domain depth" },
    ],
  },

  businesses: {
    sectionIndex: "02",
    label: "My Businesses",
    headline: "Different Ventures. One Entrepreneurial Vision.",
    sub: "Every business I build represents a different opportunity to solve problems, create value, and explore new possibilities.",
    items: [
      {
        id: "cyption",
        name: "Cyption",
        category: "Technology & Digital Marketing",
        tagline: "Turning digital potential into business growth.",
        description:
          "Cyption is my technology and digital marketing venture, helping businesses strengthen their digital presence, connect with their audiences, and pursue measurable growth.",
        details:
          "From performance marketing and SEO to website development, branding, creative production, and technology solutions, Cyption brings strategy and execution together to help businesses move forward.",
        tags: [
          "Digital Marketing",
          "Performance Marketing",
          "SEO",
          "Website Development",
          "Branding",
          "Graphic Design",
          "Technology Solutions",
        ],
        link: "https://cyption.com",
        linkLabel: "cyption.com",
        accent: "#C9A24B",
      },
      {
        id: "offroute",
        name: "Offroute",
        category: "Travel & Experiences",
        tagline: "For the journeys that take you beyond the ordinary.",
        description:
          "Offroute is my travel venture, built around the belief that travel is more than reaching a destination. It's about discovering new places, creating unforgettable memories, and experiencing the world differently.",
        details:
          "My vision is to build a travel brand that inspires people to explore beyond familiar routes and discover experiences worth remembering.",
        tags: [
          "Travel Planning",
          "Holiday Experiences",
          "Destination Discovery",
          "Travel Inspiration",
        ],
        link: "https://www.instagram.com/offroutetourandtravels/",
        linkLabel: "@offroutetourandtravels",
        accent: "#D6AF5B",
      },
      {
        id: "course-to-excellence",
        name: "Course to Excellence",
        category: "Academic Guidance & Educational Opportunities",
        tagline: "Helping students move towards a more informed future.",
        description:
          "Course to Excellence is my academic guidance initiative focused on helping students navigate educational choices with greater clarity and confidence.",
        details:
          "The vision is to connect students with the right guidance, educational opportunities, and institutions while helping them make informed decisions about their academic journeys.",
        tags: [
          "Academic Guidance",
          "Course Selection",
          "Student Support",
          "Educational Partnerships",
          "Institutional Collaboration",
        ],
        accent: "#E8C877",
      },
    ] as Business[],
  },

  journey: {
    sectionIndex: "03",
    label: "My Journey",
    headline: "It Started With Curiosity. It Grew Through Action.",
    intro:
      "Every entrepreneur has a starting point. Mine was a willingness to learn, experiment, and explore what could be possible with the right skills and ideas.",
    closing: "The journey is still unfolding. The vision keeps growing.",
    milestones: [
      {
        year: "2022",
        period: "2022",
        title: "The Beginning",
        description: [
          "My entrepreneurial journey began with freelancing and digital marketing. I started exploring how businesses operate online, how brands attract customers, and how digital skills can create opportunities.",
          "It was a time of learning, experimenting, and discovering the possibilities of building something of my own.",
        ],
      },
      {
        year: "2023–2024",
        period: "2023–2024",
        title: "Learning to Build",
        description: [
          "As I gained experience through projects and client work, my perspective began to evolve. I started looking beyond individual tasks towards broader business challenges, from brand development and digital campaigns to websites and customer acquisition.",
          "Every project taught me something about execution, communication, relationships, and the realities of entrepreneurship.",
        ],
      },
      {
        year: "2025",
        period: "2025",
        title: "Building Cyption",
        description: [
          "In January 2025, I launched Cyption, turning my experience and ambitions into a structured business.",
          "The focus expanded from delivering digital services to building a brand, developing a team, managing client relationships, and creating solutions that help businesses grow.",
        ],
      },
      {
        year: "2026+",
        period: "2026 and Beyond",
        title: "Expanding the Vision",
        description: [
          "My journey continues through Offroute, Course to Excellence, and new opportunities in AI automation and influencer management.",
          "I'm exploring how technology, creativity, and business strategy can come together to solve meaningful problems and create new opportunities.",
        ],
      },
    ] as JourneyMilestone[],
  },

  services: {
    sectionIndex: "04",
    label: "Consultancy Services",
    headline: "Better Marketing. Smarter Systems. More Room to Grow.",
    intro:
      "I work at the intersection of digital marketing, business strategy, and emerging technology to help businesses identify opportunities and move towards their goals. My approach combines creative thinking, practical execution, and a focus on solutions that support long-term business growth.",
    ctaLine: "Have a business challenge to solve? Let's explore the possibilities together.",
    ctaButton: "Discuss a Project",
    items: [
      {
        id: "digital-marketing",
        number: "01",
        title: "Digital Marketing & Growth Strategy",
        description:
          "Helping businesses strengthen their digital presence through audience research, campaign strategy, performance marketing, lead generation, brand positioning, and digital growth planning.",
        tags: ["Audience Research", "Performance Marketing", "Lead Gen", "Brand Positioning"],
      },
      {
        id: "ai-automation",
        number: "02",
        title: "AI Automation Consulting",
        description:
          "Helping businesses identify repetitive tasks, evaluate AI-powered tools, and explore automation opportunities that can save time, streamline workflows, and improve operational efficiency.",
        tags: ["Workflow Optimization", "Tool Evaluation", "Process Streamlining", "Efficiency"],
      },
      {
        id: "transformation",
        number: "03",
        title: "Business & Digital Transformation",
        description:
          "Helping businesses connect their objectives with digital processes, better customer experiences, and more efficient ways of working.",
        tags: ["Digital Workflows", "Customer Experience", "Process Modernization"],
      },
      {
        id: "strategy-implementation",
        number: "04",
        title: "Strategy & Implementation",
        description:
          "Moving beyond ideas to identify practical next steps, establish priorities, and develop an actionable roadmap aligned with business goals.",
        tags: ["Actionable Roadmaps", "Execution Priorities", "Goal Alignment"],
      },
    ] as ServiceItem[],
  },

  upcoming: {
    sectionIndex: "05",
    label: "Upcoming Ventures",
    headline: "What's Next Is Already Taking Shape.",
    intro:
      "I'm always exploring new ideas, identifying emerging opportunities, and looking for ways to solve problems through technology and entrepreneurship.",
    closing:
      "These ventures represent the next chapter of my entrepreneurial journey — ideas I'm working towards turning into meaningful businesses.",
    ventures: [
      {
        id: "ai-automation-local",
        title: "AI Automation for Local Businesses",
        tagline: "Making Business Operations Smarter",
        badge: "In the works / Coming soon",
        description:
          "Local businesses often spend valuable time managing enquiries, following up with leads, handling repetitive administrative tasks, and coordinating customer communication. My vision is to make practical AI automation more accessible to local businesses by helping them streamline operations, improve responsiveness, and reduce unnecessary manual work.",
        solutions: [
          "Enquiry Automation",
          "Lead Follow-ups",
          "Customer Support Workflows",
          "Appointment Coordination",
          "Automated Reporting",
        ],
      },
      {
        id: "creator-management",
        title: "Influencer & Creator Management",
        tagline: "Connecting Brands With the Right Creators",
        badge: "In the works / Coming soon",
        description:
          "The creator economy is creating new opportunities for brands and individuals to build meaningful relationships with their audiences. My vision is to develop an influencer management venture that connects brands with relevant creators through strategic collaborations, structured campaign planning, and long-term partnerships.",
        solutions: [
          "Creator Representation",
          "Influencer Campaigns",
          "Brand Collaborations",
          "Community Growth",
        ],
      },
    ] as UpcomingVenture[],
  },

  achievements: {
    sectionIndex: "06",
    label: "Achievements & Gallery",
    headline: "Every Milestone Has a Story.",
    intro:
      "Entrepreneurship is shaped by more than business launches. It's shaped by the people you work with, the projects you take on, the challenges you overcome, and the opportunities you create.",
    closing: "This is not just a collection of achievements. It's a record of the journey behind them.",
    items: [
      {
        id: "biswa-bangla",
        title: "Featured in Biswa Bangla News",
        subtitle: "Media Visibility & Recognition",
        description:
          "A meaningful milestone in my professional journey and an opportunity to gain public visibility.",
        tag: "Media Feature",
      },
      {
        id: "bellebirds",
        title: "Official Digital Partner — Bellebirds: The Fashion Street (Season 1)",
        subtitle: "Event Branding & Production",
        description:
          "An opportunity to contribute to the branding of a fashion event and participate in a creative, event-focused project.",
        tag: "Official Partner",
        hasImages: true,
      },
      {
        id: "client-projects",
        title: "Digital Marketing & Client Projects",
        subtitle: "Cross-Industry Impact",
        description:
          "Through Cyption, I've worked with businesses across multiple industries, including travel, healthcare, education, jewellery, hospitality, and retail. These experiences have helped me understand different markets, business objectives, customer behaviours, and the role of digital strategy in business growth.",
        tag: "Multi-Industry",
      },
    ] as MilestoneItem[],
    industries: [
      "Travel",
      "Healthcare",
      "Education",
      "Jewellery",
      "Hospitality",
      "Retail",
    ],
    behindTheJourney: {
      title: "Behind the Journey",
      description:
        "A visual collection of the people, projects, events, collaborations, and experiences that continue to shape my entrepreneurial journey. From building brands and working with teams to exploring new ideas and celebrating milestones, every moment is part of a bigger story.",
    },
  },

  contact: {
    sectionIndex: "07",
    label: "Contact Section",
    headline: "The Next Great Idea Could Start With a Conversation.",
    intro1:
      "Whether you're looking for digital marketing expertise, exploring AI automation, considering a business collaboration, or simply want to exchange ideas about entrepreneurship, I'd love to hear from you.",
    intro2:
      "I'm open to meaningful conversations, strategic partnerships, consulting opportunities, and collaborations that bring good ideas to life.",
    subTitle: "Let's Connect",
    prompt: "What would you like to discuss?",
    topics: [
      "Digital marketing and business growth",
      "AI automation and workflow consulting",
      "Business and brand collaborations",
      "Academic and institutional partnerships",
      "Influencer and creator collaborations",
      "New business ideas and entrepreneurial opportunities",
    ],
    instructions:
      "Tell me a little about your goals, your challenges, or the idea you're working on. Let's explore what we can build together.",
    ctaButton: "Get in Touch",
    closingQuote:
      "Good ideas begin with conversations. Great possibilities begin when we take action.",
    details: {
      email: "contact@cyption.com", // REPLACE with your primary contact email
      location: "Durgapur, West Bengal, India",
      status: "Available for Q1–Q2 2026 Collaborations",
      socials: [
        { name: "Cyption", url: "https://cyption.com" },
        { name: "Instagram", url: "https://www.instagram.com/offroutetourandtravels/" },
        { name: "LinkedIn", url: "https://linkedin.com/in/pritam-dutta" }, // REPLACE with personal LinkedIn link
      ],
    },
  },

  closing: {
    headline: "I'm Not Just Building Businesses. I'm Building a Vision.",
    paragraphs: [
      "My journey began in 2022 with curiosity and the willingness to learn. Since then, every project, every challenge, and every new idea has helped shape the entrepreneur I am becoming.",
      "I believe the future belongs to those who keep learning, adapt to change, and have the courage to turn ideas into action.",
      "Through technology, marketing, travel, education, and AI, I want to continue building businesses that solve real problems, create meaningful opportunities, and deliver lasting value.",
      "I'm Pritam Dutta.",
      "This is my journey. This is what I'm building.",
    ],
    finalPunch: "And there's more to come.",
  },

  marqueeKeywords: [
    "Digital Marketing",
    "Performance Marketing",
    "SEO",
    "Websites",
    "Branding",
    "AI Automation",
    "Travel",
    "Education",
  ],
};
