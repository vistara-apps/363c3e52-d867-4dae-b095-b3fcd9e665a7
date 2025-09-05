export const GUIDES = [
  {
    guideId: 'traffic-stop',
    title: 'Traffic Stop Rights',
    content: `**During a Traffic Stop:**

• Stay calm and keep hands visible
• You have the right to remain silent
• Ask "Am I free to leave?"
• You can refuse searches (except plain view)
• Ask for a lawyer if arrested
• Record the interaction if safe to do so

**What to Say:**
"I am exercising my right to remain silent. I want to speak to a lawyer."

**What NOT to Say:**
Don't argue, resist, or provide information beyond required ID.`,
    language: 'en' as const,
  },
  {
    guideId: 'home-search',
    title: 'Home Search Rights',
    content: `**Police at Your Door:**

• You don't have to let them in without a warrant
• Ask to see the warrant
• You can refuse consent to search
• Don't block their path if they have a warrant
• Stay calm and document everything

**What to Say:**
"I do not consent to any search. I want to speak to a lawyer."

**Remember:**
Exigent circumstances may allow entry without a warrant in emergencies.`,
    language: 'en' as const,
  },
];

export const SCRIPTS = [
  {
    scriptId: 'basic-rights-en',
    title: 'Basic Rights Statement',
    content: 'I am exercising my right to remain silent. I want to speak to a lawyer. I do not consent to any searches.',
    language: 'en' as const,
  },
  {
    scriptId: 'basic-rights-es',
    title: 'Declaración de Derechos Básicos',
    content: 'Estoy ejerciendo mi derecho a permanecer en silencio. Quiero hablar con un abogado. No consiento a ningún registro.',
    language: 'es' as const,
  },
  {
    scriptId: 'traffic-stop-en',
    title: 'Traffic Stop Response',
    content: 'Officer, I understand you stopped me. I am exercising my right to remain silent. Am I free to leave?',
    language: 'en' as const,
  },
  {
    scriptId: 'traffic-stop-es',
    title: 'Respuesta en Parada de Tráfico',
    content: 'Oficial, entiendo que me detuvo. Estoy ejerciendo mi derecho a permanecer en silencio. ¿Soy libre de irme?',
    language: 'es' as const,
  },
];

export const PREMIUM_FEATURES = [
  'Extended recording storage (up to 2 hours)',
  'AI-generated incident summaries',
  'Multi-language script generation',
  'Advanced sharing options',
  'Priority support',
  'Encrypted cloud backup',
];
