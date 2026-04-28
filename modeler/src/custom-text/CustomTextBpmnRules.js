import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  isCustomText
} from './CustomTextUtil';

export default function CustomTextBpmnRules(bpmnRules) {
  var originalCanConnectSequenceFlow = bpmnRules.canConnectSequenceFlow.bind(bpmnRules);
  var originalCanConnect = bpmnRules.canConnect.bind(bpmnRules);

  bpmnRules.canConnectSequenceFlow = function(source, target) {
    if (isTextSequenceFlow(source, target)) {
      return isSameScope(source, target);
    }

    return originalCanConnectSequenceFlow(source, target);
  };

  bpmnRules.canConnect = function(source, target, connection) {
    if (isTextSequenceFlow(source, target)) {
      if (!isSameScope(source, target)) {
        return false;
      }

      return { type: 'bpmn:SequenceFlow' };
    }

    return originalCanConnect(source, target, connection);
  };
}

CustomTextBpmnRules.$inject = [ 'bpmnRules' ];

function isTextSequenceFlow(source, target) {
  return (
    (isCustomText(source) || isCustomText(target)) &&
    isTextConnectable(source) &&
    isTextConnectable(target)
  );
}

function isTextConnectable(element) {
  return isCustomText(element) || is(element, 'bpmn:FlowNode');
}

function getScopeParent(element) {
  var parent = element;

  while ((parent = parent.parent)) {
    if (is(parent, 'bpmn:FlowElementsContainer')) {
      return parent.businessObject;
    }

    if (is(parent, 'bpmn:Participant')) {
      return parent.businessObject.processRef;
    }
  }

  return null;
}

function isSameScope(source, target) {
  return getScopeParent(source) === getScopeParent(target);
}
