import $ from 'jquery';
import { renderEditor } from './renderEditor';

$(document).ready(function () {
  $('body').append('<h1>Hello, jQuery!</h1>');

  renderEditor();
});
