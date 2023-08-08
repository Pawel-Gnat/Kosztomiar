export const nextUnauthenticatedMock = {
  data: null,
  status: 'unauthenticated',
};

export const nextAuthenticatedMock = {
  data: { expires: 1, user: { email: 'test@test.com' } },
  status: 'authenticated',
};

export const goBackRouterMock = {
  back: jest.fn(),
};
