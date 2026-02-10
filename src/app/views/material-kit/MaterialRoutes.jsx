import { lazy } from "react";
import Loadable from "app/components/Loadable";
import ActivityReportsRightsTable from "./Sys-Admin-Master/ActivityReportsRightsTable";
import CustomersPurchaseOrderLogin from "./Sales-Transaction/customersPurchaseOrderLogin";

const AppForm = Loadable(lazy(() => import("./forms/AppForm")));
const AppMenu = Loadable(lazy(() => import("./menu/AppMenu")));
const AppIcon = Loadable(lazy(() => import("./icons/AppIcon")));
const AppProgress = Loadable(lazy(() => import("./AppProgress")));
const AppRadio = Loadable(lazy(() => import("./radio/AppRadio")));
const AppTable = Loadable(lazy(() => import("./tables/AppTable")));
const AppSwitch = Loadable(lazy(() => import("./switch/AppSwitch")));
const AppSlider = Loadable(lazy(() => import("./slider/AppSlider")));
const AppDialog = Loadable(lazy(() => import("./dialog/AppDialog")));
const AppButton = Loadable(lazy(() => import("./buttons/AppButton")));
const AppCheckbox = Loadable(lazy(() => import("./checkbox/AppCheckbox")));
const AppSnackbar = Loadable(lazy(() => import("./snackbar/AppSnackbar")));
const AppAutoComplete = Loadable(
  lazy(() => import("./auto-complete/AppAutoComplete")),
);
const AppExpansionPanel = Loadable(
  lazy(() => import("./expansion-panel/AppExpansionPanel")),
);
const InvoiceForm = Loadable(
  lazy(() => import("./Sales-Transaction/InvoiceForm")),
);
const InvoiceTable = Loadable(
  lazy(() => import("./Sales-Transaction/InvoiceTable")),
);
const PackingSlipForm = Loadable(
  lazy(() => import("./Sales-Transaction/PackingSlipForm")),
);
const PackingSlipTable = Loadable(
  lazy(() => import("./Sales-Transaction/PackingSlipTable")),
);
const ProformaInvoiceForm = Loadable(
  lazy(() => import("./Sales-Transaction/ProformaInvoiceForm")),
);
const ProformaInvoiceTable = Loadable(
  lazy(() => import("./Sales-Transaction/ProformaInvoiceTable")),
);
const ExportDocumentsForm = Loadable(
  lazy(() => import("./Sales-Transaction/ExportDocumentsForm")),
);
const ExportDocumentsTable = Loadable(
  lazy(() => import("./Sales-Transaction/ExportDocumentsTable")),
);
const CustomerScheduleDetail = Loadable(
  lazy(() => import("./Sales-Transaction/CustomerScheduleDetail")),
);
const CustomerScheduleTable = Loadable(
  lazy(() => import("./Sales-Transaction/CustomerScheduleTable")),
);
const LinkInvoiceToExportSchemes = Loadable(
  lazy(() => import("./Sales-Transaction/LinkInvoiceToExportSchemes")),
);
const LinkInvoiceToExportSchemesTable = Loadable(
  lazy(() => import("./Sales-Transaction/LinkInvoiceToExportSchemesTable")),
);
const EnquiryForm = Loadable(
  lazy(() => import("./Sales-Transaction/EnquiryForm")),
);
const EnquiryTable = Loadable(
  lazy(() => import("./Sales-Transaction/EnquiryTable")),
);
const EnquiryLoginEntryForm = Loadable(
  lazy(() => import("./Sales-Transaction/EnquiryLoginEntryForm")),
);
const EnquiryLoginEntryTable = Loadable(
  lazy(() => import("./Sales-Transaction/EnquiryLoginEntryTable")),
);
const CustomerDetailTable = Loadable(
  lazy(() => import("./Sales-Master/CustomerDetailTable")),
);
const CustomerDetailForm = Loadable(
  lazy(() => import("./Sales-Master/CustomerDetailForm")),
);
const SalesmanTable = Loadable(
  lazy(() => import("./Sales-Master/SalesmanTable")),
);
const SalesmanForm = Loadable(
  lazy(() => import("./Sales-Master/SalesmanForm")),
);
const ConsigneeTable = Loadable(
  lazy(() => import("./Sales-Master/ConsigneeTable")),
);
const ConsigneeForm = Loadable(
  lazy(() => import("./Sales-Master/ConsigneeForm")),
);
const ContractReviewTable = Loadable(
  lazy(() => import("./Sales-Master/ContractReviewTable")),
);
const ContractReviewForm = Loadable(
  lazy(() => import("./Sales-Master/ContractReviewForm")),
);
const CustomerWiseProductPriceTable = Loadable(
  lazy(() => import("./Sales-Master/CustomerWiseProductPriceTable")),
);
const CustomerWiseProductPriceForm = Loadable(
  lazy(() => import("./Sales-Master/CustomerWiseProductPriceForm")),
);
const ProjectActivityMasterTable = Loadable(
  lazy(() => import("./Sales-Master/ProjectActivityMasterTable")),
);
const ProjectActivityMasterForm = Loadable(
  lazy(() => import("./Sales-Master/ProjectActivityMasterForm")),
);
const ProjectExecutionPlanTable = Loadable(
  lazy(() => import("./Sales-Master/ProjectExecutionPlanTable")),
);
const ProjectExecutionPlanForm = Loadable(
  lazy(() => import("./Sales-Master/ProjectExecutionPlanForm")),
);
const ContractReviewChecklistTable = Loadable(
  lazy(() => import("./Sales-Master/ContractReviewChecklistTable")),
);
const ContractReviewChecklistForm = Loadable(
  lazy(() => import("./Sales-Master/ContractReviewChecklistForm")),
);

