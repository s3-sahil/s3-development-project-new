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
  {
    name: "Payroll",
    icon: "payment",
    children: [
      {
        name: "Master",
        icon: "person",
        children: [
          { name: "Employee Information", path: "/material/payroll-employee-information-table", icon: "arrow_forward" },
          { name: "Salary / Wages Details", path: "/material/payroll-salary-wages-table", icon: "arrow_forward" },
          { name: "Profession Tax Slab", path: "/material/payroll-profession-tax-table", icon: "arrow_forward" },
          { name: "Labour Welfare Slab", path: "/material/payroll-labour-welfare-slab-table", icon: "arrow_forward" },
          { name: "Designation Details", path: "/material/payroll-designation-table", icon: "arrow_forward" },
          { name: "Experience Details", path: "/material/payroll-designation-table", icon: "arrow_forward" },

          { name: "Grade Details", path: "/material/payroll-grade-table", icon: "arrow_forward" },
          { name: "Location Details", path: "/material/payroll-location-table", icon: "arrow_forward" },
          { name: "Education Details Entry", path: "/payroll/education-details", icon: "arrow_forward" },
          { name: "Family Detail Entry", path: "/payroll/family-details", icon: "arrow_forward" },
          { name: "Training On Job", path: "/payroll/family-details", icon: "arrow_forward" },
          { name: "Training Party Details", path: "/payroll/family-details", icon: "arrow_forward" },
          { name: "Outsiders Loan Details", path: "/payroll/family-details", icon: "arrow_forward" },
          { name: "Employee Loan Details", path: "/payroll/family-details", icon: "arrow_forward" },
          { name: "LIC Details", path: "/payroll/family-details", icon: "arrow_forward" },
          { name: "Leave Details", path: "/payroll/family-details", icon: "arrow_forward" },
          { name: "Yearly Holiday Details", path: "/payroll/family-details", icon: "arrow_forward" },
          { name: "Advance Leave Details", path: "/material/payroll-advance-leave-details-table", icon: "arrow_forward" },
          { name: "Company Parameters", path: "/material/payroll-company-parameters-table", icon: "arrow_forward" },
          { name: "Applicable Income Heads", path: "/material/payroll-application-income-head-table", icon: "arrow_forward" },
          { name: "Grade Wise Payment Details", path: "/payroll/family-details", icon: "arrow_forward" },
          { name: "Attendance Bonus", path: "/payroll/family-details", icon: "arrow_forward" },
          { name: "Deduction Recovery Method", path: "/material/payroll-deduction-recovery-table", icon: "arrow_forward" },
          { name: "Department Details", path: "/material/payroll-department-table", icon: "arrow_forward" },
          { name: "Payroll Calculation", path: "/payroll/family-details", icon: "arrow_forward" },
        ]
      },
      {
        name: "Transaction",
        icon: "directions_transit",
        children: [
          { name: "Arrears Days Generation", path: "/material/payroll-areas-days-generation-table", icon: "arrow_forward" },
          { name: "Full & Final", path: "/material/payroll-full-final-table", icon: "arrow_forward" },
          { name: "Income Tax Processing", path: "/payroll/payslip-generation", icon: "arrow_forward" },
          { name: "Days Details", path: "/material/payroll-days-details-entry-table", icon: "arrow_forward" },
          { name: "Deduction Details", path: "/material/payroll-deduction-detail-entry-table", icon: "arrow_forward" },
          { name: "Payroll Collection", path: "/material/payroll-payroll-calculation-table", icon: "arrow_forward" },

        ]
      },
      {
        name: "Reports",
        icon: "bug_report",
        children: [
          { name: "Salary Register", path: "/payroll/reports/salary-register", icon: "arrow_forward" },
          { name: "Payslip Report", path: "/payroll/reports/payslip", icon: "arrow_forward" },
          { name: "PF / ESI Report", path: "/payroll/reports/pf-esi", icon: "arrow_forward" },
        ]
      }
    ]
  },
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
          { name: "Consignee Details", path: "/material/sales-consignee-table", icon: "arrow_forward" },
          { name: "Notify Party Details", path: "/material/customers", icon: "arrow_forward" },
          { name: "Contract Review", path: "/material/sales-Contract-review-table", icon: "arrow_forward" },
          { name: "Salesman", path: "/material/salesman", icon: "arrow_forward" },
          { name: "Customer Details", path: "/material/customers", icon: "arrow_forward" },
          // SALES / MATERIAL MASTER TABLES

          {
            name: "Customer Item Details",
            path: "/material/sales-customer-item-details-form-table",
            icon: "arrow_forward",
          },
          {
            name: "Contract Review Checklist",
            path: "/material/sales-contract-review-checklist-form-table",
            icon: "arrow_forward",
          },
          {
            name: "Project Execution Plan",
            path: "/material/sales-project-execution-plan-table",
            icon: "arrow_forward",
          },
          {
            name: "Project Activity Master",
            path: "/material/sales-project-activity-master-table",
            icon: "arrow_forward",
          },
          {
            name: "Customer Wise Product Price List",
            path: "/material/sales-customer-wise-product-price-table",
            icon: "arrow_forward",
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
          { name: "Costing", path: "/material/sales-costing-table", icon: "arrow_forward" },
          { name: "Upload E-Invoice", path: "/material/sales-upload-e-invoice-table", icon: "arrow_forward" },
          { name: "PRE Shipment Packingslip", path: "/material/sales-pre-shipment-packingslip-table", icon: "arrow_forward" },
          { name: "Customer RCIA Entry", path: "/material/sales-customer-RCIA-entry-table", icon: "arrow_forward" },
          { name: "Daily Activity Plan", path: "/material/sales-daily-activity-plan-table", icon: "arrow_forward" },
          { name: "Business Plan", path: "/material/sales-business-plan-table", icon: "arrow_forward" },

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
