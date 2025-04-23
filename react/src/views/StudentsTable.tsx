import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Student } from '../types';
import AssignmentsRender from '../ui-component/table/ag-grid/AssignmentsRender';

const defaultColDef: ColDef = {
    resizable: true,
    filter: true,
    sortable: true
};

const StudentsTable = ({ cols, rows }: { cols: ColDef<Student>[]; rows: any[] }) => (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact<Student>
            rowData={rows}
            columnDefs={cols}
            defaultColDef={defaultColDef}
            paginationPageSize={10}
            rowSelection="multiple"
            frameworkComponents={{
                AssignmentsRender
            }}
        />
    </div>
);

export default StudentsTable;
