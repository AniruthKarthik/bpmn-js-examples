import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

export var DEFAULT_TEXT_SIZE = {
  width: 120,
  height: 36
};

export function isCustomText(element) {
  return is(element, 'custom:Text');
}

export function getCustomText(element) {
  var businessObject = getBusinessObject(element);

  return businessObject && businessObject.name || '';
}
