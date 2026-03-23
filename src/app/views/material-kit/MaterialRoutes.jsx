import { lazy } from "react";
import Loadable from "app/components/Loadable";
import ActivityReportsRightsTable from "./Sys-Admin-Master/ActivityFormRightsTable";
import CustomersPurchaseOrderLogin from "./Sales-Transaction/CustomersPurchaseOrderLogin";
import BreakdownSlipTable from "./Maintenance-Transaction/BreakdownSlipTable";
import BreakdownSlipForm from "./Maintenance-Transaction/BreakdownSlipForm";
import BreakdownStartTable from "./Maintenance-Transaction/BreakdownStartTable";
import BreakdownStartForm from "./Maintenance-Transaction/BreakdownStartForm";
import CompletionEntryTable from "./Maintenance-Transaction/CompletionEntryTable";
import CompletionEntryForm from "./Maintenance-Transaction/CompletionEntryForm";
import PreventiveSlipTable from "./Maintenance-Transaction/PreventiveSlipTable";
import PreventiveSlipForm from "./Maintenance-Transaction/PreventiveSlipForm";
import SparesConsumptionTable from "./Maintenance-Transaction/SparesConsumptionTable";
import SparesConsumptionForm from "./Maintenance-Transaction/SparesConsumptionForm";
import LoginDetailsTable from "./Sys-Admin-Master/LoginDetailsTable";
import LoginDetailsForm from "./Sys-Admin-Master/LoginDetailsForm";
import LoginParameterTable from "./Sys-Admin-Master/LoginParameterTable";
import LoginParameterForm from "./Sys-Admin-Master/LoginParameterForm";
import ActivityReportTable from "./Sys-Admin-Master/ActivityReportTable";
import NewRoleTable from "./Sys-Admin-Master/NewRoleTable";
import NewRoleForm from "./Sys-Admin-Master/NewRoleForm";
import CardDetailsTable from "./TMS-Master/CardDetailsTable";
import CardDetailsForm from "./TMS-Master/CardDetailsForm";
import AttendanceStatusTable from "./TMS-Master/AttendanceStatusDetailsTable";
import RouteTable from "./TMS-Master/RouteTable";
import RouteForm from "./TMS-Master/RouteForm";
import CriticalInspectionForm from "./TQM-Master/CriticalInspectionForm";
import CriticalInspectionTable from "./TQM-Master/CriticalInspectionTable";
import CustomerComplaintsTable from "./TQM-Master/CustomerComplaintsTable";
import CustomerComplaintsForm from "./TQM-Master/CustomerComplaintsForm";
import CustomerSatisfactionTable from "./TQM-Master/CustomerSatisfactionTable";
import CustomerSatisfactionForm from "./TQM-Master/CustomerSatisfactionForm";
import DockAuditPlanTable from "./TQM-Master/DockAuditPlanTable";
import DockAuditPlanForm from "./TQM-Master/DockAuditPlanForm";
import FirstPieceApprovalTable from "./TQM-Master/FirstPieceApprovalTable";
import FirstPieceApprovalForm from "./TQM-Master/FirstPieceApprovalForm";
import IsoDocumentTable from "./TQM-Master/IsoDocumentTable";
import IsoDocumentForm from "./TQM-Master/IsoDocumentForm";
import PreDispatchInspectionDetailsTable from "./TQM-Master/PreDispatchInspectionDetailsTable";
import PreDispatchInspectionDetailsForm from "./TQM-Master/PreDispatchInspectionDetailsForm";
import PreDispatchInspectionEntryTable from "./TQM-Master/PreDispatchInspectionEntryTable";
import PreDispatchInspectionEntryForm from "./TQM-Master/PreDispatchInspectionEntryForm";
import QualityDefectMasterTable from "./TQM-Master/QualityDefectMasterTable";
import QualityDefectMasterForm from "./TQM-Master/QualityDefectMasterForm";
import QualityDefectTypeTable from "./TQM-Master/QualityDefectTypeTable";
import QualityDefectTypeForm from "./TQM-Master/QualityDefectTypeForm";
import SamplingPlanTable from "./TQM-Master/SamplingPlanTable";
import SamplingPlanForm from "./TQM-Master/SamplingPlanForm";
import TestMasterTable from "./TQM-Master/TestMasterTable";
import TestMasterForm from "./TQM-Master/TestMasterForm";
import AssetRegisterEntryForm from "./Finance-Transaction/AssetRegisterEntryForm";
import AssetRegisterEntryTable from "./Finance-Transaction/AssetRegisterEntryTable";
import BankReceiptTable from "./Finance-Transaction/BankReceiptTable";
import BankReceiptForm from "./Finance-Transaction/BankReceiptForm";
import BillPassingTable from "./Finance-Transaction/BillPassingTable";
import BillPassingForm from "./Finance-Transaction/BillPassingForm";
import CashFlowProvisionTable from "./Finance-Transaction/CashFlowProvisionTable";
import CashFlowProvisionForm from "./Finance-Transaction/CashFlowProvisionForm";
import CashPaymentTable from "./Finance-Transaction/CashPaymentTable";
import CashPaymentForm from "./Finance-Transaction/CashPaymentForm";
import CashReceiptTable from "./Finance-Transaction/CashReceiptTable";
import CashReceiptForm from "./Finance-Transaction/CashReceiptForm";
import CreditNoteTable from "./Finance-Transaction/CreditNoteTable";
import CreditNoteForm from "./Finance-Transaction/CreditNoteForm";
import DbkMasterEntryTable from "./Finance-Transaction/DbkMasterEntryTable";
import DbkMasterEntryForm from "./Finance-Transaction/DbkMasterEntryForm";
import DebitNoteTable from "./Finance-Transaction/DebitNoteTable";
import DebitNoteForm from "./Finance-Transaction/DebitNoteForm";
import JournalEntryTable from "./Finance-Transaction/JournalEntryTable";
import JournalEntryForm from "./Finance-Transaction/JournalEntryForm";
import OnAccountRequestTable from "./Finance-Transaction/OnAccountRequestTable";
import OnAccountRequestForm from "./Finance-Transaction/OnAccountRequestForm";
import PaymentRequestTable from "./Finance-Transaction/PaymentRequestTable";
import PaymentRequestForm from "./Finance-Transaction/PaymentRequestForm";
import RoDTEPMasterEntryTable from "./Finance-Transaction/RoDTEPMasterEntryTable";
import RoDTEPMasterEntryForm from "./Finance-Transaction/RoDTEPMasterEntryForm";
import SalesVoucherTable from "./Finance-Transaction/SalesVoucherTable";
import SalesVoucherForm from "./Finance-Transaction/SalesVoucherForm";
import SupplierBillTable from "./Finance-Transaction/SupplierBillTable";
import SupplierBillForm from "./Finance-Transaction/SupplierBillForm";
import SupplierBillsMultipleTaxTable from "./Finance-Transaction/SupplierBillsMultipleTaxTable";
import SupplierBillsMultipleTaxForm from "./Finance-Transaction/SupplierBillsMultipleTaxForm";
import BankDetailsTable from "./Finance-Master/BankDetailsTable";
import BankDetailsForm from "./Finance-Master/BankDetailsForm";
import BankReconciliationCloseTable from "./Finance-Master/BankReconciliationCloseTable";
import BankReconciliationCloseForm from "./Finance-Master/BankReconciliationCloseForm";
import BankReconciliationMasterTable from "./Finance-Master/BankReconciliationMasterTable";
import BankReconciliationMasterForm from "./Finance-Master/BankReconciliationMasterForm";
import BankReconciliationUntaggingTable from "./Finance-Master/BankReconciliationUntaggingTable";
import BankReconciliationUntaggingForm from "./Finance-Master/BankReconciliationUntaggingForm";
import ChequeOpeningEntryTable from "./Finance-Master/ChequeOpeningEntryTable";
import ChequeOpeningEntryForm from "./Finance-Master/ChequeOpeningEntryForm";
import CloseFinalizationTable from "./Finance-Master/CloseFinalizationTable";
import CloseFinalizationForm from "./Finance-Master/CloseFinalizationForm";
import CloseFinancialYearTable from "./Finance-Master/CloseFinancialYearTable";
import CloseFinancialYearForm from "./Finance-Master/CloseFinancialYearForm";
import CreditorsBillwiseEntryTable from "./Finance-Master/CreditorsBillwiseEntryTable";
import CreditorsBillwiseEntryForm from "./Finance-Master/CreditorsBillwiseEntryForm";
import DailyCashCloseTable from "./Finance-Master/DailyCashCloseTable";
import DailyCashCloseForm from "./Finance-Master/DailyCashCloseForm";
import DebtorsBillwiseEntryTable from "./Finance-Master/DebtorsBillwiseEntryTable";
import DebtorsBillwiseEntryForm from "./Finance-Master/DebtorsBillwiseEntryForm";
import DepreciationParameterTable from "./Finance-Master/DepreciationParameterTable";
import DepreciationParameterForm from "./Finance-Master/DepreciationParameterForm";
import EmployeeAdvanceTable from "./Finance-Master/EmployeeAdvanceTable";
import EmployeeAdvanceForm from "./Finance-Master/EmployeeAdvanceForm";
import GeneralLedgerTable from "./Finance-Master/GeneralLedgerTable";
import GeneralLedgerForm from "./Finance-Master/GeneralLedgerForm";
import GroupDetailsTable from "./Finance-Master/GroupDetailsTable";
import GroupDetailsForm from "./Finance-Master/GroupDetailsForm";
import FinanceItemDetailsForm from "./Finance-Master/FinanceItemDetailsForm";
import FinanceItemDetailsTable from "./Finance-Master/FinanceItemDetailsTable";
import MonthwiseLedgerCloseTable from "./Finance-Master/MonthwiseLedgerCloseTable";
import MonthwiseLedgerCloseForm from "./Finance-Master/MonthwiseLedgerCloseForm";
import OpeningBalanceTable from "./Finance-Master/OpeningBalanceTable";
import OpeningBalanceForm from "./Finance-Master/OpeningBalanceForm";
import ScheduleDetailsTable from "./Finance-Master/ScheduleDetailsTable";
import ScheduleDetailsForm from "./Finance-Master/ScheduleDetailsForm";
import SubGroupDetailsTable from "./Finance-Master/SubGroupDetailsTable";
import SubGroupDetailsForm from "./Finance-Master/SubGroupDetailsForm";
import TDSParameterTable from "./Finance-Master/TDSParameterTable";
import TDSParameterForm from "./Finance-Master/TDSParameterForm";
import CustomersPurchaseOrderLoginTable from "./Sales-Transaction/customersPurchaseOrderLoginTable";
// import EmployeeConsumptionTable from "./Maintenance-Master/EmployeeConsumptionTable";
// import EmployeeConsumptionForm from "./Maintenance-Master/EmployeeConsumptionForm";
// import MaintenanceCategoryTable from "./Maintenance-Master/MaintenanceCategoryTable";
// import MaintenanceCategoryForm from "./Maintenance-Master/MaintenanceCategoryForm";
// import PreventiveMaintenanceTable from "./Maintenance-Master/PreventiveMaintenanceTable";
// import PreventiveMaintenanceForm from "./Maintenance-Master/PreventiveMaintenanceForm";
// import RootCauseTable from "./Maintenance-Master/RootCauseTable";
// import RootCauseForm from "./Maintenance-Master/RootCauseForm";
// import MaintenanceReasonTable from "./Maintenance-Master/MaintenanceReasonTable";
// import MaintenanceReasonForm from "./Maintenance-Master/MaintenanceReasonForm";
// import SectionWiseProductionDetailTable from "./Production-Transaction/SectionWiseProductionDetailTable";
// import SectionWiseProductionDetailForm from "./Production-Transaction/SectionWiseProductionDetailForm";
// import ProductCostingParameterTable from "./Production-Master/ProductCostingParameterTable";
// import ProductCostingParameterForm from "./Production-Master/ProductCostingParameterForm";
// import BreakdownDetailTable from "./Production-Master/BreakdownDetailTable";
// import BreakdownDetailForm from "./Production-Master/BreakdownDetailForm";
// import MachineAssetGroupTable from "./Production-Master/MachineAssetGroupTable";
// import MachineAssetGroupForm from "./Production-Master/MachineAssetGroupForm";
// import MachineAssetDetailTable from "./Production-Master/MachineAssetDetailTable";
// import MachineAssetDetailForm from "./Production-Master/MachineAssetDetailForm";
// import WorkOrderIssueTable from "./Material-Transaction/WorkOrderIssueTable";
// import WorkOrderIssueForm from "./Material-Transaction/WorkOrderIssueForm";
// import WipMaterialAdjustmentTable from "./Material-Transaction/WipMaterialAdjustmentTable";
// import WipMaterialAdjustmentForm from "./Material-Transaction/WipMaterialAdjustmentForm";
// import SupplierScheduleTable from "./Material-Transaction/SupplierScheduleTable";
// import SupplierScheduleForm from "./Material-Transaction/SupplierScheduleForm";
// import SupplierBillsTable from "./Material-Transaction/SupplierBillsTable";
// import SupplierBillsForm from "./Material-Transaction/SupplierBillsForm";
// import PurchaseRequisitionTable from "./Material-Transaction/PurchaseRequisitionTable";
// import PurchaseRequisitionForm from "./Material-Transaction/PurchaseRequisitionForm";
// import PurchaseLineRejectionTable from "./Material-Transaction/PurchaseLineRejectionTable";
// import PurchaseLineRejectionForm from "./Material-Transaction/PurchaseLineRejectionForm";
// import ProductMovementSlipTable from "./Material-Transaction/ProductMovementSlipTable";
// import ProductMovementSlipForm from "./Material-Transaction/ProductMovementSlipForm";
// import OutwardChallanTable from "./Material-Transaction/OutwardChallanTable";
// import OutwardChallanForm from "./Material-Transaction/OutwardChallanForm";
// import MaterialStockAdjustmentTable from "./Material-Transaction/MaterialStockAdjustmentTable";
// import MaterialStockAdjustmentForm from "./Material-Transaction/MaterialStockAdjustmentForm";
// import MaterialReturnReceivedTable from "./Material-Transaction/MaterialReturnReceivedTable";
// import MaterialReturnReceivedForm from "./Material-Transaction/MaterialReturnReceivedForm";
// import MaterialRateContractTable from "./Material-Transaction/MaterialRateContractTable";
// import MaterialRateContractForm from "./Material-Transaction/MaterialRateContractForm";
// import MaterialIssueTable from "./Material-Transaction/MaterialIssueTable";
// import MaterialIssueForm from "./Material-Transaction/MaterialIssueForm";
// import JobworkStockAdjustmentTable from "./Material-Transaction/JobworkStockAdjustmentTable";
// import JobworkStockAdjustmentForm from "./Material-Transaction/JobworkStockAdjustmentForm";
// import GoodsReceiptNoteTable from "./Material-Transaction/GoodsReceiptNoteTable";
// import GoodsReceiptNoteForm from "./Material-Transaction/GoodsReceiptNoteForm";
// import GoodsReceiptInspectionTable from "./Material-Transaction/GoodsReceiptInspectionTable";
// import GoodsReceiptInspectionForm from "./Material-Transaction/GoodsReceiptInspectionForm";
// import CustomerWipAdjustmentTable from "./Material-Transaction/CustomerWipAdjustmentTable";
// import CustomerWipAdjustmentForm from "./Material-Transaction/CustomerWipAdjustmentForm";
// import CustomerStockAdjustmentTable from "./Material-Transaction/CustomerStockAdjustmentTable";
// import CustomerStockAdjustmentForm from "./Material-Transaction/CustomerStockAdjustmentForm";
// import AdditionalWorkOrderRequisitionTable from "./Material-Transaction/AdditionalWorkOrderRequisitionTable";
// import AdditionalWorkOrderRequisitionForm from "./Material-Transaction/AdditionalWorkOrderRequisitionForm";
// import MaterialRequisitionTable from "./Material-Transaction/MaterialRequisitionTable";
// import MaterialRequisitionForm from "./Material-Transaction/MaterialRequisitionForm";
// import TMSParameterTable from "./TMS-Master/TMSParameterTable";
// import TMSParameterForm from "./TMS-Master/TMSParameterForm";
// import RotationDetailsTable from "./TMS-Master/RotationDetailsTable";
// import RotationDetailsForm from "./TMS-Master/RotationDetailsForm";
// import GradeWiseRulesTable from "./TMS-Master/GradeWiseRulesTable";
// import GradeWiseRulesForm from "./TMS-Master/GradeWiseRulesForm";
// import OvertimeRulesTable from "./TMS-Master/OvertimeRulesTable";
// import OvertimeRulesForm from "./TMS-Master/OvertimeRulesForm";
// import AssignCardsForm from "./TMS-Master/AssignCardsForm";
// import AssignCardTable from "./TMS-Master/AssignCardTable";
// import ShiftDetailsTable from "./TMS-Master/ShiftDetailsTable";
// import ShiftDetailsForm from "./TMS-Master/ShiftDetailsForm";
// import ShiftScheduleTable from "./TMS-Transaction/ShiftScheduleTable";
// import ShiftScheduleForm from "./TMS-Transaction/ShiftScheduleForm";
// import ImportAttendanceTable from "./TMS-Transaction/ImportAttendanceTable";
// import ImportAttendanceForm from "./TMS-Transaction/ImportAttendanceForm";
// import TourDetailsTable from "./TMS-Transaction/TourDetailsTable";
// import TourDetailsForm from "./TMS-Transaction/TourDetailsForm";
// import OvertimeTable from "./TMS-Transaction/OvertimeTable";
// import OvertimeForm from "./TMS-Transaction/OvertimeForm";
// import ODDetailsTable from "./TMS-Transaction/ODDetailsTable";
// import ODDetailsForm from "./TMS-Transaction/ODDetailsForm";
// import LeaveApplicationTable from "./TMS-Transaction/LeaveApplicationTable";
// import LeaveApplicationForm from "./TMS-Transaction/LeaveApplicationForm";
// import LateComingTable from "./TMS-Transaction/LateComingTable";
// import LateComingForm from "./TMS-Transaction/LateComingForm";
// import InvalidPunchTable from "./TMS-Transaction/InvalidPunchTable";
// import InvalidPunchForm from "./TMS-Transaction/InvalidPunchForm";
// import ImportManualMusterTable from "./TMS-Transaction/ImportManualMusterTable";
// import GenerateMusterForm from "./TMS-Transaction/GenerateMusterForm";
// import GenerateShiftScheduleForm from "./TMS-Transaction/GenerateShiftScheduleForm";
// import CompOffTable from "./TMS-Transaction/CompOffTable";
// import CompOffForm from "./TMS-Transaction/CompOffForm";
// import InOutFlagTable from "./TMS-Transaction/InOutFlagTable";
// import InOutFlagForm from "./TMS-Transaction/InOutFlagForm";
// import ManualPunchingForm from "./TMS-Transaction/ManualPunchingForm";
// import GradeWisePaymentDetailsTable from "./Payroll-Master/GradeWisePaymentDetailsTable";
// import GradeWisePaymentDetailsForm from "./Payroll-Master/GradeWisePaymentDetailsForm";
// import YearlyHolidayTable from "./Payroll-Master/YearlyHolidayTable";
// import YearlyHolidayForm from "./Payroll-Master/YearlyHolidayForm";
// import LeaveDetailsTable from "./Payroll-Master/LeaveDetailsTable";
// import LeaveDetailsForm from "./Payroll-Master/LeaveDetailsForm";
// import PayrollCalculationTables from "./Payroll-Master/PayrollCalculationTable";
// import PayrollCalculationForms from "./Payroll-Master/PayrollCalculationForm";
// import TrainingOnJobTable from "./Payroll-Master/TrainingOnJobTable";
// import TrainingOnJobForm from "./Payroll-Master/TrainingOnJobForm";
// import BreakdownTypeTable from "./Production-Master/BreakdownTypeTable";
// import BreakdownTypeForm from "./Production-Master/BreakdownTypeForm";
// import SectionTable from "./Production-Master/SectionTable";
// import SectionForm from "./Production-Master/SectionForm";
// import SectionWiseProcessTable from "./Production-Master/SectionWiseProcessTable";
// import SectionWiseProcessForm from "./Production-Master/SectionWiseProcessForm";
// import MachineProcessTable from "./Production-Master/MachineProcessTable";
// import MachineProcessForm from "./Production-Master/MachineProcessForm";

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
const WorkOrderIssueTable = Loadable(
  lazy(() => import("./Material-Transaction/WorkOrderIssueTable")),
);
const WorkOrderIssueForm = Loadable(
  lazy(() => import("./Material-Transaction/WorkOrderIssueForm")),
);

