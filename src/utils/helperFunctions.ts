import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import * as FileServe from 'file-saver';

export const formatDateIntoViewMode = (dateTime: any) => {
  const formattedTime = dayjs(dateTime).format('YYYY-MM-DD HH:mm');
  return formattedTime;
};

export const formatDateFns = (data: any) => {
  const formatedDate = format(data, 'yyyy-MM-dd');
  return formatedDate;
};

// export const DateFormatUTC = (data: any) => {
//   const formatedDate = dayjs.utc(data).format('YYYY-MM-DD');
//   return formatedDate;
// };

// export const TimeFormatUTC = (data: any) => {
//   const formatedDate = dayjs.utc(data).format('HH:mm');
//   return formatedDate;
// };

// export const DateTimeFormatUTC = (data: any) => {
//   const formatedDate = dayjs.utc(data).format('YYYY-MM-DD HH:mm');
//   return formatedDate;
// };

export const downloadSheet = ({ response }: any) => {
  const formatedDate = dayjs(new Date()).format('YYYY/MM/DD HH:mm:ss');

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8';
  const fileExtension = '.xlsx';

  if (response) {
    const Data: any = response;
    const parsedData = JSON.parse(Data);

    const ws = XLSX.utils.json_to_sheet(parsedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data1 = new Blob([excelBuffer], { type: fileType });
    FileServe.saveAs(`${data1} Alert List ${formatedDate} ${fileExtension}`);
  }
};
