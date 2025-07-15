// Mock data for the dopamine regulation wellness app

export const educationalContent = [
  {
    id: '1',
    title: 'Understanding Dopamine: The Motivation Molecule',
    excerpt: 'Learn how dopamine affects your motivation, focus, and decision-making in the modern world.',
    content: `Dopamine is often called the "reward chemical," but it's more accurately described as the "motivation molecule." It plays a crucial role in how we anticipate, seek, and experience rewards.

In our modern digital age, we're constantly bombarded with stimuli designed to trigger dopamine release - social media notifications, instant messaging, video games, and endless scrolling. This constant stimulation can lead to what researchers call "dopamine dysregulation."

When we experience too many artificial dopamine spikes, our brain's natural reward system becomes desensitized. This makes it harder to find joy in simple, everyday activities and can lead to:

- Decreased motivation for long-term goals
- Difficulty concentrating on single tasks
- Increased anxiety and restlessness
- Reduced satisfaction from meaningful activities

The good news is that you can retrain your brain to find balance. Through mindful practices, digital detoxes, and gradual exposure to delayed gratification, you can restore your natural dopamine sensitivity and rediscover the joy in life's simple pleasures.`,
    readTime: '5 min read',
    category: 'Neuroscience',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    tags: ['dopamine', 'neuroscience', 'motivation']
  },
  {
    id: '2',
    title: 'The Science of Digital Overwhelm',
    excerpt: 'Discover how constant digital stimulation affects your brain and what you can do about it.',
    content: `Our brains evolved to handle a much simpler information environment. Today's digital landscape overwhelms our cognitive systems with constant notifications, infinite scroll feeds, and instant gratification.

Research shows that the average person checks their phone 96 times per day. Each notification triggers a small dopamine release, creating a cycle of seeking and reward that can become addictive.

This digital overwhelm manifests in several ways:

**Attention Fragmentation**: Our ability to focus deeply on single tasks becomes compromised when we're constantly switching between different stimuli.

**Instant Gratification Bias**: We become increasingly intolerant of delays and seek immediate rewards, making it harder to work toward long-term goals.

**Comparison Trap**: Social media creates endless opportunities for social comparison, leading to decreased self-esteem and life satisfaction.

**Sleep Disruption**: Blue light and mental stimulation from screens interfere with our natural circadian rhythms.

The solution isn't to completely disconnect from technology, but to develop a healthier relationship with it through mindful consumption, regular digital detoxes, and practices that strengthen our ability to focus and find contentment in the present moment.`,
    readTime: '7 min read',
    category: 'Digital Wellness',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    tags: ['digital wellness', 'focus', 'mindfulness']
  },
  {
    id: '3',
    title: 'Building Sustained Focus in a Distracted World',
    excerpt: 'Practical strategies to develop deep work capabilities and maintain concentration.',
    content: `The ability to focus deeply on cognitively demanding tasks is becoming increasingly rare—and increasingly valuable. In our hyperconnected world, developing sustained focus requires intentional practice and the right strategies.

**The Focus Continuum**: Focus isn't binary; it exists on a spectrum. Understanding the different types of focus can help you choose the right approach for different situations:

- **Focused attention**: Concentrated effort on a single task
- **Sustained attention**: Maintaining focus over extended periods
- **Selective attention**: Filtering out distractions while maintaining focus
- **Divided attention**: Managing multiple tasks effectively

**Building Your Focus Muscle**: Like physical fitness, focus can be trained and strengthened through regular practice:

1. **Start Small**: Begin with 15-20 minute focused work sessions
2. **Remove Distractions**: Create a dedicated workspace free from interruptions
3. **Use the Pomodoro Technique**: Work in focused bursts with short breaks
4. **Practice Mindfulness**: Regular meditation strengthens attention control
5. **Gradual Progression**: Slowly increase the duration of focused work sessions

**The Role of Rest**: Counter-intuitively, rest is crucial for sustained focus. Your brain needs downtime to consolidate learning and restore cognitive resources. Schedule regular breaks, ensure adequate sleep, and engage in activities that truly refresh your mind.

Remember, developing sustained focus is a journey, not a destination. Be patient with yourself as you build this essential skill.`,
    readTime: '6 min read',
    category: 'Focus Training',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    tags: ['focus', 'productivity', 'training']
  }
];

