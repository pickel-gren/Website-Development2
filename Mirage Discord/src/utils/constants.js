export const CATEGORY_KEYS = {
  ROLES: "roles",
  DIAMONDS: "diamonds",
  GIFTCARDS: "gift_cards",
};

export const CATEGORY_INFO = {
  [CATEGORY_KEYS.ROLES]: {
    label: "Roles",
    heading: "Roles",
    subheading: "Welcome to our store!",
    description:
      "Get instant delivery of purchase. We deeply appreciate your love and kindness for donating !! 💖",
  },
  [CATEGORY_KEYS.DIAMONDS]: {
    label: "Diamonds",
    heading: "Diamonds",
    subheading: "Buy in-game diamonds instantly!",
    description:
      "Get the diamonds you need to level up your game. Delivered instantly to your account! 💸",
  },
  [CATEGORY_KEYS.GIFTCARDS]: {
    label: "Gift Cards",
    heading: "Gift Cards",
    subheading: "Perfect gifts for your friends!",
    description:
      "Got a kind heart? Brighten someone's day with a gift card! 💝",
  },
};

export const DEFAULT_CATEGORY = CATEGORY_KEYS.ROLES;
