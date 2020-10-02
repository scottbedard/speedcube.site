import { mount } from '@vue/test-utils'
import VButton from '@/components/button.vue';

describe('<v-button>', () => {
  it('renders default slot', () => {
    const wrapper = mount({
      components: { VButton },
      template: `<v-button>Click me</v-button>`,
    });

    expect(wrapper.element.textContent).toBe('Click me');
  });

  it('renders a button by default', () => {
    const wrapper = mount({
      components: { VButton },
      template: `<v-button />`,
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
  });

  it('renders anchor tags when href is present', () => {
    const wrapper = mount({
      components: { VButton },
      template: `<v-button href="#" />`,
    });

    expect(wrapper.element.tagName).toBe('A');
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
