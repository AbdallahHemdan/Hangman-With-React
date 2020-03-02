import React, { Component } from "react";
import { randomWord } from "./words.jsx";
import NavBar from "./navBar.jsx"

import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";

let { gameState, BACKSPACE, ENTER, SPACE, endState } = commonlyUsed();

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6]
  };
  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set(),
      answer: randomWord()
    };
    window.addEventListener("keydown", this.keyPress);
  }

  guessedWord = () => {
    return this.state.answer
      .split("")
      .map(bingo => (this.state.guessed.has(bingo) ? bingo : "_"));
  }

  handleGuess = (value) => {
    let letter = value;
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
    }));
  }

  isGameOver = () => {
    return this.state.mistake >= this.props.maxWrong;
  }

  isWinner = () => {
    return this.guessedWord().join("") === this.state.answer;
  }

  getAltText = () => {
    return `${this.state.mistake}/${this.props.maxWrong} wrong guesses`;
  }

  keyPress = (event) => {
    if (endState === true) {
      if (event.keyCode === BACKSPACE
        || event.keyCode === ENTER
        || event.keyCode === SPACE) {
        this.resetButton();
      }
    } else if (
      (event.keyCode >= 65 && event.keyCode <= 90)
    ) {
      this.handleGuess(event.key);
    } else if (
      event.keyCode === 8 ||
      event.keyCode === 13 ||
      event.keyCode === 32
    ) {
      this.resetButton();
    }
  }

  generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      <button
        key={letter}
        value={letter}
        onClick={e => this.handleGuess(e.target.value)}
        dis abled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  };

  render() {
    const gameOver = this.isGameOver();
    const altText = this.getAltText();
    const isWinner = this.isWinner();
    gameState = this.generateButtons();
    if (isWinner) {
      endState = true;
      gameState = "🎉 CONGRATULATIONS, YOU WIN..";
    }
    if (gameOver) {
      endState = true;
      gameState = "❌ SORRY, YOU LOST.."
    }

    return (
      <div className="Hangman">
        <NavBar mistake={this.state.mistake} />
        <p className="text-center">
          <img
            src={this.props.images[this.state.mistake]}
            alt={altText}
          />
        </p>
        <p className="text-center text-light">
          Guess the Programming Language ?
        </p>
        <p className="Hangman-word text-center">
          {!gameOver ? this.guessedWord() : this.state.answer}{" "}
        </p>

        <p className="text-center text-warning mt-4 game-state">{gameState}</p>

        <div>
          <p className="text-center">
            <button className="Hangman-reset" onClick={this.resetButton}>
              Reset
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Hangman;
function commonlyUsed() {
  let gameState;
  let endState;
  const BACKSPACE = 8;
  const ENTER = 13;
  const SPACE = 32;
  return { gameState, BACKSPACE, ENTER, SPACE, endState };
}