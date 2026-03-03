import React, { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlinePencilSquare,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineLockOpen,
  HiOutlineLockClosed,
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
// import axios from 'axios';

interface DataTableProps {
  slug: string;
  columns: GridColDef[];
  rows: any[];
  includeActionColumn?: boolean;
  onEdit?: (rowId: string) => void;
  showDetailButton?: boolean;
  showActivateButtons?: boolean;
  showDeleteButton?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  slug,
  columns,
  rows,
  includeActionColumn = true,
  onEdit,
  showDetailButton = true,
  showActivateButtons = true,
  showDeleteButton = true
}) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [dialogAction, setDialogAction] = useState<'activate' | 'deactivate' | 'delete' | 'edit' | null>(null);

  const handleAction = (action: 'activate' | 'deactivate' | 'delete' | 'edit', rowId: number) => {
    setSelectedRowId(rowId);
    setDialogAction(action);
    if (action === 'edit' && onEdit) {
      onEdit(rowId.toString());
    } else {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogAction(null);
    setSelectedRowId(null);
  };

  const handleConfirmAction = async () => {
    if (selectedRowId !== null && dialogAction) {
      try {
        // let endpoint = ''; // KULLANILMIYOR, kaldırıldı
        let successMessage = '';

        if (dialogAction === 'activate') {
          // endpoint = `${slug}/${selectedRowId}/activate`;
          successMessage = 'Record activated successfully!';
        } else if (dialogAction === 'deactivate') {
          // endpoint = `${slug}/${selectedRowId}/deactivate`;
          successMessage = 'Record deactivated successfully!';
        } else if (dialogAction === 'delete') {
          // endpoint = `${slug}/${selectedRowId}/delete`;
          successMessage = 'Record deleted successfully!';
        }

        // const method = dialogAction === 'delete' ? 'delete' : 'put';
        // const response = await axios[method](`https://react-admin-ui-v1-api.vercel.app/${endpoint}`);
        toast.success(successMessage);
      } catch (error) {
        toast.error(`Failed to ${dialogAction} record.`);
        console.error(error);
      } finally {
        handleCloseDialog();
      }
    }
  };

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    minWidth: 200,
    flex: 1,
    renderCell: (params) => (
      <div className="flex items-center">
        {showDetailButton && (
          <button
            onClick={() => navigate(`/dashboard/${slug}/${params.row.id}`)}
            className="btn btn-square btn-ghost"
          >
            <HiOutlineEye />
          </button>
        )}
        <button
          onClick={() => handleAction('edit', params.row.id)}
          className="btn btn-square btn-ghost"
        >
          <HiOutlinePencilSquare />
        </button>
        {showActivateButtons && (
          <>
            <button
              onClick={() => handleAction('activate', params.row.id)}
              className="btn btn-square btn-ghost"
            >
              <HiOutlineLockOpen />
            </button>
            <button
              onClick={() => handleAction('deactivate', params.row.id)}
              className="btn btn-square btn-ghost"
            >
              <HiOutlineLockClosed />
            </button>
          </>
        )}
        {showDeleteButton && (
          <button
            onClick={() => handleAction('delete', params.row.id)}
            className="btn btn-square btn-ghost"
          >
            <HiOutlineTrash />
          </button>
        )}
      </div>
    ),
  };

  return (
    <div className="w-full bg-base-100 text-base-content overflow-hidden">
      <div style={{ height: 'calc(100vh - 250px)', width: '100%' }}>
        <DataGrid
          className="dataGrid p-0 xl:p-3 bg-base-100 text-white"
          rows={rows}
          columns={includeActionColumn ? [...columns, actionColumn] : [...columns]}
          getRowHeight={() => 'auto'}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
          sx={{
            '& .MuiDataGrid-main': { overflow: 'hidden' },
            '& .MuiDataGrid-virtualScroller': { overflow: 'auto' },
            '& .MuiDataGrid-footerContainer': { borderTop: 'none' },
            '& .MuiDataGrid-columnHeaders': { borderBottom: 'none' },
            '& .MuiDataGrid-cell': {
              maxHeight: 'none !important',
              overflow: 'hidden',
              whiteSpace: 'normal',
              lineHeight: '1.5',
              padding: '8px',
            },
          }}
        />
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogAction === 'activate' && 'Confirm Activation'}
          {dialogAction === 'deactivate' && 'Confirm Deactivation'}
          {dialogAction === 'delete' && 'Confirm Deletion'}
          {dialogAction === 'edit' && 'Edit Record'}
        </DialogTitle>
        <DialogContent>
          {dialogAction === 'activate' && 'Are you sure you want to activate this record?'}
          {dialogAction === 'deactivate' && 'Are you sure you want to deactivate this record?'}
          {dialogAction === 'delete' && 'Are you sure you want to delete this record?'}
          {dialogAction === 'edit' && 'Are you sure you want to edit this record?'}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmAction} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
