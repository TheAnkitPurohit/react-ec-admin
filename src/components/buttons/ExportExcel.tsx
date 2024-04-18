import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import * as FileServe from 'file-saver';
import { IoMdDownload } from 'react-icons/io';

import { Button } from '@mui/material';

import { cyan } from 'src/theme/options/presets';

interface ExportBtnProps {
  fileName?: string;
  getExcelData?: any;
}

const ExportExcel = ({ fileName, getExcelData }: ExportBtnProps) => {
  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), 1);
  const formatedDate = dayjs(date).format('YYYY/MM/DD');
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8';
  const fileExtension = '.xlsx';

  const exportToExcel = async () => {
    const excelData = (await getExcelData) && getExcelData();

    if (excelData?.length === 0) {
      return console.log('success pdf');
    }
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    return FileServe.saveAs(data, `${fileName}-${formatedDate}${fileExtension}`);
  };

  return (
    <Button
      variant="outlined"
      startIcon={<IoMdDownload />}
      sx={{
        textTransform: 'capitalize',
        background: cyan.lightBg,
        color: 'white',
        transition: '0.4s all',
        px: 2,
        ':hover': {
          background: cyan.lightBg,
          color: 'white',
          opacity: 0.8,
          borderColor: '#4299E1',
        },
      }}
      onClick={exportToExcel}
    >
      Download
    </Button>
  );
};

export default ExportExcel;
