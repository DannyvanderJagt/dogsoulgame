import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameContainer from './GameContainer';
import SecondGameContainer from './SecondGameContainer';

import './GameContainer.css';

class GameMix extends Component {
  state = { game: false };

  randomBool = () => Math.random() >= 0.5;

  handleSubmit = () => this.setState({ game: !this.state.game });

  render() {
    return (
      <div>
        {this.state.game ? (
          <GameContainer handleSubmit={this.handleSubmit} />
        ) : (
          <SecondGameContainer handleSubmit={this.handleSubmit} />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userAnswers: state.userAnswers,
  game: state.game
});

export default connect(mapStateToProps)(GameMix);
