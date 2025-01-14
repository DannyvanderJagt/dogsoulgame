import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import request from 'superagent';

import DisplayAnswers from './DisplayAnswers';
import SuccessRate from './SuccessRate';
import { gameUrl } from '../actions';
import { BreedsAlreadySeen } from '../actions/BreedOrder'

import './GameContainer.css';

class GameContainer extends Component {
  state = { answerIncorrectly: false };

  componentDidMount() {
    this.renderRandomImage();
  }

  renderRandomImage = () =>
    request
      .get('https://dog.ceo/api/breeds/image/random')
      .then(res => {
        this.props.gameUrl({
          url: res.body.message,
          correctAnswer: res.body.message.split('/')[4]
        });
      })
      .catch(console.error);

  handleSubmit = event => {
    event.preventDefault();

    this.renderRandomImage();
  };

  showCorrectAnswer = () => {
    const buttons = document.getElementsByTagName('button');

    if (this.state.answerIncorrectly === true) {
      buttons[0].style.pointerEvents = 'none';
      buttons[1].style.pointerEvents = 'none';
      // buttons[2].style.pointerEvents = 'none';
      // buttons[3].style.pointerEvents = 'none';
      // buttons[4].style.pointerEvents = 'none';

      return <h1>{this.props.game.correctAnswer}</h1>;
    } else if (buttons.length > 2) {
      buttons[0].style.pointerEvents = 'auto';
      buttons[1].style.pointerEvents = 'auto';
      // buttons[2].style.pointerEvents = 'auto';
      // buttons[3].style.pointerEvents = 'auto';
      // buttons[4].style.pointerEvents = 'auto';
    }
    if (this.state.correctAnswer !== '') {
      this.props.BreedsAlreadySeen(this.state.correctAnswer);
    }
  };

  answeredIncorrectly = () =>
    this.setState({
      answerIncorrectly: !this.state.answerIncorrectly
    });

  render() {
    return (
      <div>
        <SuccessRate success={this.props.userAnswers} />

        <NavLink to="/">
          <button className="navigation-button">Back</button>
        </NavLink>

        {this.showCorrectAnswer()}

        <br />
        {this.props.game.url === '' ? (
          <p>loading</p>
        ) : (
          <img alt="dog" className="dog-game-image" src={this.props.game.url} />
        )}
        <br />
        <button className="navigation-button" onClick={this.handleSubmit}>
          Next
        </button>

        <DisplayAnswers
          answer={this.props.game.correctAnswer}
          renderRandomImage={this.renderRandomImage}
          incorrectState={this.answeredIncorrectly}
          handleSubmit={this.props.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userAnswers: state.userAnswers,
  breedOrder: state.breedOrder,
  game: state.game
});

export default connect(
  mapStateToProps,
  { gameUrl, BreedsAlreadySeen }
)(GameContainer);
