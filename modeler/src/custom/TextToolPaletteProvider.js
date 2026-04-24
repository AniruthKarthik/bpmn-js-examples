export default function TextToolPaletteProvider(
  palette,
  create,
  elementFactory,
  translate
) {
  palette.registerProvider(this);

  this.getPaletteEntries = function () {

    function createText(event) {
      const shape = elementFactory.createShape({
        type: 'bpmn:TextAnnotation'
      });

      create.start(event, shape);
    }

    return {
      'create.text': {
        group: 'artifact',
        className: 'bpmn-icon-text',
        title: translate('Create Text'),
        action: {
          dragstart: createText,
          click: createText
        }
      }
    };
  };
}

TextToolPaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'translate'
];