const CustomerItemDetailsTable = Loadable(
  lazy(() => import("./Sales-Master/CustomerItemDetailsTable")),
);
const CustomerItemDetailsForm = Loadable(
  lazy(() => import("./Sales-Master/CustomerItemDetailsForm")),
);
const CostingTable = Loadable(
  lazy(() => import("./Sales-Transaction/CostingTable")),
);
const CostingForm = Loadable(
  lazy(() => import("./Sales-Transaction/CostingForm")),
);
const UploadEInvoiceTable = Loadable(
  lazy(() => import("./Sales-Transaction/UploadEInvoiceTable")),
);
const UploadEInvoiceForm = Loadable(
  lazy(() => import("./Sales-Transaction/UploadEInvoiceForm")),
);
const PreShipmentPackingslipTable = Loadable(
  lazy(() => import("./Sales-Transaction/PreShipmentPackingslipTable")),
);
const PreShipmentPackingslipForm = Loadable(
  lazy(() => import("./Sales-Transaction/PreShipmentPackingslipForm")),
);
const DailyActivityPlanTable = Loadable(
  lazy(() => import("./Sales-Transaction/DailyActivityPlanTable")),
);
const DailyActivityPlanForm = Loadable(
  lazy(() => import("./Sales-Transaction/DailyActivityPlanForm")),
);
const BusinessPlanTable = Loadable(
  lazy(() => import("./Sales-Transaction/BusinessPlanTable")),
);
const BusinessPlanForm = Loadable(
  lazy(() => import("./Sales-Transaction/BusinessPlanForm")),
);
const CustomerRCIAEntryTable = Loadable(
  lazy(() => import("./Sales-Transaction/CustomerRCIAEntryTable")),
);
const CustomerRCIAEntryForm = Loadable(
  lazy(() => import("./Sales-Transaction/CustomerRCIAEntryForm")),
);
const EmployeeInformationTable = Loadable(
  lazy(() => import("./Payroll-Master/EmployeeInformationTable")),
);
const EmployeeInformationForm = Loadable(
  lazy(() => import("./Payroll-Master/EmployeeInformationForm")),
);
const ProfessionTaxTable = Loadable(
  lazy(() => import("./Payroll-Master/ProfessionTaxTable")),
);
const ProfessionTaxForm = Loadable(
  lazy(() => import("./Payroll-Master/ProfessionTaxForm")),
);
const SalaryWagesTable = Loadable(
  lazy(() => import("./Payroll-Master/SalaryWagesTable")),
);
const SalaryWagesForm = Loadable(
  lazy(() => import("./Payroll-Master/SalaryWagesForm")),
);
const LabourWelfareSlabTable = Loadable(
  lazy(() => import("./Payroll-Master/LabourWelfareSlabTable")),
);
const LabourWelfareSlabForm = Loadable(
  lazy(() => import("./Payroll-Master/LabourWelfareSlabForm")),
);
const DesignationTable = Loadable(
  lazy(() => import("./Payroll-Master/DesignationTable")),
);
const DesignationForm = Loadable(
  lazy(() => import("./Payroll-Master/DesignationForm")),
);
const GradeTable = Loadable(lazy(() => import("./Payroll-Master/GradeTable")));
const GradeForm = Loadable(lazy(() => import("./Payroll-Master/GradeForm")));
const LocationTable = Loadable(
  lazy(() => import("./Payroll-Master/LocationTable")),
);
const LocationForm = Loadable(
  lazy(() => import("./Payroll-Master/LocationForm")),
);

