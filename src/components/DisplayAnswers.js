import React from 'react';
import { connect } from 'react-redux';
import { addUserAnswer } from '../actions/userAnswers';
import './DisplayAnswers.css';

class DisplayAnswers extends React.Component {
  handleClick = event => {
    event.preventDefault();
    if (this.props.answer === event.target.value) {
      this.props.addUserAnswer(true);
      this.props.renderRandomImage();
    } else {
      this.props.addUserAnswer(false);
      this.props.incorrectState();
      setTimeout(() => {
        this.props.renderRandomImage();
        this.props.incorrectState();
      }, 2000);
    }
  };

  randomIndex = dataLength => {
    if (dataLength < 1 || dataLength === undefined) return -1;

    return Math.floor(Math.random() * dataLength);
  };

  render() {
    const name = this.props.answer;
    const randomName1 = this.props.breeds[
      this.randomIndex(this.props.breeds.length)
    ];
    const randomName2 = this.props.breeds[
      this.randomIndex(this.props.breeds.length)
    ];
    const randomAnswers = [
      name,
      randomName1 === undefined
        ? 'Go back and start the game again please!!!'
        : randomName1,
      randomName2 === undefined
        ? 'Go back and start the game again please!!!'
        : randomName2
    ].sort();

    return (
      <div>
        <button onClick={this.handleClick} value={randomAnswers[0]}>
          {randomAnswers[0]}
        </button>
        <button onClick={this.handleClick} value={randomAnswers[1]}>
          {randomAnswers[1]}
        </button>
        <button onClick={this.handleClick} value={randomAnswers[2]}>
          {randomAnswers[2]}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAnswers: state.userAnswers,
    breeds: state.breeds
  };
};

export default connect(
  mapStateToProps,
  { addUserAnswer }
)(DisplayAnswers);