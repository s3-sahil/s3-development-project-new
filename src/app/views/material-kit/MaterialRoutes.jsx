import { lazy } from "react";
import Loadable from "app/components/Loadable";
import ActivityReportsRightsTable from "./Sys-Admin-Master/ActivityFormRightsTable";
import CustomersPurchaseOrderLogin from "./Sales-Transaction/customersPurchaseOrderLogin";
import WorkOrderIssueTable from "./Material-Transaction/WorkOrderIssueTable";
import WorkOrderIssueForm from "./Material-Transaction/WorkOrderIssueForm";
import WipMaterialAdjustmentTable from "./Material-Transaction/WipMaterialAdjustmentTable";
import WipMaterialAdjustmentForm from "./Material-Transaction/WipMaterialAdjustmentForm";
import SupplierScheduleTable from "./Material-Transaction/SupplierScheduleTable";
import SupplierScheduleForm from "./Material-Transaction/SupplierScheduleForm";
import SupplierBillsTable from "./Material-Transaction/SupplierBillsTable";
import SupplierBillsForm from "./Material-Transaction/SupplierBillsForm";
import PurchaseRequisitionTable from "./Material-Transaction/PurchaseRequisitionTable";
import PurchaseRequisitionForm from "./Material-Transaction/PurchaseRequisitionForm";
import PurchaseLineRejectionTable from "./Material-Transaction/PurchaseLineRejectionTable";
import PurchaseLineRejectionForm from "./Material-Transaction/PurchaseLineRejectionForm";
import ProductMovementSlipTable from "./Material-Transaction/ProductMovementSlipTable";
import ProductMovementSlipForm from "./Material-Transaction/ProductMovementSlipForm";
import OutwardChallanTable from "./Material-Transaction/OutwardChallanTable";
import OutwardChallanForm from "./Material-Transaction/OutwardChallanForm";
import MaterialStockAdjustmentTable from "./Material-Transaction/MaterialStockAdjustmentTable";
import MaterialStockAdjustmentForm from "./Material-Transaction/MaterialStockAdjustmentForm";
import MaterialReturnReceivedTable from "./Material-Transaction/MaterialReturnReceivedTable";
import MaterialReturnReceivedForm from "./Material-Transaction/MaterialReturnReceivedForm";
import MaterialRateContractTable from "./Material-Transaction/MaterialRateContractTable";
import MaterialRateContractForm from "./Material-Transaction/MaterialRateContractForm";
import MaterialIssueTable from "./Material-Transaction/MaterialIssueTable";
import MaterialIssueForm from "./Material-Transaction/MaterialIssueForm";
import JobworkStockAdjustmentTable from "./Material-Transaction/JobworkStockAdjustmentTable";
import JobworkStockAdjustmentForm from "./Material-Transaction/JobworkStockAdjustmentForm";
import GoodsReceiptNoteTable from "./Material-Transaction/GoodsReceiptNoteTable";
import GoodsReceiptNoteForm from "./Material-Transaction/GoodsReceiptNoteForm";
import GoodsReceiptInspectionTable from "./Material-Transaction/GoodsReceiptInspectionTable";
import GoodsReceiptInspectionForm from "./Material-Transaction/GoodsReceiptInspectionForm";
import CustomerWipAdjustmentTable from "./Material-Transaction/CustomerWipAdjustmentTable";
import CustomerWipAdjustmentForm from "./Material-Transaction/CustomerWipAdjustmentForm";
import CustomerStockAdjustmentTable from "./Material-Transaction/CustomerStockAdjustmentTable";
import CustomerStockAdjustmentForm from "./Material-Transaction/CustomerStockAdjustmentForm";
import AdditionalWorkOrderRequisitionTable from "./Material-Transaction/AdditionalWorkOrderRequisitionTable";
import AdditionalWorkOrderRequisitionForm from "./Material-Transaction/AdditionalWorkOrderRequisitionForm";
import MaterialRequisitionTable from "./Material-Transaction/MaterialRequisitionTable";
import MaterialRequisitionForm from "./Material-Transaction/MaterialRequisitionForm";
import TMSParameterTable from "./TMS-Master/TMSParameterTable";
import TMSParameterForm from "./TMS-Master/TMSParameterForm";
import RotationDetailsTable from "./TMS-Master/RotationDetailsTable";
import RotationDetailsForm from "./TMS-Master/RotationDetailsForm";
import GradeWiseRulesTable from "./TMS-Master/GradeWiseRulesTable";
import GradeWiseRulesForm from "./TMS-Master/GradeWiseRulesForm";
import OvertimeRulesTable from "./TMS-Master/OvertimeRulesTable";
import OvertimeRulesForm from "./TMS-Master/OvertimeRulesForm";
import AssignCardsForm from "./TMS-Master/AssignCardsForm";
import AssignCardTable from "./TMS-Master/AssignCardTable";
import ShiftDetailsTable from "./TMS-Master/ShiftDetailsTable";
import ShiftDetailsForm from "./TMS-Master/ShiftDetailsForm";
import ShiftScheduleTable from "./TMS-Transaction/ShiftScheduleTable";
import ShiftScheduleForm from "./TMS-Transaction/ShiftScheduleForm";
import ImportAttendanceTable from "./TMS-Transaction/ImportAttendanceTable";
import ImportAttendanceForm from "./TMS-Transaction/ImportAttendanceForm";
import TourDetailsTable from "./TMS-Transaction/TourDetailsTable";
import TourDetailsForm from "./TMS-Transaction/TourDetailsForm";
import OvertimeTable from "./TMS-Transaction/OvertimeTable";
import OvertimeForm from "./TMS-Transaction/OvertimeForm";
import ODDetailsTable from "./TMS-Transaction/ODDetailsTable";
import ODDetailsForm from "./TMS-Transaction/ODDetailsForm";
import LeaveApplicationTable from "./TMS-Transaction/LeaveApplicationTable";
import LeaveApplicationForm from "./TMS-Transaction/LeaveApplicationForm";
import LateComingTable from "./TMS-Transaction/LateComingTable";
import LateComingForm from "./TMS-Transaction/LateComingForm";
import InvalidPunchTable from "./TMS-Transaction/InvalidPunchTable";
import InvalidPunchForm from "./TMS-Transaction/InvalidPunchForm";
import ImportManualMusterTable from "./TMS-Transaction/ImportManualMusterTable";
import GenerateMusterForm from "./TMS-Transaction/GenerateMusterForm";
import GenerateShiftScheduleForm from "./TMS-Transaction/GenerateShiftScheduleForm";
import CompOffTable from "./TMS-Transaction/CompOffTable";
import CompOffForm from "./TMS-Transaction/CompOffForm";
import InOutFlagTable from "./TMS-Transaction/InOutFlagTable";
import InOutFlagForm from "./TMS-Transaction/InOutFlagForm";
import ManualPunchingForm from "./TMS-Transaction/ManualPunchingForm";
import GradeWisePaymentDetailsTable from "./Payroll-Master/GradeWisePaymentDetailsTable";
import GradeWisePaymentDetailsForm from "./Payroll-Master/GradeWisePaymentDetailsForm";
import YearlyHolidayTable from "./Payroll-Master/YearlyHolidayTable";
import YearlyHolidayForm from "./Payroll-Master/YearlyHolidayForm";
import LeaveDetailsTable from "./Payroll-Master/LeaveDetailsTable";
import LeaveDetailsForm from "./Payroll-Master/LeaveDetailsForm";
import PayrollCalculationTables from "./Payroll-Master/PayrollCalculationTable";
import PayrollCalculationForms from "./Payroll-Master/PayrollCalculationForm";
import TrainingOnJobTable from "./Payroll-Master/TrainingOnJobTable";
import TrainingOnJobForm from "./Payroll-Master/TrainingOnJobForm";

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

