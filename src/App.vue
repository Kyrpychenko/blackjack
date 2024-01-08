<script setup lang="ts">
import { ref } from "vue";
import { Deck, deckBuilder } from "../cards";
const deck = ref<Deck>([]);
const playerHand = ref<Deck>([]);
const dealerHand = ref<Deck>([]);
const started = ref(false);
const stand = ref(false);
const playerLost = ref<null | true | false>(null);
const playerTotalCardValue = playerHand.value.reduce((a, b) => a + b.value, 0);
deckBuilder(deck.value);

function playerDrawCard() {
  let specificCard = deck.value[Math.floor(Math.random() * deck.value.length)];
  playerHand.value.push(specificCard);
  deck.value.splice(deck.value.indexOf(specificCard), 1);
  if (playerTotalCardValue > 21) {
    playerLost.value = true;
  }
}

function dealerDrawCard() {
  let specificCard = deck.value[Math.floor(Math.random() * deck.value.length)];
  dealerHand.value.push(specificCard);
  deck.value.splice(deck.value.indexOf(specificCard), 1);
}

async function gameStart() {
  dealerDrawCard();
  await sleep(200);
  playerDrawCard();
  await sleep(200);
  dealerDrawCard();
  await sleep(200);
  playerDrawCard();
  started.value = !started.value;
}
async function sleep(time: number) {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );
}
async function playerStand() {
  stand.value = true;
  while (dealerHand.value.reduce((a, b) => a + b.value, 0) < 17) {
    await sleep(400);
    dealerDrawCard();
    if (dealerHand.value.reduce((a, b) => a + b.value, 0) >= 17) {
      if (
        dealerHand.value.reduce((a, b) => a + b.value, 0) <= 21 &&
        playerTotalCardValue <= 21
      ) {
        dealerHand.value.reduce((a, b) => a + b.value, 0) > playerTotalCardValue
          ? (playerLost.value = true)
          : (playerLost.value = false);
      }
    }
  }
}

function restartGame() {
  deck.value = [];
  deckBuilder(deck.value);
  gameStart();
}
</script>
<template>
  <!-- restart -->
  <dialog :open="playerLost == true">
    <p>You Lost</p>
    <button class="btn btn-primary" @click="restartGame()">Restart</button>
  </dialog>
  <dialog :open="dealerHand.reduce((a, b) => a + b.value, 0) > 21">
    <p>You won</p>
    <button class="btn btn-primary" @click="restartGame()">Restart</button>
  </dialog>
  <button class="btn btn-primary" v-if="!started" @click="gameStart()">
    start Game
  </button>
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

  <!-- dealer -->
  <div
    class="fs-1 position-absolute"
    :class="
      dealerHand.reduce((a, b) => a + b.value, 0) <= 21
        ? 'text-white'
        : 'text-danger'
    "
    style="top: 25%; left: 48%"
  >
    <span v-if="started">{{
      dealerHand.reduce((a, b) => a + b.value, 0)
    }}</span>
  </div>
  <span
    v-if="started && dealerHand.reduce((a, b) => a + b.value, 0) > 21"
    class="text-danger fs-2"
    style="position: absolute; top: 30%; left: 48%"
    >BUST</span
  >
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

  <!-- player -->
  <span
    v-if="started && playerHand.reduce((a, b) => a + b.value, 0) > 21"
    class="text-danger fs-2"
    style="position: absolute; bottom: 30%; left: 48%"
    >BUST</span
  >
  <button
    class="btn btn-primary position-absolute"
    style="bottom: 20%; left: 46%"
    @click="playerDrawCard()"
    v-if="started"
    :disabled="stand"
  >
    Hit
  </button>
  <button
    class="btn btn-primary position-absolute"
    style="bottom: 20%; left: 49%"
    v-if="started"
    @click="playerStand()"
  >
    Stand
  </button>
  <div
    class="fs-1 position-absolute"
    style="bottom: 25%; left: 48%"
    :class="
      playerHand.reduce((a, b) => a + b.value, 0) <= 21
        ? 'text-white'
        : 'text-danger'
    "
  >
    <span v-if="started">{{
      playerHand.reduce((a, b) => a + b.value, 0)
    }}</span>
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
