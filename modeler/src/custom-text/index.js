import CustomTextRenderer from './CustomTextRenderer';
import CustomTextPaletteProvider from './CustomTextPaletteProvider';
import CustomTextRules from './CustomTextRules';
import CustomTextLabelEditingProvider from './CustomTextLabelEditingProvider';
import CustomTextLayouter from './CustomTextLayouter';
import CustomTextBpmnRules from './CustomTextBpmnRules';

export default {
  __init__: [
    'customTextRenderer',
    'customTextPaletteProvider',
    'customTextRules',
    'customTextBpmnRules'
  ],
  customTextRenderer: [ 'type', CustomTextRenderer ],
  customTextPaletteProvider: [ 'type', CustomTextPaletteProvider ],
  customTextRules: [ 'type', CustomTextRules ],
  customTextBpmnRules: [ 'type', CustomTextBpmnRules ],
  labelEditingProvider: [ 'type', CustomTextLabelEditingProvider ],
  layouter: [ 'type', CustomTextLayouter ]
};
