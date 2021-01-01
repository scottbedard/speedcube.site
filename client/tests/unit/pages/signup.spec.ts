import { currentUser, resetUserState } from '@/app/store/user/state';
import { mountRoute } from '~/utils';
import mockAxios from 'jest-mock-axios';
import Signup from '@/pages/signup.vue';
import userFixture from '~/fixtures/user';

describe('signup page', () => {
  afterEach(() => {
    resetUserState();
    mockAxios.reset();
  });

  it('creates a user', async () => {
    const { router, wrapper } = await mountRoute(Signup);

    router.replace = jest.fn();

    wrapper.find('input[name=username]').setValue('john');
    wrapper.find('input[name=email]').setValue('john@example.com');
    wrapper.find('input[name=password]').setValue('secret');
    wrapper.find('input[name=passwordConfirmation]').setValue('secret');
    wrapper.find('form').trigger('submit');

    expect(mockAxios.post).toHaveBeenCalledWith('/api/rainlab/user/users', {
      email: 'john@example.com',
      password: 'secret',
      passwordConfirmation: 'secret',
      username: 'john',
    });
    
    mockAxios.mockResponseFor(
      { url: '/api/rainlab/user/users' },
      { data: userFixture },
    );

    expect(currentUser.value).toEqual(userFixture);
    expect(router.replace).toHaveBeenCalled();
  });
});
