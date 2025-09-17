
import type { Monastery, ArchiveDocument, CulturalEvent, LocalService } from '@/types';

export const monasteries: Monastery[] = [
  {
    id: '1',
    name: 'Rumtek Monastery',
    location: 'Gangtok, Sikkim',
    description: 'A sprawling complex, Rumtek is one of the most important centers of Kagyu Buddhism.',
    imageId: 'monastery-1',
    tourImageId: 'tour-1',
    tourEmbedUrl: 'https://www.google.com/maps/embed?pb=!4v1757795303954!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRFptcjdvSlE.!2m2!1d27.28848553899807!2d88.56190567068603!3f0!4f0!5f0.7820865974627469',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.443834249968!2d88.56005231505016!3d27.28849498299105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a56a5805eafb%3A0x73d622313337904a!2sRumtek%20Monastery!5e0!3m2!1sen!2sin!4v1625232938568!5m2!1sen!2sin',
    reviews: [
      { id: 'r1', author: 'Alex J.', rating: 5, comment: 'An absolutely breathtaking and serene experience. The architecture is stunning.' },
      { id: 'r2', author: 'Maria S.', rating: 4, comment: 'Very peaceful. A must-visit for anyone traveling to Gangtok. A bit crowded in the afternoon.' },
    ],
    guides: [
      { id: 'g1', name: 'Tenzing Sherpa', rate: '₹1500 / half day', contact: '+91 98765 43210' },
      { id: 'g2', name: 'Pema Bhutia', rate: '₹2500 / full day', contact: '+91 91234 56789' },
    ],
    activities: [
      { id: 'a1', name: 'Morning Prayers', description: 'Witness the monks chant their morning prayers in the main hall. Starts at 6 AM.' },
      { id: 'a2', name: 'Explore the Golden Stupa', description: 'Visit the stunning Golden Stupa which contains the relics of the 16th Karmapa.' },
    ],
    attractions: [
      { id: 'att1', name: 'Nehru Botanical Garden', description: 'A lush garden with a mix of tropical and temperate plants.' },
      { id: 'att2', name: 'Shanti Viewpoint', description: 'Offers panoramic views of the Gangtok valley.' },
    ],
    walkthroughs: [
      { language: 'English', videoUrl: 'https://www.youtube.com/embed/LL48yM1nFp8' },
    ]
  },
  {
    id: '2',
    name: 'Pemayangtse Monastery',
    location: 'Pelling, Sikkim',
    description: 'One of the oldest and most premier monasteries of Sikkim, belonging to the Nyingma order.',
    imageId: 'monastery-2',
    tourImageId: 'tour-2',
    tourEmbedUrl: 'https://www.google.com/maps/embed?pb=!4v1757795555150!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0U3SXFEeFFF!2m2!1d27.30426034149243!2d88.30153660084635!3f0!4f0!5f0.7820865974627469',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28353.33455657772!2d88.21448013955078!3d27.336426800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a3556f4d2c77%3A0x111e4c73f47c9454!2sPemayangtse%20Monastery!5e0!3m2!1sen!2sin!4v1758074948835!5m2!1sen!2sin',
    reviews: [
      { id: 'r3', author: 'John D.', rating: 5, comment: 'Incredible history and amazing views of the mountains. The woodwork is fantastic.' },
      { id: 'r4', author: 'Emily W.', rating: 5, comment: 'Felt a deep sense of peace here. The seven-tiered wooden structure is a masterpiece.' },
    ],
    guides: [
      { id: 'g3', name: 'Karma Lepcha', rate: '₹1200 / half day', contact: '+91 89012 34567' },
    ],
    activities: [
      { id: 'a3', name: 'Cham Dance Viewing', description: 'If you visit during the festival (Feb/March), the masked monk dance is a must-see.' },
      { id: 'a4', name: 'Hike to Rabdentse Ruins', description: 'A short, scenic hike from the monastery to the ruins of the former capital of Sikkim.' },
    ],
    attractions: [
      { id: 'att3', name: 'Rabdentse Ruins', description: 'The archeological site of the former capital of Sikkim.' },
      { id: 'att4', name: 'Singshore Bridge', description: 'One of the highest suspension bridges in Asia.' },
    ],
    walkthroughs: [
      { language: 'English', videoUrl: 'https://www.youtube.com/embed/0-ZTsf3A64g' },
    ]
  },
  {
    id: '3',
    name: 'Tashiding Monastery',
    location: 'West Sikkim',
    description: 'Perched on a heart-shaped hilltop, this monastery is considered the most sacred in Sikkim.',
    imageId: 'monastery-3',
    tourImageId: 'tour-3',
    tourEmbedUrl: 'https://www.google.com/maps/embed?pb=!4v1757795656679!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0V6b09UVnc.!2m2!1d27.3080960299431!2d88.29783391014004!3f0!4f0!5f0.7820865974627469',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.840333881478!2d88.29564521504926!3d27.30809998290967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a56a5805eafb%3A0x73d622313337904a!2sTashiding%20Monastery!5e0!3m2!1sen!2sin!4v1625233045678!5m2!1sen!2sin',
    reviews: [
      { id: 'r5', author: 'Kenji T.', rating: 5, comment: 'The most spiritually charged place I have ever been. The drive is long, but worth every moment.' },
    ],
    guides: [
      { id: 'g4', name: 'Sonam Dorjee', rate: '₹1000 / tour', contact: 'Available at site' },
    ],
    activities: [
      { id: 'a5', name: 'Bhumchu Festival', description: 'Participate in the sacred water ceremony during the Bhumchu festival, predicting the year ahead.' },
      { id: 'a6', name: 'Walk the Kora', description: 'Take a meditative walk around the monastery complex, spinning prayer wheels as you go.' },
    ],
    attractions: [
        { id: 'att5', name: 'Khangchendzonga National Park', description: 'A UNESCO World Heritage site with pristine Himalayan forests.' },
        { id: 'att6', name: 'Yuksom', description: 'The first capital of Sikkim and the base for many treks.' },
    ],
    walkthroughs: [
      { language: 'English', videoUrl: 'https://www.youtube.com/embed/VIGwqAcVmVw' },
    ]
  },
];