const WipMaterialAdjustmentTable = Loadable(
  lazy(() => import("./Material-Transaction/WipMaterialAdjustmentTable")),
);
const WipMaterialAdjustmentForm = Loadable(
  lazy(() => import("./Material-Transaction/WipMaterialAdjustmentForm")),
);

const SupplierScheduleTable = Loadable(
  lazy(() => import("./Material-Transaction/SupplierScheduleTable")),
);
const SupplierScheduleForm = Loadable(
  lazy(() => import("./Material-Transaction/SupplierScheduleForm")),
);

const SupplierBillsTable = Loadable(
  lazy(() => import("./Material-Transaction/SupplierBillsTable")),
);
const SupplierBillsForm = Loadable(
  lazy(() => import("./Material-Transaction/SupplierBillsForm")),
);

const PurchaseRequisitionTable = Loadable(
  lazy(() => import("./Material-Transaction/PurchaseRequisitionTable")),
);
const PurchaseRequisitionForm = Loadable(
  lazy(() => import("./Material-Transaction/PurchaseRequisitionForm")),
);

const PurchaseLineRejectionTable = Loadable(
  lazy(() => import("./Material-Transaction/PurchaseLineRejectionTable")),
);
const PurchaseLineRejectionForm = Loadable(
  lazy(() => import("./Material-Transaction/PurchaseLineRejectionForm")),
);

