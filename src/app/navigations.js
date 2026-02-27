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
        children: [
          {
            name: "TMS Parameter",
            path: "/material/TMS-parameter-table",
            icon: "arrow_forward",
          },
          {
            name: "Card Details",
            path: "/material/material-item-category-table",
            icon: "arrow_forward",
          },
          {
            name: "Attendance Status Details",
            path: "/material/payroll-employee-information-table",
            icon: "arrow_forward",
          },
          {
            name: "Rotation Details",
            path: "/material/TMS-rotation-details-table",
            icon: "arrow_forward",
          },
          {
            name: "Route Details",
            path: "/material/material-item-rate-table",
            icon: "arrow_forward",
          },
          {
            name: "Shift Details",
            path: "/material/material-share-of-business-table",
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
            path: "/material/payroll-employee-information-table",
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
            path: "/material/material-GRN-wise-opening-stock-table",
            icon: "arrow_forward",
          },
          {
            name: "Project Detail",
            path: "/material/material-project-detail-table",
            icon: "arrow_forward",
          },
          {
            name: "Inspection Parameter",
            path: "/material/material-GRN-wise-opening-stock-table",
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
        children: [
          {
            name: "Consignee Details",
            path: "/material/sales-consignee-table",
            icon: "arrow_forward",
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
        children: [
          {
            name: "Customer's Purchase Order Login",
            path: "/material/customers-purchase-order-login",
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
  { name: "GST", path: "/material/icons", icon: "local_taxi" },
  { name: "Finance", path: "/material/menu", icon: "attach_money" },
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
            path: "/material/sales-consignee-table",
            icon: "arrow_forward",
          },
          {
            name: "Section Wise Process Details",
            path: "/material/customers",
            icon: "arrow_forward",
          },
          {
            name: "Break Down Type Details",
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
        children: [
          {
            name: "Customer's Purchase Order Login",
            path: "/material/customers-purchase-order-login",
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
  { name: "Planning", path: "/material/radio", icon: "report_problem" },
  { name: "TQM", path: "/material/switch", icon: "local_gas_station" },
  { name: "Maintenance", path: "/material/slider", icon: "domain" },
  { name: "Calibration", path: "/material/snackbar", icon: "S" },
  { name: "Laboratory", path: "/material/table", icon: "hourglass_empty" },
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
