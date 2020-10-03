import { currentUser, resetUserState } from '@/app/store/user/state';
import { mount } from '@vue/test-utils';
import createUserFixture from '~/fixtures/create-user';
import mockAxios from 'jest-mock-axios';
import Signup from '@/pages/signup.vue';

describe('signup', () => {
  afterEach(() => {
    resetUserState();
    mockAxios.reset();
  });

  it('creates a user', () => {
    const wrapper = mount(Signup);

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
      { data: createUserFixture },
    );

    expect(currentUser.value).toEqual(createUserFixture);
  });
});
