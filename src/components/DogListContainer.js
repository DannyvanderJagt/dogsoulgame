import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import request from 'superagent';
import DogsList from './DogList';

import { setBreedState } from '../actions';
import { addImagesObjects } from '../actions/addImagesObjects'

class DogsListContainer extends Component {
  componentDidMount() {
    request
      .get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        this.props.setBreedState(Object.keys(response.body.message));
        this.props.breeds.map(breed => this.requirePhotos(breed))
      })
      .catch(console.error);
  }

  requirePhotos = (breed) => {
    request
      .get(`https://dog.ceo/api/breed/${encodeURIComponent(breed)}/images`)
      .then(response => {
        this.props.addImagesObjects({breed, photos: response.body.message.slice(0, 5)})
      })
      .catch(console.error)
  }

  render() {
    return (
      <div>
        <NavLink to="/gameone">
          <button>Start First Game</button>
        </NavLink>
        <NavLink to="/gametwo">
          <button>Start Second Game</button>
        </NavLink>
        <DogsList dogBreeds={this.props.breeds} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    breeds: state.breeds
  };
};

export default connect(
  mapStateToProps,
  { setBreedState, addImagesObjects }
)(DogsListContainer);
