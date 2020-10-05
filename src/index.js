import $ from 'jquery';
import app from './app.js'
import './index.css'

function main() {
  app.bindEventListners();
  app.render();
}

$(main);