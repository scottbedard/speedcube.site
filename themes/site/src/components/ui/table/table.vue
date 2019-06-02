<style lang="scss" scoped>
    .v-table {
        /deep/ thead {
            // ...
        }

        /deep/ thead th {
            @apply px-6 py-4;
        }

        /deep/ tbody td {
            @apply px-6 py-4;
        }

        /deep/ tbody tr {
            &:hover {
                @apply bg-grey-4;
            }
        }

        /deep/ tbody tr:nth-child(odd) {
            // ...
        }
    }
</style>

<script>
/* eslint-disable no-use-before-define */
import { bindAll } from 'spyfu-vue-functional';
import { isFunction, isObject } from 'lodash-es';
import { eventPassedThroughTag } from '@/app/utils/dom';

function normalizeColumn(col) {
    return {
        align: 'left',
        headerClass: '',
        sortable: false,
        verticalAlign: 'top',
        ...col,
    };
}

//
// header cell
//
function headerCell(h, context, col) {
    const { align, headerClass } = normalizeColumn(col);
    const { sortDir, sortKey } = context.props;
    const headerBindings = { on: {} };

    if (col.sortable && isFunction(context.listeners['header-click'])) {
        headerBindings.on.click = e => {
            context.listeners['header-click']({ col, event });
        }
    }

    return <th
        class={[
            'font-bold',
            align === 'left' && 'text-left',
            align === 'right' && 'text-right',
            headerClass,
            col.sortable && 'cursor-pointer',
        ]}
        title={col.sortable && 'Click to sort'}
        {...headerBindings}>
        {col.header}
        {sortKey === col.key && <i class={['fa ml-2', sortDir === 'asc' ? 'fa-angle-up' : 'fa-angle-down' ]} />}
    </th>;
}

//
// row
//
function tr(h, scopedSlots, context, row, rowIndex) {
    const { schema } = context.props;
    const key = `row_${rowIndex}`;

    const bindings = {
        attrs: {
            one: 'two',
        },
        class: [],
        on: {},
    };

    // attach row titles
    if (context.props.rowTitle) {
        bindings.attrs.title = context.props.rowTitle;
    }

    // attach row-click listener
    if (isFunction(context.listeners['row-click'])) {
        bindings.class = 'cursor-pointer';

        bindings.on.click = (event) => {
            if (
                eventPassedThroughTag(event, 'a')
                || eventPassedThroughTag(event, 'button')
            ) {
                return;
            }

            context.listeners['row-click']({ event, index: rowIndex, row });
        };
    }

    return <tr
        class='trans-bg'
        key={key}
        {...bindings}>
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
        const Cell = col.cell;

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
    if (typeof scopedSlots[col.key] !== 'undefined') {
        const slot = scopedSlots[col.key]({
            col,
            colIndex,
            row,
            rowIndex,
            value,
        });

        return <td {...bindings }>
            {slot}
        </td>;
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
        const { data, headers, schema } = context.props;

        return <div class="v-table">
            <table class="w-full" {...bindings}>
                { (headers === undefined || headers === true)
                    && <thead>
                        <tr>
                            {schema.map(col => headerCell(h, context, col))}
                        </tr>
                    </thead>
                }
                <tbody class="text-sm">
                    {data.map((row, index) => tr(h, scopedSlots, context, row, index))}
                </tbody>
            </table>
        </div>;
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
        rowTitle: {
            type: String,
        },
        schema: {
            type: Array,
        },
        sortDir: {
            type: String,
        },
        sortKey: {
            type: String,
        },
    },
};
</script>
