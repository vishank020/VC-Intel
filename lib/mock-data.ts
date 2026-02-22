export interface Company {
  id: string;
  name: string;
  description: string;
  foundedYear: number;
  location: string;
  industry: string;
  stage: string;
  website?: string;
}

export interface SignalItem {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface Enrichment {
  summary: string[];
  whatTheyDo: string[];
  keywords: string[];
  derivedSignals: string[];
  sources: Array<{ url: string; timestamp: string }>;
}

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'OpenAI',
    description: 'Artificial intelligence research and deployment company building advanced AI models and platforms',
    foundedYear: 2015,
    location: 'San Francisco, CA',
    industry: 'AI/ML',
    stage: 'Late Stage',
    website: 'https://openai.com',
  },
  {
    id: '2',
    name: 'Stripe',
    description: 'Online payment processing and financial infrastructure platform for businesses',
    foundedYear: 2010,
    location: 'San Francisco, CA',
    industry: 'FinTech',
    stage: 'Late Stage',
    website: 'https://stripe.com',
  },
  {
    id: '3',
    name: 'Databricks',
    description: 'Unified data analytics platform built on Apache Spark for data engineering and AI',
    foundedYear: 2013,
    location: 'San Francisco, CA',
    industry: 'Data & AI',
    stage: 'Late Stage',
    website: 'https://databricks.com',
  },
  {
    id: '4',
    name: 'Snowflake',
    description: 'Cloud-based data warehousing and analytics platform',
    foundedYear: 2012,
    location: 'Bozeman, MT',
    industry: 'Enterprise Software',
    stage: 'Public',
    website: 'https://snowflake.com',
  },
  {
    id: '5',
    name: 'UiPath',
    description: 'Robotic process automation platform for enterprise workflow automation',
    foundedYear: 2005,
    location: 'New York, NY',
    industry: 'Automation',
    stage: 'Public',
    website: 'https://uipath.com',
  },
  {
    id: '6',
    name: 'Scale AI',
    description: 'Data platform providing training data for AI and machine learning applications',
    foundedYear: 2016,
    location: 'San Francisco, CA',
    industry: 'AI Infrastructure',
    stage: 'Series F',
    website: 'https://scale.com',
  },
  {
    id: '7',
    name: 'Notion',
    description: 'All-in-one workspace for notes, documentation, and team collaboration',
    foundedYear: 2013,
    location: 'San Francisco, CA',
    industry: 'Productivity Software',
    stage: 'Late Stage',
    website: 'https://notion.so',
  },
  {
    id: '8',
    name: 'Anthropic',
    description: 'AI safety and research company building reliable and interpretable AI systems',
    foundedYear: 2021,
    location: 'San Francisco, CA',
    industry: 'AI/ML',
    stage: 'Series D',
    website: 'https://anthropic.com',
  },
  {
    id: '9',
    name: 'Palantir Technologies',
    description: 'Data analytics platform for government and enterprise decision-making',
    foundedYear: 2003,
    location: 'Denver, CO',
    industry: 'Data Analytics',
    stage: 'Public',
    website: 'https://palantir.com',
  },
  {
    id: '10',
    name: 'Cloudflare',
    description: 'Web infrastructure and cybersecurity company providing CDN, DDoS protection, and edge computing',
    foundedYear: 2009,
    location: 'San Francisco, CA',
    industry: 'Cybersecurity',
    stage: 'Public',
    website: 'https://cloudflare.com',
  },
  {
    id: '11',
    name: 'Coinbase',
    description: 'Cryptocurrency exchange and blockchain infrastructure platform',
    foundedYear: 2012,
    location: 'San Francisco, CA',
    industry: 'Blockchain',
    stage: 'Public',
    website: 'https://coinbase.com',
  },
  {
    id: '12',
    name: 'SpaceX',
    description: 'Aerospace manufacturer and space transportation company',
    foundedYear: 2002,
    location: 'Hawthorne, CA',
    industry: 'Space Tech',
    stage: 'Late Stage',
    website: 'https://spacex.com',
  },
  {
    id: '13',
    name: 'Figma',
    description: 'Collaborative web-based interface design platform',
    foundedYear: 2012,
    location: 'San Francisco, CA',
    industry: 'Developer Tools',
    stage: 'Late Stage',
    website: 'https://figma.com',
  },
  {
    id: '14',
    name: 'NVIDIA',
    description: 'Semiconductor company specializing in GPUs and AI computing hardware',
    foundedYear: 1993,
    location: 'Santa Clara, CA',
    industry: 'Semiconductors',
    stage: 'Public',
    website: 'https://nvidia.com',
  },
  {
    id: '15',
    name: 'Zapier',
    description: 'Automation platform connecting apps and automating workflows without coding',
    foundedYear: 2011,
    location: 'San Francisco, CA',
    industry: 'Automation',
    stage: 'Late Stage',
    website: 'https://zapier.com',
  },
  {
    id: '16',
    name: 'Brex',
    description: 'Financial services platform providing corporate cards and expense management',
    foundedYear: 2017,
    location: 'San Francisco, CA',
    industry: 'FinTech',
    stage: 'Late Stage',
    website: 'https://brex.com',
  },
  {
    id: '17',
    name: 'Rippling',
    description: 'Workforce management platform integrating HR, IT, and finance',
    foundedYear: 2016,
    location: 'San Francisco, CA',
    industry: 'HR Tech',
    stage: 'Series E',
    website: 'https://rippling.com',
  },
  {
    id: '18',
    name: 'DeepMind',
    description: 'Artificial intelligence research company developing advanced AI systems',
    foundedYear: 2010,
    location: 'London, UK',
    industry: 'AI Research',
    stage: 'Acquired',
    website: 'https://deepmind.com',
  },
  {
    id: '19',
    name: 'SentinelOne',
    description: 'Autonomous cybersecurity platform using AI for threat detection and response',
    foundedYear: 2013,
    location: 'Mountain View, CA',
    industry: 'Cybersecurity',
    stage: 'Public',
    website: 'https://sentinelone.com',
  },
  {
    id: '20',
    name: 'Hugging Face',
    description: 'AI platform providing open-source machine learning models and tools',
    foundedYear: 2016,
    location: 'New York, NY',
    industry: 'AI/ML',
    stage: 'Series D',
    website: 'https://huggingface.co',
  },
];

