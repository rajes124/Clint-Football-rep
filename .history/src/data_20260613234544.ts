export interface Player {
  id: string;
  name: string;
  nickname: string;
  birthYear: string;
  role: string;
  number: string;
  achievements: string[];
  description: string;
  signatureMove: string;
  accentColor: string;
  imageUrl: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  glowColor: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

// @ts-ignore
import taskinAvatar from "./assets/images/taskin.jpg";
// @ts-ignore
import brazilStadium from "./assets/images/brazil_stadium_1781344575435.jpg";
// @ts-ignore
import footballAction from "./assets/images/football_action_1781344591891.jpg";

// Custom generated assets (using the paths returned by static imports)
export const ASSETS = {
  taskinAvatar,
  brazilStadium,
  footballAction,
};

export const BRAZIL_PLAYERS: Player[] = [
  {
    id: "pele",
    name: "Pelé (Edson Arantes do Nascimento)",
    nickname: "O Rei (The King)",
    birthYear: "1940 – 2022",
    role: "Forward / Playmaker",
    number: "10",
    achievements: [
      "3x FIFA World Cup Winner (1958, 1962, 1970)",
      "FIFA Player of the Century",
      "1,279 career goals in 1,363 games"
    ],
    description: "The absolute standard of football greatness. Pelé defined the number 10 shirt and introduced 'The Beautiful Game' (O Jogo Bonito) to the entire world, leading Brazil to three legendary World Cups.",
    signatureMove: "Bicycle kick & sublime tactical headers",
    accentColor: "from-yellow-400 to-amber-600",
    imageUrl: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "ronaldinho",
    name: "Ronaldinho Gaúcho",
    nickname: "The Magician",
    birthYear: "1980 – Present",
    role: "Attacking Midfielder",
    number: "10",
    achievements: [
      "1x FIFA World Cup Winner (2002)",
      "Ballon d'Or Winner (2005)",
      "2x FIFA World Player of the Year"
    ],
    description: "Football's greatest entertainer. With his infectious smile and hypnotic elastico tricks, Ronaldinho reminded the world that football is first and foremost a joyful form of pure art.",
    signatureMove: "Elastico, No-look pass, and overhead bicycle loops",
    accentColor: "from-emerald-400 to-green-600",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "ronaldo",
    name: "Ronaldo Nazário",
    nickname: "O Fenômeno (The Phenomenon)",
    birthYear: "1976 – Present",
    role: "Striker",
    number: "9",
    achievements: [
      "2x FIFA World Cup Winner (1994, 2002)",
      "2x Ballon d'Or Winner (1997, 2002)",
      "3x FIFA World Player of the Year"
    ],
    description: "One of the most unstoppable and feared strikers in football history. Ronaldo overcame career-threatening knee injuries to lead Brazil to the 2002 World Cup title with 8 magnificent goals.",
    signatureMove: "Hypersonic step-overs and clinical round-the-keeper finishes",
    accentColor: "from-blue-500 to-indigo-700",
    imageUrl: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "neymar",
    name: "Neymar Jr.",
    nickname: "The Modern Wizard",
    birthYear: "1992 – Present",
    role: "Winger / Playmaker",
    number: "10",
    achievements: [
      "All-Time Top Scorer for Brazil (79+ goals)",
      "Olympic Gold Medalist (Rio 2016)",
      "UEFA Champions League Winner"
    ],
    description: "The modern torchbearer of Brazilian style. Combining supreme dribbling creativity, rapid skill acceleration, and a flawless eye for jaw-dropping free kicks, Neymar Jr carries the legendary No. 10 mantle.",
    signatureMove: "Rainbow flick and lightning-quick double-cut dribbling",
    accentColor: "from-yellow-400 to-green-500",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop"
  }
];

export const TIMELINE_MOMENTS: TimelineEvent[] = [
  {
    id: "moment-1",
    year: "1958",
    title: "The Birth of the King & First Star",
    subtitle: "World Cup Sweden",
    description: "A 17-year-old Pelé shocks the world, scoring a magnificent hat-trick in the semi-finals and a brilliant brace in the final against Sweden, bringing Brazil its very first World Cup title.",
    badge: "First Star Status",
    glowColor: "rgba(252, 209, 22, 0.4)"
  },
  {
    id: "moment-2",
    year: "1970",
    title: "Peak Jogo Bonito & The Jules Rimet",
    subtitle: "World Cup Mexico",
    description: "The 1970 Brazilian squad is widely celebrated as the greatest team ever assembled. Pelé, Jairzinho, Tostão, Gérson, and Carlos Alberto dominate completely, lifting their 3rd star and keeping the Jules Rimet trophy permanently.",
    badge: "Legendary Squad",
    glowColor: "rgba(0, 147, 59, 0.4)"
  },
  {
    id: "moment-3",
    year: "1994",
    title: "The Penalty Thriller in Rose Bowl",
    subtitle: "World Cup USA",
    description: "Led by striker Romário and Bebeto, Brazil holds off powerful Italy in a boiling-hot California summer, winning its 4th World Cup on a dramatic penalty shootout that re-established Seleção planetary dominance.",
    badge: "Tetrachampions Era",
    glowColor: "rgba(0, 39, 118, 0.4)"
  },
  {
    id: "moment-4",
    year: "2002",
    title: "The Pentacampeões Redemption",
    subtitle: "World Cup South Korea & Japan",
    description: "Ronaldo Nazário overcomes double knee ruptures to score 8 goals, supported by Ronaldinho and Rivaldo (the legendary R's). Brazil triumphs 2-0 over Germany in the final to become the only 5-time champions of the world.",
    badge: "Pentacampeões Domain",
    glowColor: "rgba(252, 209, 22, 0.5)"
  },
  {
    id: "moment-5",
    year: "2016",
    title: "Inaugural Olympic Gold at Maracanã",
    subtitle: "Rio de Janeiro Olympics",
    description: "Playing under the pressure of a whole nation, Neymar Jr scores a stupendous free-kick and fires home the winning penalty at the iconic Maracanã Stadium, claiming the singular trophy that Brazil had never won before.",
    badge: "Olympic Golden Glory",
    glowColor: "rgba(0, 147, 59, 0.5)"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Atmospheric Stadium Glory",
    category: "Stadium",
    imageUrl: ASSETS.brazilStadium,
    description: "Inside the mesmerizing world cup stadium with yellow and green fireworks lighting up the arena."
  },
  {
    id: "gal-2",
    title: "The Jogo Bonito Slide",
    category: "Action",
    imageUrl: ASSETS.footballAction,
    description: "Sleek low-angle shot capturing a goal celebration beneath giant stadium floodlights."
  },
  {
    id: "gal-3",
    title: "The Yellow Wall of Brazil Fans",
    category: "Supporters",
    imageUrl: "https://cdn.pixabay.com/photo/2015/02/03/03/24/football-621916_1280.jpg",
    description: "Thousands of absolute supporters singing with giant flags waving inside the stadium."
  },
  {
    id: "gal-4",
    title: "Maracanã Cathedral at Dusk",
    category: "Stadium",
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop",
    description: "Sunset over the epic cathedral of football, Rio's iconic stadium bathed in warm twilight colors."
  },
  {
    id: "gal-5",
    title: "Supporter's Matchday Colors",
    category: "Supporters",
    imageUrl: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=800&auto=format&fit=crop",
    description: "Vibrant yellow and green smoke bombs coloring the crowd, fueling the pitch's fire."
  },
  {
    id: "gal-6",
    title: "Classic Grass Under Lights",
    category: "Action",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
    description: "Crisp green grass field under the premium spotlight of an upcoming high-intensity final."
  }
];