const EducationDetailsTable = Loadable(
  lazy(() => import("./Payroll-Master/EducationDetailsTable")),
);
const EducationDetailsForm = Loadable(
  lazy(() => import("./Payroll-Master/EducationDetailsForm")),
);
const FamilyDetailsTable = Loadable(
  lazy(() => import("./Payroll-Master/FamilyDetailsTable")),
);
const FamilyDetailsForm = Loadable(
  lazy(() => import("./Payroll-Master/FamilyDetailsForm")),
);
const TrainingAttendanceTable = Loadable(
  lazy(() => import("./Payroll-Master/TrainingAttendanceTable")),
);
const TrainingAttendanceForm = Loadable(
  lazy(() => import("./Payroll-Master/TrainingAttendanceForm")),
);
const TrainingIdentificationTable = Loadable(
  lazy(() => import("./Payroll-Master/TrainingIdentificationTable")),
);
const TrainingIdentificationForm = Loadable(
  lazy(() => import("./Payroll-Master/TrainingIdentificationForm")),
);
const AreasDaysGenerationTable = Loadable(
  lazy(() => import("./Payroll-Transaction/AreasDaysGenerationTable")),
);
const AreasDaysGenerationForm = Loadable(
  lazy(() => import("./Payroll-Transaction/AreasDaysGenerationForm")),
);
const FullFinalTable = Loadable(
  lazy(() => import("./Payroll-Transaction/FullFinalTable")),
);
const FullFinalForm = Loadable(
  lazy(() => import("./Payroll-Transaction/FullFinalForm")),
);
const PayrollCalculationTable = Loadable(
  lazy(() => import("./Payroll-Transaction/PayrollCalculationTable")),
);
const PayrollCalculationForm = Loadable(
  lazy(() => import("./Payroll-Transaction/PayrollCalculationForm")),
);
const DaysDetailsEntryTable = Loadable(
  lazy(() => import("./Payroll-Transaction/DaysDetailsEntryTable")),
);
const DaysDetailsEntryForm = Loadable(
  lazy(() => import("./Payroll-Transaction/DaysDetailsEntryForm")),
);
const DeductionDetailEntryTable = Loadable(
  lazy(() => import("./Payroll-Transaction/DeductionDetailEntryTable")),
);
const DeductionDetailEntryForm = Loadable(
  lazy(() => import("./Payroll-Transaction/DeductionDetailEntryForm")),
);
const AdvanceLeaveDetailsTable = Loadable(
  lazy(() => import("./Payroll-Master/AdvanceLeaveDetailsTable")),
);
const AdvanceLeaveDetailsForm = Loadable(
  lazy(() => import("./Payroll-Master/AdvanceLeaveDetailsForm")),
);
const CompanyParametersTable = Loadable(
  lazy(() => import("./Payroll-Master/CompanyParametersTable")),
);
const CompanyParametersForm = Loadable(
  lazy(() => import("./Payroll-Master/CompanyParametersForm")),
);
const DeductionRecoveryTable = Loadable(
  lazy(() => import("./Payroll-Master/DeductionRecoveryTable")),
);
const DeductionRecoveryForm = Loadable(
  lazy(() => import("./Payroll-Master/DeductionRecoveryForm")),
);
const DepartmentTable = Loadable(
  lazy(() => import("./Payroll-Master/DepartmentTable")),
);
const DepartmentForm = Loadable(
  lazy(() => import("./Payroll-Master/DepartmentForm")),
);
const ItemCategoryTable = Loadable(
  lazy(() => import("./Material-Master/ItemCategoryTable")),
);
const ItemCategoryForm = Loadable(
  lazy(() => import("./Material-Master/ItemCategoryForm")),
);
const ItemRateTable = Loadable(
  lazy(() => import("./Material-Master/ItemRateTable")),
);
const ItemRateForm = Loadable(
  lazy(() => import("./Material-Master/ItemRateForm")),
);
const ItemwiseMoqTable = Loadable(
  lazy(() => import("./Material-Master/ItemwiseMoqTable")),
);
const ItemwiseMoqForm = Loadable(
  lazy(() => import("./Material-Master/ItemwiseMoqForm")),
);
const ApplicationIncomeHead = Loadable(
  lazy(() => import("./Payroll-Master/ApplicationIncomeHead")),
);
const ShareOfBusinessTable = Loadable(
  lazy(() => import("./Material-Master/ShareOfBusinessTable")),
);
const ShareOfBusinessForm = Loadable(
  lazy(() => import("./Material-Master/ShareOfBusinessForm")),
);
const GRNWiseOpeningStockTable = Loadable(
  lazy(() => import("./Material-Master/GRNWiseOpeningStockTable")),
);
const GRNWiseOpeningStockForm = Loadable(
  lazy(() => import("./Material-Master/GRNWiseOpeningStockForm")),
);
const AlternateItemTable = Loadable(
  lazy(() => import("./Material-Master/AlternateItemTable")),
);
const AlternateItemForm = Loadable(
  lazy(() => import("./Material-Master/AlternateItemForm")),
);
const SACGroupMasterTable = Loadable(
  lazy(() => import("./Material-Master/SACGroupMasterTable")),
);
const SACGroupMasterForm = Loadable(
  lazy(() => import("./Material-Master/SACGroupMasterForm")),
);
const StateDetailTable = Loadable(
  lazy(() => import("./Material-Master/StateDetailTable")),
);
const StateDetailForm = Loadable(
  lazy(() => import("./Material-Master/StateDetailForm")),
);
const CountryDetailsTable = Loadable(
  lazy(() => import("./Material-Master/CountryDetailsTable")),
);
const CountryDetailsForm = Loadable(
  lazy(() => import("./Material-Master/CountryDetailsForm")),
);
const DistrictDetailsTable = Loadable(
  lazy(() => import("./Material-Master/DistrictDetailsTable")),
);
const DistrictDetailsForm = Loadable(
  lazy(() => import("./Material-Master/DistrictDetailsForm")),
);
const PropertyValuesTable = Loadable(
  lazy(() => import("./Material-Master/PropertyValuesTable")),
);
const PropertyValuesForm = Loadable(
  lazy(() => import("./Material-Master/PropertyValuesForm")),
);
const CategoryPropertyTable = Loadable(
  lazy(() => import("./Material-Master/CategoryPropertyTable")),
);
const CategoryPropertyForm = Loadable(
  lazy(() => import("./Material-Master/CategoryPropertyForm")),
);
const HSNTable = Loadable(lazy(() => import("./Material-Master/HSNTable")));
const HSNForm = Loadable(lazy(() => import("./Material-Master/HSNForm")));
const GSTDetailTable = Loadable(
  lazy(() => import("./Material-Master/GSTDetailTable")),
);
const GSTDetailForm = Loadable(
  lazy(() => import("./Material-Master/GSTDetailForm")),
);
const SACGroupTable = Loadable(
  lazy(() => import("./Material-Master/SACGroupTable")),
);
const SACGroupForm = Loadable(
  lazy(() => import("./Material-Master/SACGroupForm")),
);
const SupplierTable = Loadable(
  lazy(() => import("./Material-Master/SupplierTable")),
);
const SupplierForm = Loadable(
  lazy(() => import("./Material-Master/SupplierForm")),
);
const ItemInspectionTable = Loadable(
  lazy(() => import("./Material-Master/ItemInspectionTable")),
);
const ItemInspectionForm = Loadable(
  lazy(() => import("./Material-Master/ItemInspectionForm")),
);
const ProjectDetailTable = Loadable(
  lazy(() => import("./Material-Master/ProjectDetailTable")),
);
const ProjectDetailForm = Loadable(
  lazy(() => import("./Material-Master/ProjectDetailForm")),
);
const GradeMasterTable = Loadable(
  lazy(() => import("./Material-Master/GradeMasterTable")),
);
const GradeMasterForm = Loadable(
  lazy(() => import("./Material-Master/GradeMasterForm")),
);
const ItemDetailsTable = Loadable(
  lazy(() => import("./Material-Master/ItemDetailsTable")),
);
const ItemDetailsForm = Loadable(
  lazy(() => import("./Material-Master/ItemDetailsForm")),
);
const PhysicalInventoryTable = Loadable(
  lazy(() => import("./Material-Master/PhysicalInventoryTable")),
);
const PhysicalInventoryForm = Loadable(
  lazy(() => import("./Material-Master/PhysicalInventoryForm")),
);
const MaterialDefectTable = Loadable(
  lazy(() => import("./Material-Master/MaterialDefectTable")),
);
const MaterialDefectForm = Loadable(
  lazy(() => import("./Material-Master/MaterialDefectForm")),
);
const PaymentConditionsTable = Loadable(
  lazy(() => import("./Material-Master/PaymentConditionsTable")),
);
const PaymentConditionsForm = Loadable(
  lazy(() => import("./Material-Master/PaymentConditionsForm")),
);
const ProductMovementTable = Loadable(
  lazy(() => import("./Material-Master/ProductMovementTable")),
);
const ProductMovementForm = Loadable(
  lazy(() => import("./Material-Master/ProductMovementForm")),
);
const ExchangeCurrencyTable = Loadable(
  lazy(() => import("./Material-Master/ExchangeCurrencyTable")),
);
const ExchangeCurrencyForm = Loadable(
  lazy(() => import("./Material-Master/ExchangeCurrencyForm")),
);
const OperationDetailsTable = Loadable(
  lazy(() => import("./Material-Master/OperationDetailsTable")),
);
const OperationDetailsForm = Loadable(
  lazy(() => import("./Material-Master/OperationDetailsForm")),
);
const ItemHSNTable = Loadable(
  lazy(() => import("./Material-Master/ItemHSNTable")),
);
const ItemHSNForm = Loadable(
  lazy(() => import("./Material-Master/ItemHSNForm")),
);
const MachineHourRateTable = Loadable(
  lazy(() => import("./Material-Master/MachineHourRateTable")),
);
const MachineHourRateForm = Loadable(
  lazy(() => import("./Material-Master/MachineHourRateForm")),
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
  {
    path: "/material/payroll-education-details-table",
    element: <EducationDetailsTable />,
  },
  {
    path: "/material/payroll-education-details-form/add",
    element: <EducationDetailsForm />,
  },
  {
    path: "/material/payroll-education-details-form/edit/:slipNo",
    element: <EducationDetailsForm />,
  },
  {
    path: "/material/payroll-family-details-table",
    element: <FamilyDetailsTable />,
  },
  {
    path: "/material/payroll-family-details-form/add",
    element: <FamilyDetailsForm />,
  },
  {
    path: "/material/payroll-family-details-form/edit/:slipNo",
    element: <FamilyDetailsForm />,
  },
  {
    path: "/material/payroll-training-attendance-table",
    element: <TrainingAttendanceTable />,
  },
  {
    path: "/material/payroll-training-attendance-form/add",
    element: <TrainingAttendanceForm />,
  },
  {
    path: "/material/payroll-training-attendance-form/edit/:slipNo",
    element: <TrainingAttendanceForm />,
  },
  {
    path: "/material/payroll-training-identification-table",
    element: <TrainingIdentificationTable />,
  },
  {
    path: "/material/payroll-training-identification-form/add",
    element: <TrainingIdentificationForm />,
  },
  {
    path: "/material/payroll-training-identification-form/edit/:slipNo",
    element: <TrainingIdentificationForm />,
  },
  {
    path: "/material/payroll-areas-days-generation-table",
    element: <AreasDaysGenerationTable />,
  },
  {
    path: "/material/payroll-areas-days-generation-form/add",
    element: <AreasDaysGenerationForm />,
  },
  {
    path: "/material/payroll-areas-days-generation-form/edit/:slipNo",
    element: <AreasDaysGenerationForm />,
  },
  {
    path: "/material/payroll-full-final-table",
    element: <FullFinalTable />,
  },
  {
    path: "/material/payroll-full-final-form/add",
    element: <FullFinalForm />,
  },
  {
    path: "/material/payroll-full-final-form/edit/:slipNo",
    element: <FullFinalForm />,
  },
  {
    path: "/material/payroll-payroll-calculation-table",
    element: <PayrollCalculationTable />,
  },
  {
    path: "/material/payroll-payroll-calculation-form/add",
    element: <PayrollCalculationForm />,
  },
  {
    path: "/material/payroll-payroll-calculation-form/edit/:slipNo",
    element: <PayrollCalculationForm />,
  },
  {
    path: "/material/payroll-days-details-entry-table",
    element: <DaysDetailsEntryTable />,
  },
  {
    path: "/material/payroll-days-details-entry-form/add",
    element: <DaysDetailsEntryForm />,
  },
  {
    path: "/material/payroll-days-details-entry-form/edit/:slipNo",
    element: <DaysDetailsEntryForm />,
  },
  {
    path: "/material/payroll-deduction-detail-entry-table",
    element: <DeductionDetailEntryTable />,
  },
  {
    path: "/material/payroll-deduction-detail-entry-form/add",
    element: <DeductionDetailEntryForm />,
  },
  {
    path: "/material/payroll-deduction-detail-entry-form/edit/:slipNo",
    element: <DeductionDetailEntryForm />,
  },
  {
    path: "/material/payroll-advance-leave-details-table",
    element: <AdvanceLeaveDetailsTable />,
  },
  {
    path: "/material/payroll-advance-leave-details-form/add",
    element: <AdvanceLeaveDetailsForm />,
  },
  {
    path: "/material/payroll-advance-leave-details-form/edit/:slipNo",
    element: <AdvanceLeaveDetailsForm />,
  },
  {
    path: "/material/payroll-application-income-head-table",
    element: <ApplicationIncomeHead />,
  },
  {
    path: "/material/payroll-application-income-head-form/add",
    element: <ApplicationIncomeHead />,
  },
  {
    path: "/material/payroll-application-income-head-form/edit/:slipNo",
    element: <ApplicationIncomeHead />,
  },
  {
    path: "/material/payroll-company-parameters-table",
    element: <CompanyParametersTable />,
  },
  {
    path: "/material/payroll-company-parameters-form/add",
    element: <CompanyParametersForm />,
  },
  {
    path: "/material/payroll-company-parameters-form/edit/:slipNo",
    element: <CompanyParametersForm />,
  },
  {
    path: "/material/payroll-deduction-recovery-table",
    element: <DeductionRecoveryTable />,
  },
  {
    path: "/material/payroll-deduction-recovery-form/add",
    element: <DeductionRecoveryForm />,
  },
  {
    path: "/material/payroll-deduction-recovery-form/edit/:slipNo",
    element: <DeductionRecoveryForm />,
  },
  {
    path: "/material/payroll-department-table",
    element: <DepartmentTable />,
  },
  {
    path: "/material/payroll-department-form/add",
    element: <DepartmentForm />,
  },
  {
    path: "/material/payroll-department-form/edit/:slipNo",
    element: <DepartmentForm />,
  },
  {
    path: "/material/material-item-category-table",
    element: <ItemCategoryTable />,
  },
  {
    path: "/material/material-item-category-form/add",
    element: <ItemCategoryForm />,
  },
  {
    path: "/material/material-item-category-form/edit/:slipNo",
    element: <ItemCategoryForm />,
  },
  {
    path: "/material/material-item-rate-table",
    element: <ItemRateTable />,
  },
  {
    path: "/material/material-item-rate-form/add",
    element: <ItemRateForm />,
  },
  {
    path: "/material/material-item-rate-form/edit/:slipNo",
    element: <ItemRateForm />,
  },
  {
    path: "/material/material-item-wise-moq-table",
    element: <ItemwiseMoqTable />,
  },
  {
    path: "/material/material-item-wise-moq-form/add",
    element: <ItemwiseMoqForm />,
  },
  {
    path: "/material/material-item-wise-moq-form/edit/:slipNo",
    element: <ItemwiseMoqForm />,
  },
  {
    path: "/material/material-share-of-business-table",
    element: <ShareOfBusinessTable />,
  },
  {
    path: "/material/material-share-of-business-form/add",
    element: <ShareOfBusinessForm />,
  },
  {
    path: "/material/material-share-of-business-form/edit/:slipNo",
    element: <ShareOfBusinessForm />,
  },
  {
    path: "/material/material-GRN-wise-opening-stock-table",
    element: <GRNWiseOpeningStockTable />,
  },
  {
    path: "/material/material-GRN-wise-opening-stock-form/add",
    element: <GRNWiseOpeningStockForm />,
  },
  {
    path: "/material/material-GRN-wise-opening-stock-form/edit/:slipNo",
    element: <GRNWiseOpeningStockForm />,
  },
  {
    path: "/material/material-alternate-item-table",
    element: <AlternateItemTable />,
  },
  {
    path: "/material/material-alternate-item-form/add",
    element: <AlternateItemForm />,
  },
  {
    path: "/material/material-alternate-item-form/edit/:slipNo",
    element: <AlternateItemForm />,
  },
  {
    path: "/material/material-SAC-group-master-table",
    element: <SACGroupMasterTable />,
  },
  {
    path: "/material/material-SAC-group-master-form/add",
    element: <SACGroupMasterForm />,
  },
  {
    path: "/material/material-SAC-group-master-form/edit/:slipNo",
    element: <SACGroupMasterForm />,
  },
  {
    path: "/material/material-state-detail-table",
    element: <StateDetailTable />,
  },
  {
    path: "/material/material-state-detail-form/add",
    element: <StateDetailForm />,
  },
  {
    path: "/material/material-state-detail-form/edit/:slipNo",
    element: <StateDetailForm />,
  },
  {
    path: "/material/material-country-details-table",
    element: <CountryDetailsTable />,
  },
  {
    path: "/material/material-country-details-form/add",
    element: <CountryDetailsForm />,
  },
  {
    path: "/material/material-country-details-form/edit/:slipNo",
    element: <CountryDetailsForm />,
  },
  {
    path: "/material/material-district-details-table",
    element: <DistrictDetailsTable />,
  },
  {
    path: "/material/material-district-details-form/add",
    element: <DistrictDetailsForm />,
  },
  {
    path: "/material/material-district-details-form/edit/:slipNo",
    element: <DistrictDetailsForm />,
  },
  {
    path: "/material/material-property-values-table",
    element: <PropertyValuesTable />,
  },
  {
    path: "/material/material-property-values-form/add",
    element: <PropertyValuesForm />,
  },
  {
    path: "/material/material-property-values-form/edit/:slipNo",
    element: <PropertyValuesForm />,
  },
  {
    path: "/material/material-category-property-table",
    element: <CategoryPropertyTable />,
  },
  {
    path: "/material/material-category-property-form/add",
    element: <CategoryPropertyForm />,
  },
  {
    path: "/material/material-category-property-form/edit/:slipNo",
    element: <CategoryPropertyForm />,
  },
  {
    path: "/material/material-machine-hour-rate-table",
    element: <MachineHourRateTable />,
  },
  {
    path: "/material/material-machine-hour-rate-form/add",
    element: <MachineHourRateForm />,
  },
  {
    path: "/material/material-machine-hour-rate-form/edit/:slipNo",
    element: <MachineHourRateForm />,
  },
  {
    path: "/material/material-item-HSN-table",
    element: <ItemHSNTable />,
  },
  {
    path: "/material/material-item-HSN-form/add",
    element: <ItemHSNForm />,
  },
  {
    path: "/material/material-item-HSN-form/edit/:slipNo",
    element: <ItemHSNForm />,
  },
  {
    path: "/material/material-operation-details-table",
    element: <OperationDetailsTable />,
  },
  {
    path: "/material/material-operation-details-form/add",
    element: <OperationDetailsForm />,
  },
  {
    path: "/material/material-operation-details-form/edit/:slipNo",
    element: <OperationDetailsForm />,
  },
  {
    path: "/material/material-exchange-currency-table",
    element: <ExchangeCurrencyTable />,
  },
  {
    path: "/material/material-exchange-currency-form/add",
    element: <ExchangeCurrencyForm />,
  },
  {
    path: "/material/material-exchange-currency-form/edit/:slipNo",
    element: <ExchangeCurrencyForm />,
  },
  {
    path: "/material/material-product-movement-table",
    element: <ProductMovementTable />,
  },
  {
    path: "/material/material-product-movement-form/add",
    element: <ProductMovementForm />,
  },
  {
    path: "/material/material-product-movement-form/edit/:slipNo",
    element: <ProductMovementForm />,
  },
  {
    path: "/material/material-payment-conditions-table",
    element: <PaymentConditionsTable />,
  },
  {
    path: "/material/material-payment-conditions-form/add",
    element: <PaymentConditionsForm />,
  },
  {
    path: "/material/material-payment-conditions-form/edit/:slipNo",
    element: <PaymentConditionsForm />,
  },
  {
    path: "/material/material-material-defect-table",
    element: <MaterialDefectTable />,
  },
  {
    path: "/material/material-material-defect-form/add",
    element: <MaterialDefectForm />,
  },
  {
    path: "/material/material-material-defect-form/edit/:slipNo",
    element: <MaterialDefectForm />,
  },
  {
    path: "/material/material-physical-inventory-table",
    element: <PhysicalInventoryTable />,
  },
  {
    path: "/material/material-physical-inventory-form/add",
    element: <PhysicalInventoryForm />,
  },
  {
    path: "/material/material-physical-inventory-form/edit/:slipNo",
    element: <PhysicalInventoryForm />,
  },
  {
    path: "/material/material-item-details-table",
    element: <ItemDetailsTable />,
  },
  {
    path: "/material/material-item-details-form/add",
    element: <ItemDetailsForm />,
  },
  {
    path: "/material/material-item-details-form/edit/:slipNo",
    element: <ItemDetailsForm />,
  },
  {
    path: "/material/material-grade-master-table",
    element: <GradeMasterTable />,
  },
  {
    path: "/material/material-grade-master-form/add",
    element: <GradeMasterForm />,
  },
  {
    path: "/material/material-grade-master-form/edit/:slipNo",
    element: <GradeMasterForm />,
  },
  {
    path: "/material/material-project-detail-table",
    element: <ProjectDetailTable />,
  },
  {
    path: "/material/material-project-detail-form/add",
    element: <ProjectDetailForm />,
  },
  {
    path: "/material/material-project-detail-form/edit/:slipNo",
    element: <ProjectDetailForm />,
  },
  {
    path: "/material/material-item-inspection-table",
    element: <ItemInspectionTable />,
  },
  {
    path: "/material/material-item-inspection-form/add",
    element: <ItemInspectionForm />,
  },
  {
    path: "/material/material-item-inspection-form/edit/:slipNo",
    element: <ItemInspectionForm />,
  },
  {
    path: "/material/material-supplier-table",
    element: <SupplierTable />,
  },
  {
    path: "/material/material-supplier-form/add",
    element: <SupplierForm />,
  },
  {
    path: "/material/material-supplier-form/edit/:slipNo",
    element: <SupplierForm />,
  },
  {
    path: "/material/material-SAC-group-table",
    element: <SACGroupTable />,
  },
  {
    path: "/material/material-SAC-group-form/add",
    element: <SACGroupForm />,
  },
  {
    path: "/material/material-SAC-group-form/edit/:slipNo",
    element: <SACGroupForm />,
  },
  {
    path: "/material/material-GST-detail-table",
    element: <GSTDetailTable />,
  },
  {
    path: "/material/material-GST-detail-form/add",
    element: <GSTDetailForm />,
  },
  {
    path: "/material/material-GST-detail-form/edit/:slipNo",
    element: <GSTDetailForm />,
  },
  {
    path: "/material/material-HSN-table",
    element: <HSNTable />,
  },
  {
    path: "/material/material-HSN-form/add",
    element: <HSNForm />,
  },
  {
    path: "/material/material-HSN-form/edit/:slipNo",
    element: <HSNForm />,
  },
  {
    path: "/material/material-work-order-issue-table",
    element: <WorkOrderIssueTable />,
  },
  {
    path: "/material/material-work-order-issue-form/add",
    element: <WorkOrderIssueForm />,
  },
  {
    path: "/material/material-work-order-issue-form/edit/:slipNo",
    element: <WorkOrderIssueForm />,
  },
  {
    path: "/material/material-wip-material-adjustment-table",
    element: <WipMaterialAdjustmentTable />,
  },
  {
    path: "/material/material-wip-material-adjustment-form/add",
    element: <WipMaterialAdjustmentForm />,
  },
  {
    path: "/material/material-wip-material-adjustment-form/edit/:slipNo",
    element: <WipMaterialAdjustmentForm />,
  },
  {
    path: "/material/material-supplier-schedule-table",
    element: <SupplierScheduleTable />,
  },
  {
    path: "/material/material-supplier-schedule-form/add",
    element: <SupplierScheduleForm />,
  },
  {
    path: "/material/material-supplier-schedule-form/edit/:slipNo",
    element: <SupplierScheduleForm />,
  },
  {
    path: "/material/material-supplier-bills-table",
    element: <SupplierBillsTable />,
  },
  {
    path: "/material/material-supplier-bills-form/add",
    element: <SupplierBillsForm />,
  },
  {
    path: "/material/material-supplier-bills-form/edit/:slipNo",
    element: <SupplierBillsForm />,
  },
  {
    path: "/material/material-purchase-requisition-table",
    element: <PurchaseRequisitionTable />,
  },
  {
    path: "/material/material-purchase-requisition-form/add",
    element: <PurchaseRequisitionForm />,
  },
  {
    path: "/material/material-purchase-requisition-form/edit/:slipNo",
    element: <PurchaseRequisitionForm />,
  },
  {
    path: "/material/material-purchase-line-rejection-table",
    element: <PurchaseLineRejectionTable />,
  },
  {
    path: "/material/material-purchase-line-rejection-form/add",
    element: <PurchaseLineRejectionForm />,
  },
  {
    path: "/material/material-purchase-line-rejection-form/edit/:slipNo",
    element: <PurchaseLineRejectionForm />,
  },
  {
    path: "/material/material-product-movement-slip-table",
    element: <ProductMovementSlipTable />,
  },
  {
    path: "/material/material-product-movement-slip-form/add",
    element: <ProductMovementSlipForm />,
  },
  {
    path: "/material/material-product-movement-slip-form/edit/:slipNo",
    element: <ProductMovementSlipForm />,
  },
  {
    path: "/material/material-outward-challan-table",
    element: <OutwardChallanTable />,
  },
  {
    path: "/material/material-outward-challan-form/add",
    element: <OutwardChallanForm />,
  },
  {
    path: "/material/material-outward-challan-form/edit/:slipNo",
    element: <OutwardChallanForm />,
  },
  {
    path: "/material/material-stock-adjustment-table",
    element: <MaterialStockAdjustmentTable />,
  },
  {
    path: "/material/material-stock-adjustment-form/add",
    element: <MaterialStockAdjustmentForm />,
  },
  {
    path: "/material/material-stock-adjustment-form/edit/:slipNo",
    element: <MaterialStockAdjustmentForm />,
  },
  {
    path: "/material/material-material-return-received-table",
    element: <MaterialReturnReceivedTable />,
  },
  {
    path: "/material/material-material-return-received-form/add",
    element: <MaterialReturnReceivedForm />,
  },
  {
    path: "/material/material-material-return-received-form/edit/:slipNo",
    element: <MaterialReturnReceivedForm />,
  },
  {
    path: "/material/material-material-return-received-table",
    element: <MaterialReturnReceivedTable />,
  },
  {
    path: "/material/material-material-return-received-form/add",
    element: <MaterialReturnReceivedForm />,
  },
  {
    path: "/material/material-material-return-received-form/edit/:slipNo",
    element: <MaterialReturnReceivedForm />,
  },
  {
    path: "/material/material-rate-contract-table",
    element: <MaterialRateContractTable />,
  },
  {
    path: "/material/material-rate-contract-form/add",
    element: <MaterialRateContractForm />,
  },
  {
    path: "/material/material-rate-contract-form/edit/:slipNo",
    element: <MaterialRateContractForm />,
  },
  {
    path: "/material/material-issue-table",
    element: <MaterialIssueTable />,
  },
  {
    path: "/material/material-issue-form/add",
    element: <MaterialIssueForm />,
  },
  {
    path: "/material/material-issue-form/edit/:slipNo",
    element: <MaterialIssueForm />,
  },
  {
    path: "/material/material-jobwork-stock-adjustment-table",
    element: <JobworkStockAdjustmentTable />,
  },
  {
    path: "/material/material-jobwork-stock-adjustment-form/add",
    element: <JobworkStockAdjustmentForm />,
  },
  {
    path: "/material/material-jobwork-stock-adjustment-form/edit/:slipNo",
    element: <JobworkStockAdjustmentForm />,
  },
  {
    path: "/material/material-goods-receipt-note-table",
    element: <GoodsReceiptNoteTable />,
  },
  {
    path: "/material/material-goods-receipt-note-form/add",
    element: <GoodsReceiptNoteForm />,
  },
  {
    path: "/material/material-goods-receipt-note-form/edit/:slipNo",
    element: <GoodsReceiptNoteForm />,
  },
  {
    path: "/material/material-goods-receipt-inspection-table",
    element: <GoodsReceiptInspectionTable />,
  },
  {
    path: "/material/material-goods-receipt-inspection-form/add",
    element: <GoodsReceiptInspectionForm />,
  },
  {
    path: "/material/material-goods-receipt-inspection-form/edit/:slipNo",
    element: <GoodsReceiptInspectionForm />,
  },
  {
    path: "/material/material-customer-wip-adjustment-table",
    element: <CustomerWipAdjustmentTable />,
  },
  {
    path: "/material/material-customer-wip-adjustment-form/add",
    element: <CustomerWipAdjustmentForm />,
  },
  {
    path: "/material/material-customer-wip-adjustment-form/edit/:slipNo",
    element: <CustomerWipAdjustmentForm />,
  },
  {
    path: "/material/material-customer-stock-adjustment-table",
    element: <CustomerStockAdjustmentTable />,
  },
  {
    path: "/material/material-customer-stock-adjustment-form/add",
    element: <CustomerStockAdjustmentForm />,
  },
  {
    path: "/material/material-customer-stock-adjustment-form/edit/:slipNo",
    element: <CustomerStockAdjustmentForm />,
  },
  {
    path: "/material/material-additional-work-order-requisition-table",
    element: <AdditionalWorkOrderRequisitionTable />,
  },
  {
    path: "/material/material-additional-work-order-requisition-form/add",
    element: <AdditionalWorkOrderRequisitionForm />,
  },
  {
    path: "/material/material-additional-work-order-requisition-form/edit/:slipNo",
    element: <AdditionalWorkOrderRequisitionForm />,
  },
  {
    path: "/material/material-requisition-table",
    element: <MaterialRequisitionTable />,
  },
  {
    path: "/material/material-requisition-form/add",
    element: <MaterialRequisitionForm />,
  },
  {
    path: "/material/material-requisition-form/edit/:slipNo",
    element: <MaterialRequisitionForm />,
  },
  {
    path: "/material/TMS-parameter-table",
    element: <TMSParameterTable />,
  },
  {
    path: "/material/TMS-parameter-form/add",
    element: <TMSParameterForm />,
  },
  {
    path: "/material/TMS-parameter-form/edit/:slipNo",
    element: <TMSParameterForm />,
  },
  {
    path: "/material/TMS-rotation-details-table",
    element: <RotationDetailsTable />,
  },
  {
    path: "/material/TMS-rotation-details-form/add",
    element: <RotationDetailsForm />,
  },
  {
    path: "/material/TMS-rotation-details-form/edit/:slipNo",
    element: <RotationDetailsForm />,
  },
  {
    path: "/material/TMS-grade-wise-rules-table",
    element: <GradeWiseRulesTable />,
  },
  {
    path: "/material/TMS-grade-wise-rules-form/add",
    element: <GradeWiseRulesForm />,
  },
  {
    path: "/material/TMS-grade-wise-rules-form/edit/:slipNo",
    element: <GradeWiseRulesForm />,
  },
  {
    path: "/material/TMS-overtime-rules-table",
    element: <OvertimeRulesTable />,
  },
  {
    path: "/material/TMS-overtime-rules-form/add",
    element: <OvertimeRulesForm />,
  },
  {
    path: "/material/TMS-overtime-rules-form/edit/:slipNo",
    element: <OvertimeRulesForm />,
  },
  {
    path: "/material/TMS-assign-cards-table",
    element: <AssignCardTable />,
  },
  {
    path: "/material/TMS-assign-cards-form/edit/:slipNo",
    element: <AssignCardsForm />,
  },
  {
    path: "/material/TMS-assign-cards-form/add",
    element: <AssignCardsForm />,
  },
  {
    path: "/material/TMS-Shift-details-table",
    element: <ShiftDetailsTable />,
  },
  {
    path: "/material/TMS-Shift-details-form/edit/:slipNo",
    element: <ShiftDetailsForm />,
  },
  {
    path: "/material/TMS-Shift-details-form/add",
    element: <ShiftDetailsForm />,
  },
  {
    path: "/material/TMS-shift-schedule-table",
    element: <ShiftScheduleTable />,
  },
  {
    path: "/material/TMS-shift-schedule-form/edit/:slipNo",
    element: <ShiftScheduleForm />,
  },
  {
    path: "/material/TMS-shift-schedule-form/add",
    element: <ShiftScheduleForm />,
  },
  {
    path: "/material/TMS-import-attendance-table",
    element: <ImportAttendanceTable />,
  },
  {
    path: "/material/TMS-import-attendance-form/edit/:slipNo",
    element: <ImportAttendanceForm />,
  },
  {
    path: "/material/TMS-import-attendance-form/add",
    element: <ImportAttendanceForm />,
  },
   {
    path: "/material/TMS-tour-details-table",
    element: <TourDetailsTable />,
  },
  {
    path: "/material/TMS-tour-details-form/edit/:slipNo",
    element: <TourDetailsForm />,
  },
  {
    path: "/material/TMS-tour-details-form/add",
    element: <TourDetailsForm />,
  },
   {
    path: "/material/TMS-overtime-table",
    element: <OvertimeTable />,
  },
  {
    path: "/material/TMS-overtime-form/edit/:slipNo",
    element: <OvertimeForm />,
  },
  {
    path: "/material/TMS-overtime-form/add",
    element: <OvertimeForm />,
  },
   {
    path: "/material/TMS-OD-details-table",
    element: <ODDetailsTable />,
  },
  {
    path: "/material/TMS-OD-details-form/edit/:slipNo",
    element: <ODDetailsForm />,
  },
  {
    path: "/material/TMS-OD-details-form/add",
    element: <ODDetailsForm />,
  },
  {
    path: "/material/TMS-leave-application-table",
    element: <LeaveApplicationTable />,
  },
  {
    path: "/material/TMS-leave-application-form/edit/:slipNo",
    element: <LeaveApplicationForm />,
  },
  {
    path: "/material/TMS-leave-application-form/add",
    element: <LeaveApplicationForm />,
  },
   {
    path: "/material/TMS-late-coming-table",
    element: <LateComingTable />,
  },
  {
    path: "/material/TMS-late-coming-form/edit/:slipNo",
    element: <LateComingForm />,
  },
  {
    path: "/material/TMS-late-coming-form/add",
    element: <LateComingForm />,
  },
  {
    path: "/material/TMS-invalid-punch-table",
    element: <InvalidPunchTable />,
  },
  {
    path: "/material/TMS-invalid-punch-form/edit/:slipNo",
    element: <InvalidPunchForm />,
  },
  {
    path: "/material/TMS-invalid-punch-form/add",
    element: <InvalidPunchForm />,
  },
   {
    path: "/material/TMS-generate-muster",
    element: <GenerateMusterForm />,
  },
  {
    path: "/material/TMS-Generate-shift-schedule",
    element: <GenerateShiftScheduleForm />,
  },
  {
    path: "/material/TMS-comp-Off-table",
    element: <CompOffTable />,
  },
  {
    path: "/material/TMS-comp-Off-form/edit/:slipNo",
    element: <CompOffForm />,
  },
  {
    path: "/material/TMS-comp-Off-form/add",
    element: <CompOffForm />,
  },
   {
    path: "/material/TMS-In-Out-flag-table",
    element: <InOutFlagTable />,
  },
  {
    path: "/material/TMS-In-Out-flag-form/edit/:slipNo",
    element: <InOutFlagForm />,
  },
  {
    path: "/material/TMS-In-Out-flag-form/add",
    element: <InOutFlagForm />,
  },
   {
    path: "/material/TMS-manual-punching",
    element: <ManualPunchingForm />,
  },
   {
    path: "/material/payroll-grade-wise-payment-details-table",
    element: <GradeWisePaymentDetailsTable />,
  },
  {
    path: "/material/payroll-grade-wise-payment-details-form/edit/:slipNo",
    element: <GradeWisePaymentDetailsForm />,
  },
  {
    path: "/material/payroll-grade-wise-payment-details-form/add",
    element: <GradeWisePaymentDetailsForm />,
  },
   {
    path: "/material/payroll-yearly-holiday-table",
    element: <YearlyHolidayTable />,
  },
  {
    path: "/material/payroll-yearly-holiday-form/edit/:slipNo",
    element: <YearlyHolidayForm />,
  },
  {
    path: "/material/payroll-yearly-holiday-form/add",
    element: <YearlyHolidayForm />,
  },
   {
    path: "/material/payroll-leave-details-table",
    element: <LeaveDetailsTable />,
  },
  {
    path: "/material/payroll-leave-details-form/edit/:slipNo",
    element: <LeaveDetailsForm />,
  },
  {
    path: "/material/payroll-leave-details-form/add",
    element: <LeaveDetailsForm />,
  },
   {
    path: "/material/payroll-payroll-calculations-table",
    element: <PayrollCalculationTables />,
  },
  {
    path: "/material/payroll-payroll-calculations-form/edit/:slipNo",
    element: <PayrollCalculationForms />,
  },
  {
    path: "/material/payroll-payroll-calculations-form/add",
    element: <PayrollCalculationForms />,
  },
   {
    path: "/material/payroll-training-on-job-table",
    element: <TrainingOnJobTable />,
  },
  {
    path: "/material/payroll-training-on-job-form/edit/:slipNo",
    element: <TrainingOnJobForm />,
  },
  {
    path: "/material/payroll-training-on-job-form/add",
    element: <TrainingOnJobForm />,
  },
];

export default materialRoutes;
