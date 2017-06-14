export const CHANGE_APP_BAR_TITLE = 'CHANGE_APP_BAR_TITLE';

export const changeAppBarTitle = (title, type) => ({
  type: CHANGE_APP_BAR_TITLE,
  payload: {
    title,
    type
  }
})
