import { mount } from '@vue/test-utils';
import VButton from '@/components/button.vue';

describe('<v-button>', () => {
  it('renders a button', () => {
    const wrapper = mount({
      components: { VButton },
      template: `<v-button>Click me</v-button>`,
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.element.textContent).toBe('Click me');
  });

  it('emits click event', () => {
    const onClick = jest.fn();
    
    const wrapper = mount({
      components: { VButton },
      methods: { onClick },
      template: `<v-button @click="onClick" />`,
    });

    wrapper.trigger('click');

    expect(onClick).toHaveBeenCalled();
  });
});
