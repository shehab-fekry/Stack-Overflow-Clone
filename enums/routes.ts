export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  ASK_QUESTION: "/ask-question",
  /**
   * profile route handler.
   * @param profileSegment defines the details main segment
   * @example /(profileSegment)/blablabla
   * @param id defines the dynamic param
   * @example /blablabla/(id)
   */
  PROFILE: (profileSegment: string, id: string) => `/${profileSegment}/${id}`,
};
