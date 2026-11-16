export type ServiceSlug =
  | "automatisation-ia"
  | "sites-web"
  | "marketing-digital"
  | "solutions-metier";

export type Service = {
  slug: ServiceSlug;
  /** Valeur envoyée par le formulaire de devis */
  key: "automatisation" | "site-web" | "marketing" | "solution-metier";
  name: string;
  short: string;
  icon: "workflow" | "globe" | "megaphone" | "layout-dashboard";
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroText: string;
  pains: string[];
  deliverables: { title: string; text: string }[];
  useCases: { trade: string; text: string }[];
  outcomes: string[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "automatisation-ia",
    key: "automatisation",
    name: "Automatisation IA",
    short:
      "Demandes clients, relances, qualification des prospects : les tâches répétitives tournent toutes seules.",
    icon: "workflow",
    metaTitle: "Automatisation IA pour artisans et PME",
    metaDescription:
      "Automatisez le traitement des demandes clients, la qualification des prospects et les relances par e-mail, WhatsApp et formulaires.",
    heroTitle: "Moins de temps au bureau, plus de temps sur les chantiers.",
    heroText:
      "Nous mettons en place des automatisations simples qui prennent en charge les tâches répétitives : répondre aux demandes, qualifier les prospects, relancer les devis, préparer les documents.",
    pains: [
      "Des appels et messages manqués pendant que vous êtes en intervention.",
      "Des devis envoyés qui restent sans relance faute de temps.",
      "Des soirées passées à ressaisir les mêmes informations.",
      "Des demandes qui arrivent par téléphone, e-mail, WhatsApp et formulaire, sans vue d’ensemble.",
    ],
    deliverables: [
      {
        title: "Réponse automatique aux demandes",
        text: "Chaque demande reçoit un accusé de réception immédiat et les bonnes questions (adresse, type de besoin, urgence, photos).",
      },
      {
        title: "Qualification des prospects",
        text: "Les demandes sont triées par urgence et par type d’intervention, puis transmises à la bonne personne.",
      },
      {
        title: "Relances automatiques",
        text: "Relance des devis sans réponse, rappel avant rendez-vous, demande d’avis après intervention.",
      },
      {
        title: "WhatsApp, e-mails et formulaires",
        text: "Vos canaux existants sont reliés entre eux pour que rien ne se perde.",
      },
      {
        title: "Tâches administratives",
        text: "Préparation de devis types, classement des documents, synthèse des échanges avec un client.",
      },
    ],
    useCases: [
      {
        trade: "Plombier",
        text: "Une fuite signalée le soir reçoit une réponse immédiate demandant photo et adresse ; la demande est marquée urgente pour le lendemain matin.",
      },
      {
        trade: "Chauffagiste",
        text: "Les contrats d’entretien arrivant à échéance déclenchent un message de rappel et une proposition de créneau.",
      },
      {
        trade: "Entreprise de rénovation",
        text: "Un devis sans réponse après quelques jours est relancé automatiquement, avec une notification si le client répond.",
      },
    ],
    outcomes: [
      "Aucune demande oubliée",
      "Des relances faites à temps, sans y penser",
      "Une vue claire de ce qui reste à traiter",
    ],
    faq: [
      {
        q: "Faut-il changer mes outils actuels ?",
        a: "Non. Nous partons de vos outils (téléphone, e-mail, WhatsApp, tableur, logiciel de devis) et les relions entre eux. Un changement n’est proposé que s’il simplifie vraiment votre quotidien.",
      },
      {
        q: "L’IA répond-elle à ma place sans contrôle ?",
        a: "Vous choisissez ce qui est automatique et ce qui doit être validé par vous. Les messages types sont rédigés avec vous, dans votre ton.",
      },
      {
        q: "Et mes données clients ?",
        a: "Elles restent dans vos outils ou dans des services hébergés que nous vous présentons avant la mise en place. Nous appliquons les principes du RGPD.",
      },
    ],
  },
  {
    slug: "sites-web",
    key: "site-web",
    name: "Sites web professionnels",
    short:
      "Sites vitrines et landing pages rapides, pensés pour le mobile et pour transformer les visiteurs en demandes de devis.",
    icon: "globe",
    metaTitle: "Création de sites web pour artisans et PME",
    metaDescription:
      "Sites vitrines, landing pages et sites professionnels optimisés mobile, avec formulaires de contact pour générer des demandes de devis.",
    heroTitle: "Un site qui inspire confiance et qui fait sonner le téléphone.",
    heroText:
      "Vos futurs clients vous cherchent d’abord sur leur téléphone. Nous créons des sites clairs, rapides et pensés pour une seule chose : recevoir des demandes qualifiées.",
    pains: [
      "Un site daté, lent ou illisible sur mobile.",
      "Pas de site du tout, seulement une page Facebook.",
      "Des visiteurs qui repartent sans laisser leurs coordonnées.",
      "Un site impossible à mettre à jour sans prestataire.",
    ],
    deliverables: [
      {
        title: "Site vitrine",
        text: "Présentation de votre entreprise, de vos prestations, de votre zone d’intervention et de vos réalisations.",
      },
      {
        title: "Landing page",
        text: "Une page dédiée à une offre précise (dépannage, entretien, rénovation de salle de bain…) pour vos campagnes.",
      },
      {
        title: "Optimisation mobile",
        text: "Boutons d’appel, formulaires courts et chargement rapide sur smartphone.",
      },
      {
        title: "Formulaires de prise de contact",
        text: "Formulaires qui posent les bonnes questions et peuvent être reliés à vos automatisations.",
      },
      {
        title: "Bases du référencement local",
        text: "Structure, contenus et fiche d’établissement pensés pour les recherches dans votre zone.",
      },
    ],
    useCases: [
      {
        trade: "Entreprise de nettoyage",
        text: "Une page par type de prestation (bureaux, fin de chantier, copropriétés) avec un formulaire de demande adapté.",
      },
      {
        trade: "Installateur HVAC",
        text: "Une landing page dédiée à la pose de pompes à chaleur, avec questions de pré-qualification.",
      },
      {
        trade: "Plombier-chauffagiste",
        text: "Un site vitrine avec bouton d’appel visible et zone d’intervention clairement indiquée.",
      },
    ],
    outcomes: [
      "Une image professionnelle",
      "Des demandes mieux qualifiées",
      "Un site que vous pouvez faire évoluer",
    ],
    faq: [
      {
        q: "Combien de temps pour avoir mon site ?",
        a: "Cela dépend du nombre de pages et des contenus disponibles. Nous vous donnons un planning précis dans le devis.",
      },
      {
        q: "Je n’ai ni textes ni photos, est-ce un problème ?",
        a: "Non. Nous vous aidons à rédiger les textes et vous indiquons quelles photos prendre sur vos chantiers.",
      },
      {
        q: "Le site m’appartient-il ?",
        a: "Oui. Le nom de domaine et les contenus sont à votre nom. Les conditions d’hébergement sont précisées dans le devis.",
      },
    ],
  },
  {
    slug: "marketing-digital",
    key: "marketing",
    name: "Marketing digital",
    short:
      "Vidéos courtes, visuels et contenus réguliers pour TikTok, Instagram et Facebook, sans y passer vos soirées.",
    icon: "megaphone",
    metaTitle: "Marketing digital et vidéos courtes pour artisans",
    metaDescription:
      "Création de vidéos courtes, contenus TikTok, Instagram et Facebook, visuels réalisés avec l’IA et gestion de votre présence numérique.",
    heroTitle: "Montrez votre savoir-faire, régulièrement.",
    heroText:
      "Vos chantiers sont votre meilleure publicité. Nous transformons vos photos et vidéos en contenus courts et soignés, publiés avec régularité sur les réseaux de vos clients.",
    pains: [
      "Des réseaux sociaux ouverts mais jamais alimentés.",
      "Pas le temps de monter des vidéos ni d’écrire des publications.",
      "Des visuels faits à la va-vite qui ne reflètent pas la qualité de votre travail.",
      "Aucune idée de ce qu’il faut publier.",
    ],
    deliverables: [
      {
        title: "Vidéos courtes",
        text: "Montage de vidéos verticales à partir de vos images de chantier : avant / après, astuces, présentation de l’équipe.",
      },
      {
        title: "Contenus TikTok, Instagram et Facebook",
        text: "Calendrier éditorial, textes et formats adaptés à chaque réseau.",
      },
      {
        title: "Visuels créés avec l’IA",
        text: "Visuels de promotion, bannières et illustrations, toujours cohérents avec votre image.",
      },
      {
        title: "Gestion de présence numérique",
        text: "Mise à jour de vos profils et de votre fiche d’établissement, cohérence des informations partout.",
      },
    ],
    useCases: [
      {
        trade: "Rénovation",
        text: "Une série de vidéos avant / après publiée chaque semaine à partir des photos prises par l’équipe.",
      },
      {
        trade: "Chauffagiste",
        text: "Des conseils courts avant l’hiver (entretien, économies d’énergie) pour rester visible au bon moment.",
      },
      {
        trade: "Entreprise de nettoyage",
        text: "Des visuels saisonniers et des publications pour présenter les prestations aux entreprises locales.",
      },
    ],
    outcomes: [
      "Une présence régulière",
      "Une image cohérente partout",
      "Du temps gagné chaque semaine",
    ],
    faq: [
      {
        q: "Dois-je apparaître dans les vidéos ?",
        a: "Ce n’est pas obligatoire. Les images de chantier, les gestes techniques et les résultats suffisent souvent.",
      },
      {
        q: "Qui publie les contenus ?",
        a: "Selon votre préférence : nous publions pour vous, ou nous vous livrons les contenus prêts à publier.",
      },
      {
        q: "Les visuels IA sont-ils reconnaissables ?",
        a: "Nous les utilisons pour les éléments graphiques, jamais pour faire passer de fausses réalisations pour les vôtres.",
      },
    ],
  },
  {
    slug: "solutions-metier",
    key: "solution-metier",
    name: "Solutions métier",
    short:
      "Outils de gestion simples, tableaux de bord et applications internes adaptés à la façon dont vous travaillez.",
    icon: "layout-dashboard",
    metaTitle: "Outils de gestion et applications internes pour PME",
    metaDescription:
      "Outils de gestion simples, tableaux de bord et applications internes sur mesure pour automatiser les processus des PME.",
    heroTitle: "Des outils à la taille de votre entreprise.",
    heroText:
      "Quand les tableurs ne suffisent plus et que les logiciels du marché sont trop lourds, nous construisons l’outil simple dont vous avez besoin, et rien de plus.",
    pains: [
      "Des informations dispersées entre carnets, tableurs et messages.",
      "Impossible de savoir rapidement où en est chaque chantier.",
      "Des logiciels trop complexes ou trop chers pour votre taille.",
      "Des processus internes qui reposent sur la mémoire d’une seule personne.",
    ],
    deliverables: [
      {
        title: "Outils de gestion simples",
        text: "Suivi des interventions, des clients, du matériel ou des contrats d’entretien.",
      },
      {
        title: "Tableaux de bord",
        text: "Une page pour voir l’essentiel : demandes en cours, devis, chantiers, encaissements.",
      },
      {
        title: "Applications internes",
        text: "Formulaires d’intervention sur mobile, comptes rendus, check-lists d’équipe.",
      },
      {
        title: "Automatisation des processus",
        text: "Les étapes qui se répètent sont enchaînées automatiquement, avec des notifications aux bonnes personnes.",
      },
    ],
    useCases: [
      {
        trade: "Entreprise HVAC",
        text: "Un suivi des contrats d’entretien avec dates de passage, historique et rappels automatiques.",
      },
      {
        trade: "Nettoyage",
        text: "Une application mobile de pointage et de compte rendu pour les équipes sur site.",
      },
      {
        trade: "Rénovation",
        text: "Un tableau de bord des chantiers en cours avec avancement, achats et prochaines étapes.",
      },
    ],
    outcomes: [
      "Une seule source d’information",
      "Une vision claire de l’activité",
      "Un outil que votre équipe utilise vraiment",
    ],
    faq: [
      {
        q: "Est-ce que c’est un logiciel à abonnement ?",
        a: "Nous privilégions des solutions à faible coût de fonctionnement. Les éventuels frais d’hébergement sont indiqués clairement dans le devis.",
      },
      {
        q: "Peut-on commencer petit ?",
        a: "Oui, c’est même ce que nous recommandons : une première version qui règle un problème précis, puis des améliorations selon l’usage.",
      },
      {
        q: "Mon équipe n’est pas à l’aise avec l’informatique.",
        a: "Les outils sont conçus pour être utilisés sur téléphone, avec le minimum d’écrans et de champs à remplir.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