export const assessmentQuestions = [
  {
    id: '1',
    question: 'How often do you check your phone or social media without a specific purpose?',
    options: [
      { value: 1, text: 'Rarely or never' },
      { value: 2, text: 'A few times a day' },
      { value: 3, text: 'Every hour' },
      { value: 4, text: 'Every few minutes' },
      { value: 5, text: 'Almost constantly' }
    ],
    category: 'digital-habits'
  },
  {
    id: '2',
    question: 'How difficult is it for you to focus on a single task for 30 minutes without distractions?',
    options: [
      { value: 1, text: 'Very easy' },
      { value: 2, text: 'Somewhat easy' },
      { value: 3, text: 'Neutral' },
      { value: 4, text: 'Somewhat difficult' },
      { value: 5, text: 'Very difficult' }
    ],
    category: 'focus-ability'
  },
  {
    id: '3',
    question: 'How often do you feel restless or anxious when you can\'t access your devices?',
    options: [
      { value: 1, text: 'Never' },
      { value: 2, text: 'Rarely' },
      { value: 3, text: 'Sometimes' },
      { value: 4, text: 'Often' },
      { value: 5, text: 'Always' }
    ],
    category: 'digital-dependence'
  },
  {
    id: '4',
    question: 'How satisfied are you with your current ability to complete long-term goals?',
    options: [
      { value: 1, text: 'Very satisfied' },
      { value: 2, text: 'Somewhat satisfied' },
      { value: 3, text: 'Neutral' },
      { value: 4, text: 'Somewhat unsatisfied' },
      { value: 5, text: 'Very unsatisfied' }
    ],
    category: 'goal-completion'
  },
  {
    id: '5',
    question: 'How often do you experience "brain fog" or difficulty thinking clearly?',
    options: [
      { value: 1, text: 'Never' },
      { value: 2, text: 'Rarely' },
      { value: 3, text: 'Sometimes' },
      { value: 4, text: 'Often' },
      { value: 5, text: 'Daily' }
    ],
    category: 'mental-clarity'
  }
];

export const meditationExercises = [
  {
    id: '1',
    title: 'Mindful Breathing',
    duration: '5 minutes',
    description: 'A simple breathing exercise to center yourself and reduce impulsivity.',
    instructions: [
      'Find a comfortable seated position',
      'Close your eyes or soften your gaze',
      'Take a deep breath in through your nose for 4 counts',
      'Hold your breath for 4 counts',
      'Exhale slowly through your mouth for 6 counts',
      'Repeat this cycle, focusing only on your breath',
      'If your mind wanders, gently return to your breath'
    ],
    type: 'breathing'
  },
  {
    id: '2',
    title: 'Body Scan Meditation',
    duration: '10 minutes',
    description: 'Release tension and become aware of physical sensations to ground yourself.',
    instructions: [
      'Lie down comfortably or sit in a chair',
      'Close your eyes and take three deep breaths',
      'Start at the top of your head and slowly scan down',
      'Notice any tension or sensations without judgment',
      'Breathe into areas of tension and let them soften',
      'Continue scanning down to your toes',
      'End by taking three deep breaths and opening your eyes'
    ],
    type: 'body-scan'
  },
  {
    id: '3',
    title: 'Digital Detox Meditation',
    duration: '15 minutes',
    description: 'Specifically designed to help you disconnect from digital stimulation.',
    instructions: [
      'Put all devices in another room',
      'Sit comfortably with your back straight',
      'Notice any urges to check your devices',
      'Instead of acting on these urges, observe them with curiosity',
      'Focus on the present moment and your surroundings',
      'Practice gratitude for three things you can see, hear, or feel',
      'Breathe deeply and appreciate this moment of digital freedom'
    ],
    type: 'digital-detox'
  }
];

export const focusActivities = [
  {
    id: '1',
    name: 'Deep Work Session',
    duration: 90,
    description: 'Extended focus session for complex cognitive tasks',
    breakInterval: 25,
    breakDuration: 5,
    type: 'deep-work'
  },
  {
    id: '2',
    name: 'Pomodoro Timer',
    duration: 25,
    description: 'Classic focused work sprint with regular breaks',
    breakInterval: 25,
    breakDuration: 5,
    type: 'pomodoro'
  },
  {
    id: '3',
    name: 'Mindful Reading',
    duration: 45,
    description: 'Slow, intentional reading without distractions',
    breakInterval: 15,
    breakDuration: 3,
    type: 'reading'
  },
  {
    id: '4',
    name: 'Creative Flow',
    duration: 60,
    description: 'Uninterrupted time for creative work and exploration',
    breakInterval: 30,
    breakDuration: 10,
    type: 'creative'
  }
];

