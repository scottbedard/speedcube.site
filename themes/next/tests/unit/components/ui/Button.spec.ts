import Button from '@/components/ui/Button.vue';
import { mount, click } from '~/utils';

describe('<Button>', () => {
  it('renders a <button>', () => {
    const { vm } = mount({
      components: { Button },
      template: `<Button />`,
    });

    expect(vm.$el.tagName).toBe('BUTTON');
  });

  it('renders a <RouterLink>', () => {
    const { vm } = mount({
      components: { Button },
      template: `<Button to="/foo" />`,
    });

    expect(vm.$el.tagName).toBe('A');
    expect(vm.$el.getAttribute('href')).toBe('/foo');
  });

  it('renders slot content', () => {
    const { vm } = mount({
      components: { Button },
      template: `<Button>Hello world</Button>`,
    });

    expect(vm.$el.innerHTML).toBe('Hello world');
  });

  it('emits a click event', () => {
    const onClick = jest.fn();

    const { vm } = mount({
      components: { Button },
      methods: { onClick },
      template: `<Button @click="onClick" />`,
    });

    click(vm.$el);

    expect(onClick).toHaveBeenCalled();
  });
});