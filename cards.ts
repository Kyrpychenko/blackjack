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

export function deckBuilder(deck: Deck) {
  for (let color of ["heart", "club", "diamond", "spade"] as const) {
    for (let i = 2; i < 11; i++) {
      let card: Card = {
        kind: color,
        value: i as typeof card.value,
        name: i.toString() as typeof card.name,
      };
      deck.push(card);
    }
  }

  // club special cards
  deck?.push({ kind: "club", value: 10, name: "Queen" });
  deck?.push({ kind: "club", value: 10, name: "Jack" });
  deck?.push({ kind: "club", value: 10, name: "King" });
  deck?.push({ kind: "club", value: 11, name: "Ace" });
  // diamond special cards
  deck?.push({ kind: "diamond", value: 10, name: "Queen" });
  deck?.push({ kind: "diamond", value: 10, name: "Jack" });
  deck?.push({ kind: "diamond", value: 10, name: "King" });
  deck?.push({ kind: "diamond", value: 11, name: "Ace" });
  // heart special cards
  deck?.push({ kind: "heart", value: 10, name: "Queen" });
  deck?.push({ kind: "heart", value: 10, name: "Jack" });
  deck?.push({ kind: "heart", value: 10, name: "King" });
  deck?.push({ kind: "heart", value: 11, name: "Ace" });
  // spade special cards
  deck?.push({ kind: "spade", value: 10, name: "Queen" });
  deck?.push({ kind: "spade", value: 10, name: "Jack" });
  deck?.push({ kind: "spade", value: 10, name: "King" });
  deck?.push({ kind: "spade", value: 11, name: "Ace" });

  return shuffle(deck);
}

function shuffle(array: Deck) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