const ProductMovementSlipTable = Loadable(
  lazy(() => import("./Material-Transaction/ProductMovementSlipTable")),
);
const ProductMovementSlipForm = Loadable(
  lazy(() => import("./Material-Transaction/ProductMovementSlipForm")),
);

const OutwardChallanTable = Loadable(
  lazy(() => import("./Material-Transaction/OutwardChallanTable")),
);
const OutwardChallanForm = Loadable(
  lazy(() => import("./Material-Transaction/OutwardChallanForm")),
);

const MaterialStockAdjustmentTable = Loadable(
  lazy(() => import("./Material-Transaction/MaterialStockAdjustmentTable")),
);
const MaterialStockAdjustmentForm = Loadable(
  lazy(() => import("./Material-Transaction/MaterialStockAdjustmentForm")),
);

const MaterialReturnReceivedTable = Loadable(
  lazy(() => import("./Material-Transaction/MaterialReturnReceivedTable")),
);
const MaterialReturnReceivedForm = Loadable(
  lazy(() => import("./Material-Transaction/MaterialReturnReceivedForm")),
);

const MaterialRateContractTable = Loadable(
  lazy(() => import("./Material-Transaction/MaterialRateContractTable")),
);
const MaterialRateContractForm = Loadable(
  lazy(() => import("./Material-Transaction/MaterialRateContractForm")),
);

