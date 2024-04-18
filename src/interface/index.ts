interface LabelValueInterface {
  label: string;
  value: string | boolean | undefined;
}

interface AdminSearchFilterInterface {
  search: string;
  dateRange: any;
  status: LabelValueInterface;
}

interface Admin {
  _id?: string;
  email: string;
  isActive?: boolean;
  createdAt?: string;
}

interface CategorySearchFilterInterface {
  _id: string;
  name: string;
  order: number | undefined;
  dateRange: any;
  enabled: LabelValueInterface;
}

interface Category {
  _id?: string;
  name?: string;
  order?: string;
  enabled?: boolean;
}