export const mockSignals: Record<string, SignalItem[]> = {
  '1': [
    {
      id: '1',
      title: 'Strategic Investment from Microsoft',
      date: '2023-01-23',
      description: 'Microsoft announced a multi-billion dollar investment to expand their AI partnership.',
    },
    {
      id: '2',
      title: 'GPT-4 Release',
      date: '2023-03-14',
      description: 'Launched GPT-4, a multimodal large language model with improved reasoning capabilities.',
    },
    {
      id: '3',
      title: 'ChatGPT Enterprise Launch',
      date: '2023-08-28',
      description: 'Introduced ChatGPT Enterprise with enhanced security, compliance, and admin controls.',
    },
  ],

  '2': [
    {
      id: '1',
      title: 'Stripe Climate Expansion',
      date: '2022-05-10',
      description: 'Expanded Stripe Climate initiative to accelerate carbon removal technologies.',
    },
    {
      id: '2',
      title: 'Global Expansion in APAC',
      date: '2023-06-12',
      description: 'Launched new payment infrastructure capabilities across Southeast Asia.',
    },
    {
      id: '3',
      title: 'New Embedded Finance Tools',
      date: '2024-02-05',
      description: 'Released enhanced embedded finance APIs for SaaS platforms.',
    },
  ],

  '3': [
    {
      id: '1',
      title: 'Series I Funding',
      date: '2023-09-14',
      description: 'Raised over $500M in Series I funding to accelerate AI innovation.',
    },
    {
      id: '2',
      title: 'Launch of Lakehouse AI',
      date: '2023-06-27',
      description: 'Introduced Lakehouse AI to unify data engineering, analytics, and ML workflows.',
    },
    {
      id: '3',
      title: 'Partnership with NVIDIA',
      date: '2024-03-18',
      description: 'Expanded collaboration with NVIDIA to optimize generative AI workloads.',
    },
  ],
};

