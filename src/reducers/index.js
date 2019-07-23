import { combineReducers } from 'redux';
import breeds from './breeds';
import imagesDetails from './imagesDetails'
import userAnswers from './userAnswers'
import imagesObjects from './imagesObjects'

export default combineReducers({ breeds, imagesDetails, userAnswers, imagesObjects });
