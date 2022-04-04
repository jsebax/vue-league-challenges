<template>
  <div class="credit-card">
    <div class="credit-card__item" :class="{ '-active': isCardFlipped }">
      <div class="credit-card__cover -front">
        <div class="credit-card__top">
          <img
            class="credit-card__logo"
            alt="Vue logo"
            src="../assets/logo.png"
          />
        </div>
        <label class="credit-card__number">
          {{ cardNumberText }}
        </label>
        <div class="credit-card__content">
          <label for="cardName" class="credit-card__info">
            <div class="credit-card__holder">Card Holder</div>
            <span class="credit-card__name">{{ cardHolder }}</span>
          </label>
          <div class="credit-card__date">
            <label for="cardMonth" class="credit-card__date-title">
              Expires
            </label>
            <label for="cardMonth" class="credit-card__date-item">
              <span>{{ cardMonthText }}</span>
            </label>
            /
            <label for="cardYear" class="credit-card__date-item">
              <span>{{ cardYearText }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="credit-card__cover -back">
        <div class="credit-card__band"></div>
        <div class="credit-card__cvv">
          <div class="credit-card__cvv-title">CVV</div>
          <div class="credit-card__cvv-band">{{ cardCvv }}</div>
          <img
            class="credit-card__logo"
            alt="Vue logo"
            src="../assets/logo.png"
          />
        </div>
      </div>
    </div>

    <form class="card-form">
      <div class="card-input">
        <label for="cardNumber" class="card-input__label">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          autocomplete="off"
          class="card-input__input"
          v-model="cardNumber"
          v-mask="cardNumberMask"
        />
      </div>

      <div class="card-input">
        <label for="cardName" class="card-input__label">Card Holder</label>
        <input
          type="text"
          id="cardName"
          autocomplete="off"
          class="card-input__input"
          v-model="cardName"
        />
      </div>

      <div class="card-form__row">
        <div class="card-form__col">
          <div class="card-form__group">
            <label for="cardMonth" class="card-input__label"
              >Expiration Date</label
            >
            <select
              id="cardMonth"
              class="card-input__input -select"
              v-model="cardMonth"
            >
              <option value="" disabled selected>Month</option>
              <option
                :value="n < 10 ? `0${n}` : n"
                v-for="n in 12"
                :disabled="n < minCardMonth"
                :key="n"
              >
                {{ n < 10 ? `0${n}` : n }}
              </option>
            </select>
            <select
              id="cardYear"
              class="card-input__input -select"
              v-model="cardYear"
            >
              <option value="" disabled selected>Year</option>
              <option
                :value="index + minCardYear"
                v-for="(n, index) in 12"
                :key="n"
              >
                {{ index + minCardYear }}
              </option>
            </select>
          </div>
        </div>
        <div class="card-form__col">
          <div class="card-input">
            <label for="cardCvv" class="card-input__label">CVV</label>
            <input
              type="text"
              class="card-input__input"
              id="cardCvv"
              maxlength="3"
              v-model="cardCvv"
              v-mask="'###'"
              autocomplete="off"
              @focus="flipCard(true)"
              @blur="flipCard(false)"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardNumber: "",
      cardName: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      cardNumberMask: "#### #### #### ####",
      cardNumberTemp: "",
      isCardFlipped: false,
    };
  },
  computed: {
    cardNumberText() {
      if (this.cardNumber !== "") {
        return this.cardNumber.concat(
          this.cardNumberMask.slice(this.cardNumber.length)
        );
      } else {
        return this.cardNumberMask;
      }
    },
    cardHolder() {
      return this.cardName !== "" ? this.cardName : "full name";
    },
    cardMonthText() {
      return this.cardMonth !== "" ? this.cardMonth : "MM";
    },
    cardYearText() {
      return this.cardYear !== "" ? String(this.cardYear).slice(2, 4) : "YY";
    },
    minCardMonth() {
      return this.cardYear === this.minCardYear ? new Date().getMonth() + 1 : 1;
    },
  },
  watch: {
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    },
  },
  methods: {
    flipCard(status) {
      this.isCardFlipped = status;
    },
  },
};
</script>

