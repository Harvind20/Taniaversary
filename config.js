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
  postcardSubtitle: "Click to read my letter ❤️",

  // Full letter view settings
  letterHeader: "Happy 1 Year Anniversary, my love. ❤️",
  letterParagraphs: [
    "One whole year has passed, and I still find myself deeply grateful for having you in my life every single day. Thank you for all the love, care, patience, and happiness you give me. You make even the simplest moments feel extraordinary, and being with you has become the most beautiful part of my life.",
    "Through every conversation, every laugh, and even the challenges we face, you continue to show me what genuine love feels like. I appreciate all the little things you do, even the ones you don't realize mean so much to me. Your presence brings me pure comfort, and your smile brightens my darkest days.",
    "As we celebrate our 1st year anniversary, I want you to know how much I truly cherish you and our relationship. Thank you for staying by my side, understanding me, and choosing me every day. I may not always find the perfect words to express how much you mean to me, but please know that my feelings for you are real, sincere, and growing stronger every day."
  ],
  letterClosing: "Happy Anniversary, Tania. Thank you for being my favorite person and my greatest blessing. I love you so much. ❤️",

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
