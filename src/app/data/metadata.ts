import type { Metadata } from 'next'

export const siteMetadata: Metadata = {
  title: 'Nuvio - Your Creative Workspace for Productivity & Growth',
  description: 'Transform your daily workflow with Nuvio\'s suite of creative tools. Organize thoughts with smart notebooks, visualize ideas on digital whiteboards, and track your goals effectively. Everything you need to think clearly, stay organized, and achieve more.',
  keywords: [
    'productivity tools',
    'note-taking',
    'digital notebooks',
    'whiteboard',
    'goal tracking',
    'creative workspace',
    'organization tools',
    'personal productivity',
    'digital planning',
    'mind mapping',
    'project management',
    'creative thinking',
    'workflow optimization',
    'daily organization',
    'idea management',
    'collaborative tools',
    'personal development',
    'task management',
    'creative productivity',
    'digital workspace'
  ],
  authors: [{ name: 'Nuvio Team' }],
  creator: '@nuvio',
  publisher: 'Nuvio',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL('https://nuvio.app'), // Update this with your actual domain
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Nuvio - Your Creative Workspace for Productivity & Growth',
    description: 'Transform your daily workflow with Nuvio\'s suite of creative tools. Organize thoughts with smart notebooks, visualize ideas on digital whiteboards, and track your goals effectively.',
    url: 'https://nuvio.app', // Update this with your actual domain
    siteName: 'Nuvio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://nuvio.app/og-image.jpg', // Update this with your actual OG image
        width: 1200,
        height: 630,
        alt: 'Nuvio - Creative workspace with notebooks, whiteboards, and productivity tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuvio - Your Creative Workspace for Productivity & Growth',
    description: 'Transform your daily workflow with Nuvio\'s suite of creative tools. Organize thoughts with smart notebooks, visualize ideas on digital whiteboards, and track your goals effectively.',
    creator: '@nuvio',
    images: ['https://nuvio.app/og-image.jpg'], // Update this with your actual Twitter image
  },
}

// Additional metadata for specific pages
export const notebookMetadata: Metadata = {
  title: 'Notebooks - Organize & Write | Nuvio',
  description: 'Create and organize your thoughts, ideas, and projects with Nuvio\'s powerful notebook system. Rich text editing, auto-save, and smart organization features.',
  keywords: [
    'digital notebooks',
    'note-taking',
    'rich text editor',
    'auto-save',
    'organization',
    'search and tags',
    'personal notes',
    'project notes',
    'idea organization',
  ],
}

export const noteMetadata: Metadata = {
  title: 'Note - Organize & Write | Nuvio',
  description: 'Create and organize your thoughts, ideas, and projects with Nuvio\'s powerful note system. Rich text editing, auto-save, and smart organization features.',
  keywords: [
    'digital notes',
    'note-taking',
    'rich text editor',
    'auto-save',
    'organization',
    'search and tags',
    'personal note',
    'project note',
    'idea organization',
    'personal notes',
    'project notes',
  ],
}

export const whiteboardMetadata: Metadata = {
  title: 'Whiteboard - Visualize & Design | Nuvio',
  description: 'Express your creativity with Nuvio\'s digital whiteboarding tools. Perfect for brainstorming, visual collaboration, and bringing your ideas to life.',
  keywords: [
    'digital whiteboard',
    'visual collaboration',
    'brainstorming',
    'design tools',
    'creative visualization',
    'idea sketching',
    'visual thinking'
  ],
}

export const dashboardMetadata: Metadata = {
  title: 'Dashboard - Your Creative Hub | Nuvio',
  description: 'Access all your creative tools in one place. From notebooks to whiteboards, manage your productivity workflow efficiently.',
  keywords: [
    'productivity dashboard',
    'creative hub',
    'tool management',
    'workflow dashboard',
    'productivity overview'
  ],
}
