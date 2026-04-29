const navigations = [
  // { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  {
    name: "SYS Admin",
    path: "/material/autocomplete",
    icon: "settings_applications",
    children: [
      {
        name: "Master",
        icon: "person",
        meta: {
          hidePeriod: true,
        },
        children: [
          {
            name: "Activity Reports Rights",
            path: "/material/system-admin-activity-report-table",
            icon: "person_add",
            tooltip: "activity-reports-rights-table",
          },
          {
            name: "Activity Form Rights",
            path: "/material/activity-reports-rights-table",
            icon: "list",
            tooltip: "Customer Master",
          },
          {
            name: "Login Parameters",
            path: "/material/system-admin-login-parameter-table",
            icon: "list",
            tooltip: "Customer Master",
          },
          {
            name: "New Role",
            path: "/material/system-admin-new-role-table",
            icon: "list",
            tooltip: "Customer Master",
          },
          {
            name: "Login Details",
            path: "/material/system-admin-login-details-table",
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
          {
            name: "Document Wise Input Authentication",
            path: "/sysadmin/roles/create",
            icon: "add_circle",
          },
          {
            name: "Document Approved",
            path: "/sysadmin/roles/assign",
            icon: "lock_open",
          },
          {
            name: "Log Book",
            path: "/sysadmin/roles/assign",
            icon: "lock_open",
          },
          {
            name: "Open Financial Year",
            path: "/sysadmin/roles/assign",
            icon: "lock_open",
          },
          {
            name: "Security Closing",
            path: "/sysadmin/roles/assign",
            icon: "lock_open",
          },
        ],
      },
      {
        name: "Transaction",
        path: "/sysadmin/transaction",
        icon: "directions_transit",
        children: [
          {
            name: "Customer's Purchase Order Login",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
        ],
      },
    ],
  },
  {
    name: "TMS",
    icon: "watch_later",
    children: [
      {
        name: "Master",
        icon: "person",
        meta: {
          hidePeriod: true,
        },
        children: [
          {
            name: "TMS Parameter",
            path: "/material/TMS-parameter-table",
            icon: "arrow_forward",
          },
          {
            name: "Card Details",
            path: "/material/TMS-card-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Attendance Status Details",
            path: "/material/TMS-attendance-status-table",
            icon: "arrow_forward",
          },
          {
            name: "Rotation Details",
            path: "/material/TMS-rotation-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Route Details",
            path: "/material/TMS-route-table",
            icon: "arrow_forward",
          },
          {
            name: "Shift Details",
            path: "/material/TMS-Shift-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Assign Cards",
            path: "/material/TMS-assign-cards-table",
            icon: "arrow_forward",
          },
          {
            name: "Grade Wise Rule",
            path: "/material/TMS-grade-wise-rules-table",
            icon: "arrow_forward",
          },
          {
            name: "Coff Rules",
            path: "/material/material-alternate-item-table",
            icon: "arrow_forward",
          },
          {
            name: "Overtime Rules",
            path: "/material/TMS-overtime-rules-table",
            icon: "arrow_forward",
          },
        ],
      },
      {
        name: "Transaction",
        icon: "directions_transit",
        meta: {
          hidePeriod: false,
        },
        children: [
          {
            name: "Manual Punching",
            path: "/material/TMS-manual-punching",
            icon: "arrow_forward",
          },
          {
            name: "In Out Flag Correction",
            path: "/material/TMS-In-Out-flag-table",
            icon: "arrow_forward",
          },
          {
            name: "Invalid Punching Correction",
            path: "/material/TMS-invalid-punch-table",
            icon: "arrow_forward",
          },
          {
            name: "Leave Application",
            path: "/material/TMS-leave-application-table",
            icon: "arrow_forward",
          },
          {
            name: "Od Details",
            path: "/material/TMS-OD-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Tour Details",
            path: "/material/TMS-tour-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Approval",
            path: "/material/material-purchase-requisition-table",
            icon: "arrow_forward",
          },
          {
            name: "Compentary Off",
            path: "/material/TMS-comp-Off-table",
            icon: "arrow_forward",
          },
          {
            name: "Overtime Details",
            path: "/material/TMS-overtime-table",
            icon: "arrow_forward",
          },
          {
            name: "Late Coming & Early Going Authorization",
            path: "/material/material-rate-contract-table",
            icon: "arrow_forward",
          },
          {
            name: "Generate Muster",
            path: "/material/TMS-generate-muster",
            icon: "arrow_forward",
          },
          {
            name: "Import Manual Muster",
            path: "/material/material-goods-receipt-inspection-table",
            icon: "arrow_forward",
          },
          {
            name: "Import Daily Attendance File",
            path: "/material/TMS-import-attendance-table",
            icon: "arrow_forward",
          },
          {
            name: "Shift Schedule",
            path: "/material/TMS-shift-schedule-table",
            icon: "arrow_forward",
          },
        ],
      },
      {
        name: "Reports",
        icon: "bug_report",
        children: [],
      },
    ],
  },
  {
    name: "Payroll",
    icon: "payment",
    children: [
      {
        name: "Master",
        icon: "person",
        children: [
          {
            name: "Employee Information",
            path: "/material/payroll-employee-information-table",
            icon: "arrow_forward",
          },
          {
            name: "Salary / Wages Details",
            path: "/material/payroll-salary-wages-table",
            icon: "arrow_forward",
          },
          {
            name: "Profession Tax Slab",
            path: "/material/payroll-profession-tax-table",
            icon: "arrow_forward",
          },
          {
            name: "Labour Welfare Slab",
            path: "/material/payroll-labour-welfare-slab-table",
            icon: "arrow_forward",
          },
          {
            name: "Designation Details",
            path: "/material/payroll-designation-table",
            icon: "arrow_forward",
          },
          {
            name: "Experience Details",
            path: "/material/payroll-designation-table",
            icon: "arrow_forward",
          },

          {
            name: "Grade Details",
            path: "/material/payroll-grade-table",
            icon: "arrow_forward",
          },
          {
            name: "Location Details",
            path: "/material/payroll-location-table",
            icon: "arrow_forward",
          },
          {
            name: "Education Details Entry",
            path: "/material/payroll-education-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Family Detail Entry",
            path: "/material/payroll-family-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Training On Job",
            path: "/material/payroll-training-on-job-table",
            icon: "arrow_forward",
          },
          {
            name: "Training Party Details",
            path: "/payroll/family-details",
            icon: "arrow_forward",
          },
          {
            name: "Outsiders Loan Details",
            path: "/payroll/family-details",
            icon: "arrow_forward",
          },
          {
            name: "Employee Loan Details",
            path: "/payroll/family-details",
            icon: "arrow_forward",
          },
          {
            name: "LIC Details",
            path: "/payroll/family-details",
            icon: "arrow_forward",
          },
          {
            name: "Leave Details",
            path: "/material/payroll-leave-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Yearly Holiday Details",
            path: "/material/payroll-yearly-holiday-table",
            icon: "arrow_forward",
          },
          {
            name: "Advance Leave Details",
            path: "/material/payroll-advance-leave-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Company Parameters",
            path: "/material/payroll-company-parameters-table",
            icon: "arrow_forward",
          },
          {
            name: "Applicable Income Heads",
            path: "/material/payroll-application-income-head-table",
            icon: "arrow_forward",
          },
          {
            name: "Grade Wise Payment Details",
            path: "/material/payroll-grade-wise-payment-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Attendance Bonus",
            path: "/payroll/family-details",
            icon: "arrow_forward",
          },
          {
            name: "Deduction Recovery Method",
            path: "/material/payroll-deduction-recovery-table",
            icon: "arrow_forward",
          },
          {
            name: "Department Details",
            path: "/material/payroll-department-table",
            icon: "arrow_forward",
          },
          {
            name: "Payroll Calculation",
            path: "/material/payroll-payroll-calculations-table",
            icon: "arrow_forward",
          },
        ],
      },
      {
        name: "Transaction",
        icon: "directions_transit",
        children: [
          {
            name: "Arrears Days Generation",
            path: "/material/payroll-areas-days-generation-table",
            icon: "arrow_forward",
          },
          {
            name: "Full & Final",
            path: "/material/payroll-full-final-table",
            icon: "arrow_forward",
          },
          {
            name: "Income Tax Processing",
            path: "/payroll/payslip-generation",
            icon: "arrow_forward",
          },
          {
            name: "Days Details",
            path: "/material/payroll-days-details-entry-table",
            icon: "arrow_forward",
          },
          {
            name: "Deduction Details",
            path: "/material/payroll-deduction-detail-entry-table",
            icon: "arrow_forward",
          },
          {
            name: "Payroll Collection",
            path: "/material/payroll-payroll-calculation-table",
            icon: "arrow_forward",
          },
        ],
      },
      {
        name: "Reports",
        icon: "bug_report",
        children: [
          {
            name: "Salary Register",
            path: "/payroll/reports/salary-register",
            icon: "arrow_forward",
          },
          {
            name: "Payslip Report",
            path: "/payroll/reports/payslip",
            icon: "arrow_forward",
          },
          {
            name: "PF / ESI Report",
            path: "/payroll/reports/pf-esi",
            icon: "arrow_forward",
          },
        ],
      },
    ],
  },
  {
    name: "SGMS",
    path: "/material/dialog",
    icon: "local_grocery_store",
    children: [
      {
        name: "Master",
        icon: "person",
        children: [
          {
            name: "Vehicle Type Details",
            path: "/material/activity-reports-rights-table",
            icon: "person_add",
            tooltip: "activity-reports-rights-table",
          },
          {
            name: "Vehicle In-Out Types",
            path: "/material/customers",
            icon: "list",
            tooltip: "Customer Master",
          },
          {
            name: "Visting Authority",
            path: "/material/customers",
            icon: "list",
            tooltip: "Customer Master",
          },
          {
            name: "Vehicle Route Details",
            path: "/material/customers",
            icon: "list",
            tooltip: "Customer Master",
          },
          {
            name: "Emergency Contact Details",
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
          {
            name: "Document Wise Input Authentication",
            path: "/sysadmin/roles/create",
            icon: "add_circle",
          },
          {
            name: "Document Approved",
            path: "/sysadmin/roles/assign",
            icon: "lock_open",
          },
          {
            name: "Log Book",
            path: "/sysadmin/roles/assign",
            icon: "lock_open",
          },
          {
            name: "Open Financial Year",
            path: "/sysadmin/roles/assign",
            icon: "lock_open",
          },
          {
            name: "Security Closing",
            path: "/sysadmin/roles/assign",
            icon: "lock_open",
          },
        ],
      },
      {
        name: "Transaction",
        path: "/sysadmin/transaction",
        icon: "directions_transit",
        children: [
          {
            name: "Appointment Entry",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
          {
            name: "Visitor In - (Appointment)",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
          {
            name: "Visitor In - (Non Appointment)",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
          {
            name: "Visitor Out",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
          {
            name: "Material Inward Entry",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
          {
            name: "Material Outward Entry",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
          {
            name: "Vehicle Out Entry",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
          {
            name: "Vehicle In Entry",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
          {
            name: "Transporters Vehicle In",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
          {
            name: "Contractor Employee Details",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
          {
            name: "Exit Pass Request",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
          {
            name: "Exit Pass Approval",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
          {
            name: "Contractor Employee In",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
          {
            name: "Exit Pass In",
            path: "/material/customers-purchase-order-login",
            icon: "add_circle",
          },
        ],
      },
    ],
  },
  {
    name: "Material",
    icon: "slideshow",
    icon: "payment",
    children: [
      {
        name: "Master",
        icon: "person",
        children: [
          {
            name: "Unit Of Measurement",
            path: "/material/Unit-Of-Management-Table",
            icon: "arrow_forward",
          },
          {
            name: "Item Category Detail",
            path: "/material/material-item-category-table",
            icon: "arrow_forward",
          },
          {
            name: "Item Code Sub-Category Detail",
            path: "/material/payroll-employee-information-table",
            icon: "arrow_forward",
          },
          {
            name: "Itemwise Moq",
            path: "/material/material-item-wise-moq-table",
            icon: "arrow_forward",
          },
          {
            name: "Item Rate Details",
            path: "/material/material-item-rate-table",
            icon: "arrow_forward",
          },
          {
            name: "Shares Of Business",
            path: "/material/material-share-of-business-table",
            icon: "arrow_forward",
          },
          {
            name: "GRN Wise Opening Stock",
            path: "/material/material-GRN-wise-opening-stock-table",
            icon: "arrow_forward",
          },
          {
            name: "HSN/SAC Master",
            path: "/material/material-HSN-table",
            icon: "arrow_forward",
          },
          {
            name: "Alternate Item Details",
            path: "/material/material-alternate-item-table",
            icon: "arrow_forward",
          },
          {
            name: "State Detail",
            path: "/material/material-state-detail-table",
            icon: "arrow_forward",
          },
          {
            name: "Country Detail",
            path: "/material/material-country-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Supplier Detail",
            path: "/material/material-supplier-table",
            icon: "arrow_forward",
          },
          {
            name: "District Detail",
            path: "/material/material-district-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Property Values",
            path: "/material/material-property-values-table",
            icon: "arrow_forward",
          },
          {
            name: "Categorywise Property Values",
            path: "/material/material-category-property-table",
            icon: "arrow_forward",
          },
          {
            name: "Machine Hour Rate Detail",
            path: "/material/material-machine-hour-rate-table",
            icon: "arrow_forward",
          },
          {
            name: "Item HSN Detail",
            path: "/material/material-item-HSN-table",
            icon: "arrow_forward",
          },
          {
            name: "Operation Detail",
            path: "/material/material-operation-details-table",
            icon: "arrow_forward",
          },
          {
            name: "GST Detail",
            path: "/material/material-GST-detail-table",
            icon: "arrow_forward",
          },
          {
            name: "Exchange Currency Master",
            path: "/material/material-exchange-currency-table",
            icon: "arrow_forward",
          },
          {
            name: "Product Movement Flow",
            path: "/material/material-product-movement-table",
            icon: "arrow_forward",
          },
          {
            name: "Payement Conditions Detail",
            path: "/material/material-payment-conditions-table",
            icon: "arrow_forward",
          },
          {
            name: "SAC Group Master",
            path: "/material/material-SAC-group-table",
            icon: "arrow_forward",
          },
          {
            name: "Material Defect Detail",
            path: "/material/material-material-defect-table",
            icon: "arrow_forward",
          },
          {
            name: "Physical Inventory",
            path: "/material/material-physical-inventory-table",
            icon: "arrow_forward",
          },
          {
            name: "Item Detail",
            path: "/material/material-item-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Bill Of Material",
            path: "/material/material-GRN-wise-opening-stock-table",
            icon: "arrow_forward",
          },
          {
            name: "Grade Master Details",
            path: "/material/material-grade-master-table",
            icon: "arrow_forward",
          },
          {
            name: "Itemwise Material Grade Detail",
            path: "/material/Item-Material-Grade-Table",
            icon: "arrow_forward",
          },
          {
            name: "Project Detail",
            path: "/material/material-project-detail-table",
            icon: "arrow_forward",
          },
          {
            name: "Inspection Parameter",
            path: "/material/Inspection-Parameter-Table",
            icon: "arrow_forward",
          },
          {
            name: "Item Inspection Parameter Details",
            path: "/material/material-item-inspection-table",
            icon: "arrow_forward",
          },
        ],
      },
      {
        name: "Transaction",
        icon: "directions_transit",
        children: [
          {
            name: "Purchase Order",
            path: "/material/purchase-order-table",
            icon: "arrow_forward",
          },
          {
            name: "Outward Challan",
            path: "/material/material-outward-challan-table",
            icon: "arrow_forward",
          },
          {
            name: "Goods Receipt Note",
            path: "/material/material-goods-receipt-note-table",
            icon: "arrow_forward",
          },
          {
            name: "Work Order",
            path: "/material/work-order-table",
            icon: "arrow_forward",
          },
          {
            name: "Material Issue",
            path: "/material/material-issue-table",
            icon: "arrow_forward",
          },
          {
            name: "Material Requisition",
            path: "/material/material-requisition-table",
            icon: "arrow_forward",
          },
          {
            name: "Purchase Requisition",
            path: "/material/material-purchase-requisition-table",
            icon: "arrow_forward",
          },
          {
            name: "Work Order Issue",
            path: "/material/material-work-order-issue-table",
            icon: "arrow_forward",
          },
          {
            name: "Material Return Received",
            path: "/material/material-material-return-received-table",
            icon: "arrow_forward",
          },
          {
            name: "Material Rate Contract",
            path: "/material/material-rate-contract-table",
            icon: "arrow_forward",
          },
          {
            name: "Supplier Schedule",
            path: "/material/material-supplier-schedule-table",
            icon: "arrow_forward",
          },
          {
            name: "Goods Receipt Note (Inspection)",
            path: "/material/material-goods-receipt-inspection-table",
            icon: "arrow_forward",
          },
          {
            name: "WIP Material Adjustment",
            path: "/material/material-wip-material-adjustment-table",
            icon: "arrow_forward",
          },
          {
            name: "Purchase Line Rejection",
            path: "/material/material-purchase-line-rejection-table",
            icon: "arrow_forward",
          },
          {
            name: "Product Movement Slip",
            path: "/material/material-product-movement-slip-table",
            icon: "arrow_forward",
          },
          {
            name: "Material Stock Adjustment",
            path: "/material/material-stock-adjustment-table",
            icon: "arrow_forward",
          },
          {
            name: "Jobwork Stock Adjustment",
            path: "/material/material-jobwork-stock-adjustment-table",
            icon: "arrow_forward",
          },
          {
            name: "Customer Stock Adjustment",
            path: "/material/material-customer-stock-adjustment-table",
            icon: "arrow_forward",
          },
          {
            name: "Customer WIP Adjustment",
            path: "/material/material-customer-wip-adjustment-table",
            icon: "arrow_forward",
          },
          {
            name: "Approval",
            path: "/material/approval-table",
            icon: "arrow_forward",
          },
          {
            name: "Supplier Bills",
            path: "/material/material-supplier-bills-table",
            icon: "arrow_forward",
          },
          {
            name: "Additional Work Order Requisition",
            path: "/material/additional-work-order-requisition-table",
            icon: "arrow_forward",
          },
          {
            name: "Material Return",
            path: "/material/material-return-table",
            icon: "arrow_forward",
          },
        ],
      },
      {
        name: "Reports",
        icon: "bug_report",
        children: [],
      },
    ],
  },

  {
    name: "Sales",
    path: "/material/autocomplete",
    icon: "graphic_eq",
    children: [
      {
        name: "Master",
        icon: "person",
        meta: {
          hidePeriod: true,
        },
        children: [
          {
            name: "Consignee Details",
            path: "/material/sales-consignee-table",
            icon: "arrow_forward",
            meta: {
              hidePeriod: true,
            },
          },
          {
            name: "Notify Party Details",
            path: "/material/customers",
            icon: "arrow_forward",
          },
          {
            name: "Contract Review",
            path: "/material/sales-Contract-review-table",
            icon: "arrow_forward",
          },
          {
            name: "Salesman",
            path: "/material/salesman",
            icon: "arrow_forward",
          },
          {
            name: "Customer Details",
            path: "/material/customers",
            icon: "arrow_forward",
          },
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
          {
            name: "Create Role",
            path: "/sysadmin/roles/create",
            icon: "add_circle",
          },
          {
            name: "Assign Permissions",
            path: "/sysadmin/roles/assign",
            icon: "lock_open",
          },
        ],
      },
      {
        name: "Transaction",
        path: "/sysadmin/roles",
        icon: "directions_transit",
        meta: {
          hidePeriod: false,
        },
        children: [
          {
            name: "Customer's Purchase Order Login",
            path: "/material/customers-purchase-order-login-table",
            icon: "arrow_forward",
          },
          {
            name: "PACKING SLIP",
            path: "/material/packing-slip-table",
            icon: "arrow_forward",
          },
          {
            name: "Invoice",
            path: "/material/sales-invoice-table",
            icon: "arrow_forward",
          },
          {
            name: "Proforma Invoice",
            path: "/material/sales-proforma-invoice-table",
            icon: "arrow_forward",
          },
          {
            name: "Export Documents",
            path: "/material/sales-export-documents-table",
            icon: "arrow_forward",
          },
          {
            name: "Customer Schedule Detail",
            path: "/material/sales-customer-schedule-detail-table",
            icon: "arrow_forward",
          },
          {
            name: "Link Invoice To Export Schemes",
            path: "/material/sales-link-invoice-to-export-schemes-table",
            icon: "arrow_forward",
          },
          {
            name: "Enquiry Detail",
            path: "/material/sales-enquiry-table",
            icon: "arrow_forward",
          },
          {
            name: "Enquiry Login Entry",
            path: "/material/sales-enquiry-login-entry-table",
            icon: "arrow_forward",
          },
          {
            name: "Costing",
            path: "/material/sales-costing-table",
            icon: "arrow_forward",
          },
          {
            name: "Upload E-Invoice",
            path: "/material/sales-upload-e-invoice-table",
            icon: "arrow_forward",
          },
          {
            name: "PRE Shipment Packingslip",
            path: "/material/sales-pre-shipment-packingslip-table",
            icon: "arrow_forward",
          },
          {
            name: "Customer RCIA Entry",
            path: "/material/sales-customer-RCIA-entry-table",
            icon: "arrow_forward",
          },
          {
            name: "Daily Activity Plan",
            path: "/material/sales-daily-activity-plan-table",
            icon: "arrow_forward",
          },
          {
            name: "Business Plan",
            path: "/material/sales-business-plan-table",
            icon: "arrow_forward",
          },
        ],
      },
    ],
  },
  {
    name: "Finance",
    path: "/material/menu",
    icon: "attach_money",
    children: [
      {
        name: "Master",
        icon: "person",
        children: [
          {
            name: "Schedule Details",
            path: "/material/finance-schedule-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Group Details",
            path: "/material/finance-group-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Sub Group Details",
            path: "/material/finance-sub-group-details-table",
            icon: "arrow_forward",
          },
          {
            name: "General Ledger",
            path: "/material/finance-general-ledger-table",
            icon: "arrow_forward",
          },
          {
            name: "Item Details",
            path: "/material/finance-item-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Bank Details",
            path: "/material/finance-bank-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Item Code Sub-Category Detail",
            path: "/material/TMS-assign-cards-table",
            icon: "arrow_forward",
          },
          {
            name: "T.D.S. Parameter",
            path: "/material/finance-TDS-parameter-table",
            icon: "arrow_forward",
          },
          {
            name: "Depreciation Parameter",
            path: "/material/finance-depreciation-parameter-table",
            icon: "arrow_forward",
          },
          {
            name: "Employee Advance Details",
            path: "/material/finance-employee-advance-table",
            icon: "arrow_forward",
          },
          {
            name: "Creditors Billwise Entry",
            path: "/material/finance-creditors-billwise-entry-table",
            icon: "arrow_forward",
          },
          {
            name: "Bank Reconciliation Untagging",
            path: "/material/finance-bank-reconciliation-untagging-table",
            icon: "arrow_forward",
          },
          {
            name: "Bank Reconciliation Master",
            path: "/material/TMS-overtime-rules-table",
            icon: "arrow_forward",
          },
          {
            name: "Bank Reconciliation Close",
            path: "/material/finance-bank-reconciliation-close-table",
            icon: "arrow_forward",
          },
          {
            name: "Opening Balance",
            path: "/material/finance-opening-balance-table",
            icon: "arrow_forward",
          },
          {
            name: "Debtors Billwise Entry",
            path: "/material/finance-debtors-billwise-entry-table",
            icon: "arrow_forward",
          },
          {
            name: "Cheque Entry",
            path: "/material/finance-cheque-opening-entry-table",
            icon: "arrow_forward",
          },
          {
            name: "Daily Cash Close",
            path: "/material/finance-daily-cash-close-table",
            icon: "arrow_forward",
          },
          {
            name: "Monthwise Ledger Close",
            path: "/material/finance-monthwise-ledger-close-table",
            icon: "arrow_forward",
          },
          {
            name: "Financial & Finalization",
            path: "/material/finance-close-finalization-table",
            icon: "arrow_forward",
          },
        ],
      },
      {
        name: "Transaction",
        icon: "directions_transit",
        children: [
          {
            name: "Sales Voucher",
            path: "/material/finance-sales-voucher-table",
            icon: "arrow_forward",
          },
          {
            name: "Bill Passing",
            path: "/material/finance-bill-passing-table",
            icon: "arrow_forward",
          },
          {
            name: "Bank Payment ",
            path: "/material/TMS-invalid-punch-table",
            icon: "arrow_forward",
          },
          {
            name: "Cash Flow Provision",
            path: "/material/finance-cash-flow-provision-table",
            icon: "arrow_forward",
          },
          {
            name: "Bank Receipt",
            path: "/material/finance-bank-receipt-table",
            icon: "arrow_forward",
          },
          {
            name: "Cash Receipt",
            path: "/material/finance-cash-receipt-table",
            icon: "arrow_forward",
          },
          {
            name: "Payment Requests",
            path: "/material/finance-payment-request-table",
            icon: "arrow_forward",
          },
          {
            name: "Cash Payment",
            path: "/material/finance-cash-payment-table",
            icon: "arrow_forward",
          },
          {
            name: "On Account Requests",
            path: "/material/finance-on-account-request-table",
            icon: "arrow_forward",
          },
          {
            name: "Credit Note",
            path: "/material/finance-credit-note-table",
            icon: "arrow_forward",
          },
          {
            name: "Debit Note",
            path: "/material/finance-debit-note-table",
            icon: "arrow_forward",
          },
          {
            name: "Asset Register Entry",
            path: "/material/finance-asset-register-entry-table",
            icon: "arrow_forward",
          },
          {
            name: "Supplier Bills (NO PO) Multiple Tax",
            path: "/material/finance-supplier-bills-multiple-tax-table",
            icon: "arrow_forward",
          },
          {
            name: "Supplier Bills",
            path: "/material/finance-supplier-bill-table",
            icon: "arrow_forward",
          },
          {
            name: "Approval",
            path: "/material/TMS-shift-schedule-table",
            icon: "arrow_forward",
          },
          {
            name: "Current Year Linking",
            icon: "arrow_forward",
            children: [
              {
                name: "Service Voucher Linking",
                path: "/finance/service-voucher-linking",
                icon: "arrow_forward",
              },
              {
                name: "Bank Payment Voucher Linking",
                path: "/finance/bank-payment-voucher-linking",
                icon: "arrow_forward",
              },
              {
                name: "Journal Voucher Linking",
                path: "/finance/journal-voucher-linking",
                icon: "arrow_forward",
              },
              {
                name: "Bank Receipt Voucher Linking",
                path: "/finance/bank-receipt-voucher-linking",
                icon: "arrow_forward",
              },
              {
                name: "Rejection Sales Voucher Linking",
                path: "/finance/rejection-sales-voucher-linking",
                icon: "arrow_forward",
              },
              {
                name: "Credit Note Linking",
                path: "/finance/credit-note-linking",
                icon: "arrow_forward",
              },
              {
                name: "Debit Note Linking",
                path: "/finance/debit-note-linking",
                icon: "arrow_forward",
              },
            ],
          },
          {
            name: "DGFT",
            path: "/material/TMS-shift-schedule-table",
            icon: "arrow_forward",
            children: [
              {
                name: "EPCG Scheme Details",
                path: "/finance/service-voucher-linking",
                icon: "arrow_forward",
              },
              {
                name: "Advance Scheme Details",
                path: "/finance/service-voucher-linking",
                icon: "arrow_forward",
              },
            ],
          },
          {
            name: "Current Year Unlinking",
            path: "/material/TMS-shift-schedule-table",
            icon: "arrow_forward",
          },
          {
            name: "GST",
            path: "/material/TMS-shift-schedule-table",
            icon: "arrow_forward",
            children: [
              {
                name: "Ut1 Bond Entry",
                path: "/finance/service-voucher-linking",
                icon: "arrow_forward",
              },
            ],
          },
          {
            name: "Register",
            path: "/material/TMS-shift-schedule-table",
            icon: "arrow_forward",
            children: [
              {
                name: "DBK Register",
                path: "/finance/service-voucher-linking",
                icon: "arrow_forward",
              },
              {
                name: "Refund Register",
                path: "/finance/service-voucher-linking",
                icon: "arrow_forward",
              },
              {
                name: "Advance Authorization Register",
                path: "/finance/service-voucher-linking",
                icon: "arrow_forward",
              },
              {
                name: "Epcg Register",
                path: "/finance/service-voucher-linking",
                icon: "arrow_forward",
              },
            ],
          },
          {
            name: "Jounrnal Entry",
            path: "/material/finance-journal-entry-table",
            icon: "arrow_forward",
          },
          {
            name: "Rodtep Master Entry",
            path: "/material/finance-RoDTEP-master-entry-table",
            icon: "arrow_forward",
          },
          {
            name: "Dbk Master Entry",
            path: "/material/finance-dbk-master-entry-table",
            icon: "arrow_forward",
          },
        ],
      },
      {
        name: "Reports",
        icon: "bug_report",
        children: [],
      },
    ],
  },
  {
    name: "Production",
    path: "/material/progress",
    icon: "report",
    children: [
      {
        name: "Master",
        icon: "person",
        children: [
          {
            name: "Section Details",
            path: "/material/production-section-table",
            icon: "arrow_forward",
          },
          {
            name: "Section Wise Process Details",
            path: "/material/production-sectionWise-process-table",
            icon: "arrow_forward",
          },
          {
            name: "Break Down Type Details",
            path: "/material/production-breakdown-type-table",
            icon: "arrow_forward",
          },
          {
            name: "Break Down Details",
            path: "/material/production-breakdown-detail-table",
            icon: "arrow_forward",
          },
          {
            name: "Machine Process Details",
            path: "/material/production-machine-process-table",
            icon: "arrow_forward",
          },
          // SALES / MATERIAL MASTER TABLES

          {
            name: "Machine/Asset Group Details",
            path: "/material/production-machine-asset-group-table",
            icon: "arrow_forward",
          },
          {
            name: "Machine/Asset Details",
            path: "/material/production-machine-asset-detail-table",
            icon: "arrow_forward",
          },
          {
            name: "Product Costing Parameters",
            path: "/material/production-product-costing-parameter-table",
            icon: "arrow_forward",
          },
        ],
      },
      {
        name: "Report",
        path: "/sysadmin/roles",
        icon: "bug_report",
        children: [],
      },
      {
        name: "Transaction",
        path: "/sysadmin/roles",
        icon: "directions_transit",
        children: [
          {
            name: "Section Wise Production Details",
            path: "/material/production-section-wise-production-detail-table",
            icon: "arrow_forward",
          },
        ],
      },
    ],
  },
  // { name: "Planning", path: "/material/radio", icon: "report_problem" },
  {
    name: "TQM",
    path: "/material/switch",
    icon: "local_gas_station",
    children: [
      {
        name: "Master",
        icon: "person",
        children: [
          {
            name: "Critical Inspection Parameter",
            path: "/material/TQM-critical-inspection-table",
            icon: "arrow_forward",
          },
          {
            name: "Inspection Sampling Plan",
            path: "/material/TQM-sampling-plan-table",
            icon: "arrow_forward",
          },
          {
            name: "Quality Defect Type Details",
            path: "/material/TQM-quality-defect-type-table",
            icon: "arrow_forward",
          },
          {
            name: "Pre-Dispatch Inspection Entry",
            path: "/material/TQM-Pre-dispatch-inspection-entry-table",
            icon: "arrow_forward",
          },
          {
            name: "Pre-Dispatch Inspection Details Entry",
            path: "/material/TQM-Pre-dispatch-inspection-details-table",
            icon: "arrow_forward",
          },
          {
            name: "First Piece Approval",
            path: "/material/TQM-first-piece-approval-table",
            icon: "arrow_forward",
          },
          {
            name: "Customer Satisfaction Servey (CSS) Form",
            path: "/material/TQM-customer-satisfaction-table",
            icon: "arrow_forward",
          },
          {
            name: "Customer Complaints",
            path: "/material/TQM-customer-complaints-table",
            icon: "arrow_forward",
          },
          {
            name: "ISO/TS/QS Document Details",
            path: "/material/TQM-Iso-document-table",
            icon: "arrow_forward",
          },
          {
            name: "Test Master",
            path: "/material/TQM-test-master-table",
            icon: "arrow_forward",
          },
          {
            name: "Quality Defect Master",
            path: "/material/TQM-quality-defect-master-table",
            icon: "arrow_forward",
          },
          {
            name: "Dock Audit Plan (DAP)",
            path: "/material/TQM-dock-audit-plan-table",
            icon: "arrow_forward",
          },
        ],
      },
      {
        name: "Report",
        path: "/sysadmin/roles",
        icon: "bug_report",
        children: [],
      },
      {
        name: "Transaction",
        path: "/sysadmin/roles",
        icon: "directions_transit",
        children: [
          {
            name: "Section Wise Production Details",
            path: "/material/customers-purchase-order-login",
            icon: "arrow_forward",
          },
        ],
      },
    ],
  },
  {
    name: "Maintenance",
    path: "/material/slider",
    icon: "domain",
    children: [
      {
        name: "Master",
        icon: "person",
        children: [
          {
            name: "Maintenance Category Deails",
            path: "/material/maintenance-maintenance-category-table",
            icon: "arrow_forward",
          },
          {
            name: "Root Cause Details",
            path: "/material/maintenance-root-cause-table",
            icon: "arrow_forward",
          },
          {
            name: "Maintenance Reason Master",
            path: "/material/maintenance-reason-table",
            icon: "arrow_forward",
          },
          {
            name: "Machines Spares Details ",
            path: "/material/production-breakdown-detail-table",
            icon: "arrow_forward",
          },
          {
            name: "Preventive Maintenance Scheduling",
            path: "/material/maintenance-preventive-maintenance-table",
            icon: "arrow_forward",
          },
        ],
      },
      {
        name: "Report",
        path: "/sysadmin/roles",
        icon: "bug_report",
        children: [],
      },
      {
        name: "Transaction",
        path: "/sysadmin/roles",
        icon: "directions_transit",
        children: [
          {
            name: "Breakdown Slip Entry",
            path: "/material/maintenance-breakdown-slip-table",
            icon: "arrow_forward",
          },
          {
            name: "Preventive Slip Entry",
            path: "/material/maintenance-preventive-slip-table",
            icon: "arrow_forward",
          },
          {
            name: "Break Down - Shut Down Start Entry",
            path: "/material/maintenance-breakdown-start-table",
            icon: "arrow_forward",
          },
          {
            name: "Spares Consumption",
            path: "/material/maintenance-spares-consumption-table",
            icon: "arrow_forward",
          },
          {
            name: "Completion Entry",
            path: "/material/maintenance-completion-entry-table",
            icon: "arrow_forward",
          },
          {
            name: "Employee Consumption",
            path: "/material/maintenance-employee-consumption-table",
            icon: "arrow_forward",
          },
        ],
      },
    ],
  },
  // { name: "Calibration", path: "/material/snackbar", icon: "S" },
];

export default navigations;
