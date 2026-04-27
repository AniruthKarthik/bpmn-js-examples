import {
  assign
} from 'min-dash';

import {
  DEFAULT_TEXT_SIZE
} from './CustomTextUtil';

export default function CustomTextPaletteProvider(
    palette, create, elementFactory, translate) {

  this._create = create;
  this._elementFactory = elementFactory;
  this._translate = translate;

  palette.registerProvider(this);
}

CustomTextPaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'translate'
];

CustomTextPaletteProvider.prototype.getPaletteEntries = function() {
  var create = this._create,
      elementFactory = this._elementFactory,
      translate = this._translate;

  function createCustomText(event) {
    var shape = elementFactory.createShape(assign({
      type: 'custom:Text'
    }, DEFAULT_TEXT_SIZE));

    create.start(event, shape);
  }

  return {
    'create.custom-text': {
      group: 'custom',
      className: 'custom-text-tool',
      title: translate('Create text'),
      action: {
        dragstart: createCustomText,
        click: createCustomText
      }
    }
  };
};