<style lang="scss" scoped>
.credit-card {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 430px;

  &__item {
    font-family: "Source Code Pro", monospace;
    height: 270px;
    margin-bottom: 50px;
    position: relative;
    width: 100%;
    z-index: 2;

    &.-active {
      .credit-card__cover {
        &.-front {
          transform: perspective(1000px) rotateY(180deg) rotateX(0deg)
            rotateZ(0deg);
        }

        &.-back {
          transform: perspective(1000px) rotateY(0deg) rotateX(0deg)
            rotateZ(0deg);
        }
      }
    }
  }

  &__cover {
    backface-visibility: hidden;
    background-color: #43a047;
    border-radius: 15px;
    box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.55);
    height: 100%;
    overflow: hidden;
    padding: 25px 15px;
    transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);
    transform-style: preserve-3d;
    transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);

    &.-front {
      display: flex;
      flex-direction: column;
    }

    &.-back {
      left: 0;
      padding: 0;
      position: absolute;
      top: 0;
      transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg);
      width: 100%;
      z-index: 2;

      .credit-card__cover {
        transform: rotateY(-180deg);
      }
    }
  }

  &__top {
    display: flex;
    justify-content: flex-end;
    line-height: 0;
    margin-bottom: 40px;
  }

  &__logo {
    height: 45px;
    width: 45px;
  }

  &__number {
    color: #ffffff;
    flex: 1;
    font-size: 32px;
    text-shadow: 7px 6px 10px rgb(0 0 0 / 50%);
  }

  &__content {
    align-items: flex-start;
    color: #ffffff;
    display: flex;
    padding: 0 16px;
  }

  &__info {
    text-align: left;
    width: 100%;
    max-width: calc(100% - 85px);
  }

  &__holder {
    margin-bottom: 6px;
  }

  &__name {
    display: block;
    font-size: 18px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__date {
    display: inline-flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    font-size: 16px;
    margin-left: auto;
    white-space: nowrap;
    width: 80px;
  }

  &__date-title {
    margin-bottom: 6px;
  }

  &__date-item {
    span {
      display: inline-block;
      font-size: 18px;
      width: 22px;
    }
  }

  &__band {
    background-color: #000000;
    height: 50px;
    margin-top: 30px;
    width: 100%;
  }

  &__cvv {
    padding: 15px;
    position: relative;
    text-align: right;
    z-index: 2;
  }

  &__cvv-title {
    color: #ffffff;
    font-size: 15px;
    margin-bottom: 5px;
    padding-right: 10px;
  }

  &__cvv-band {
    align-items: center;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 10px 20px -7px rgb(32 56 117 / 35%);
    color: #2c3e50;
    display: flex;
    font-size: 18px;
    height: 45px;
    justify-content: flex-end;
    margin-bottom: 30px;
    padding-right: 10px;
    text-align: right;
  }

  & .card-form {
    &__row {
      display: flex;
      align-items: flex-start;
    }

    &__col {
      flex: auto;

      &:not(:last-child) {
        margin-bottom: 20px;
        margin-right: 35px;
      }
    }

    &__group {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;

      .card-input__input {
        flex: 1;

        &:not(:last-child) {
          margin-right: 15px;
        }
      }
    }
  }

  & .card-input {
    margin-bottom: 20px;

    &__label {
      display: block;
      font-size: 14px;
      margin-bottom: 5px;
      text-align: left;
      width: 100%;
    }

    &__input {
      border: 1px solid #2c3e50;
      border-radius: 5px;
      color: #2c3e50;
      font-family: inherit;
      font-size: 18px;
      height: 50px;
      padding: 5px 15px;
      width: 100%;

      &.-select {
        appearance: none;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUxJREFUeNrM1sEJwkAQBdCsngXPHsQO9O5FS7AAMVYgdqAd2IGCDWgFnryLFQiCZ8EGnJUNimiyM/tnk4HNEAg/8y6ZmMRVqz9eUJvRaSbvutCZ347bXVJy/ZnvTmdJ862Me+hAbZCTs6GHpyUi1tTSvPnqTpoWZPUa7W7ncT3vK4h4zVejy8QzM3WhVUO8ykI6jOxoGA4ig3BLHcNFSCGqGAkig2yqgpEiMsjSfY9LxYQg7L6r0X6wS29YJiYQYecemY+wHrXD1+bklGhpAhBDeu/JfIVGxaAQ9sb8CI+CQSJ+QmJg0Ii/EE2MBiIXooHRQhRCkBhNhBcEhLkwf05ZCG8ICCOpk0MULmvDSY2M8UawIRExLIQIEgHDRoghihgRIgiigBEjgiFATBACAgFgghEwSAAGgoBCBBgYAg5hYKAIFYgHBo6w9RRgAFfy160QuV8NAAAAAElFTkSuQmCC");
        background-size: 12px;
        background-position: 90% center;
        background-repeat: no-repeat;
        padding-right: 30px;
      }
    }
  }
}
</style>
