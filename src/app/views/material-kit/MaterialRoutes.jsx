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
const AppAutoComplete = Loadable(lazy(() => import("./auto-complete/AppAutoComplete")));
const AppExpansionPanel = Loadable(lazy(() => import("./expansion-panel/AppExpansionPanel")));
const SalesmanForm = Loadable(lazy(() => import("./forms/SalesForm")));
const SalesmanTable = Loadable(lazy(() => import("./forms/SalesmanDetailForm/SalesmanTable")));
const CustomerDetailForm = Loadable(lazy(() => import("./forms/CustomerDetailForm/CustomerDetailForm")));
const CustomerDetailTable = Loadable(lazy(() => import("./forms/CustomerDetailForm/CustomerDetailTable")));
const InvoiceForm = Loadable(lazy(() => import("./Sales-Transaction/InvoiceForm")));
const InvoiceTable = Loadable(lazy(() => import("./Sales-Transaction/InvoiceTable")));
const PackingSlipForm = Loadable(lazy(() => import("./Sales-Transaction/PackingSlipForm")));
const PackingSlipTable = Loadable(lazy(() => import("./Sales-Transaction/PackingSlipTable")));
const ProformaInvoiceForm = Loadable(lazy(() => import("./Sales-Transaction/ProformaInvoiceForm")));
const ProformaInvoiceTable = Loadable(lazy(() => import("./Sales-Transaction/ProformaInvoiceTable")));
const ExportDocumentsForm = Loadable(lazy(() => import("./Sales-Transaction/ExportDocumentsForm")));
const ExportDocumentsTable = Loadable(lazy(() => import("./Sales-Transaction/ExportDocumentsTable")));
const CustomerScheduleDetail = Loadable(lazy(() => import("./Sales-Transaction/CustomerScheduleDetail")));
const CustomerScheduleTable = Loadable(lazy(() => import("./Sales-Transaction/CustomerScheduleTable")));
const LinkInvoiceToExportSchemes = Loadable(lazy(() => import("./Sales-Transaction/LinkInvoiceToExportSchemes")));
const LinkInvoiceToExportSchemesTable = Loadable(lazy(() => import("./Sales-Transaction/LinkInvoiceToExportSchemesTable")));
const EnquiryForm = Loadable(lazy(() => import("./Sales-Transaction/EnquiryForm")));
const EnquiryTable = Loadable(lazy(() => import("./Sales-Transaction/EnquiryTable")));
const EnquiryLoginEntryForm = Loadable(lazy(() => import("./Sales-Transaction/EnquiryLoginEntryForm")));
const EnquiryLoginEntryTable = Loadable(lazy(() => import("./Sales-Transaction/EnquiryLoginEntryTable")));


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
  { path: "/material/activity-reports-rights-table", element: <ActivityReportsRightsTable /> },
  { path: "/material/customers-purchase-order-login", element: <CustomersPurchaseOrderLogin /> },
  { path: "/material/packing-slip-table", element: <PackingSlipTable /> },
  { path: "/material/packing-slip/add", element: <PackingSlipForm /> },
  { path: "/material/packing-slip/edit/:slipNo", element: <PackingSlipForm /> },
  { path: "/material/sales-invoice-table", element: <InvoiceTable /> },
  { path: "/material/sales-invoice-form/add", element: <InvoiceForm /> },
  { path: "/material/sales-invoice-form/edit/:slipNo", element: <InvoiceForm /> },
  { path: "/material/sales-proforma-invoice-table", element: <ProformaInvoiceTable /> },
  { path: "/material/sales-proforma-invoice-form/add", element: <ProformaInvoiceForm /> },
  { path: "/material/sales-proforma-invoice-form/edit/:slipNo", element: <ProformaInvoiceForm /> },
  { path: "/material/sales-export-documents-table", element: <ExportDocumentsTable /> },
  { path: "/material/sales-export-documents-form/add", element: <ExportDocumentsForm /> },
  { path: "/material/sales-export-documents-form/edit/:slipNo", element: <ExportDocumentsForm /> },
  { path: "/material/sales-customer-schedule-detail-table", element: <CustomerScheduleTable /> },
  { path: "/material/sales-customer-schedule-detail-form/add", element: <CustomerScheduleDetail /> },
  { path: "/material/sales-customer-schedule-detail-form/edit/:slipNo", element: <CustomerScheduleDetail /> },
  { path: "/material/sales-link-invoice-to-export-schemes-table", element: <LinkInvoiceToExportSchemesTable /> },
  { path: "/material/sales-link-invoice-to-export-schemes-form/add", element: <LinkInvoiceToExportSchemes /> },
  { path: "/material/sales-link-invoice-to-export-schemes-form/edit/:slipNo", element: <LinkInvoiceToExportSchemes /> },
  { path: "/material/sales-enquiry-table", element: <EnquiryTable /> },
  { path: "/material/sales-enquiry-form/add", element: <EnquiryForm /> },
  { path: "/material/sales-enquiry-form/edit/:slipNo", element: <EnquiryForm /> },
  { path: "/material/sales-enquiry-login-entry-table", element: <EnquiryLoginEntryTable /> },
  { path: "/material/sales-enquiry-login-entry-form/add", element: <EnquiryLoginEntryForm /> },
  { path: "/material/sales-enquiry-login-entry-form/edit/:slipNo", element: <EnquiryLoginEntryForm /> },
];

export default materialRoutes;
