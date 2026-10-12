// ========================================================
// 💕 TANIAVERSARY CONFIGURATION
// You can easily customize your PIN, hint, letter, and music here!
// ========================================================

const CONFIG = {
  // The 4-digit PIN required to unlock
  pin: "1820",

  // Hint displayed under the passcode slots
  hint: 'Hint: BabySayang hbd 💕',

  // Access Granted popup settings
  grantedTitle: "Access Granted!",
  grantedMessage: "Congrats you passed! 💕",
  grantedButton: "Proceed ❤️",

  // Envelope screen
  envelopeTitle: "You've got a mail!",
  envelopeHint: "Click the seal to open! ❤️",

  // Postcard front settings
  postcardTitle: "Happy 1 Year Anniversary,\nmy love",
  postcardSubtitle: "click Pusheen's strawbee to read",

  // Full letter view settings
  letterHeader: "HAPPY 1 YEAR ANNIVERSARY TO MY PRETTIEST BABYYYYYY 😚💗🎀🍓",
  letterParagraphs: [
    "One whole year with my princess, my sweetheart, my comel little pusheen, my everythingggg 🥹💕. Sayang cant believe sayang gets to call baby sayang's girlfriend for a whole year alreadyyy, and honestly, if sayang could choose all over again, sayang would still choose baby awl over again, in every lifetime and every universe, because nobody else could ever be my baby the way baby is 🫶🏻💞. Baby has brought so much happiness into sayang's life, and sayang loves awl the little things that make baby, BABY, from baby's cute little face and silly ways of talking to baby's love for pompom, pusheen, strawbees 🍓, cawfee ☕ and ice keem 🍦. Sayang even loves how baby wan thumb, pat pats, rock rock and to be babied like the little princess baby is, because taking care of baby and making baby feel loved is one of sayang's favourite things everrrr.😭💗",
    "Sayang hopes baby knows that baby doesn't always have to be strong or have everything figured out, because sometimes baby can just be a little baby, cuddle up with sayang, get some pat pats, and let sayang take care of baby for a while 🥺🎀. And sayang js wants to say that sayang is sorry for all the times saying has been inconsiderate, impatient and mean to my sweeth comel baby. Baby never ever deserves to be treated that way and saying pinky promise to keep trying to keep baby safe and happy. There's something so special about all our little moments together, even the most ordinary ones, because having baby around makes everything feel warmer and happier. Whether we're going on cute little dates, eating strawbees and ice keem, cuddling, being silly together or simply spending time with each other, sayang treasures those moments more than baby might realise 💕. Of course, we're not going to have perfect days awl the time, but sayang hopes we can keep understanding each other, learning together and growing closer as we go through life. sayang wants our love to be something that makes both of us feel safe, appreciated and happy to be ourselves 🫂💗 thank baby for being sayang's favourite person, the girl who makes sayang smile at the most random times, and the one sayang wan to share so many more memories with.",
    "Sayang hopes we get to celebrate awl our future anniversaries together, collect more silly inside jokes, buy baby more cute pompom and pusheen things, and make awl sorts of little memories that we'll look back on and smile about one day 🥹🌷. If sayang could put sayang's entire heart into a little gift box, sayang would give the whole thing to baby because baby deserves so much love and happiness. HAPPY ONE YEAR MY BABYYYYYY 😚💋 thankiii baby for making this past year so special, and here's to more dates, more cuddles, more thumb, more pat pats, more rock rock and more of our own little world together."
  ],
  letterClosing: "Sayang loves baby SOOOOO MUCHHHHH, MY COMEL LITTLE PRINCESS, MY SWEETHEART, MY FAVOURITE PUSHEEN AND MY BABY FOREVERRRRR. MWAHHHHHHHHHH! 😚💗🎀🍓🧸💕",

  // Background Music configuration
  song: {
    title: "Perfect",
    artist: "Ed Sheeran",
    src: "music/Perfect.mp3",
    useSynthFallback: true
  },

  // ========================================================
  // PHOTO SCRAPBOOK / MEMORIES SECTION (Matches Reference Image)
  // Drop your photos directly into the "pictures" folder:
  // photo1.jpeg ... photo8.jpeg
  // ========================================================
  memoriesTitle: "Our Favorite Moments 💕",
  memoriesSubtitle: "Every picture tells our story",
  memories: [
    {
      id: 1,
      image: "pictures/photo1.jpeg",
      caption: "Thank you for being my happiness, my comfort, and my favorite person.",
      style: "polaroid",
      sticker: "clover",
      rotation: -2
    },
    {
      id: 2,
      image: "pictures/photo2.jpeg",
      caption: "Another month, another reason to be grateful for you.",
      style: "stamp",
      sticker: "clover",
      rotation: 3
    },
    {
      id: 3,
      image: "pictures/photo3.jpeg",
      caption: "Here's to us and many more memories together.",
      style: "polaroid",
      sticker: "clover",
      rotation: 1
    },
    {
      id: 4,
      image: "pictures/photo4.jpeg",
      caption: "I cherish every moment with you and can't wait to create more memories together. I love you!",
      style: "stamp",
      sticker: "clover",
      rotation: -2.5
    },
    {
      id: 5,
      image: "pictures/photo5.jpeg",
      caption: "Every day with you is a blessing, and I'm excited for all the months ahead.",
      style: "stamp",
      sticker: "clover",
      rotation: 2
    },
    {
      id: 6,
      image: "pictures/photo6.jpeg",
      caption: "Forever grateful for you and all of our little adventures together. 💕",
      style: "polaroid",
      sticker: "clover",
      rotation: -1.5
    },
    {
      id: 7,
      image: "pictures/photo7.jpeg",
      caption: "With you, every single second is a dream come true. ❤️",
      style: "stamp",
      sticker: "clover",
      rotation: 2.2
    },
    {
      id: 8,
      image: "pictures/photo8.jpeg",
      caption: "I love you more than words could ever say. Always and forever. 💕",
      style: "polaroid",
      sticker: "clover",
      rotation: -2
    }
  ]
};
