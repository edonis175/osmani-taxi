import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useScrollAnimation,
  getAnimationClasses,
  getAnimationStyle,
} from "../hooks/useScrollAnimation";
import ScrollToTopButton from "../contexts/ScrollToTopButton";
import ScrollDownButton from "../contexts/ScrollDownButton";

// Import city images
import prishtinaImg from "../assets/images/prishtina.jpg";
import prizrenImg from "../assets/images/prizren.jpg";
import pejaImg from "../assets/images/peja.jpg";
import gjakovaImg from "../assets/images/gjakova.jpg";
import mitrovicaImg from "../assets/images/mitrovica.jpeg";
import ferizajImg from "../assets/images/ferizaj.jpg";
import gjilanImg from "../assets/images/gjilan.jpg";
import podujevaImg from "../assets/images/podujeva.jpg";
import vushtrriImg from "../assets/images/vushtrri.jpg";
import suharekaImg from "../assets/images/suhareka.jpg";

// Counter animation component
const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          const startTime = Date.now();
          const startValue = 0;

          const updateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(
              startValue + (end - startValue) * easeOutCubic
            );

            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            }
          };

          updateCount();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`counter-popular-${end}-${suffix}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end, duration, suffix, hasStarted]);

  return (
    <span id={`counter-popular-${end}-${suffix}`}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

const popularPlaces = [
  {
    id: 1,
    name: "Prishtina",
    image: prishtinaImg,
    description:
      "KOSOVA's vibrant capital city, where modern culture meets rich history in a symphony of cafes, monuments, and endless energy.",
    attractions: [
      "National Museum of KOSOVA",
      "Newborn Monument",
      "Mother Teresa Cathedral",
      "Bill Clinton Boulevard",
    ],
    distance: 25,
    gradient: "from-blue-500 to-cyan-400",
    badge: "Capital City",
  },
  {
    id: 2,
    name: "Prizren",
    image: prizrenImg,
    description:
      "The cultural heart of KOSOVA, where Ottoman architecture tells stories of centuries past along cobblestone streets.",
    attractions: [
      "Historic Stone Bridge",
      "Sinan Pasha Mosque",
      "Prizren Fortress",
      "League of Prizren Museum",
    ],
    distance: 78,
    gradient: "from-purple-500 to-pink-400",
    badge: "Cultural Capital",
  },
  {
    id: 3,
    name: "Peja",
    image: pejaImg,
    description:
      "Gateway to the majestic Rugova Mountains, where natural beauty meets spiritual heritage in perfect harmony.",
    attractions: [
      "Rugova Canyon Adventure",
      "Patriarchate of Peć",
      "Peja Brewery Tours",
      "Alpine Hiking Trails",
    ],
    distance: 60,
    gradient: "from-green-500 to-emerald-400",
    badge: "Mountain Gateway",
  },
  {
    id: 4,
    name: "Gjakova",
    image: gjakovaImg,
    description:
      "Step back in time through the preserved Ottoman-era Old Bazaar, where tradition and craftsmanship thrive.",
    attractions: [
      "Historic Hadum Mosque",
      "UNESCO Old Bazaar",
      "Cabrati Hill Views",
      "Traditional Craft Shops",
    ],
    distance: 65,
    gradient: "from-orange-500 to-red-400",
    badge: "Historic Gem",
  },
  {
    id: 5,
    name: "Mitrovica",
    image: mitrovicaImg,
    description:
      "A city of resilience and heritage, where the iconic Ibar Bridge connects communities and cultures.",
    attractions: [
      "Iconic Ibar Bridge",
      "Central Mitrovica Park",
      "Mining Heritage Museum",
      "Cultural Center",
    ],
    distance: 35,
    gradient: "from-indigo-500 to-purple-400",
    badge: "Bridge City",
  },
];

const PopularPlaces = () => {
  const visibleItems = useScrollAnimation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [aiResult, setAiResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);

  // Comprehensive AI-powered city facts and route calculation for all KOSOVA cities
  const cityData = {
    prishtina: {
      distance: 25,
      travelTime: 30,
      price: 22.0,
      fact: "Prishtina is home to the youngest population in Europe, with over 60% of residents under 35 years old. The city's vibrant energy is powered by its university students and thriving tech scene.",
    },
    prizren: {
      distance: 78,
      travelTime: 85,
      price: 64.4,
      fact: "Prizren's historic stone bridge has stood for over 500 years and survived multiple earthquakes. Local legend says couples who kiss on the bridge will be together forever.",
    },
    ferizaj: {
      distance: 40,
      travelTime: 50,
      price: 34.0,
      fact: "Ferizaj's railway station was once the most important junction in Yugoslavia, connecting 8 different routes. Today, it's being restored as part of the new Balkans railway network.",
    },
    peja: {
      distance: 60,
      travelTime: 70,
      price: 50.0,
      fact: "The Rugova Canyon near Peja is one of Europe's deepest gorges at 1,000 meters deep. It's home to the rare Balkan lynx and over 200 bird species.",
    },
    gjakova: {
      distance: 65,
      travelTime: 75,
      price: 54.0,
      fact: "Gjakova's Old Bazaar is the longest in the Balkans, stretching over 1 kilometer. Master craftsmen here still use techniques passed down through 15 generations.",
    },
    mitrovica: {
      distance: 35,
      travelTime: 45,
      price: 30.0,
      fact: "The Trepča mines beneath Mitrovica contain one of Europe's largest mineral deposits. They've been mined continuously for over 2,000 years, since Roman times.",
    },
    gjilan: {
      distance: 45,
      travelTime: 55,
      price: 38.0,
      fact: "Gjilan is known as KOSOVA's agricultural heart, producing 40% of the country's fresh vegetables. The city hosts the largest farmers market in the region every Saturday.",
    },
    podujeva: {
      distance: 28,
      travelTime: 35,
      price: 24.4,
      fact: "Podujeva is famous for its traditional stone houses and is the birthplace of many KOSOVA Albanian writers. The city's cultural center hosts the annual Poetry Festival every spring.",
    },
    vushtrri: {
      distance: 10,
      travelTime: 15,
      price: 5.0,
      fact: "You're already in Vushtrri! This historic city was an important Ottoman trading center and is known for its beautiful traditional architecture and the nearby Drenica valley.",
    },
    suhareka: {
      distance: 55,
      travelTime: 65,
      price: 46.0,
      fact: "Suhareka is renowned for its wine production, with vineyards dating back to Roman times. The annual Wine Festival attracts thousands of visitors each September.",
    },
    rahovec: {
      distance: 70,
      travelTime: 80,
      price: 58.0,
      fact: "Rahovec produces some of KOSOVA's finest wines and is surrounded by rolling hills of vineyards. The city's Wine Route connects 12 historic wineries.",
    },
    malisheva: {
      distance: 50,
      travelTime: 60,
      price: 42.0,
      fact: "Malisheva is nestled in the foothills of the Dukagjini Plain and is known for its traditional crafts, especially woodcarving and metalwork passed down through generations.",
    },
    lipjan: {
      distance: 30,
      travelTime: 40,
      price: 26.0,
      fact: "Lipjan was historically known as Lipljan and contains important archaeological sites from the Roman period. The city's museum houses artifacts dating back 2,000 years.",
    },
    drenas: {
      distance: 20,
      travelTime: 25,
      price: 18.0,
      fact: "Drenas is located in the heart of the Drenica valley, known for its role in KOSOVA's independence movement. The city is surrounded by beautiful rolling hills and forests.",
    },
    shtime: {
      distance: 35,
      travelTime: 45,
      price: 30.0,
      fact: "Shtime is one of KOSOVA's smaller municipalities but plays a big role in agriculture. It's famous for producing some of the country's best dairy products and honey.",
    },
    kaçanik: {
      distance: 65,
      travelTime: 75,
      price: 54.0,
      fact: "Kaçanik sits at the border with North Macedonia and has been a crucial trade route for centuries. The Kaçanik Gorge is considered one of KOSOVA's most scenic natural landmarks.",
    },
    kamenica: {
      distance: 55,
      travelTime: 65,
      price: 46.0,
      fact: "Kamenica is known for its beautiful landscapes and the Kamenica River. The city's traditional architecture and nearby medieval churches attract history enthusiasts.",
    },
    skenderaj: {
      distance: 25,
      travelTime: 30,
      price: 22.0,
      fact: "Skenderaj is situated in the Drenica region and is famous for its resistance during KOSOVA's struggle for independence. The area is rich in cultural monuments and natural beauty.",
    },
    "fushë kosova": {
      distance: 20,
      travelTime: 25,
      price: 18.0,
      fact: "Fushë Kosova is home to KOSOVA's main international airport and serves as a gateway to the country. The city has grown rapidly and is becoming a modern suburban center.",
    },
    obiliq: {
      distance: 15,
      travelTime: 20,
      price: 14.0,
      fact: "Obiliq is an important industrial center, housing KOSOVA's main power plants. Despite its industrial nature, the area has beautiful countryside and the historic Gazimestan monument nearby.",
    },
    istog: {
      distance: 45,
      travelTime: 55,
      price: 38.0,
      fact: "Istog is located in western KOSOVA and is known for its agricultural production, particularly corn and wheat. The Istog River provides beautiful scenery and recreational opportunities.",
    },
    klinë: {
      distance: 50,
      travelTime: 60,
      price: 42.0,
      fact: "Klinë is famous for its traditional stone architecture and is gateway to the Accursed Mountains. The city's old bazaar showcases authentic Albanian craftsmanship.",
    },
    dragash: {
      distance: 95,
      travelTime: 110,
      price: 78.0,
      fact: "Dragash is located in KOSOVA's southernmost region, surrounded by the Šar Mountains. It's a paradise for hikers and nature lovers, with pristine lakes and diverse wildlife.",
    },
    deçan: {
      distance: 70,
      travelTime: 80,
      price: 58.0,
      fact: "Deçan is home to the UNESCO World Heritage Visoki Dečani Monastery, a stunning 14th-century Serbian Orthodox monastery known for its frescoes and architecture.",
    },
    junik: {
      distance: 75,
      travelTime: 85,
      price: 62.0,
      fact: "Junik is a small municipality near the Albanian border, known for its mountainous terrain and traditional rural lifestyle. The area offers excellent hiking and hunting opportunities.",
    },
    mamushë: {
      distance: 85,
      travelTime: 95,
      price: 70.0,
      fact: "Mamushë is unique as KOSOVA's only Turkish-majority municipality. The village maintains strong Turkish cultural traditions and is known for its distinctive Ottoman-era architecture.",
    },
  };

  // Popular cities to display (first 6)
  const popularCitiesData = [
    {
      id: 1,
      name: "Prishtina",
      distance: 25,
      price: 22.0,
      image: prishtinaImg,
      description:
        "KOSOVA's vibrant capital city, where modern culture meets rich history in a symphony of cafes, monuments, and endless energy.",
      attractions: [
        "National Museum of KOSOVA",
        "Newborn Monument",
        "Mother Teresa Cathedral",
        "Bill Clinton Boulevard",
      ],
      gradient: "from-blue-500 to-cyan-400",
      badge: "Capital City",
    },
    {
      id: 2,
      name: "Prizren",
      distance: 78,
      price: 64.4,
      image: prizrenImg,
      description:
        "The cultural heart of KOSOVA, where Ottoman architecture tells stories of centuries past along cobblestone streets.",
      attractions: [
        "Historic Stone Bridge",
        "Sinan Pasha Mosque",
        "Prizren Fortress",
        "League of Prizren Museum",
      ],
      gradient: "from-purple-500 to-pink-400",
      badge: "Cultural Capital",
    },
    {
      id: 3,
      name: "Peja",
      distance: 60,
      price: 50.0,
      image: pejaImg,
      description:
        "Gateway to the majestic Rugova Mountains, where natural beauty meets spiritual heritage in perfect harmony.",
      attractions: [
        "Rugova Canyon Adventure",
        "Patriarchate of Peć",
        "Peja Brewery Tours",
        "Alpine Hiking Trails",
      ],
      gradient: "from-green-500 to-emerald-400",
      badge: "Mountain Gateway",
    },
    {
      id: 4,
      name: "Gjakova",
      distance: 65,
      price: 54.0,
      image: gjakovaImg,
      description:
        "Step back in time through the preserved Ottoman-era Old Bazaar, where tradition and craftsmanship thrive.",
      attractions: [
        "Historic Hadum Mosque",
        "UNESCO Old Bazaar",
        "Cabrati Hill Views",
        "Traditional Craft Shops",
      ],
      gradient: "from-orange-500 to-red-400",
      badge: "Historic Gem",
    },
    {
      id: 5,
      name: "Mitrovica",
      distance: 35,
      price: 30.0,
      image: mitrovicaImg,
      description:
        "A city of resilience and heritage, where the iconic Ibar Bridge connects communities and cultures.",
      attractions: [
        "Iconic Ibar Bridge",
        "Central Mitrovica Park",
        "Mining Heritage Museum",
        "Cultural Center",
      ],
      gradient: "from-indigo-500 to-purple-400",
      badge: "Bridge City",
    },
    {
      id: 6,
      name: "Ferizaj",
      distance: 40,
      price: 34.0,
      image: ferizajImg,
      description:
        "An important railway junction connecting KOSOVA with neighboring countries, rich in history and modern development.",
      attractions: [
        "Railway Heritage Museum",
        "City Park",
        "Traditional Bazaar",
        "Cultural Center",
      ],
      gradient: "from-teal-500 to-blue-400",
      badge: "Railway Hub",
    },
  ];

  // All cities for expanded view - complete data with images and descriptions
  const allCitiesData = [
    {
      id: 1,
      name: "Prishtina",
      distance: 25,
      price: 22.0,
      image: prishtinaImg,
      description:
        "KOSOVA's vibrant capital city, where modern culture meets rich history in a symphony of cafes, monuments, and endless energy.",
      attractions: [
        "National Museum of KOSOVA",
        "Newborn Monument",
        "Mother Teresa Cathedral",
        "Bill Clinton Boulevard",
      ],
      gradient: "from-blue-500 to-cyan-400",
      badge: "Capital City",
    },
    {
      id: 2,
      name: "Prizren",
      distance: 78,
      price: 64.4,
      image: prizrenImg,
      description:
        "The cultural heart of KOSOVA, where Ottoman architecture tells stories of centuries past along cobblestone streets.",
      attractions: [
        "Historic Stone Bridge",
        "Sinan Pasha Mosque",
        "Prizren Fortress",
        "League of Prizren Museum",
      ],
      gradient: "from-purple-500 to-pink-400",
      badge: "Cultural Capital",
    },
    {
      id: 3,
      name: "Peja",
      distance: 60,
      price: 50.0,
      image: pejaImg,
      description:
        "Gateway to the majestic Rugova Mountains, where natural beauty meets spiritual heritage in perfect harmony.",
      attractions: [
        "Rugova Canyon Adventure",
        "Patriarchate of Peć",
        "Peja Brewery Tours",
        "Alpine Hiking Trails",
      ],
      gradient: "from-green-500 to-emerald-400",
      badge: "Mountain Gateway",
    },
    {
      id: 4,
      name: "Gjakova",
      distance: 65,
      price: 54.0,
      image: gjakovaImg,
      description:
        "Step back in time through the preserved Ottoman-era Old Bazaar, where tradition and craftsmanship thrive.",
      attractions: [
        "Historic Hadum Mosque",
        "UNESCO Old Bazaar",
        "Cabrati Hill Views",
        "Traditional Craft Shops",
      ],
      gradient: "from-orange-500 to-red-400",
      badge: "Historic Gem",
    },
    {
      id: 5,
      name: "Mitrovica",
      distance: 35,
      price: 30.0,
      image: mitrovicaImg,
      description:
        "A city of resilience and heritage, where the iconic Ibar Bridge connects communities and cultures.",
      attractions: [
        "Iconic Ibar Bridge",
        "Central Mitrovica Park",
        "Mining Heritage Museum",
        "Cultural Center",
      ],
      gradient: "from-indigo-500 to-purple-400",
      badge: "Bridge City",
    },
    {
      id: 6,
      name: "Ferizaj",
      distance: 40,
      price: 34.0,
      image: ferizajImg,
      description:
        "An important railway junction connecting KOSOVA with neighboring countries, rich in history and modern development.",
      attractions: [
        "Railway Heritage Museum",
        "City Park",
        "Traditional Bazaar",
        "Cultural Center",
      ],
      gradient: "from-teal-500 to-blue-400",
      badge: "Railway Hub",
    },
    {
      id: 7,
      name: "Gjilan",
      distance: 45,
      price: 38.0,
      image: gjilanImg,
      description:
        "KOSOVA's agricultural heart, where fertile plains meet vibrant culture in a city known for its fresh markets and warm hospitality.",
      attractions: [
        "Farmers Market",
        "City Museum",
        "Cultural Center",
        "Traditional Restaurants",
      ],
      gradient: "from-rose-500 to-pink-400",
      badge: "Agricultural Hub",
    },
    {
      id: 8,
      name: "Podujeva",
      distance: 28,
      price: 24.4,
      image: podujevaImg,
      description:
        "A charming city famous for traditional stone houses and as the birthplace of many renowned KOSOVA Albanian writers.",
      attractions: [
        "Traditional Architecture",
        "Cultural Center",
        "Poetry Festival Venue",
        "Historic Houses",
      ],
      gradient: "from-amber-500 to-orange-400",
      badge: "Literary Heritage",
    },
    {
      id: 9,
      name: "Vushtrri",
      distance: 0,
      price: 5.0,
      image: vushtrriImg,
      description:
        "Your current location! This historic Ottoman trading center showcases beautiful traditional architecture and the scenic Drenica valley.",
      attractions: [
        "Ottoman Architecture",
        "Historic Trading Center",
        "Drenica Valley",
        "Traditional Bazaar",
      ],
      gradient: "from-lime-500 to-green-400",
      badge: "Your Location",
    },
    {
      id: 10,
      name: "Suhareka",
      distance: 55,
      price: 46.0,
      image: suharekaImg,
      description:
        "Renowned for exquisite wine production with vineyards dating back to Roman times, hosting the celebrated annual Wine Festival.",
      attractions: [
        "Historic Vineyards",
        "Wine Festival",
        "Roman Heritage Sites",
        "Wine Tasting Tours",
      ],
      gradient: "from-violet-500 to-purple-400",
      badge: "Wine Capital",
    },
    {
      id: 11,
      name: "Rahovec",
      distance: 70,
      price: 58.0,
      image: prizrenImg,
      description:
        "KOSOVA's premier wine region surrounded by rolling vineyard hills, featuring the famous Wine Route connecting 12 historic wineries.",
      attractions: [
        "Wine Route",
        "Historic Wineries",
        "Vineyard Hills",
        "Wine Museums",
      ],
      gradient: "from-cyan-500 to-teal-400",
      badge: "Wine Route",
    },
    {
      id: 12,
      name: "Malisheva",
      distance: 50,
      price: 42.0,
      image: gjakovaImg,
      description:
        "Nestled in the Dukagjini Plain foothills, famous for traditional crafts including woodcarving and metalwork passed through generations.",
      attractions: [
        "Traditional Crafts",
        "Woodcarving Workshops",
        "Metalwork Heritage",
        "Artisan Markets",
      ],
      gradient: "from-red-500 to-rose-400",
      badge: "Craft Heritage",
    },
    {
      id: 13,
      name: "Lipjan",
      distance: 30,
      price: 26.0,
      image: vushtrriImg,
      description:
        "Historically known as Lipljan, featuring important Roman archaeological sites and a museum with 2,000-year-old artifacts.",
      attractions: [
        "Roman Archaeological Sites",
        "Historical Museum",
        "Ancient Artifacts",
        "Archaeological Tours",
      ],
      gradient: "from-yellow-500 to-amber-400",
      badge: "Roman Heritage",
    },
    {
      id: 14,
      name: "Drenas",
      distance: 20,
      price: 18.0,
      image: podujevaImg,
      description:
        "Located in the heart of Drenica valley, known for its pivotal role in KOSOVA's independence movement and stunning natural landscapes.",
      attractions: [
        "Drenica Valley",
        "Independence Monuments",
        "Rolling Hills",
        "Forest Trails",
      ],
      gradient: "from-emerald-500 to-green-400",
      badge: "Historic Valley",
    },
    {
      id: 15,
      name: "Shtime",
      distance: 35,
      price: 30.0,
      image: pejaImg,
      description:
        "A charming agricultural municipality famous for producing KOSOVA's finest dairy products and golden honey from local apiaries.",
      attractions: [
        "Dairy Farms",
        "Honey Apiaries",
        "Agricultural Tours",
        "Local Markets",
      ],
      gradient: "from-orange-600 to-yellow-400",
      badge: "Dairy Capital",
    },
    {
      id: 16,
      name: "Kaçanik",
      distance: 65,
      price: 54.0,
      image: mitrovicaImg,
      description:
        "Strategic border city with North Macedonia, featuring the spectacular Kaçanik Gorge, one of KOSOVA's most scenic natural landmarks.",
      attractions: [
        "Kaçanik Gorge",
        "Border Heritage",
        "Scenic Landscapes",
        "Mountain Views",
      ],
      gradient: "from-slate-500 to-gray-400",
      badge: "Gateway City",
    },
    {
      id: 17,
      name: "Kamenica",
      distance: 55,
      price: 46.0,
      image: gjilanImg,
      description:
        "Known for beautiful landscapes along the Kamenica River, featuring traditional architecture and nearby medieval churches.",
      attractions: [
        "Kamenica River",
        "Traditional Architecture",
        "Medieval Churches",
        "Riverside Walks",
      ],
      gradient: "from-sky-500 to-blue-400",
      badge: "River City",
    },
    {
      id: 18,
      name: "Skenderaj",
      distance: 25,
      price: 22.0,
      image: gjakovaImg,
      description:
        "Situated in the historic Drenica region, famous for its resistance heritage and rich cultural monuments surrounded by natural beauty.",
      attractions: [
        "Resistance Monuments",
        "Cultural Heritage",
        "Drenica Landscapes",
        "Memorial Sites",
      ],
      gradient: "from-stone-500 to-zinc-400",
      badge: "Resistance Heritage",
    },
    {
      id: 19,
      name: "Fushë Kosova",
      distance: 20,
      price: 18.0,
      image: prishtinaImg,
      description:
        "Home to KOSOVA's main international airport, serving as the country's gateway with rapid modern development and suburban growth.",
      attractions: [
        "International Airport",
        "Modern Suburbs",
        "Aviation Museum",
        "Gateway Plaza",
      ],
      gradient: "from-indigo-600 to-blue-500",
      badge: "Airport City",
    },
    {
      id: 20,
      name: "Obiliq",
      distance: 15,
      price: 14.0,
      image: vushtrriImg,
      description:
        "Important industrial center housing KOSOVA's main power plants, featuring beautiful countryside and the historic Gazimestan monument.",
      attractions: [
        "Gazimestan Monument",
        "Power Plant Tours",
        "Industrial Heritage",
        "Countryside Views",
      ],
      gradient: "from-neutral-600 to-stone-400",
      badge: "Industrial Hub",
    },
    {
      id: 21,
      name: "Istog",
      distance: 45,
      price: 38.0,
      image: pejaImg,
      description:
        "Located in western KOSOVA, renowned for agricultural production of corn and wheat, with the scenic Istog River providing natural beauty.",
      attractions: [
        "Istog River",
        "Agricultural Fields",
        "Corn Plantations",
        "Rural Tourism",
      ],
      gradient: "from-green-600 to-lime-400",
      badge: "Agricultural Center",
    },
    {
      id: 22,
      name: "Klinë",
      distance: 50,
      price: 42.0,
      image: suharekaImg,
      description:
        "Famous for traditional stone architecture and gateway to the Accursed Mountains, featuring an authentic old bazaar with Albanian craftsmanship.",
      attractions: [
        "Stone Architecture",
        "Accursed Mountains",
        "Old Bazaar",
        "Albanian Crafts",
      ],
      gradient: "from-stone-600 to-slate-400",
      badge: "Mountain Gateway",
    },
    {
      id: 23,
      name: "Dragash",
      distance: 95,
      price: 78.0,
      image: mitrovicaImg,
      description:
        "KOSOVA's southernmost paradise surrounded by Šar Mountains, offering pristine lakes, diverse wildlife, and hiking heaven.",
      attractions: [
        "Šar Mountains",
        "Pristine Lakes",
        "Wildlife Watching",
        "Mountain Hiking",
      ],
      gradient: "from-emerald-600 to-teal-500",
      badge: "Nature Paradise",
    },
    {
      id: 24,
      name: "Deçan",
      distance: 70,
      price: 58.0,
      image: mitrovicaImg,
      description:
        "Home to the UNESCO World Heritage Visoki Dečani Monastery, a stunning 14th-century Orthodox monastery renowned for frescoes.",
      attractions: [
        "Visoki Dečani Monastery",
        "UNESCO Heritage",
        "14th Century Frescoes",
        "Religious Tourism",
      ],
      gradient: "from-amber-600 to-yellow-500",
      badge: "UNESCO Heritage",
    },
    {
      id: 25,
      name: "Junik",
      distance: 75,
      price: 62.0,
      image: pejaImg,
      description:
        "A small mountainous municipality near the Albanian border, known for traditional rural lifestyle and excellent hiking opportunities.",
      attractions: [
        "Mountain Trails",
        "Rural Heritage",
        "Border Tourism",
        "Hiking Routes",
      ],
      gradient: "from-green-700 to-emerald-500",
      badge: "Mountain Village",
    },
    {
      id: 26,
      name: "Mamushë",
      distance: 85,
      price: 70.0,
      image: vushtrriImg,
      description:
        "KOSOVA's unique Turkish-majority municipality, maintaining strong Ottoman cultural traditions and distinctive Turkish architecture.",
      attractions: [
        "Turkish Culture",
        "Ottoman Architecture",
        "Cultural Traditions",
        "Heritage Sites",
      ],
      gradient: "from-red-600 to-rose-500",
      badge: "Turkish Heritage",
    },
  ];

  // Enhanced AI search function for all KOSOVA cities
  const handleAISearch = async (searchValue) => {
    setSearchTerm(searchValue);

    if (searchValue.trim() === "") {
      setAiResult(null);
      return;
    }

    const normalizedSearch = searchValue.toLowerCase().trim();

    // Enhanced city matching - check for exact matches and partial matches
    const cityKey = Object.keys(cityData).find((key) => {
      const cityName = key.toLowerCase();
      const searchTerm = normalizedSearch.toLowerCase();

      // Exact match
      if (cityName === searchTerm) return true;

      // Partial match (city contains search or search contains city)
      if (cityName.includes(searchTerm) || searchTerm.includes(cityName))
        return true;

      // Handle special characters and alternative spellings
      const alternativeNames = {
        pristina: "prishtina",
        mitrovice: "mitrovica",
        pec: "peja",
        djakovica: "gjakova",
        urosevac: "ferizaj",
        gnjilane: "gjilan",
        podgorica: "podujeva",
        "fushe kosova": "fushë kosova",
        "fushe kosovo": "fushë kosova",
        kacanik: "kaçanik",
        decani: "deçan",
        kline: "klinë",
        mamusha: "mamushë",
      };

      // Check alternative spellings
      if (alternativeNames[searchTerm] === cityName) return true;
      if (alternativeNames[cityName] === searchTerm) return true;

      return false;
    });

    if (cityKey) {
      setIsCalculating(true);

      // Simulate AI processing time
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const data = cityData[cityKey];
      setAiResult({
        cityName:
          cityKey.charAt(0).toUpperCase() + cityKey.slice(1).replace("ë", "ë"),
        ...data,
        searchTerm: searchValue,
      });
      setIsCalculating(false);
    } else {
      // Handle city not found
      setIsCalculating(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAiResult({
        notFound: true,
        searchTerm: searchValue,
      });
      setIsCalculating(false);
    }
  };

  // Handle toggle cities and position at 4th-6th city area with slow smooth scroll
  const handleToggleCities = () => {
    console.log("Toggle clicked! Current state:", {
      showAllCities,
      searchTerm,
      filter,
    });

    if (!showAllCities) {
      // When expanding to show all cities, position at 4th city so user sees 4,5,6 boxes
      console.log("Expanding to show all cities");
      setShowAllCities(true);
      setTimeout(() => {
        const fourthCity = document.querySelector('[data-city-index="3"]');
        console.log("Looking for 4th city:", fourthCity);
        if (fourthCity) {
          // Smooth and slow scroll that stops a little earlier
          fourthCity.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }
      }, 300); // Longer delay for smoother experience
    } else {
      // When collapsing to show only popular cities, just hide them
      console.log("Collapsing to show popular cities only");
      setShowAllCities(false);
    }
  };

  // Filter places based on search term and distance filter
  const currentCitiesData = showAllCities ? allCitiesData : popularCitiesData;
  console.log(
    "Current cities data length:",
    currentCitiesData.length,
    "showAllCities:",
    showAllCities
  );

  const filteredPlaces = currentCitiesData
    .filter(
      (place) =>
        // Only apply search filter if there's an active search term
        searchTerm.trim() === "" ||
        place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (place.description &&
          place.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter((place) => {
      if (filter === "all") return true;
      if (filter === "near" && place.distance <= 40) return true;
      if (filter === "medium" && place.distance > 40 && place.distance <= 70)
        return true;
      if (filter === "far" && place.distance > 70) return true;
      return false;
    });

  console.log(
    "Filtered places length:",
    filteredPlaces.length,
    "searchTerm:",
    searchTerm,
    "filter:",
    filter
  );

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${require("../assets/images/Carbanner.jpg")})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/25 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto">
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 sm:mb-8 leading-tight animate-fade-in-left`}
            >
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Discover
              </span>
              <br />
              <span className="text-white">KOSOVA</span>
            </h1>
            <p
              className={`text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 font-light leading-relaxed px-2 animate-fade-in-right`}
            >
              AI-Curated Destinations Just For You
            </p>
            <p
              className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-gray-200 max-w-5xl mx-auto leading-relaxed px-4 animate-fade-in-left`}
            >
              Explore KOSOVA's most captivating destinations with our
              intelligent recommendation system. From historic cities to natural
              wonders, let us guide you to unforgettable experiences.
            </p>

            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 px-4 animate-fade-in-up`}
            >
              <div className="group transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={50} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  Destinations
                </div>
              </div>
              <div className="group transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                  🤖
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  AI Powered
                </div>
              </div>
              <div className="group transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={100} suffix="%" />
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  Local Insights
                </div>
              </div>
              <div className="group transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-pink-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={24} suffix="/7" />
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  Available
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Button */}
        <ScrollDownButton targetId="search-section" />
      </div>

      {/* AI-Powered Search and Route Calculation */}
      <section
        id="search-section"
        className="py-20 bg-gradient-to-br from-slate-900 via-gray-800 to-black"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  AI Travel Assistant
                </span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Get instant route calculations, pricing, and fascinating city
                facts powered by AI
              </p>
            </div>

            {/* AI Search Interface */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 mb-8 border border-gray-700">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3">
                  <label className="block text-gray-300 font-semibold mb-3 flex items-center">
                    <svg
                      className="w-6 h-6 text-yellow-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    AI-Powered Destination Search
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ask AI: 'Take me to Prishtina' or 'How much to Prizren?'..."
                      value={searchTerm}
                      onChange={(e) => handleAISearch(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-700 border-2 border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400/30 focus:border-yellow-400 transition-all duration-300 text-lg text-white placeholder-gray-400"
                    />
                    {isCalculating && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
                      </div>
                    )}
                  </div>

                  {/* Quick Search Buttons */}
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-3">
                      Quick searches:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Prishtina",
                        "Prizren",
                        "Peja",
                        "Gjakova",
                        "Mitrovica",
                        "Ferizaj",
                        "Gjilan",
                        "Podujeva",
                      ].map((city) => (
                        <button
                          key={city}
                          onClick={() => handleAISearch(city)}
                          className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium rounded-full text-sm transition-all duration-200 transform hover:scale-105"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/3">
                  <label className="block text-gray-300 font-semibold mb-3 flex items-center">
                    <svg
                      className="w-6 h-6 text-cyan-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    Distance Filter
                  </label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-700 border-2 border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-400/30 focus:border-cyan-400 transition-all duration-300 text-lg text-white"
                  >
                    <option value="all">All Distances</option>
                    <option value="near">Near (0-40 km)</option>
                    <option value="medium">Medium (41-70 km)</option>
                    <option value="far">Far (70+ km)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* AI Results Display */}
            {aiResult && (
              <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-2 border-yellow-200">
                {aiResult.notFound ? (
                  /* City Not Found */
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="text-6xl mb-4">🤖</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        AI Assistant: City Not Found
                      </h3>
                      <p className="text-gray-600">
                        I couldn't find "{aiResult.searchTerm}" in KOSOVA's main
                        cities.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-3">
                        💡 AI Suggestion:
                      </h4>
                      <p className="text-gray-700 mb-4">
                        Try searching for: Prishtina, Prizren, Peja, Gjakova,
                        Mitrovica, Gjilan, or Ferizaj
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        These are KOSOVA's main cities where OSMANI operates
                        premium taxi services.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Successful City Search */
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="text-4xl mr-4">🎯</div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          AI Route Analysis: {aiResult.cityName}
                        </h3>
                        <p className="text-gray-600">
                          Calculated in real-time from Vushtrri
                        </p>
                      </div>
                    </div>

                    {/* Route Calculation Results */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200">
                        <div className="text-4xl mb-2">🚗</div>
                        <div className="text-3xl font-bold text-blue-700 mb-1">
                          {aiResult.distance} km
                        </div>
                        <div className="text-sm text-blue-600 font-medium">
                          Total Distance
                        </div>
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
                        <div className="text-4xl mb-2">⏰</div>
                        <div className="text-3xl font-bold text-green-700 mb-1">
                          {aiResult.travelTime} min
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          Travel Time
                        </div>
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl border-2 border-yellow-300">
                        <div className="text-4xl mb-2">💰</div>
                        <div className="text-4xl font-bold text-orange-600 mb-1">
                          €{aiResult.price}
                        </div>
                        <div className="text-sm text-orange-600 font-medium">
                          Estimated Fare
                        </div>
                      </div>
                    </div>

                    {/* AI-Generated Fascinating Fact */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                        <svg
                          className="w-6 h-6 text-purple-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                        AI-Generated Fascinating Fact about {aiResult.cityName}
                      </h4>
                      <p className="text-gray-700 leading-relaxed italic">
                        "{aiResult.fact}"
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/contact"
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        Book Ride to {aiResult.cityName}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image with Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
              {showAllCities ? "All KOSOVA Cities" : "Popular Destinations"}
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed">
              {showAllCities
                ? "Complete list of cities where OSMANI operates"
                : "Discover KOSOVA's most visited destinations"}
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            data-section="cities-grid"
          >
            {filteredPlaces.map((place, index) => (
              <div
                key={place.id}
                data-city-index={index}
                className="group relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1"
                data-id={`place-${place.id}`}
                style={{
                  opacity: 1,
                  transform: "none",
                  visibility: "visible",
                }}
              >
                {/* Badge */}
                {place.badge && (
                  <div
                    className={`absolute top-6 left-6 z-20 px-4 py-2 bg-gradient-to-r ${place.gradient} text-white font-bold rounded-full text-sm shadow-lg`}
                  >
                    {place.badge}
                  </div>
                )}

                {/* Image - All cities now have images */}
                <div className="relative overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/70 transition-all duration-500"></div>

                  {/* Distance Overlay */}
                  <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 font-bold text-sm">
                    {place.distance === 0
                      ? "Your Location"
                      : `${place.distance} km from Vushtrri`}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-300">
                    {place.name}
                  </h2>

                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {place.description}
                  </p>

                  {/* Attractions - All cities now have attractions */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">
                      Top Attractions:
                    </h3>
                    <ul className="space-y-2">
                      {place.attractions.map((attraction, index) => (
                        <li key={index} className="flex items-start group/item">
                          <svg
                            className="w-5 h-5 text-yellow-500 mr-3 mt-1 group-hover/item:scale-125 transition-transform"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-gray-700 text-sm group-hover/item:text-gray-800 transition-colors">
                            {attraction}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      to="/contact"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Book Now
                    </Link>
                  </div>
                </div>

                {/* Background Gradient on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${place.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                ></div>
              </div>
            ))}
          </div>

          {/* Show All Cities Button */}
          <div className="text-center mt-16">
            <button
              onClick={handleToggleCities}
              className="group bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center justify-center">
                <svg
                  className={`w-6 h-6 mr-3 transition-transform duration-300 ${
                    showAllCities ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={showAllCities ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
                {showAllCities
                  ? "Show Popular Cities Only"
                  : "Show All the Cities"}
                <svg
                  className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default PopularPlaces;