export const mockEnrichments: Record<string, Enrichment> = {
  '1': {
    summary: [
      'OpenAI is an artificial intelligence research and deployment company focused on developing safe and beneficial AI systems.',
      'Its products include large language models, multimodal systems, and enterprise AI platforms used globally.',
    ],
    whatTheyDo: [
      'Develops advanced large language models such as GPT series',
      'Provides APIs for natural language, vision, and speech applications',
      'Conducts AI safety and alignment research',
      'Offers enterprise AI deployment solutions',
      'Collaborates with strategic partners for infrastructure scaling',
      'Builds consumer-facing AI tools like ChatGPT',
    ],
    keywords: [
      'Large Language Models',
      'Generative AI',
      'Artificial Intelligence',
      'AI Safety',
      'Multimodal Models',
      'Enterprise AI',
      'APIs',
      'Machine Learning',
      'Deep Learning',
      'ChatGPT',
    ],
    derivedSignals: [
      'Strong enterprise adoption across multiple industries',
      'Deep strategic integration with Microsoft Azure infrastructure',
      'Rapid product iteration cycles in generative AI',
      'Expanding global regulatory and compliance focus',
    ],
    sources: [
      {
        url: 'https://openai.com/blog',
        timestamp: '2024-06-01',
      },
      {
        url: 'https://news.microsoft.com',
        timestamp: '2023-01-23',
      },
    ],
  },

  '2': {
    summary: [
      'Stripe is a global financial infrastructure platform for online businesses.',
      'It provides APIs and tools for payments, billing, fraud prevention, and financial services.',
    ],
    whatTheyDo: [
      'Processes online payments for businesses worldwide',
      'Offers subscription billing and invoicing solutions',
      'Provides fraud detection through Stripe Radar',
      'Supports embedded finance for SaaS platforms',
      'Facilitates global cross-border payments',
      'Develops financial tools including treasury and issuing products',
    ],
    keywords: [
      'Payments',
      'FinTech',
      'APIs',
      'Embedded Finance',
      'Billing',
      'Fraud Detection',
      'Global Commerce',
      'Financial Infrastructure',
      'SaaS',
      'Treasury',
    ],
    derivedSignals: [
      'Strong network effects through platform integrations',
      'Global regulatory compliance expansion',
      'Diversification into financial services beyond payments',
      'Large enterprise customer base growth',
    ],
    sources: [
      {
        url: 'https://stripe.com/newsroom',
        timestamp: '2024-02-05',
      },
    ],
  },

  '3': {
    summary: [
      'Databricks provides a unified data analytics platform built around the lakehouse architecture.',
      'It enables organizations to process large-scale data and build AI applications on a single platform.',
    ],
    whatTheyDo: [
      'Offers a cloud-based lakehouse data platform',
      'Supports distributed data engineering and analytics',
      'Provides ML lifecycle management tools',
      'Integrates with major cloud providers',
      'Enables large-scale data warehousing',
      'Supports generative AI and LLM deployment workflows',
    ],
    keywords: [
      'Lakehouse',
      'Big Data',
      'Apache Spark',
      'Data Engineering',
      'Machine Learning',
      'AI Infrastructure',
      'Cloud Computing',
      'Analytics',
      'Generative AI',
      'Enterprise Data',
    ],
    derivedSignals: [
      'Strong enterprise AI adoption',
      'Large-scale funding rounds indicating market confidence',
      'Partnership ecosystem expansion',
      'Rapid product evolution toward AI-native workloads',
    ],
    sources: [
      {
        url: 'https://databricks.com/company/newsroom',
        timestamp: '2023-09-14',
      },
    ],
  },
};