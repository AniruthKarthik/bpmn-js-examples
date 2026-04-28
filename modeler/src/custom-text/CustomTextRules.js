import inherits from 'inherits-browser';

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  isCustomText
} from './CustomTextUtil';

var HIGH_PRIORITY = 2000;

export default function CustomTextRules(eventBus) {
  RuleProvider.call(this, eventBus);
}

inherits(CustomTextRules, RuleProvider);

CustomTextRules.$inject = [ 'eventBus' ];

CustomTextRules.prototype.init = function() {
  this.addRule([ 'connection.create', 'connection.reconnect' ], HIGH_PRIORITY, function(context) {
    var source = context.source,
        target = context.target;

    if (!isTextFlowConnection(source, target)) {
      return;
    }

    if (!isSameScope(source, target)) {
      return false;
    }

    return { type: 'bpmn:SequenceFlow' };
  });

  this.addRule('shape.resize', HIGH_PRIORITY, function(context) {
    var shape = context.shape,
        newBounds = context.newBounds;

    if (!isCustomText(shape)) {
      return;
    }

    if (!newBounds) {
      return true;
    }

    return newBounds.width >= 80 && newBounds.height >= 36;
  });
};

function isTextFlowConnection(source, target) {
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
      return getBusinessObject(parent);
    }

    if (is(parent, 'bpmn:Participant')) {
      return getBusinessObject(parent).processRef;
    }
  }

  return null;
}

function isSameScope(source, target) {
  return getScopeParent(source) === getScopeParent(target);
}
