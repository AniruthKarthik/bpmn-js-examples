export default function CustomPaletteProvider(
  palette,
  create,
  elementFactory,
  translate,
) {
  palette.registerProvider(this);

  this.getPaletteEntries = function () {
    function createAnnotation(event) {
      const shape = elementFactory.createShape({
        type: "bpmn:TextAnnotation",
      });

      create.start(event, shape);
    }

    return {
      "create.text-annotation": {
        group: "artifact",
        className: "bpmn-icon-text-annotation",
        title: translate("Create Text Annotation"),
        action: {
          dragstart: createAnnotation,
          click: createAnnotation,
        },
      },
    };
  };
}

CustomPaletteProvider.$inject = [
  "palette",
  "create",
  "elementFactory",
  "translate",
];
