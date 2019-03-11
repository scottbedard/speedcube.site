<style lang="scss" scoped>
    .v-table {
        /deep/ thead th {
            padding: 0.5rem 0;
        }

        /deep/ tbody td {
            padding: 0.5rem 0;
        }
    }
</style>

<script>
/* eslint-disable no-use-before-define */
import { bindAll } from 'spyfu-vue-functional';
import { isFunction, isObject } from 'lodash-es';
import defaultCellComponent from './default_cell.vue';

function normalizeColumn(col) {
    return {
        align: 'left',
        verticalAlign: 'top',
        ...col,
    };
}

//
// header cell
//
function headerCell(h, col) {
    const { align } = normalizeColumn(col);

    return <th class={[
        align === 'left' && 'text-left',
        align === 'right' && 'text-right',
    ]}>
        {col.header}
    </th>;
}

//
// row
//
function tr(h, scopedSlots, context, row, rowIndex) {
    const { schema } = context.props;
    const key = `row_${rowIndex}`;

    const bindings = {
        class: [],
        on: {},
    };

    // attach row-click listener
    if (isFunction(context.listeners['row-click'])) {
        bindings.class = 'cursor-pointer';

        bindings.on.click = (event) => {
            context.listeners['row-click']({ event, index: rowIndex, row });
        };
    }

    return <tr key={key} {...bindings}>
        {schema.map((col, colIndex) => rowCell(h, scopedSlots, row, rowIndex, col, colIndex))}
    </tr>;
}

//
// row cell
//
function rowCell(h, scopedSlots, row, rowIndex, col, colIndex) {
    const { align, verticalAlign } = normalizeColumn(col);
    const bindings = { class: [] };
    const value = row[col.key];

    // horizontal alignment
    if (align === 'right') {
        bindings.class.push('text-right');
    } else {
        bindings.class.push('text-left');
    }

    // vertical alignment
    if (verticalAlign === 'top') {
        bindings.class.push('align-top');
    }

    // custom cell types
    if (isObject(col.cell)) {
        const Cell = col.cell || defaultCellComponent;

        return <td {...bindings}>
            <Cell
                column={col}
                column-index={colIndex}
                row={row}
                row-index={rowIndex}
                value={value}
            />
        </td>;
    }

    // slot cells
    else if (typeof scopedSlots[col.key] !== 'undefined') {
        const slot = scopedSlots[col.key]({
            col,
            colIndex,
            row,
            rowIndex,
            value,
        });

        return <td {...bindings }>
            {slot}
        </td>
    }

    // string cells
    return <td {...bindings}>
        {row[col.key]}
    </td>;
}

//
// table
//
export default {
    render(h, context) {
        const bindings = bindAll(context);
        const { scopedSlots } = context;
        const { data, headers, loading, schema } = context.props;

        return <table class="v-table w-full" {...bindings}>
            { (headers === undefined || headers === true)
                && <thead>
                    <tr>
                        {schema.map(col => headerCell(h, col))}
                    </tr>
                </thead>
            }
            <tbody>
                {data.map((row, index) => tr(h, scopedSlots, context, row, index))}
            </tbody>
        </table>;
    },
    functional: true,
    props: {
        data: {
            default: () => [],
            type: Array,
        },
        headers: {
            type: Boolean,
        },
        schema: {
            type: Array,
        },
    },
};
</script>
