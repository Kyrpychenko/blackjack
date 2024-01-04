<script setup lang="ts">
import { ref } from "vue";
import { Card, Deck } from "../cards";
const deck = ref<Deck | null>([]);
const playerHand = ref<Deck | null>([]);
const dealerHand = ref<Deck | null>([]);
function deckBuilder() {
  for (let i = 2; i < 11; i++) {
    let card: Card = {
      kind: "heart",
      value: i,
      name: i.toString(),
    };
    deck?.value.push(card);
  }
  for (let i = 2; i < 11; i++) {
    let card: Card = {
      kind: "club",
      value: i,
      name: i.toString(),
    };
    deck?.value.push(card);
  }
  for (let i = 2; i < 11; i++) {
    let card: Card = {
      kind: "diamond",
      value: i,
      name: i.toString(),
    };
    deck?.value.push(card);
  }
  for (let i = 2; i < 11; i++) {
    let card: Card = {
      kind: "spade",
      value: i,
      name: i.toString(),
    };
    deck?.value.push(card);
  }
  // club special cards
  deck.value?.push({ kind: "club", value: 10, name: "Queen" });
  deck.value?.push({ kind: "club", value: 10, name: "Jack" });
  deck.value?.push({ kind: "club", value: 10, name: "King" });
  deck.value?.push({ kind: "club", value: 11, name: "Ace" });
  // diamond special cards
  deck.value?.push({ kind: "diamond", value: 10, name: "Queen" });
  deck.value?.push({ kind: "diamond", value: 10, name: "Jack" });
  deck.value?.push({ kind: "diamond", value: 10, name: "King" });
  deck.value?.push({ kind: "diamond", value: 11, name: "Ace" });
  // heart special cards
  deck.value?.push({ kind: "heart", value: 10, name: "Queen" });
  deck.value?.push({ kind: "heart", value: 10, name: "Jack" });
  deck.value?.push({ kind: "heart", value: 10, name: "King" });
  deck.value?.push({ kind: "heart", value: 11, name: "Ace" });
  // spade special cards
  deck.value?.push({ kind: "spade", value: 10, name: "Queen" });
  deck.value?.push({ kind: "spade", value: 10, name: "Jack" });
  deck.value?.push({ kind: "spade", value: 10, name: "King" });
  deck.value?.push({ kind: "spade", value: 11, name: "Ace" });

  // reduce function for shuffling the deck
  // return deck.value.reduceRight(
  //   (p, v, i, a) => (
  //     (v = i ? ~~(Math.random() * (i + 1)) : i),
  //     v - i ? ([deck.value[v], a[i]] = [deck.value[i], deck.value[v]]) : 0,
  //     deck.value
  //   ),
  //   deck.value
  // );
}
deckBuilder();
</script>
<template>
  <div class="d-flex flex-wrap">
    <template v-for="card in deck">
      <div
        v-if="
          (card.name != 'Jack' ||
            card.name != 'Queen' ||
            card.name != 'Ace' ||
            card.name != 'King') &&
          card.value != 11
        "
      >
        <img
          :src="'./cards/' + card.value + '_of_' + card.kind + 's.png'"
          width="100"
        />
      </div>
      <div
        v-if="
          card.name == 'Jack' ||
          card.name == 'Queen' ||
          card.name == 'Ace' ||
          card.name == 'King'
        "
      >
        <img
          :src="
            './cards/' + card.name.toLowerCase() + '_of_' + card.kind + 's2.png'
          "
          width="100"
        />
      </div>
    </template>
  </div>
  {{ deck }}
</template>
<style scoped lang="scss"></style>