const MaterialIssueTable = Loadable(
  lazy(() => import("./Material-Transaction/MaterialIssueTable")),
);
const MaterialIssueForm = Loadable(
  lazy(() => import("./Material-Transaction/MaterialIssueForm")),
);

const JobworkStockAdjustmentTable = Loadable(
  lazy(() => import("./Material-Transaction/JobworkStockAdjustmentTable")),
);
const JobworkStockAdjustmentForm = Loadable(
  lazy(() => import("./Material-Transaction/JobworkStockAdjustmentForm")),
);

const GoodsReceiptNoteTable = Loadable(
  lazy(() => import("./Material-Transaction/GoodsReceiptNoteTable")),
);
const GoodsReceiptNoteForm = Loadable(
  lazy(() => import("./Material-Transaction/GoodsReceiptNoteForm")),
);

const GoodsReceiptInspectionTable = Loadable(
  lazy(() => import("./Material-Transaction/GoodsReceiptInspectionTable")),
);
const GoodsReceiptInspectionForm = Loadable(
  lazy(() => import("./Material-Transaction/GoodsReceiptInspectionForm")),
);

const CustomerWipAdjustmentTable = Loadable(
  lazy(() => import("./Material-Transaction/CustomerWipAdjustmentTable")),
);
const CustomerWipAdjustmentForm = Loadable(
  lazy(() => import("./Material-Transaction/CustomerWipAdjustmentForm")),
);

const CustomerStockAdjustmentTable = Loadable(
  lazy(() => import("./Material-Transaction/CustomerStockAdjustmentTable")),
);
const CustomerStockAdjustmentForm = Loadable(
  lazy(() => import("./Material-Transaction/CustomerStockAdjustmentForm")),
);

const AdditionalWorkOrderRequisitionTable = Loadable(
  lazy(
    () => import("./Material-Transaction/AdditionalWorkOrderRequisitionTable"),
  ),
);
const AdditionalWorkOrderRequisitionForm = Loadable(
  lazy(
    () => import("./Material-Transaction/AdditionalWorkOrderRequisitionForm"),
  ),
);

const MaterialRequisitionTable = Loadable(
  lazy(() => import("./Material-Transaction/MaterialRequisitionTable")),
);
const MaterialRequisitionForm = Loadable(
  lazy(() => import("./Material-Transaction/MaterialRequisitionForm")),
);
const TMSParameterTable = Loadable(
  lazy(() => import("./TMS-Master/TMSParameterTable")),
);
const TMSParameterForm = Loadable(
  lazy(() => import("./TMS-Master/TMSParameterForm")),
);

const RotationDetailsTable = Loadable(
  lazy(() => import("./TMS-Master/RotationDetailsTable")),
);
const RotationDetailsForm = Loadable(
  lazy(() => import("./TMS-Master/RotationDetailsForm")),
);

const GradeWiseRulesTable = Loadable(
  lazy(() => import("./TMS-Master/GradeWiseRulesTable")),
);
const GradeWiseRulesForm = Loadable(
  lazy(() => import("./TMS-Master/GradeWiseRulesForm")),
);

const OvertimeRulesTable = Loadable(
  lazy(() => import("./TMS-Master/OvertimeRulesTable")),
);
const OvertimeRulesForm = Loadable(
  lazy(() => import("./TMS-Master/OvertimeRulesForm")),
);

const AssignCardTable = Loadable(
  lazy(() => import("./TMS-Master/AssignCardTable")),
);
const AssignCardsForm = Loadable(
  lazy(() => import("./TMS-Master/AssignCardsForm")),
);

const ShiftDetailsTable = Loadable(
  lazy(() => import("./TMS-Master/ShiftDetailsTable")),
);
const ShiftDetailsForm = Loadable(
  lazy(() => import("./TMS-Master/ShiftDetailsForm")),
);

const ShiftScheduleTable = Loadable(
  lazy(() => import("./TMS-Transaction/ShiftScheduleTable")),
);
const ShiftScheduleForm = Loadable(
  lazy(() => import("./TMS-Transaction/ShiftScheduleForm")),
);

const ImportAttendanceTable = Loadable(
  lazy(() => import("./TMS-Transaction/ImportAttendanceTable")),
);
const ImportAttendanceForm = Loadable(
  lazy(() => import("./TMS-Transaction/ImportAttendanceForm")),
);

const TourDetailsTable = Loadable(
  lazy(() => import("./TMS-Transaction/TourDetailsTable")),
);
const TourDetailsForm = Loadable(
  lazy(() => import("./TMS-Transaction/TourDetailsForm")),
);

const OvertimeTable = Loadable(
  lazy(() => import("./TMS-Transaction/OvertimeTable")),
);
const OvertimeForm = Loadable(
  lazy(() => import("./TMS-Transaction/OvertimeForm")),
);

const ODDetailsTable = Loadable(
  lazy(() => import("./TMS-Transaction/ODDetailsTable")),
);
const ODDetailsForm = Loadable(
  lazy(() => import("./TMS-Transaction/ODDetailsForm")),
);

const LeaveApplicationTable = Loadable(
  lazy(() => import("./TMS-Transaction/LeaveApplicationTable")),
);
const LeaveApplicationForm = Loadable(
  lazy(() => import("./TMS-Transaction/LeaveApplicationForm")),
);

const LateComingTable = Loadable(
  lazy(() => import("./TMS-Transaction/LateComingTable")),
);
const LateComingForm = Loadable(
  lazy(() => import("./TMS-Transaction/LateComingForm")),
);

const InvalidPunchTable = Loadable(
  lazy(() => import("./TMS-Transaction/InvalidPunchTable")),
);
const InvalidPunchForm = Loadable(
  lazy(() => import("./TMS-Transaction/InvalidPunchForm")),
);

const ImportManualMusterTable = Loadable(
  lazy(() => import("./TMS-Transaction/ImportManualMusterTable")),
);
const GenerateMusterForm = Loadable(
  lazy(() => import("./TMS-Transaction/GenerateMusterForm")),
);
const GenerateShiftScheduleForm = Loadable(
  lazy(() => import("./TMS-Transaction/GenerateShiftScheduleForm")),
);

const CompOffTable = Loadable(
  lazy(() => import("./TMS-Transaction/CompOffTable")),
);
const CompOffForm = Loadable(
  lazy(() => import("./TMS-Transaction/CompOffForm")),
);

const InOutFlagTable = Loadable(
  lazy(() => import("./TMS-Transaction/InOutFlagTable")),
);
const InOutFlagForm = Loadable(
  lazy(() => import("./TMS-Transaction/InOutFlagForm")),
);

const ManualPunchingForm = Loadable(
  lazy(() => import("./TMS-Transaction/ManualPunchingForm")),
);

const GradeWisePaymentDetailsTable = Loadable(
  lazy(() => import("./Payroll-Master/GradeWisePaymentDetailsTable")),
);
const GradeWisePaymentDetailsForm = Loadable(
  lazy(() => import("./Payroll-Master/GradeWisePaymentDetailsForm")),
);

const YearlyHolidayTable = Loadable(
  lazy(() => import("./Payroll-Master/YearlyHolidayTable")),
);
const YearlyHolidayForm = Loadable(
  lazy(() => import("./Payroll-Master/YearlyHolidayForm")),
);

