import { currentUser, resetUserState } from '@/app/store/user/state';
import { mount } from '@vue/test-utils';
import Login from '@/pages/login.vue';
import mockAxios from 'jest-mock-axios';
import userFixture from '~/fixtures/user';

describe('login', () => {
  afterEach(() => {
    resetUserState();
    mockAxios.reset();
  });

  it('authenticates a user', () => {
    const wrapper = mount(Login);

    wrapper.find('input[name=username]').setValue('john');
    wrapper.find('input[name=password]').setValue('secret');
    wrapper.find('form').trigger('submit');

    expect(mockAxios.post).toHaveBeenCalledWith('/api/rainlab/user/auth/login', {
      password: 'secret',
      username: 'john',
    });

    mockAxios.mockResponseFor(
      { url: '/api/rainlab/user/auth/login' },
      { data: userFixture },
    );

    expect(currentUser.value).toEqual(userFixture);
  });
});
