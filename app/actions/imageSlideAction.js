export const ADD_IMAGE_SLIDE_BOX = 'ADD_IMAGE_SLIDE_BOX';
export const UPDATE_IMAGE_SLIDE_BOX = 'UPDATE_IMAGE_SLIDE_BOX';
export const DELETE_IMAGE_SLIDE_BOX = 'DELETE_IMAGE_SLIDE_BOX';

export const addImageSlideBox = (boxInfo) => ({
  type: ADD_IMAGE_SLIDE_BOX,
  boxInfo
});

export const updateImageSlideBox = (boxInfo) => ({
  type: UPDATE_IMAGE_SLIDE_BOX,
  boxInfo
});

export const deleteImageSlideBox = (boxKey) => ({
  type: DELETE_IMAGE_SLIDE_BOX,
  boxKey
});