const LeaveDetailsTable = Loadable(
  lazy(() => import("./Payroll-Master/LeaveDetailsTable")),
);
const LeaveDetailsForm = Loadable(
  lazy(() => import("./Payroll-Master/LeaveDetailsForm")),
);

const PayrollCalculationTables = Loadable(
  lazy(() => import("./Payroll-Master/PayrollCalculationTable")),
);
const PayrollCalculationForms = Loadable(
  lazy(() => import("./Payroll-Master/PayrollCalculationForm")),
);

const TrainingOnJobTable = Loadable(
  lazy(() => import("./Payroll-Master/TrainingOnJobTable")),
);
const TrainingOnJobForm = Loadable(
  lazy(() => import("./Payroll-Master/TrainingOnJobForm")),
);
const BreakdownTypeTable = Loadable(
  lazy(() => import("./Production-Master/BreakdownTypeTable")),
);
const BreakdownTypeForm = Loadable(
  lazy(() => import("./Production-Master/BreakdownTypeForm")),
);

const SectionTable = Loadable(
  lazy(() => import("./Production-Master/SectionTable")),
);
const SectionForm = Loadable(
  lazy(() => import("./Production-Master/SectionForm")),
);

const SectionWiseProcessTable = Loadable(
  lazy(() => import("./Production-Master/SectionWiseProcessTable")),
);
const SectionWiseProcessForm = Loadable(
  lazy(() => import("./Production-Master/SectionWiseProcessForm")),
);

const MachineProcessTable = Loadable(
  lazy(() => import("./Production-Master/MachineProcessTable")),
);
const MachineProcessForm = Loadable(
  lazy(() => import("./Production-Master/MachineProcessForm")),
);
const BreakdownDetailTable = Loadable(
  lazy(() => import("./Production-Master/BreakdownDetailTable")),
);
const BreakdownDetailForm = Loadable(
  lazy(() => import("./Production-Master/BreakdownDetailForm")),
);

// 🔹 Machine Asset Group
const MachineAssetGroupTable = Loadable(
  lazy(() => import("./Production-Master/MachineAssetGroupTable")),
);
const MachineAssetGroupForm = Loadable(
  lazy(() => import("./Production-Master/MachineAssetGroupForm")),
);

// 🔹 Machine Asset Detail
const MachineAssetDetailTable = Loadable(
  lazy(() => import("./Production-Master/MachineAssetDetailTable")),
);
const MachineAssetDetailForm = Loadable(
  lazy(() => import("./Production-Master/MachineAssetDetailForm")),
);

// 🔹 Product Costing Parameters
const ProductCostingParameterTable = Loadable(
  lazy(() => import("./Production-Master/ProductCostingParameterTable")),
);
const ProductCostingParameterForm = Loadable(
  lazy(() => import("./Production-Master/ProductCostingParameterForm")),
);

const SectionWiseProductionDetailTable = Loadable(
  lazy(
    () => import("./Production-Transaction/SectionWiseProductionDetailTable"),
  ),
);
const SectionWiseProductionDetailForm = Loadable(
  lazy(
    () => import("./Production-Transaction/SectionWiseProductionDetailForm"),
  ),
);

// 🔹 Employee Consumption
const EmployeeConsumptionTable = Loadable(
  lazy(() => import("./Maintenance-Transaction/EmployeeConsumptionTable")),
);
const EmployeeConsumptionForm = Loadable(
  lazy(() => import("./Maintenance-Transaction/EmployeeConsumptionForm")),
);

// 🔹 Maintenance Category
const MaintenanceCategoryTable = Loadable(
  lazy(() => import("./Maintenance-Master/MaintenanceCategoryTable")),
);
const MaintenanceCategoryForm = Loadable(
  lazy(() => import("./Maintenance-Master/MaintenanceCategoryForm")),
);

// 🔹 Preventive Maintenance Scheduling
const PreventiveMaintenanceTable = Loadable(
  lazy(() => import("./Maintenance-Master/PreventiveMaintenanceTable")),
);
const PreventiveMaintenanceForm = Loadable(
  lazy(() => import("./Maintenance-Master/PreventiveMaintenanceForm")),
);

// 🔹 Root Cause Details
const RootCauseTable = Loadable(
  lazy(() => import("./Maintenance-Master/RootCauseTable")),
);
const RootCauseForm = Loadable(
  lazy(() => import("./Maintenance-Master/RootCauseForm")),
);

