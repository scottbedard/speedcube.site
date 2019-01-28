<style lang="scss" scoped>
    .v-grid-padded {
        > .v-grid-inner {
            margin: -0.5rem;
            width: calc(100% + 1rem);
        }

        > .v-grid-inner > .v-grid {
            padding: 0.5rem;
        }
    }

    .v-grid-inner {

    }
</style>

<script>
import { bindAll } from 'spyfu-vue-functional';

export default {
    render(h, context) {
        const bindings = bindAll(context);
        const {
            xs, sm, md, lg, xl,
        } = context.props;

        // breakpoints
        if (xs) {
            bindings.class.push(`xs:w-${xs}/12`);
        }
        if (sm) {
            bindings.class.push(`sm:w-${sm}/12`);
        }

        if (md) {
            bindings.class.push(`md:w-${md}/12`);
        }

        if (lg) {
            bindings.class.push(`lg:w-${lg}/12`);
        }

        if (xl) {
            bindings.class.push(`xl:w-${xl}/12`);
        }

        return <div class="v-grid-cell w-full" {...bindings}>
            {context.slots().default}
        </div>;
    },
    functional: true,
    props: {
        xs: {
            type: [Number, String],
        },
        sm: {
            type: [Number, String],
        },
        md: {
            type: [Number, String],
        },
        lg: {
            type: [Number, String],
        },
        xl: {
            type: [Number, String],
        },
    },
};
</script>
