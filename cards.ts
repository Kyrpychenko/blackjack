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
  for (let i = 2; i < 11; i++) {
    let card: Card = {
      kind: "heart",
      value: i as typeof card.value,
      name: i.toString() as typeof card.name,
    };
    deck.push(card);
  }
  for (let i = 2; i < 11; i++) {
    let card: Card = {
      kind: "club",
      value: i as typeof card.value,
      name: i.toString() as typeof card.name,
    };
    deck.push(card);
  }
  for (let i = 2; i < 11; i++) {
    let card: Card = {
      kind: "diamond",
      value: i as typeof card.value,
      name: i.toString() as typeof card.name,
    };
    deck.push(card);
  }
  for (let i = 2; i < 11; i++) {
    let card: Card = {
      kind: "spade",
      value: i as typeof card.value,
      name: i.toString() as typeof card.name,
    };
    deck.push(card);
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

  //  shuffle the deck
  return deck.reduceRight(
    (p, v, i, a) => (
      (v = i ? ~~(Math.random() * (i + 1)) : i),
      v - i ? ([deck[v], a[i]] = [deck[i], deck[v]]) : 0,
      deck
    ),
    deck
  );
}
