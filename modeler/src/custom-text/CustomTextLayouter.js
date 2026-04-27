import inherits from 'inherits-browser';

import BpmnLayouter from 'bpmn-js/lib/features/modeling/BpmnLayouter';

import {
  connectRectangles,
  withoutRedundantPoints
} from 'diagram-js/lib/layout/ManhattanLayout';

import {
  getMid
} from 'diagram-js/lib/layout/LayoutUtil';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  isDirectionHorizontal
} from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import {
  isCustomText
} from './CustomTextUtil';

export default function CustomTextLayouter(elementRegistry) {
  BpmnLayouter.call(this, elementRegistry);

  this._elementRegistry = elementRegistry;
}

inherits(CustomTextLayouter, BpmnLayouter);

CustomTextLayouter.$inject = [ 'elementRegistry' ];

CustomTextLayouter.prototype.layoutConnection = function(connection, hints) {
  hints = hints || {};

  var source = hints.source || connection.source,
      target = hints.target || connection.target,
      layout = isDirectionHorizontal(source, this._elementRegistry) ? 'h:h' : 'v:v';

  if (!isCustomTextConnection(connection, source, target)) {
    return BpmnLayouter.prototype.layoutConnection.call(this, connection, hints);
  }

  return withoutRedundantPoints(connectRectangles(
    source,
    target,
    getMid(source),
    getMid(target),
    {
      preferredLayouts: [ 'straight', layout ]
    }
  ));
};

function isCustomTextConnection(connection, source, target) {
  return is(connection, 'bpmn:SequenceFlow') && (
    isCustomText(source) || isCustomText(target)
  );
}