export const userGoals = [
  {
    id: '1',
    title: 'Reduce social media usage',
    description: 'Limit social media to 30 minutes per day',
    target: 30,
    current: 45,
    unit: 'minutes',
    category: 'digital-wellness',
    deadline: '2024-02-15',
    progress: 67,
    status: 'active'
  },
  {
    id: '2',
    title: 'Daily meditation practice',
    description: 'Meditate for 15 minutes every morning',
    target: 15,
    current: 12,
    unit: 'minutes',
    category: 'mindfulness',
    deadline: '2024-02-28',
    progress: 80,
    status: 'active'
  },
  {
    id: '3',
    title: 'Deep work sessions',
    description: 'Complete 2 hours of focused work daily',
    target: 2,
    current: 1.5,
    unit: 'hours',
    category: 'focus',
    deadline: '2024-03-01',
    progress: 75,
    status: 'active'
  }
];

export const journalEntries = [
  {
    id: '1',
    date: '2024-01-15',
    title: 'First day of digital detox',
    content: 'Started my journey today. Noticed how often I reach for my phone without thinking. Going to try the 5-minute breathing exercise when I feel the urge.',
    mood: 'curious',
    triggers: ['boredom', 'habit'],
    insights: 'I use my phone as a default activity when I have even a few seconds of downtime.'
  },
  {
    id: '2',
    date: '2024-01-16',
    title: 'Better focus today',
    content: 'Used the Pomodoro timer for work. Got more done in 2 hours than I usually do in a whole morning. The breaks actually helped me stay focused.',
    mood: 'accomplished',
    triggers: ['work stress'],
    insights: 'Regular breaks improve my focus rather than hindering it.'
  },
  {
    id: '3',
    date: '2024-01-17',
    title: 'Struggled with evening routine',
    content: 'Had a hard time resisting social media after dinner. Need to find a better evening activity. Maybe reading or a walk?',
    mood: 'frustrated',
    triggers: ['evening routine', 'loneliness'],
    insights: 'I need to prepare alternative activities for trigger times.'
  }
];

export const progressData = {
  focusMinutes: {
    week: [45, 60, 75, 90, 85, 95, 105],
    month: [1200, 1350, 1500, 1650, 1800, 1950, 2100],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  screenTime: {
    week: [180, 165, 150, 135, 120, 105, 90],
    month: [3600, 3400, 3200, 3000, 2800, 2600, 2400],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  meditationStreak: 7,
  goalCompletionRate: 78,
  wellnessScore: 85
};

export const detoxChallenges = [
  {
    id: '1',
    title: 'Morning Phone-Free Hour',
    description: 'Keep your phone in another room for the first hour after waking up',
    duration: '1 hour',
    difficulty: 'Easy',
    category: 'morning-routine',
    completed: false
  },
  {
    id: '2',
    title: 'Notification Silence',
    description: 'Turn off all non-essential notifications for 4 hours',
    duration: '4 hours',
    difficulty: 'Medium',
    category: 'distraction-reduction',
    completed: true
  },
  {
    id: '3',
    title: 'Social Media Sabbath',
    description: 'Take a complete break from social media for 24 hours',
    duration: '24 hours',
    difficulty: 'Hard',
    category: 'digital-detox',
    completed: false
  },
  {
    id: '4',
    title: 'Mindful Eating',
    description: 'Eat one meal without any digital devices or distractions',
    duration: '30 minutes',
    difficulty: 'Easy',
    category: 'mindfulness',
    completed: true
  }
];

export const ambientSounds = [
  {
    id: '1',
    name: 'Forest Rain',
    description: 'Gentle rainfall in a peaceful forest',
    duration: '60 minutes',
    category: 'nature',
    icon: '🌧️'
  },
  {
    id: '2',
    name: 'Ocean Waves',
    description: 'Rhythmic waves lapping against the shore',
    duration: '45 minutes',
    category: 'nature',
    icon: '🌊'
  },
  {
    id: '3',
    name: 'White Noise',
    description: 'Consistent background noise for focus',
    duration: '120 minutes',
    category: 'focus',
    icon: '🔊'
  },
  {
    id: '4',
    name: 'Tibetan Bells',
    description: 'Peaceful meditation bells',
    duration: '30 minutes',
    category: 'meditation',
    icon: '🔔'
  }
];