import inherits from 'inherits-browser';

import LabelEditingProvider from 'bpmn-js/lib/features/label-editing/LabelEditingProvider';

import {
  assign
} from 'min-dash';

import {
  DEFAULT_TEXT_SIZE,
  getCustomText,
  isCustomText
} from './CustomTextUtil';

export default function CustomTextLabelEditingProvider(
    eventBus, bpmnFactory, canvas, directEditing,
    modeling, resizeHandles, textRenderer) {

  LabelEditingProvider.call(
    this,
    eventBus,
    bpmnFactory,
    canvas,
    directEditing,
    modeling,
    resizeHandles,
    textRenderer
  );

  eventBus.on('element.dblclick', function(event) {
    if (isCustomText(event.element)) {
      directEditing.activate(event.element);
    }
  });

  eventBus.on('create.end', 500, function(event) {
    var context = event.context;

    if (!context.canExecute || !isCustomText(context.shape) || event.isTouch) {
      return;
    }

    directEditing.activate(context.shape);
  });

  eventBus.on('autoPlace.end', 500, function(event) {
    if (isCustomText(event.shape)) {
      directEditing.activate(event.shape);
    }
  });
}

inherits(CustomTextLabelEditingProvider, LabelEditingProvider);

CustomTextLabelEditingProvider.$inject = LabelEditingProvider.$inject;

CustomTextLabelEditingProvider.prototype.activate = function(element) {
  if (!isCustomText(element)) {
    return LabelEditingProvider.prototype.activate.call(this, element);
  }

  var editingBBox = this.getEditingBBox(element);

  return {
    text: getCustomText(element),
    bounds: editingBBox.bounds,
    style: editingBBox.style,
    options: {
      autoResize: true,
      resizable: true
    }
  };
};

CustomTextLabelEditingProvider.prototype.getEditingBBox = function(element) {
  if (!isCustomText(element)) {
    return LabelEditingProvider.prototype.getEditingBBox.call(this, element);
  }

  var bbox = this._canvas.getAbsoluteBBox(element),
      zoom = this._canvas.zoom(),
      defaultStyle = this._textRenderer.getDefaultStyle(),
      fontSize = defaultStyle.fontSize * zoom,
      lineHeight = defaultStyle.lineHeight;

  return {
    bounds: {
      x: bbox.x,
      y: bbox.y,
      width: bbox.width,
      height: bbox.height,
      minWidth: DEFAULT_TEXT_SIZE.width * zoom,
      minHeight: DEFAULT_TEXT_SIZE.height * zoom
    },
    style: {
      fontFamily: defaultStyle.fontFamily,
      fontWeight: defaultStyle.fontWeight,
      fontSize: fontSize + 'px',
      lineHeight: lineHeight,
      textAlign: 'left',
      backgroundColor: null,
      border: null,
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px'
    }
  };
};

CustomTextLabelEditingProvider.prototype.update = function(element, newLabel) {
  var bounds = arguments[3];

  if (!isCustomText(element)) {
    return LabelEditingProvider.prototype.update.apply(this, arguments);
  }

  if (!newLabel || !newLabel.trim()) {
    newLabel = null;
  }

  this._modeling.updateProperties(element, {
    name: newLabel
  });

  this._modeling.resizeShape(element, assign({}, element, {
    width: Math.max(DEFAULT_TEXT_SIZE.width, Math.ceil(bounds.width)),
    height: Math.max(DEFAULT_TEXT_SIZE.height, Math.ceil(bounds.height))
  }));
};
