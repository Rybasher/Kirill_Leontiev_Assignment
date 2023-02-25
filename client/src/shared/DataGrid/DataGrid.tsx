import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {FC} from "react";

const DataGridStat: FC<{ rows:any[],columns:GridColDef[] }> = ({rows,columns})=>{
    return (
        <Box sx={{ height: 400, width: '100%' }}>
    <DataGrid
        rows={rows}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
    checkboxSelection
    disableSelectionOnClick
    experimentalFeatures={{ newEditingApi: true }}
    />
    </Box>
);
}
export default DataGridStat;