const materialRoutes = [
  { path: "/material/table", element: <AppTable /> },
  { path: "/material/form", element: <AppForm /> },
  { path: "/material/buttons", element: <AppButton /> },
  { path: "/material/icons", element: <AppIcon /> },
  { path: "/material/progress", element: <AppProgress /> },
  { path: "/material/menu", element: <AppMenu /> },
  { path: "/material/checkbox", element: <AppCheckbox /> },
  { path: "/material/switch", element: <AppSwitch /> },
  { path: "/material/radio", element: <AppRadio /> },
  { path: "/material/slider", element: <AppSlider /> },
  { path: "/material/autocomplete", element: <AppAutoComplete /> },
  { path: "/material/expansion-panel", element: <AppExpansionPanel /> },
  { path: "/material/dialog", element: <AppDialog /> },
  { path: "/material/snackbar", element: <AppSnackbar /> },
  { path: "/material/salesman", element: <SalesmanTable /> },
  { path: "/material/salesman/add", element: <SalesmanForm /> },
  { path: "/material/salesman/edit/:employeeCode", element: <SalesmanForm /> },
  { path: "/material/customers", element: <CustomerDetailTable /> },
  { path: "/material/customer/add", element: <CustomerDetailForm /> },
  { path: "/material/customer/edit/:code", element: <CustomerDetailForm /> },
  {
    path: "/material/activity-reports-rights-table",
    element: <ActivityReportsRightsTable />,
  },
  {
    path: "/material/customers-purchase-order-login",
    element: <CustomersPurchaseOrderLogin />,
  },
  { path: "/material/packing-slip-table", element: <PackingSlipTable /> },
  { path: "/material/packing-slip/add", element: <PackingSlipForm /> },
  { path: "/material/packing-slip/edit/:slipNo", element: <PackingSlipForm /> },
  { path: "/material/sales-invoice-table", element: <InvoiceTable /> },
  { path: "/material/sales-invoice-form/add", element: <InvoiceForm /> },
  {
    path: "/material/sales-invoice-form/edit/:slipNo",
    element: <InvoiceForm />,
  },
  {
    path: "/material/sales-proforma-invoice-table",
    element: <ProformaInvoiceTable />,
  },
  {
    path: "/material/sales-proforma-invoice-form/add",
    element: <ProformaInvoiceForm />,
  },
  {
    path: "/material/sales-proforma-invoice-form/edit/:slipNo",
    element: <ProformaInvoiceForm />,
  },
  {
    path: "/material/sales-export-documents-table",
    element: <ExportDocumentsTable />,
  },
  {
    path: "/material/sales-export-documents-form/add",
    element: <ExportDocumentsForm />,
  },
  {
    path: "/material/sales-export-documents-form/edit/:slipNo",
    element: <ExportDocumentsForm />,
  },
  {
    path: "/material/sales-customer-schedule-detail-table",
    element: <CustomerScheduleTable />,
  },
  {
    path: "/material/sales-customer-schedule-detail-form/add",
    element: <CustomerScheduleDetail />,
  },
  {
    path: "/material/sales-customer-schedule-detail-form/edit/:slipNo",
    element: <CustomerScheduleDetail />,
  },
  {
    path: "/material/sales-link-invoice-to-export-schemes-table",
    element: <LinkInvoiceToExportSchemesTable />,
  },
  {
    path: "/material/sales-link-invoice-to-export-schemes-form/add",
    element: <LinkInvoiceToExportSchemes />,
  },
  {
    path: "/material/sales-link-invoice-to-export-schemes-form/edit/:slipNo",
    element: <LinkInvoiceToExportSchemes />,
  },
  { path: "/material/sales-enquiry-table", element: <EnquiryTable /> },
  { path: "/material/sales-enquiry-form/add", element: <EnquiryForm /> },
  {
    path: "/material/sales-enquiry-form/edit/:slipNo",
    element: <EnquiryForm />,
  },
  {
    path: "/material/sales-enquiry-login-entry-table",
    element: <EnquiryLoginEntryTable />,
  },
  {
    path: "/material/sales-enquiry-login-entry-form/add",
    element: <EnquiryLoginEntryForm />,
  },
  {
    path: "/material/sales-enquiry-login-entry-form/edit/:slipNo",
    element: <EnquiryLoginEntryForm />,
  },
  { path: "/material/sales-consignee-table", element: <ConsigneeTable /> },
  { path: "/material/sales-consignee-form/add", element: <ConsigneeForm /> },
  {
    path: "/material/sales-consignee-form/edit/:slipNo",
    element: <ConsigneeForm />,
  },
  {
    path: "/material/sales-Contract-review-table",
    element: <ContractReviewTable />,
  },
  {
    path: "/material/sales-contract-review-form/add",
    element: <ContractReviewForm />,
  },
  {
    path: "/material/sales-contract-review-form/edit/:slipNo",
    element: <ContractReviewForm />,
  },
  {
    path: "/material/sales-project-execution-plan-table",
    element: <ProjectExecutionPlanTable />,
  },
  {
    path: "/material/sales-project-execution-plan-form/add",
    element: <ProjectExecutionPlanForm />,
  },
  {
    path: "/material/sales-project-execution-plan-form/edit/:slipNo",
    element: <ProjectExecutionPlanForm />,
  },

  {
    path: "/material/sales-customer-wise-product-price-table",
    element: <CustomerWiseProductPriceTable />,
  },
  {
    path: "/material/sales-customer-wise-product-price-form/add",
    element: <CustomerWiseProductPriceForm />,
  },
  {
    path: "/material/sales-customer-wise-product-price-form/edit/:slipNo",
    element: <CustomerWiseProductPriceForm />,
  },
  {
    path: "/material/sales-project-activity-master-table",
    element: <ProjectActivityMasterTable />,
  },
  {
    path: "/material/sales-project-activity-master-form/add",
    element: <ProjectActivityMasterForm />,
  },
  {
    path: "/material/sales-project-activity-master-form/edit/:slipNo",
    element: <ProjectActivityMasterForm />,
  },
  {
    path: "/material/sales-contract-review-checklist-form-table",
    element: <ContractReviewChecklistTable />,
  },
  {
    path: "/material/sales-contract-review-checklist-form/add",
    element: <ContractReviewChecklistForm />,
  },
  {
    path: "/material/sales-contract-review-checklist-form/edit/:slipNo",
    element: <ContractReviewChecklistForm />,
  },
  {
    path: "/material/sales-customer-item-details-form-table",
    element: <CustomerItemDetailsTable />,
  },
  {
    path: "/material/sales-customer-item-details-form/add",
    element: <CustomerItemDetailsForm />,
  },
  {
    path: "/material/sales-customer-item-details-form/edit/:slipNo",
    element: <CustomerItemDetailsForm />,
  },
  {
    path: "/material/sales-costing-table",
    element: <CostingTable />,
  },
  {
    path: "/material/sales-costing-form/add",
    element: <CostingForm />,
  },
  {
    path: "/material/sales-costing-form/edit/:slipNo",
    element: <CostingForm />,
  },

  {
    path: "/material/sales-upload-e-invoice-table",
    element: <UploadEInvoiceTable />,
  },
  {
    path: "/material/sales-upload-e-invoice-form/add",
    element: <UploadEInvoiceForm />,
  },
  {
    path: "/material/sales-upload-e-invoice-form/edit/:slipNo",
    element: <UploadEInvoiceForm />,
  },
  {
    path: "/material/sales-pre-shipment-packingslip-table",
    element: <PreShipmentPackingslipTable />,
  },
  {
    path: "/material/sales-pre-shipment-packingslip-form/add",
    element: <PreShipmentPackingslipForm />,
  },
  {
    path: "/material/sales-pre-shipment-packingslip-form/edit/:slipNo",
    element: <PreShipmentPackingslipForm />,
  },
  {
    path: "/material/sales-customer-RCIA-entry-table",
    element: <CustomerRCIAEntryTable />,
  },
  {
    path: "/material/sales-customer-RCIA-entry-form/add",
    element: <CustomerRCIAEntryForm />,
  },
  {
    path: "/material/sales-customer-RCIA-entry-form/edit/:slipNo",
    element: <CustomerRCIAEntryForm />,
  },
  {
    path: "/material/sales-business-plan-table",
    element: <BusinessPlanTable />,
  },
  {
    path: "/material/sales-business-plan-form/add",
    element: <BusinessPlanForm />,
  },
  {
    path: "/material/sales-business-plan-form/edit/:slipNo",
    element: <BusinessPlanForm />,
  },
  {
    path: "/material/sales-daily-activity-plan-table",
    element: <DailyActivityPlanTable />,
  },
  {
    path: "/material/sales-daily-activity-plan-form/add",
    element: <DailyActivityPlanForm />,
  },
  {
    path: "/material/sales-daily-activity-plan-form/edit/:slipNo",
    element: <DailyActivityPlanForm />,
  },
  {
    path: "/material/payroll-employee-information-table",
    element: <EmployeeInformationTable />,
  },
  {
    path: "/material/payroll-employee-information-form/add",
    element: <EmployeeInformationForm />,
  },
  {
    path: "/material/payroll-employee-information-form/edit/:slipNo",
    element: <EmployeeInformationForm />,
  },
  {
    path: "/material/payroll-profession-tax-table",
    element: <ProfessionTaxTable />,
  },
  {
    path: "/material/payroll-profession-tax-form/add",
    element: <ProfessionTaxForm />,
  },
  {
    path: "/material/payroll-profession-tax-form/edit/:slipNo",
    element: <ProfessionTaxForm />,
  },
  {
    path: "/material/payroll-salary-wages-table",
    element: <SalaryWagesTable />,
  },
  {
    path: "/material/payroll-salary-wages-form/add",
    element: <SalaryWagesForm />,
  },
  {
    path: "/material/payroll-salary-wages-form/edit/:slipNo",
    element: <SalaryWagesForm />,
  },
  {
    path: "/material/payroll-labour-welfare-slab-table",
    element: <LabourWelfareSlabTable />,
  },
  {
    path: "/material/payroll-labour-welfare-slab-form/add",
    element: <LabourWelfareSlabForm />,
  },
  {
    path: "/material/payroll-labour-welfare-slab-form/edit/:slipNo",
    element: <LabourWelfareSlabForm />,
  },
  {
    path: "/material/payroll-designation-table",
    element: <DesignationTable />,
  },
  {
    path: "/material/payroll-designation-form/add",
    element: <DesignationForm />,
  },
  {
    path: "/material/payroll-designation-form/edit/:slipNo",
    element: <DesignationForm />,
  },
  {
    path: "/material/payroll-grade-table",
    element: <GradeTable />,
  },
  {
    path: "/material/payroll-grade-form/add",
    element: <GradeForm />,
  },
  {
    path: "/material/payroll-grade-form/edit/:slipNo",
    element: <GradeForm />,
  },
  {
    path: "/material/payroll-location-table",
    element: <LocationTable />,
  },
  {
    path: "/material/payroll-location-form/add",
    element: <LocationForm />,
  },
  {
    path: "/material/payroll-location-form/edit/:slipNo",
    element: <LocationForm />,
  },
];

export default materialRoutes;
