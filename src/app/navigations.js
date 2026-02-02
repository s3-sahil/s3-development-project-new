const navigations = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  {
    name: "SYS Admin",
    path: "/material/autocomplete",
    icon: "settings_applications",
    children: [
      {
        name: "Master",
        icon: "person",
        children: [
          {
            name: "Activity Reports Rights",
            path: "/material/activity-reports-rights-table",
            icon: "person_add",
            tooltip: "activity-reports-rights-table",
          },
          {
            name: "Activity Form Rights",
            path: "/material/customers",
            icon: "list",
            tooltip: "Customer Master",
          },
          {
            name: "Login Parameters",
            path: "/material/customers",
            icon: "list",
            tooltip: "Customer Master",
          },
          {
            name: "New Role",
            path: "/material/customers",
            icon: "list",
            tooltip: "Customer Master",
          },
          {
            name: "Login Details",
            path: "/material/customers",
            icon: "list",
            tooltip: "Customer Master",
          },
        ],
      },
      {
        name: "Report",
        path: "/sysadmin/roles",
        icon: "bug_report",
        children: [
          { name: "Document Wise Input Authentication", path: "/sysadmin/roles/create", icon: "add_circle" },
          { name: "Document Approved", path: "/sysadmin/roles/assign", icon: "lock_open" },
          { name: "Log Book", path: "/sysadmin/roles/assign", icon: "lock_open" },
          { name: "Open Financial Year", path: "/sysadmin/roles/assign", icon: "lock_open" },
          { name: "Security Closing", path: "/sysadmin/roles/assign", icon: "lock_open" }

        ]
      },
      {
        name: "Transaction",
        path: "/sysadmin/transaction",
        icon: "directions_transit",
        children: [
          { name: "Customer's Purchase Order Login", path: "/material/customers-purchase-order-login", icon: "add_circle" },
        ]
      }
    ]
  },
  { name: "TMS", path: "/material/buttons", icon: "watch_later" },
  { name: "Payroll", path: "/material/checkbox", icon: "payment" },
  { name: "SGMS", path: "/material/dialog", icon: "local_grocery_store" },
  { name: "Material", path: "/material/expansion-panel", icon: "slideshow" },

  {
    name: "Sales",
    path: "/material/autocomplete",
    icon: "graphic_eq",
    children: [
      {
        name: "Master",
        icon: "person",
        children: [
          {
            name: "Salesman",
            path: "/material/salesman",
            icon: "person_add",
            tooltip: "Salesman Master",
          },
          {
            name: "Customer Details",
            path: "/material/customers",
            icon: "list",
            tooltip: "Customer Master",
          },
        ],
      },
      {
        name: "Report",
        path: "/sysadmin/roles",
        icon: "bug_report",
        children: [
          { name: "Create Role", path: "/sysadmin/roles/create", icon: "add_circle" },
          { name: "Assign Permissions", path: "/sysadmin/roles/assign", icon: "lock_open" }
        ]
      },
      {
        name: "Transaction",
        path: "/sysadmin/roles",
        icon: "directions_transit",
        children: [
          { name: "Customer's Purchase Order Login", path: "/material/customers-purchase-order-login", icon: "arrow_forward" },
          { name: "PACKING SLIP", path: "/material/packing-slip-table", icon: "arrow_forward" },
          { name: "Invoice", path: "/material/sales-invoice-table", icon: "arrow_forward" },
          { name: "Proforma Invoice", path: "/material/sales-proforma-invoice-table", icon: "arrow_forward" },
          { name: "Export Documents", path: "/material/sales-export-documents-table", icon: "arrow_forward" },
          { name: "Customer Schedule Detail", path: "/material/sales-customer-schedule-detail-table", icon: "arrow_forward" },
          { name: "Link Invoice To Export Schemes", path: "/material/sales-link-invoice-to-export-schemes-table", icon: "arrow_forward" },
          { name: "Enquiry Detail", path: "/material/sales-enquiry-table", icon: "arrow_forward" },
          { name: "Enquiry Login Entry", path: "/material/sales-enquiry-login-entry-table", icon: "arrow_forward" },
        ]
      }
    ]
  },
  { name: "GST", path: "/material/icons", icon: "local_taxi" },
  { name: "Finance", path: "/material/menu", icon: "attach_money" },
  { name: "Production", path: "/material/progress", icon: "report" },
  { name: "Planning", path: "/material/radio", icon: "report_problem" },
  { name: "TQM", path: "/material/switch", icon: "local_gas_station" },
  { name: "Maintenance", path: "/material/slider", icon: "domain" },
  { name: "Calibration", path: "/material/snackbar", icon: "S" },
  { name: "Laboratory", path: "/material/table", icon: "hourglass_empty" }
  // { label: "PAGES", type: "label" },
  // {
  //   name: "Session/Auth",
  //   icon: "security",
  //   children: [
  //     { name: "Sign in", iconText: "SI", path: "/session/signin" },
  //     { name: "Sign up", iconText: "SU", path: "/session/signup" },
  //     { name: "Forgot Password", iconText: "FP", path: "/session/forgot-password" },
  //     { name: "Error", iconText: "404", path: "/session/404" }
  //   ]
  // },
  // { label: "Components", type: "label" },
  // {
  //   name: "Components",
  //   icon: "favorite",
  //   badge: { value: "30+", color: "secondary" },
  //   children: [
  //     { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
  //     { name: "Buttons", path: "/material/buttons", iconText: "B" },
  //     { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
  //     { name: "Dialog", path: "/material/dialog", iconText: "D" },
  //     { name: "Expansion Panel", path: "/material/expansion-panel", iconText: "E" },
  //     { name: "Form", path: "/material/form", iconText: "F" },
  //     { name: "Icons", path: "/material/icons", iconText: "I" },
  //     { name: "Menu", path: "/material/menu", iconText: "M" },
  //     { name: "Progress", path: "/material/progress", iconText: "P" },
  //     { name: "Radio", path: "/material/radio", iconText: "R" },
  //     { name: "Switch", path: "/material/switch", iconText: "S" },
  //     { name: "Slider", path: "/material/slider", iconText: "S" },
  //     { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
  //     { name: "Table", path: "/material/table", iconText: "T" }
  //   ]
  // },
  // {
  //   name: "Charts",
  //   icon: "trending_up",
  //   children: [{ name: "Echarts", path: "/charts/echarts", iconText: "E" }]
  // },
  // {
  //   name: "Documentation",
  //   icon: "launch",
  //   type: "extLink",
  //   path: "http://demos.ui-lib.com/matx-react-doc/"
  // }
];

export default navigations;
