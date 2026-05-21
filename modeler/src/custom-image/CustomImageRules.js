import inherits from 'inherits-browser';

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  isCustomImage
} from './CustomImageUtil';

var HIGH_PRIORITY = 2000;

export default function CustomImageRules(eventBus) {
  RuleProvider.call(this, eventBus);
}

inherits(CustomImageRules, RuleProvider);

CustomImageRules.$inject = [ 'eventBus' ];

CustomImageRules.prototype.init = function() {
  this.addRule('elements.create', HIGH_PRIORITY, function(context) {
    var elements = context.elements,
        target = context.target;

    if (elements.length === 1 && isCustomImage(elements[0])) {
      return is(target, 'bpmn:FlowElementsContainer') || is(target, 'bpmn:Participant') || is(target, 'bpmn:Process');
    }
  });

  this.addRule('shape.create', HIGH_PRIORITY, function(context) {
    var shape = context.shape,
        target = context.target;

    if (isCustomImage(shape)) {
      return is(target, 'bpmn:FlowElementsContainer') || is(target, 'bpmn:Participant') || is(target, 'bpmn:Process');
    }
  });

  this.addRule('shape.resize', HIGH_PRIORITY, function(context) {
    var shape = context.shape;

    if (isCustomImage(shape)) {
      return true;
    }
  });
};