// 🔹 Maintenance Reason Master
const MaintenanceReasonTable = Loadable(
  lazy(() => import("./Maintenance-Master/MaintenanceReasonTable")),
);
const MaintenanceReasonForm = Loadable(
  lazy(() => import("./Maintenance-Master/MaintenanceReasonForm")),
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
  { path: "/material/customers-purchase-order-login-table", element: <CustomersPurchaseOrderLoginTable /> },
  { path: "/material/customers-purchase-order-login-form/add", element: <CustomersPurchaseOrderLogin /> },
  { path: "/material/customers-purchase-order-login-form/edit/:slipNo", element: <CustomersPurchaseOrderLogin /> },
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
  {
    path: "/material/production-breakdown-type-table",
    element: <BreakdownTypeTable />,
  },
  {
    path: "/material/production-breakdown-type-form/edit/:slipNo",
    element: <BreakdownTypeForm />,
  },
  {
    path: "/material/production-breakdown-type-form/add",
    element: <BreakdownTypeForm />,
  },
  {
    path: "/material/production-section-table",
    element: <SectionTable />,
  },
  {
    path: "/material/production-section-form/edit/:slipNo",
    element: <SectionForm />,
  },
  {
    path: "/material/production-section-form/add",
    element: <SectionForm />,
  },
  {
    path: "/material/production-sectionWise-process-table",
    element: <SectionWiseProcessTable />,
  },
  {
    path: "/material/production-sectionWise-process-form/edit/:slipNo",
    element: <SectionWiseProcessForm />,
  },
  {
    path: "/material/production-sectionWise-process-form/add",
    element: <SectionWiseProcessForm />,
  },
  {
    path: "/material/production-machine-process-table",
    element: <MachineProcessTable />,
  },
  {
    path: "/material/production-machine-process-form/edit/:slipNo",
    element: <MachineProcessForm />,
  },
  {
    path: "/material/production-machine-process-form/add",
    element: <MachineProcessForm />,
  },
  {
    path: "/material/production-breakdown-detail-table",
    element: <BreakdownDetailTable />,
  },
  {
    path: "/material/production-breakdown-detail-form/edit/:slipNo",
    element: <BreakdownDetailForm />,
  },
  {
    path: "/material/production-breakdown-detail-form/add",
    element: <BreakdownDetailForm />,
  },
  {
    path: "/material/production-machine-asset-group-table",
    element: <MachineAssetGroupTable />,
  },
  {
    path: "/material/production-machine-asset-group-form/edit/:slipNo",
    element: <MachineAssetGroupForm />,
  },
  {
    path: "/material/production-machine-asset-group-form/add",
    element: <MachineAssetGroupForm />,
  },
  {
    path: "/material/production-machine-asset-detail-table",
    element: <MachineAssetDetailTable />,
  },
  {
    path: "/material/production-machine-asset-detail-form/edit/:slipNo",
    element: <MachineAssetDetailForm />,
  },
  {
    path: "/material/production-machine-asset-detail-form/add",
    element: <MachineAssetDetailForm />,
  },
  {
    path: "/material/production-product-costing-parameter-table",
    element: <ProductCostingParameterTable />,
  },
  {
    path: "/material/production-product-costing-parameter-form/edit/:slipNo",
    element: <ProductCostingParameterForm />,
  },
  {
    path: "/material/production-product-costing-parameter-form/add",
    element: <ProductCostingParameterForm />,
  },
  {
    path: "/material/production-section-wise-production-detail-table",
    element: <SectionWiseProductionDetailTable />,
  },
  {
    path: "/material/production-section-wise-production-detail-form/edit/:slipNo",
    element: <SectionWiseProductionDetailForm />,
  },
  {
    path: "/material/production-section-wise-production-detail-form/add",
    element: <SectionWiseProductionDetailForm />,
  },
  {
    path: "/material/maintenance-employee-consumption-table",
    element: <EmployeeConsumptionTable />,
  },
  {
    path: "/material/maintenance-employee-consumption-form/edit/:slipNo",
    element: <EmployeeConsumptionForm />,
  },
  {
    path: "/material/maintenance-employee-consumption-form/add",
    element: <EmployeeConsumptionForm />,
  },
  {
    path: "/material/maintenance-maintenance-category-table",
    element: <MaintenanceCategoryTable />,
  },
  {
    path: "/material/maintenance-maintenance-category-form/edit/:slipNo",
    element: <MaintenanceCategoryForm />,
  },
  {
    path: "/material/maintenance-maintenance-category-form/add",
    element: <MaintenanceCategoryForm />,
  },
  {
    path: "/material/maintenance-preventive-maintenance-table",
    element: <PreventiveMaintenanceTable />,
  },
  {
    path: "/material/maintenance-preventive-maintenance-form/edit/:slipNo",
    element: <PreventiveMaintenanceForm />,
  },
  {
    path: "/material/maintenance-preventive-maintenance-form/add",
    element: <PreventiveMaintenanceForm />,
  },
  {
    path: "/material/maintenance-root-cause-table",
    element: <RootCauseTable />,
  },
  {
    path: "/material/maintenance-root-cause-form/edit/:slipNo",
    element: <RootCauseForm />,
  },
  {
    path: "/material/maintenance-root-cause-form/add",
    element: <RootCauseForm />,
  },
  {
    path: "/material/maintenance-reason-table",
    element: <MaintenanceReasonTable />,
  },
  {
    path: "/material/maintenance-reason-form/edit/:slipNo",
    element: <MaintenanceReasonForm />,
  },
  {
    path: "/material/maintenance-reason-form/add",
    element: <MaintenanceReasonForm />,
  },
  {
    path: "/material/maintenance-breakdown-slip-table",
    element: <BreakdownSlipTable />,
  },
  {
    path: "/material/maintenance-breakdown-slip-form/edit/:slipNo",
    element: <BreakdownSlipForm />,
  },
  {
    path: "/material/maintenance-breakdown-slip-form/add",
    element: <BreakdownSlipForm />,
  },
  {
    path: "/material/maintenance-breakdown-start-table",
    element: <BreakdownStartTable />,
  },
  {
    path: "/material/maintenance-breakdown-start-form/edit/:slipNo",
    element: <BreakdownStartForm />,
  },
  {
    path: "/material/maintenance-breakdown-start-form/add",
    element: <BreakdownStartForm />,
  },
  {
    path: "/material/maintenance-completion-entry-table",
    element: <CompletionEntryTable />,
  },
  {
    path: "/material/maintenance-completion-entry-form/edit/:slipNo",
    element: <CompletionEntryForm />,
  },
  {
    path: "/material/maintenance-completion-entry-form/add",
    element: <CompletionEntryForm />,
  },
  {
    path: "/material/maintenance-preventive-slip-table",
    element: <PreventiveSlipTable />,
  },
  {
    path: "/material/maintenance-preventive-slip-form/edit/:slipNo",
    element: <PreventiveSlipForm />,
  },
  {
    path: "/material/maintenance-preventive-slip-form/add",
    element: <PreventiveSlipForm />,
  },
  {
    path: "/material/maintenance-spares-consumption-table",
    element: <SparesConsumptionTable />,
  },
  {
    path: "/material/maintenance-spares-consumption-form/edit/:slipNo",
    element: <SparesConsumptionForm />,
  },
  {
    path: "/material/maintenance-spares-consumption-form/add",
    element: <SparesConsumptionForm />,
  },
  {
    path: "/material/system-admin-login-details-table",
    element: <LoginDetailsTable />,
  },
  {
    path: "/material/system-admin-login-details-form/edit/:slipNo",
    element: <LoginDetailsForm />,
  },
  {
    path: "/material/system-admin-login-details-form/add",
    element: <LoginDetailsForm />,
  },
  {
    path: "/material/system-admin-login-parameter-table",
    element: <LoginParameterTable />,
  },
  {
    path: "/material/system-admin-login-parameter-form/edit/:slipNo",
    element: <LoginParameterForm />,
  },
  {
    path: "/material/system-admin-login-parameter-form/add",
    element: <LoginParameterForm />,
  },
  {
    path: "/material/system-admin-activity-report-table",
    element: <ActivityReportTable />,
  },
  {
    path: "/material/system-admin-new-role-table",
    element: <NewRoleTable />,
  },
  {
    path: "/material/system-admin-new-role-form/edit/:slipNo",
    element: <NewRoleForm />,
  },
  {
    path: "/material/system-admin-new-role-form/add",
    element: <NewRoleForm />,
  },
  {
    path: "/material/TMS-card-details-table",
    element: <CardDetailsTable />,
  },
  {
    path: "/material/TMS-card-details-form/edit/:slipNo",
    element: <CardDetailsForm />,
  },
  {
    path: "/material/TMS-card-details-form/add",
    element: <CardDetailsForm />,
  },
  {
    path: "/material/TMS-attendance-status-table",
    element: <AttendanceStatusTable />,
  },
  {
    path: "/material/TMS-route-table",
    element: <RouteTable />,
  },
  {
    path: "/material/TMS-route-form/edit/:slipNo",
    element: <RouteForm />,
  },
  {
    path: "/material/TMS-route-form/add",
    element: <RouteForm />,
  },
  {
    path: "/material/TQM-critical-inspection-table",
    element: <CriticalInspectionTable />,
  },
  {
    path: "/material/TQM-critical-inspection-form/edit/:slipNo",
    element: <CriticalInspectionForm />,
  },
  {
    path: "/material/TQM-critical-inspection-form/add",
    element: <CriticalInspectionForm />,
  },
  {
    path: "/material/TQM-customer-complaints-table",
    element: <CustomerComplaintsTable />,
  },
  {
    path: "/material/TQM-customer-complaints-form/edit/:slipNo",
    element: <CustomerComplaintsForm />,
  },
  {
    path: "/material/TQM-customer-complaints-form/add",
    element: <CustomerComplaintsForm />,
  },
  {
    path: "/material/TQM-customer-satisfaction-table",
    element: <CustomerSatisfactionTable />,
  },
  {
    path: "/material/TQM-customer-satisfaction-form/edit/:slipNo",
    element: <CustomerSatisfactionForm />,
  },
  {
    path: "/material/TQM-customer-satisfaction-form/add",
    element: <CustomerSatisfactionForm />,
  },
  {
    path: "/material/TQM-dock-audit-plan-table",
    element: <DockAuditPlanTable />,
  },
  {
    path: "/material/TQM-dock-audit-plan-form/edit/:slipNo",
    element: <DockAuditPlanForm />,
  },
  {
    path: "/material/TQM-dock-audit-plan-form/add",
    element: <DockAuditPlanForm />,
  },
  {
    path: "/material/TQM-first-piece-approval-table",
    element: <FirstPieceApprovalTable />,
  },
  {
    path: "/material/TQM-first-piece-approval-form/edit/:slipNo",
    element: <FirstPieceApprovalForm />,
  },
  {
    path: "/material/TQM-first-piece-approval-form/add",
    element: <FirstPieceApprovalForm />,
  },
  {
    path: "/material/TQM-Iso-document-table",
    element: <IsoDocumentTable />,
  },
  {
    path: "/material/TQM-Iso-document-form/edit/:slipNo",
    element: <IsoDocumentForm />,
  },
  {
    path: "/material/TQM-Iso-document-form/add",
    element: <IsoDocumentForm />,
  },
  {
    path: "/material/TQM-Pre-dispatch-inspection-details-table",
    element: <PreDispatchInspectionDetailsTable />,
  },
  {
    path: "/material/TQM-Pre-dispatch-inspection-details-form/edit/:slipNo",
    element: <PreDispatchInspectionDetailsForm />,
  },
  {
    path: "/material/TQM-Pre-dispatch-inspection-details-form/add",
    element: <PreDispatchInspectionDetailsForm />,
  },
  {
    path: "/material/TQM-Pre-dispatch-inspection-entry-table",
    element: <PreDispatchInspectionEntryTable />,
  },
  {
    path: "/material/TQM-Pre-dispatch-inspection-entry-form/edit/:slipNo",
    element: <PreDispatchInspectionEntryForm />,
  },
  {
    path: "/material/TQM-Pre-dispatch-inspection-entry-form/add",
    element: <PreDispatchInspectionEntryForm />,
  },
  {
    path: "/material/TQM-quality-defect-master-table",
    element: <QualityDefectMasterTable />,
  },
  {
    path: "/material/TQM-quality-defect-master-form/edit/:slipNo",
    element: <QualityDefectMasterForm />,
  },
  {
    path: "/material/TQM-quality-defect-master-form/add",
    element: <QualityDefectMasterForm />,
  },
  {
    path: "/material/TQM-quality-defect-type-table",
    element: <QualityDefectTypeTable />,
  },
  {
    path: "/material/TQM-quality-defect-type-form/edit/:slipNo",
    element: <QualityDefectTypeForm />,
  },
  {
    path: "/material/TQM-quality-defect-type-form/add",
    element: <QualityDefectTypeForm />,
  },
  {
    path: "/material/TQM-sampling-plan-table",
    element: <SamplingPlanTable />,
  },
  {
    path: "/material/TQM-sampling-plan-form/edit/:slipNo",
    element: <SamplingPlanForm />,
  },
  {
    path: "/material/TQM-sampling-plan-form/add",
    element: <SamplingPlanForm />,
  },
  {
    path: "/material/TQM-test-master-table",
    element: <TestMasterTable />,
  },
  {
    path: "/material/TQM-test-master-form/edit/:slipNo",
    element: <TestMasterForm />,
  },
  {
    path: "/material/TQM-test-master-form/add",
    element: <TestMasterForm />,
  },
  {
    path: "/material/finance-asset-register-entry-table",
    element: <AssetRegisterEntryTable />,
  },
  {
    path: "/material/finance-asset-register-entry-form/edit/:slipNo",
    element: <AssetRegisterEntryForm />,
  },
  {
    path: "/material/finance-asset-register-entry-form/add",
    element: <AssetRegisterEntryForm />,
  },
  {
    path: "/material/finance-bank-receipt-table",
    element: <BankReceiptTable />,
  },
  {
    path: "/material/finance-bank-receipt-form/edit/:slipNo",
    element: <BankReceiptForm />,
  },
  {
    path: "/material/finance-bank-receipt-form/add",
    element: <BankReceiptForm />,
  },
  {
    path: "/material/finance-bill-passing-table",
    element: <BillPassingTable />,
  },
  {
    path: "/material/finance-bill-passing-form/edit/:slipNo",
    element: <BillPassingForm />,
  },
  {
    path: "/material/finance-bill-passing-form/add",
    element: <BillPassingForm />,
  },
  {
    path: "/material/finance-cash-flow-provision-table",
    element: <CashFlowProvisionTable />,
  },
  {
    path: "/material/finance-cash-flow-provision-form/edit/:slipNo",
    element: <CashFlowProvisionForm />,
  },
  {
    path: "/material/finance-cash-flow-provision-form/add",
    element: <CashFlowProvisionForm />,
  },
  {
    path: "/material/finance-cash-payment-table",
    element: <CashPaymentTable />,
  },
  {
    path: "/material/finance-cash-payment-form/edit/:slipNo",
    element: <CashPaymentForm />,
  },
  {
    path: "/material/finance-cash-payment-form/add",
    element: <CashPaymentForm />,
  },
  {
    path: "/material/finance-cash-receipt-table",
    element: <CashReceiptTable />,
  },
  {
    path: "/material/finance-cash-receipt-form/edit/:slipNo",
    element: <CashReceiptForm />,
  },
  {
    path: "/material/finance-cash-receipt-form/add",
    element: <CashReceiptForm />,
  },
  {
    path: "/material/finance-credit-note-table",
    element: <CreditNoteTable />,
  },
  {
    path: "/material/finance-credit-note-form/edit/:slipNo",
    element: <CreditNoteForm />,
  },
  {
    path: "/material/finance-credit-note-form/add",
    element: <CreditNoteForm />,
  },
  {
    path: "/material/finance-dbk-master-entry-table",
    element: <DbkMasterEntryTable />,
  },
  {
    path: "/material/finance-dbk-master-entry-form/edit/:slipNo",
    element: <DbkMasterEntryForm />,
  },
  {
    path: "/material/finance-dbk-master-entry-form/add",
    element: <DbkMasterEntryForm />,
  },
  {
    path: "/material/finance-debit-note-table",
    element: <DebitNoteTable />,
  },
  {
    path: "/material/finance-debit-note-form/edit/:slipNo",
    element: <DebitNoteForm />,
  },
  {
    path: "/material/finance-debit-note-form/add",
    element: <DebitNoteForm />,
  },
  {
    path: "/material/finance-journal-entry-table",
    element: <JournalEntryTable />,
  },
  {
    path: "/material/finance-journal-entry-form/edit/:slipNo",
    element: <JournalEntryForm />,
  },
  {
    path: "/material/finance-journal-entry-form/add",
    element: <JournalEntryForm />,
  },
  {
    path: "/material/finance-on-account-request-table",
    element: <OnAccountRequestTable />,
  },
  {
    path: "/material/finance-on-account-request-form/edit/:slipNo",
    element: <OnAccountRequestForm />,
  },
  {
    path: "/material/finance-on-account-request-form/add",
    element: <OnAccountRequestForm />,
  },
  {
    path: "/material/finance-payment-request-table",
    element: <PaymentRequestTable />,
  },
  {
    path: "/material/finance-payment-request-form/edit/:slipNo",
    element: <PaymentRequestForm />,
  },
  {
    path: "/material/finance-payment-request-form/add",
    element: <PaymentRequestForm />,
  },
  {
    path: "/material/finance-RoDTEP-master-entry-table",
    element: <RoDTEPMasterEntryTable />,
  },
  {
    path: "/material/finance-RoDTEP-master-entry-form/edit/:slipNo",
    element: <RoDTEPMasterEntryForm />,
  },
  {
    path: "/material/finance-RoDTEP-master-entry-form/add",
    element: <RoDTEPMasterEntryForm />,
  },
  {
    path: "/material/finance-sales-voucher-table",
    element: <SalesVoucherTable />,
  },
  {
    path: "/material/finance-sales-voucher-form/edit/:slipNo",
    element: <SalesVoucherForm />,
  },
  {
    path: "/material/finance-sales-voucher-form/add",
    element: <SalesVoucherForm />,
  },
  {
    path: "/material/finance-supplier-bill-table",
    element: <SupplierBillTable />,
  },
  {
    path: "/material/finance-supplier-bill-form/edit/:slipNo",
    element: <SupplierBillForm />,
  },
  {
    path: "/material/finance-supplier-bill-form/add",
    element: <SupplierBillForm />,
  },
  {
    path: "/material/finance-supplier-bills-multiple-tax-table",
    element: <SupplierBillsMultipleTaxTable />,
  },
  {
    path: "/material/finance-supplier-bills-multiple-tax-form/edit/:slipNo",
    element: <SupplierBillsMultipleTaxForm />,
  },
  {
    path: "/material/finance-supplier-bills-multiple-tax-form/add",
    element: <SupplierBillsMultipleTaxForm />,
  },
  {
    path: "/material/finance-bank-details-table",
    element: <BankDetailsTable />,
  },
  {
    path: "/material/finance-bank-details-form/edit/:slipNo",
    element: <BankDetailsForm />,
  },
  {
    path: "/material/finance-bank-details-form/add",
    element: <BankDetailsForm />,
  },
  {
    path: "/material/finance-bank-reconciliation-close-table",
    element: <BankReconciliationCloseTable />,
  },
  {
    path: "/material/finance-bank-reconciliation-close-form/edit/:slipNo",
    element: <BankReconciliationCloseForm />,
  },
  {
    path: "/material/finance-bank-reconciliation-close-form/add",
    element: <BankReconciliationCloseForm />,
  },
  {
    path: "/material/finance-bank-reconciliation-master-table",
    element: <BankReconciliationMasterTable />,
  },
  {
    path: "/material/finance-bank-reconciliation-master-form/edit/:slipNo",
    element: <BankReconciliationMasterForm />,
  },
  {
    path: "/material/finance-bank-reconciliation-master-form/add",
    element: <BankReconciliationMasterForm />,
  },
  {
    path: "/material/finance-bank-reconciliation-untagging-table",
    element: <BankReconciliationUntaggingTable />,
  },
  {
    path: "/material/finance-bank-reconciliation-untagging-form/edit/:slipNo",
    element: <BankReconciliationUntaggingForm />,
  },
  {
    path: "/material/finance-bank-reconciliation-untagging-form/add",
    element: <BankReconciliationUntaggingForm />,
  },
  {
    path: "/material/finance-cheque-opening-entry-table",
    element: <ChequeOpeningEntryTable />,
  },
  {
    path: "/material/finance-cheque-opening-entry-form/edit/:slipNo",
    element: <ChequeOpeningEntryForm />,
  },
  {
    path: "/material/finance-cheque-opening-entry-form/add",
    element: <ChequeOpeningEntryForm />,
  },
  {
    path: "/material/finance-close-finalization-table",
    element: <CloseFinalizationTable />,
  },
  {
    path: "/material/finance-close-finalization-form/edit/:slipNo",
    element: <CloseFinalizationForm />,
  },
  {
    path: "/material/finance-close-finalization-form/add",
    element: <CloseFinalizationForm />,
  },
  {
    path: "/material/finance-close-financial-year-table",
    element: <CloseFinancialYearTable />,
  },
  {
    path: "/material/finance-close-financial-year-form/edit/:slipNo",
    element: <CloseFinancialYearForm />,
  },
  {
    path: "/material/finance-close-financial-year-form/add",
    element: <CloseFinancialYearForm />,
  },
  {
    path: "/material/finance-creditors-billwise-entry-table",
    element: <CreditorsBillwiseEntryTable />,
  },
  {
    path: "/material/finance-creditors-billwise-entry-form/edit/:slipNo",
    element: <CreditorsBillwiseEntryForm />,
  },
  {
    path: "/material/finance-creditors-billwise-entry-form/add",
    element: <CreditorsBillwiseEntryForm />,
  },
  {
    path: "/material/finance-daily-cash-close-table",
    element: <DailyCashCloseTable />,
  },
  {
    path: "/material/finance-daily-cash-close-form/edit/:slipNo",
    element: <DailyCashCloseForm />,
  },
  {
    path: "/material/finance-daily-cash-close-form/add",
    element: <DailyCashCloseForm />,
  },
  {
    path: "/material/finance-debtors-billwise-entry-table",
    element: <DebtorsBillwiseEntryTable />,
  },
  {
    path: "/material/finance-debtors-billwise-entry-form/edit/:slipNo",
    element: <DebtorsBillwiseEntryForm />,
  },
  {
    path: "/material/finance-debtors-billwise-entry-form/add",
    element: <DebtorsBillwiseEntryForm />,
  },
  {
    path: "/material/finance-depreciation-parameter-table",
    element: <DepreciationParameterTable />,
  },
  {
    path: "/material/finance-depreciation-parameter-form/edit/:slipNo",
    element: <DepreciationParameterForm />,
  },
  {
    path: "/material/finance-depreciation-parameter-form/add",
    element: <DepreciationParameterForm />,
  },
  {
    path: "/material/finance-employee-advance-table",
    element: <EmployeeAdvanceTable />,
  },
  {
    path: "/material/finance-employee-advance-form/edit/:slipNo",
    element: <EmployeeAdvanceForm />,
  },
  {
    path: "/material/finance-employee-advance-form/add",
    element: <EmployeeAdvanceForm />,
  },
  {
    path: "/material/finance-general-ledger-table",
    element: <GeneralLedgerTable />,
  },
  {
    path: "/material/finance-general-ledger-form/edit/:slipNo",
    element: <GeneralLedgerForm />,
  },
  {
    path: "/material/finance-general-ledger-form/add",
    element: <GeneralLedgerForm />,
  },
  {
    path: "/material/finance-group-details-table",
    element: <GroupDetailsTable />,
  },
  {
    path: "/material/finance-group-details-form/edit/:slipNo",
    element: <GroupDetailsForm />,
  },
  {
    path: "/material/finance-group-details-form/add",
    element: <GroupDetailsForm />,
  },
  {
    path: "/material/finance-item-details-table",
    element: <FinanceItemDetailsTable />,
  },
  {
    path: "/material/finance-item-details-form/edit/:slipNo",
    element: <FinanceItemDetailsForm />,
  },
  {
    path: "/material/finance-item-details-form/add",
    element: <FinanceItemDetailsForm />,
  },
  {
    path: "/material/finance-monthwise-ledger-close-table",
    element: <MonthwiseLedgerCloseTable />,
  },
  {
    path: "/material/finance-monthwise-ledger-close-form/edit/:slipNo",
    element: <MonthwiseLedgerCloseForm />,
  },
  {
    path: "/material/finance-monthwise-ledger-close-form/add",
    element: <MonthwiseLedgerCloseForm />,
  },
  {
    path: "/material/finance-opening-balance-table",
    element: <OpeningBalanceTable />,
  },
  {
    path: "/material/finance-opening-balance-form/edit/:slipNo",
    element: <OpeningBalanceForm />,
  },
  {
    path: "/material/finance-opening-balance-form/add",
    element: <OpeningBalanceForm />,
  },
  {
    path: "/material/finance-schedule-details-table",
    element: <ScheduleDetailsTable />,
  },
  {
    path: "/material/finance-schedule-details-form/edit/:slipNo",
    element: <ScheduleDetailsForm />,
  },
  {
    path: "/material/finance-schedule-details-form/add",
    element: <ScheduleDetailsForm />,
  },
  {
    path: "/material/finance-sub-group-details-table",
    element: <SubGroupDetailsTable />,
  },
  {
    path: "/material/finance-sub-group-details-form/edit/:slipNo",
    element: <SubGroupDetailsForm />,
  },
  {
    path: "/material/finance-sub-group-details-form/add",
    element: <SubGroupDetailsForm />,
  },
   {
    path: "/material/finance-TDS-parameter-table",
    element: <TDSParameterTable />,
  },
  {
    path: "/material/finance-TDS-parameter-form/edit/:slipNo",
    element: <TDSParameterForm />,
  },
  {
    path: "/material/finance-TDS-parameter-form/add",
    element: <TDSParameterForm />,
  },
];

export default materialRoutes;
