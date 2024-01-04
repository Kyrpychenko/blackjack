export type Card = {
  kind: "heart" | "diamond" | "club" | "spade";
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  name:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "King"
    | "Queen"
    | "Ace"
    | "Jack";
};

export type Deck = Card[];
