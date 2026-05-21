import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

export var DEFAULT_IMAGE_SIZE = {
  width: 100,
  height: 100
};

export function isCustomImage(element) {
  return is(element, 'custom:Image');
}

export function getImageUrl(element) {
  var businessObject = element.businessObject;

  if (businessObject && typeof businessObject.get === 'function') {
    return businessObject.get('url');
  }

  return businessObject && businessObject.url;
}
