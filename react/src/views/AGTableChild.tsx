import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';

import { AGTableModelType } from '../types/ag_table';
import AssignmentsRender from '../ui-component/table/ag-grid/AssignmentsRender';
import ActionRender from '../ui-component/table/ag-grid/ActionRender';

const defaultColDef: ColDef = {
    resizable: true,
    filter: true,
    sortable: true
};

const AGTableChild = ({ cols, rows }: { cols: ColDef<AGTableModelType>[]; rows: any[] }) => (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact<AGTableModelType>
            rowData={rows}
            columnDefs={cols}
            defaultColDef={defaultColDef}
            paginationPageSize={10}
            rowSelection="multiple"
            frameworkComponents={{
                AssignmentsRender,
                ActionRender
            }}
        />
    </div>
);

export default AGTableChild;
