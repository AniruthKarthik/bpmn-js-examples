import CustomImageRenderer from './CustomImageRenderer';
import CustomImagePaletteProvider from './CustomImagePaletteProvider';
import CustomImageRules from './CustomImageRules';

export default {
  __init__: [
    'customImageRenderer',
    'customImagePaletteProvider',
    'customImageRules'
  ],
  customImageRenderer: [ 'type', CustomImageRenderer ],
  customImagePaletteProvider: [ 'type', CustomImagePaletteProvider ],
  customImageRules: [ 'type', CustomImageRules ]
};
