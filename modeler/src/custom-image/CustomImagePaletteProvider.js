import {
  assign
} from 'min-dash';

import {
  DEFAULT_IMAGE_SIZE
} from './CustomImageUtil';

export default function CustomImagePaletteProvider(
    palette, create, elementFactory, translate, bpmnFactory) {

  this._create = create;
  this._elementFactory = elementFactory;
  this._translate = translate;
  this._bpmnFactory = bpmnFactory;

  palette.registerProvider(this);
}

CustomImagePaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'translate',
  'bpmnFactory'
];

CustomImagePaletteProvider.prototype.getPaletteEntries = function() {
  var create = this._create,
      elementFactory = this._elementFactory,
      translate = this._translate,
      bpmnFactory = this._bpmnFactory;

  function handleImportImage(event) {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = function(e) {
      var file = e.target.files[0];
      if (!file) {
        return;
      }

      var reader = new FileReader();
      reader.onload = function(e) {
        var url = e.target.result;

        var businessObject = bpmnFactory.create('custom:Image', {
          url: url
        });

        var shape = elementFactory.createShape(assign({
          type: 'custom:Image',
          businessObject: businessObject
        }, DEFAULT_IMAGE_SIZE));

        create.start(event, shape);
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }

  return {
    'create.custom-image': {
      group: 'create',
      className: 'custom-image-tool',
      title: translate('Import image'),
      action: {
        click: handleImportImage
      }
    }
  };
};
