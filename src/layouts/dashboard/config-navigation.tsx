import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import SvgColor from 'src/components/svg-color';

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  dashboard: icon('ic_dashboard'),
  sales: icon('ic_invoice'),
  users: icon('ic_user'),
  products: icon('ic_ecommerce'),
  category: icon('ic_menu_item'),
  group: icon('ic_analytics'),
  manager: icon('ic_banking'),
  review: icon('ic_label'),
  inquiry: icon('ic_mail'),
};

export function useNavData(isMainAdmin: boolean = false) {
  const managementItems = [
    { title: 'User', path: paths.dashboard.users, icon: ICONS.users },
    { title: 'Product', path: paths.dashboard.products, icon: ICONS.products },
    { title: 'Category', path: paths.dashboard.category, icon: ICONS.category },
    { title: 'Group', path: paths.dashboard.group, icon: ICONS.group },
  ];

  if (isMainAdmin) {
    managementItems.push({ title: 'Manager', path: paths.dashboard.manager, icon: ICONS.manager });
  }

  const data = useMemo(
    () => [
      {
        subheader: 'Overview',
        items: [
          { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
          { title: 'Sales', path: paths.dashboard.sales, icon: ICONS.sales },
        ],
      },
      {
        subheader: 'Management',
        items: managementItems,
      },
      {
        subheader: 'Feedback & Support',
        items: [
          { title: 'Review', path: paths.dashboard.review, icon: ICONS.review },
          { title: 'Inquiry', path: paths.dashboard.inquiry, icon: ICONS.inquiry },
        ],
      },
    ],
    []
  );

  return data;
}
