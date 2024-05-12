interface LabelValueInterface {
  label: string;
  value: string | boolean | undefined;
}

interface AdminSearchFilterInterface {
  search: string;
  dateRange: any;
  status: LabelValueInterface;
  page: number;
  paginationPerPage: number;
}

interface Admin {
  _id?: string;
  email: string;
  isActive?: boolean;
  createdAt?: string;
}

interface CategorySearchFilterInterface {
  name: string;
  order: number | undefined;
  dateRange: any;
  enabled: LabelValueInterface;
  page: number;
  paginationPerPage: number;
}

interface GroupSearchFilterInterface {
  name: string;
  order: number | undefined;
  dateRange: any;
  enabled: LabelValueInterface;
  page: number;
  paginationPerPage: number;
}

interface Category {
  _id?: string;
  name?: string;
  order?: string;
  enabled?: boolean;
}

interface Group {
  _id?: string;
  name?: string;
  order?: string;
  enabled?: boolean;
}