export const archiveDocuments: ArchiveDocument[] = [
  {
    id: 'doc-1',
    title: 'The Sutra of Golden Light',
    type: 'manuscript',
    description: 'An ancient text outlining the path to enlightenment and the protection of the Dharma.',
    imageId: 'manuscript-1',
    content: `The Sūtra of Golden Light is a Mahāyāna sūtra of Indian origin. Its main theme is the importance of the sūtra itself. The sūtra is also noteworthy for its detailed chapter on the duties of a king as a Dharma king who protects the Saṅgha and the country. It emphasizes that a country will enjoy peace and prosperity if its ruler upholds the true Dharma. It contains a mixture of teachings, including tales of past buddhas, instructions on meditation, and explanations of complex philosophical concepts. The text is highly valued in East Asian Buddhism. In this sūtra, the bodhisattva Ruchiraketu dreams of a great golden drum, the radiance of which illuminates the entire world. When he asks the Buddha about the meaning of this dream, the Buddha explains that the sūtra itself is this drum, and that all who hear it, rejoice in it, and practice it will receive great benefits. The Buddha then proceeds to teach the sūtra to the assembly, explaining the profound qualities of the buddhas, the nature of emptiness, and the importance of confession and rejoicing. The sūtra concludes with a powerful promise from the Four Great Kings to protect and support any land where the sūtra is taught and revered, ensuring that the nation is to benefit.`,
    url: 'https://84000.co/translation/toh555/UT22084-089-012-introduction#:~:text=In%20this%20s%C5%ABtra%2C%20the%20bodhisattva,the%20nation%20is%20to%20benefit'
  },
  {
    id: 'doc-2',
    title: 'Wheel of Life Mural',
    type: 'mural',
    description: 'A detailed mural depicting the Bhavacakra, the cycle of samsaric existence.',
    imageId: 'mural-1',
    content: `The Bhavacakra, or Wheel of Life, is a symbolic representation of saṃsāra (the cycle of death and rebirth) found on the outside walls of Tibetan Buddhist temples and monasteries. In the Mahayana Buddhist tradition, it is believed that the drawing was designed by the Buddha himself in order to help ordinary people understand his teachings. The Wheel of Life is one of the most common subjects of Tibetan Buddhist art. The image shows the six realms of existence, the twelve links of dependent origination, and the three poisons: ignorance, attachment, and aversion.`,
    url: 'https://www.originalbuddhas.com/blog/bhavachakra-the-wheel-of-life?srsltid=AfmBOoqRzS6IYu9kOEzQ6JEwbs6CrDySXa12HP9D6GcJ8bUNnIz_Y5Tw'
  },
  {
    id: 'doc-3',
    title: 'Royal Decree of 1782',
    type: 'document',
    description: 'A historical decree from the Chogyal of Sikkim regarding land grants to a monastery.',
    imageId: 'document-1',
    content: `This decree, issued by the 8th Chogyal, Tenzing Namgyal, grants the lands of the upper Ralang valley to the Tashiding Monastery. It details the boundaries of the land and affirms the monastery's rights to its revenues for the purpose of its upkeep and the performance of religious ceremonies. The document is significant as it demonstrates the close relationship between the state and the monastic institutions in historical Sikkim. It is written in classical Tibetan on handmade paper and bears the royal seal. The text emphasizes the importance of the monastery in preserving the Dharma and ensuring the well-being of the kingdom. It also includes curses upon anyone who might attempt to infringe upon the monastery's rights to this land grant in the future.`,
    url: 'https://himalaya.socanth.cam.ac.uk/collections/journals/bot/pdf/bot_2001_01_02.pdf'
  },
];

