import { noop } from 'lodash-es';
import { mount } from '~/utils';
import { useDisposable } from  '@/app/three';

describe('useDisposable', () => {
  it('disposes an object when component is destroyed', () => {
    const obj = { dispose: jest.fn() };

    const { vm } = mount({
      setup() {
        useDisposable(obj);
      },
      render: noop,
    });

    expect(obj.dispose).not.toHaveBeenCalled();

    vm.$destroy();

    expect(obj.dispose).toHaveBeenCalled();
  });
});
