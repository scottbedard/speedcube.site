import { mount } from '@vue/test-utils';
import VInput from '@/components/input.vue';

describe('<v-input>', () => {
  it('renders an input that interfaces with v-model', () => {
    const wrapper = mount({
      data() {
        return {
          value: 'john@example.com',
        };
      },
      components: { VInput },
      template: `<v-input v-model="value" />`,
    });

    const input = wrapper.find<HTMLInputElement>('input');

    expect(input.element.value).toBe('john@example.com');
    
    input.setValue('foo@bar.com');

    expect(wrapper.vm.value).toBe('foo@bar.com');
  });
});
