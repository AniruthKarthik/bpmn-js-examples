/**
 * A palette provider for creating custom "Text" shapes.
 */
export default class TextPaletteProvider {
  constructor(palette, create, elementFactory, translate) {
    palette.registerProvider(this);

    this._create = create;
    this._elementFactory = elementFactory;
    this._translate = translate;
  }

  getPaletteEntries() {
    const { _create, _elementFactory, _translate } = this;

    function createText(event) {
      const shape = _elementFactory.createShape({
        type: 'custom:Text'
      });

      _create.start(event, shape);
    }

    return {
      'create.text': {
        group: 'artifact',
        className: 'bpmn-icon-text',
        title: _translate('Create Text'),
        action: {
          dragstart: createText,
          click: createText
        }
      }
    };
  }
}

TextPaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'translate'
];
