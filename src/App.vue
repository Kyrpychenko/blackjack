<script setup lang="ts">
import { ref } from "vue";
import { Card, Deck } from "../cards";
const deck = ref<Deck>([]);
const playerHand = ref<Deck>([]);
const dealerHand = ref<Deck>([]);
function deckBuilder() {
  for (let i = 2; i < 11; i++) {
    let card: Card = {
      kind: "heart",
      value: i as typeof card.value,
      name: i.toString() as typeof card.name,
    };
    deck?.value.push(card);
  }
  for (let i = 2; i < 11; i++) {
    let card: Card = {
      kind: "club",
      value: i as typeof card.value,
      name: i.toString() as typeof card.name,
    };
    deck?.value.push(card);
  }
  for (let i = 2; i < 11; i++) {
    let card: Card = {
      kind: "diamond",
      value: i as typeof card.value,
      name: i.toString() as typeof card.name,
    };
    deck?.value.push(card);
  }
  for (let i = 2; i < 11; i++) {
    let card: Card = {
      kind: "spade",
      value: i as typeof card.value,
      name: i.toString() as typeof card.name,
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

  // shuffle the deck
  return deck.value.reduceRight(
    (p, v, i, a) => (
      (v = i ? ~~(Math.random() * (i + 1)) : i),
      v - i ? ([deck.value[v], a[i]] = [deck.value[i], deck.value[v]]) : 0,
      deck.value
    ),
    deck.value
  );
}
deckBuilder();

function playerDrawCard() {
  let specificCard = deck.value[Math.floor(Math.random() * deck.value.length)];
  playerHand.value.push(specificCard);
  deck.value.splice(deck.value.indexOf(specificCard), 1);
}

function dealerDrawCard() {
  let specificCard = deck.value[Math.floor(Math.random() * deck.value.length)];
  dealerHand.value.push(specificCard);
  deck.value.splice(deck.value.indexOf(specificCard), 1);
}
</script>
<template>
  <!-- <div class="d-flex flex-wrap">
    <template v-for="card in deck">
      <div
        v-if="
          card.name != 'Jack' &&
          card.name != 'Queen' &&
          card.name != 'Ace' &&
          card.name != 'King' &&
          card.value != 11
        "
      >
        <img
          :src="'./cards/' + card.name + '_of_' + card.kind + 's.png'"
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
</div> -->
  <button
    class="btn btn-primary position-absolute"
    style="right: 0"
    @click="dealerDrawCard()"
  >
    Dealer Draw
  </button>
  <button
    class="btn btn-primary position-absolute"
    style="right: 0; top: 5%"
    @click="playerDrawCard()"
  >
    Player Draw
  </button>
  <div class="text-white fs-1 position-absolute" style="top: 20%; left: 48%">
    {{ dealerHand.reduce((a, b) => a + b.value, 0) }}
  </div>
  <div class="d-flex flex-wrap position-absolute" style="left: 45%">
    <template v-for="card in dealerHand">
      <div
        v-if="
          card.name != 'Jack' &&
          card.name != 'Queen' &&
          card.name != 'Ace' &&
          card.name != 'King' &&
          card.value != 11
        "
      >
        <img
          :src="'./cards/' + card.name + '_of_' + card.kind + 's.png'"
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
  <div
    class="text-white fs-1 position-absolute"
    style="bottom: 20%; left: 48%"
    :class="{ 'text-danger': playerHand.reduce((a, b) => a + b.value, 0) > 21 }"
  >
    {{ playerHand.reduce((a, b) => a + b.value, 0) }}
  </div>
  <div class="d-flex flex-wrap position-absolute" style="left: 45%; bottom: 0">
    <template v-for="card in playerHand">
      <div
        v-if="
          card.name != 'Jack' &&
          card.name != 'Queen' &&
          card.name != 'Ace' &&
          card.name != 'King' &&
          card.value != 11
        "
      >
        <img
          :src="'./cards/' + card.name + '_of_' + card.kind + 's.png'"
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
</template>
<style scoped lang="scss"></style>
