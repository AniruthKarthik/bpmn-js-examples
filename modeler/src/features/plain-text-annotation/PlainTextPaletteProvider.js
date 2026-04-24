/**
 * A palette provider that allows creating plain text annotations.
 */
export default class PlainTextPaletteProvider {
  constructor(palette, create, elementFactory, translate) {
    palette.registerProvider(this);

    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
  }

  getPaletteEntries() {
    const {
      create,
      elementFactory,
      translate
    } = this;

    function createPlainTextAnnotation(event) {
      const shape = elementFactory.createShape({
        type: 'bpmn:TextAnnotation'
      });

      create.start(event, shape);
    }

    return {
      'create.plain-text-annotation': {
        group: 'artifact',
        className: 'bpmn-icon-text-annotation',
        title: translate('Create Plain Text Node'),
        action: {
          dragstart: createPlainTextAnnotation,
          click: createPlainTextAnnotation
        }
      }
    };
  }
}

PlainTextPaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'translate'
];