export const culturalEvents: CulturalEvent[] = [
  {
    id: 'evt-1',
    name: 'Saga Dawa',
    monastery: 'All Monasteries',
    date: new Date('2025-11-04'),
    description: 'A festival celebrating the birth, enlightenment, and parinirvana of Lord Buddha.',
    imageId: 'saga-dawa',
  },
  {
    id: 'evt-2',
    name: 'Lhabab Duchen',
    monastery: 'Rumtek Monastery',
    date: new Date('2025-11-15'),
    description: 'Commemorates the descent of Buddha from the heaven of the thirty-three gods.',
    imageId: 'lhabab-duchen',
  },
  {
    id: 'evt-new-1',
    name: 'Morning Prayer Ceremony',
    monastery: 'Rumtek Monastery', 
    date: new Date('2025-09-22'),
    description: 'Daily morning prayers with special blessing ceremony for visitors.',
    imageId: 'morning-prayer',
  },
  {
    id: 'evt-new-2',
    name: 'Meditation Retreat',
    monastery: 'Pemayangtse Monastery',
    date: new Date('2025-09-28'),
    description: 'Weekend meditation retreat open to all visitors seeking inner peace.',
    imageId: 'meditation-retreat',
  },
  {
    id: 'evt-new-3',
    name: 'Full Moon Ceremony',
    monastery: 'Enchey Monastery',
    date: new Date('2025-10-05'),
    description: 'Special full moon ceremony with traditional chanting and butter lamp lighting.',
    imageId: 'full-moon',
  },
  {
    id: 'evt-new-4',
    name: 'Cultural Heritage Workshop',
    monastery: 'Tashiding Monastery',
    date: new Date('2025-10-12'),
    description: 'Learn about traditional Sikkimese art, crafts, and monastery life.',
    imageId: 'heritage-workshop',
  },
  {
    id: 'evt-3',
    name: 'Cham Dance Festival',
    monastery: 'Pemayangtse Monastery',
    date: new Date('2025-02-08'),
    description: 'A vibrant masked dance performed by monks to symbolize the destruction of evil forces.',
    imageId: 'cham-dance',
  },
  {
    id: 'evt-4',
    name: 'Losar',
    monastery: 'All Monasteries',
    date: new Date('2025-02-28'),
    description: 'The Tibetan New Year, celebrated with prayers, feasts, and traditional performances.',
    imageId: 'losar',
  },
  {
    id: 'evt-5',
    name: 'Guru Rinpoche\'s Trungkar Tsechu',
    monastery: 'Tashiding Monastery',
    date: new Date('2025-07-18'),
    description: 'Celebrates the birth anniversary of Guru Padmasambhava, the founder of Tibetan Buddhism.',
    imageId: 'guru-rinpoche',
  },
  {
    id: 'evt-6',
    name: 'Pang Lhabsol',
    monastery: 'All Monasteries',
    date: new Date('2025-09-09'),
    description: 'A unique Sikkimese festival worshipping Mount Khangchendzonga as the guardian deity.',
    imageId: 'pang-lhabsol',
  },
];

export const localServices: LocalService[] = [
  {
    id: 'ls-1',
    name: 'Sikkim Express Cabs',
    type: 'Transport',
    contact: '+91 99887 76655',
    description: 'Reliable 24/7 taxi service across Sikkim. Airport transfers available.',
    rating: 4.5,
  },
  {
    id: 'ls-3',
    name: 'Gangtok City Taxi',
    type: 'Transport',
    contact: '+91 91234 56789',
    description: 'Affordable and quick cab service for travel within Gangtok.',
    rating: 4.2,
  },
  {
    id: 'ls-5',
    name: 'Pelling Mountain Cabs',
    type: 'Transport',
    contact: '+91 95554 43322',
    description: 'Specializes in tours around Pelling and West Sikkim. Experienced local drivers.',
    rating: 4.7,
  },
  {
    id: 'ls-2',
    name: 'Himalayan Adventure Tours',
    type: 'Tour Agency',
    contact: 'contact@himalayanadventure.com',
    description: 'Specializing in monastery tours, trekking, and cultural experiences.',
    rating: 4.8,
  },
  {
    id: 'ls-4',
    name: 'Yeti Trails & Travels',
    type: 'Tour Agency',
    contact: 'support@yetitrails.com',
    description: 'Customizable tour packages including guide services and accommodation.',
    rating: 4.6,
  },
  {
    id: 'ls-6',
    name: 'Sikkim Eco-Discovery',
    type: 'Tour Agency',
    contact: 'info@sikkimeco.com',
    description: 'Eco-friendly tours focused on sustainable tourism and local immersion.',
    rating: 4.9,
  },
];

    

    



    

