// sales/orderActions.js

import { customToast } from "../../../shared/func";
import {
  getCustomersList,
  handleAdminEntityProfile,
  handleAdminEntityLogs,
  handleAutoMapping,
  handleConnectorsData,
  handleSearchData,
  handleEmailTemplate,
  handleReportTemplate,
  PostItemMappingService,
  postFetchMatchingItem,
  getItemInfo,
  postPrintInvoice,
  getSearchItems,
  handleOrgAddress,
  postFetchPendingItem,
  getOrderList,
  getOrderListId,
  handleCustomerItemEdit,
  getFailedTransaction,
  postCreateOrder,
  postFetchCustomerData,
  getInvoiceData,
  postFetchPurchaseList,
  postFetchAllStocksService,
  postFetchMappedStockItemsService,
  handleAdminEntityZone,
  handleAdminChildZone,
  handleAdminDMSFileDownload,
  handleAdminMyUniverse,
  handleAdminDMSFileUpload,
  handleAdminItemMasters,
  handleAdminShowUsers,
  handleAdminDeleteUser,
  handleAdminCheckUser,
  handleOrgDetailService,
  handleReportItemCols,
  handleReportItemGroup,
  handleAdminEditUsers,
  handleOrgEntityService,
  handleAdminTaxData,
  handleAdminAvailableZones,
  handleAdminZonesHierarchy,
} from "../../apis/sales/order";

export const actions = {
  FETCH_CUSTOMER_LIST_START: "FETCH_CUSTOMER_LIST_START",
  FETCH_CUSTOMER_LIST_SUCCESS: "FETCH_CUSTOMER_LIST_SUCCESS",
  FETCH_CUSTOMER_LIST_ERROR: "FETCH_CUSTOMER_LIST_ERROR",

  FETCH_ORDER_INFO_START: "FETCH_ORDER_INFO_START",
  FETCH_ORDER_INFO_SUCCESS: "FETCH_ORDER_INFO_SUCCESS",
  FETCH_ORDER_INFO_ERROR: "FETCH_ORDER_INFO_ERROR",

  FETCH_ITEM_INFO_START: "FETCH_ITEM_INFO_START",
  FETCH_ITEM_INFO_SUCCESS: "FETCH_ITEM_INFO_SUCCESS",
  FETCH_ITEM_INFO_ERROR: "FETCH_ITEM_INFO_ERROR",

  FETCH_SEARCH_ITEMS_START: "FETCH_SEARCH_ITEMS_START",
  FETCH_SEARCH_ITEMS_SUCCESS: "FETCH_SEARCH_ITEMS_SUCCESS",
  FETCH_SEARCH_ITEMS_ERROR: "FETCH_SEARCH_ITEMS_ERROR",

  FETCH_ORDER_INFO_START_ID: "FETCH_ORDER_INFO_START_ID",
  FETCH_ORDER_INFO_SUCCESS_ID: "FETCH_ORDER_INFO_SUCCESS_ID",
  FETCH_ORDER_INFO_ERROR_ID: "FETCH_ORDER_INFO_ERROR_ID",

  FETCH_ORDER_TRANSACTION_ID: "FETCH_ORDER_TRANSACTION_ID",
  FETCH_ORDER_SUCCES_TRANSACTION_ID: "FETCH_ORDER_SUCCES_TRANSACTION_ID",
  FETCH_ORDER_FAILED_TRANSACTION_ID: "FETCH_ORDER_FAILED_TRANSACTION_ID",

  POST_ORDER: "POST_ORDER",
  POST_ORDER_SUCCESS: "POST_ORDER_SUCCESS",
  POST_ORDER_FAILURE: "POST_ORDER_FAILURE",

  INVOICE_DATA: "INVOICE_DATA",
  INVOICE_DATA_SUCCESS: "INVOICE_DATA_SUCCESS",
  INVOICE_DATA_FAILURE: "INVOICE_DATA_FAILURE",

  CUSTOMER_REORDER_DATA: "CUSTOMER_REORDER_DATA",
  CUSTOMER_REORDER_SUCCESS: "CUSTOMER_REORDER_SUCCESS",
  CUSTOMER_REORDER_FAILURE: "CUSTOMER_REORDER_FAILURE",

  PURCHASE_LIST_DATA: "PURCHASE_LIST_DATA",
  PURCHASE_LIST_SUCCESS: "PURCHASE_LIST_SUCCESS",
  PURCHASE_LIST_NOT_FOUND: "PURCHASE_LIST_NOT_FOUND",
  PURCHASE_LIST_FAILURE: "PURCHASE_LIST_FAILURE",

  ALL_STOCKS_SERVICES_DATA: "ALL_STOCKS_SERVICES_DATA",
  ALL_STOCKS_SERVICES_SUCCESS: "ALL_STOCKS_SERVICES_SUCCESS",
  ALL_STOCKS_SERVICES_FAILURE: "ALL_STOCKS_SERVICES_FAILURE",

  MAPPED_STOCK_DATA: "MAPPED_STOCK_DATA",
  MAPPED_STOCK_SUCCESS: "MAPPED_STOCK_SUCCESS",
  MAPPED_STOCK_FAILURE: "MAPPED_STOCK_FAILURE",

  PENDINGITEM_DATA: "PENDINGITEM_DATA",
  PENDINGITEM_SUCCESS: "PENDINGITEM_SUCCESS",
  PENDINGITEM_FAILURE: "PENDINGITEM_FAILURE",

  MATCHINGITEM_DATA: "MATCHINGITEM_DATA",
  MATCHINGITEM_SUCCESS: "MATCHINGITEM_SUCCESS",
  MATCHINGITEM_FAILURE: "MATCHINGITEM_FAILURE",

  PRINT_INVOICE_DATA: "PRINT_INVOICE_DATA",
  PRINT_INVOICE_SUCCESS: "PRINT_INVOICE_SUCCESS",
  PRINT_INVOICE_FAILURE: "PRINT_INVOICE_FAILURE",

  PRINT_TEXT_DATA: "PRINT_TEXT_DATA",
  PRINT_TEXT_SUCCESS: "PRINT_TEXT_SUCCESS",
  PRINT_TEXT_FAILURE: "PRINT_TEXT_FAILURE",

  SCHEDULER_FLAG_DATA: "SCHEDULER_FLAG_DATA",
  SCHEDULER_FLAG_SUCCESS: "SCHEDULER_FLAG_SUCCESS",
  SCHEDULER_FLAG_FAILURE: "SCHEDULER_FLAG_FAILURE",

  //  AMDMIN PANNEL

  ENTITY_PROFILE_DATA: "ENTITY_PROFILE_DATA",
  ENTITY_PROFILE_SUCCESS: "ENTITY_PROFILE_SUCCESS",
  ENTITY_PROFILE_FAILURE: "ENTITY_PROFILE_FAILURE",

  CONNECTOR_DATA: "CONNECTOR_DATA",
  CONNECTOR_SUCCESS: "CONNECTOR_SUCCESS",
  CONNECTOR_FAILURE: "CONNECTOR_FAILURE",

  ENTITY_LOGS_DATA: "ENTITY_LOGS_DATA",
  ENTITY_LOGS_SUCCESS: "ENTITY_LOGS_SUCCESS",
  ENTITY_LOGS_FAILURE: "ENTITY_LOGS_FAILURE",

  TEMPLATES_DATA: "TEMPLATES_DATA",
  TEMPLATES_SUCCESS: "TEMPLATES_SUCCESS",
  TEMPLATES_FAILURE: "TEMPLATES_FAILURE",

  ORG_ADDRESS_DATA: "ORG_ADDRESS_DATA",
  ORG_ADDRESS_SUCCESS: "ORG_ADDRESS_SUCCESS",
  ORG_ADDRESS_FAILURE: "ORG_ADDRESS_FAILURE",

  ENTITY_ZONE_DATA: "ENTITY_ZONE_DATA",
  ENTITY_ZONE_SUCCESS: "ENTITY_ZONE_SUCCESS",
  ENTITY_ZONE_FAILURE: "ENTITY_ZONE_FAILURE",

  CHILD_ZONE_DATA: "CHILD_ZONE_DATA",
  CHILD_ZONE_SUCCESS: "CHILD_ZONE_SUCCESS",
  CHILD_ZONE_FAILURE: "CHILD_ZONE_FAILURE",

  DMS_FILE_DATA: "DMS_FILE_DATA",
  DMS_FILE_SUCCESS: "DMS_FILE_SUCCESS",
  DMS_FILE_FAILURE: "DMS_FILE_FAILURE",

  DMS_FILE_UPLOAD_DATA: "DMS_FILE_UPLOAD_DATA",
  DMS_FILE_UPLOAD_SUCCESS: "DMS_FILE_UPLOAD_SUCCESS",
  DMS_FILE_UPLOAD_FAILURE: "DMS_FILE_UPLOAD_FAILURE",

  ITEM_MASTER_DATA: "ITEM_MASTER_DATA",
  ITEM_MASTER_SUCCESS: "ITEM_MASTER_SUCCESS",
  ITEM_MASTER_FAILURE: "ITEM_MASTER_FAILURE",

  USER_DATA_DATA: "USER_DATA_DATA",
  USER_DATA_SUCCESS: "USER_DATA_SUCCESS",
  USER_DATA_FAILURE: "USER_DATA_FAILURE",

  USER_DATA_ID_DATA: "USER_DATA_ID_DATA",
  USER_DATA_ID_SUCCESS: "USER_DATA_ID_SUCCESS",
  USER_DATA_ID_FAILURE: "USER_DATA_ID_FAILURE",

  USER_TAX_MASTER_DATA: "USER_TAX_MASTER_DATA",
  USER_TAX_MASTER_SUCCESS: "USER_TAX_MASTER_SUCCESS",
  USER_TAX_MASTER_FAILURE: "USER_TAX_MASTER_FAILURE",

  ZONES_DATA: "ZONES_DATA",
  ZONES_SUCCESS: "ZONES_SUCCESS",
  ZONES_FAILURE: "ZONES_FAILURE",

  ZONES_HIERARCHY_DATA: "ZONES_HIERARCHY_DATA",
  ZONES_HIERARCHY_SUCCESS: "ZONES_HIERARCHY_SUCCESS",
  ZONES_HIERARCHY_FAILURE: "ZONES_HIERARCHY_FAILURE",

  MY_UNIVERSE_DATA: "MY_UNIVERSE_DATA",
  MY_UNIVERSE_SUCCESS: "MY_UNIVERSE_SUCCESS",
  MY_UNIVERSE_FAILURE: "MY_UNIVERSE_FAILURE",

  USER_DATADELETE_DATA: "USER_DATADELETE_DATA",
  USER_DATADELETE_SUCCESS: "USER_DATADELETE_SUCCESS",
  USER_DATADELETE_FAILURE: "USER_DATADELETE_FAILURE",


  USER_CHECK_DATA: "USER_CHECK_DATA",
  USER_CHECK_SUCCESS: "USER_CHECK_SUCCESS",
  USER_CHECK_FAILURE: "USER_CHECK_FAILURE",

  USER_HIERARCHY_DATA: "USER_HIERARCHY_DATA",
  USER_HIERARCHY_SUCCESS: "USER_HIERARCHY_SUCCESS",
  USER_HIERARCHY_FAILURE: "USER_HIERARCHY_FAILURE",

  REPORT_HIERARCHY_DATA: "REPORT_HIERARCHY_DATA",
  REPORT_HIERARCHY_SUCCESS: "REPORT_HIERARCHY_SUCCESS",
  REPORT_HIERARCHY_FAILURE: "REPORT_HIERARCHY_FAILURE",

  REPORT_HIERARCHY_DATA: "REPORT_HIERARCHY_DATA",
  REPORT_HIERARCHY_SUCCESS: "REPORT_HIERARCHY_SUCCESS",
  REPORT_HIERARCHY_FAILURE: "REPORT_HIERARCHY_FAILURE",

  CUSTOMER_LIST_DATA: "CUSTOMER_LIST_DATA",
  CUSTOMER_LIST_SUCCESS: "CUSTOMER_LIST_SUCCESS",
  CUSTOMER_LIST_FAILURE: "CUSTOMER_LIST_FAILURE",

};

// ADMIN PANNEL
export const handleFetchCustomerList = (payload,editDataId) => {
  // handleHierarchyLevelService
  return async (dispatch) => {
    dispatch({ type: actions.CUSTOMER_LIST_DATA });
    try {
      const data = await handleCustomerItemEdit(payload,editDataId);
      dispatch({ type: actions.CUSTOMER_LIST_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.CUSTOMER_LIST_FAILURE, payload: error });
    }
  };
};



export const handleFetchReportItemGroup = (payload) => {
  // handleHierarchyLevelService
  return async (dispatch) => {
    dispatch({ type: actions.REPORT_HIERARCHY_DATA });
    try {
      const data = await handleReportItemGroup(payload);
      dispatch({ type: actions.REPORT_HIERARCHY_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.REPORT_HIERARCHY_FAILURE, payload: error });
    }
  };
};

export const handleFetchReportItem = (payload) => {
  // handleHierarchyLevelService
  return async (dispatch) => {
    dispatch({ type: actions.REPORT_HIERARCHY_DATA });
    try {
      const data = await handleReportItemCols(payload);
      dispatch({ type: actions.REPORT_HIERARCHY_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.REPORT_HIERARCHY_FAILURE, payload: error });
    }
  };
};


export const handleHierarchyLevelService = (payload) => {
  // handleHierarchyLevelService
  return async (dispatch) => {
    dispatch({ type: actions.USER_HIERARCHY_DATA });
    try {
      const data = await handleOrgDetailService(payload);
      dispatch({ type: actions.USER_HIERARCHY_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.USER_HIERARCHY_FAILURE, payload: error });
    }
  };
};

export const handleFetchChildEntity = (payload) => {
  // FetchChildEntity
  return async (dispatch) => {
    dispatch({ type: actions.USER_HIERARCHY_DATA });
    try {
      const data = await handleOrgEntityService(payload);
      dispatch({ type: actions.USER_HIERARCHY_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.USER_HIERARCHY_FAILURE, payload: error });
    }
  };
};

export const handleAdminUsersAviavlibilty = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.USER_CHECK_DATA });
    try {
      const data = await handleAdminCheckUser(payload);
      dispatch({ type: actions.USER_CHECK_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.USER_CHECK_FAILURE, payload: error });
    }
  };
};

export const DeleteAdminUsers = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.USER_DATADELETE_DATA });
    try {
      const data = await handleAdminDeleteUser(payload);
      dispatch({ type: actions.USER_DATADELETE_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.USER_DATADELETE_FAILURE, payload: error });
    }
  };
};


export const FetchAdminUniverse = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.MY_UNIVERSE_DATA });
    try {
      const data = await handleAdminMyUniverse(payload);
      dispatch({ type: actions.MY_UNIVERSE_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.MY_UNIVERSE_FAILURE, payload: error });
    }
  };
};


export const FetchAdminEntityProfile = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.ENTITY_PROFILE_DATA });
    try {
      const data = await handleAdminEntityProfile(payload);
      dispatch({ type: actions.ENTITY_PROFILE_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.ENTITY_PROFILE_FAILURE, payload: error });
    }
  };
};

export const FetchAdminEntityLogs = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.ENTITY_LOGS_DATA });
    try {
      const data = await handleAdminEntityLogs(payload);
      dispatch({ type: actions.ENTITY_LOGS_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.ENTITY_LOGS_FAILURE, payload: error });
    }
  };
};

export const FetchConnectorsData = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.CONNECTOR_DATA });
    try {
      const data = await handleConnectorsData(payload);
      dispatch({ type: actions.CONNECTOR_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.CONNECTOR_FAILURE, payload: error });
    }
  };
};

export const FetchMappingScheduleFlag = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.SCHEDULER_FLAG_DATA });
    try {
      const data = await handleAutoMapping(payload);
      dispatch({ type: actions.SCHEDULER_FLAG_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.SCHEDULER_FLAG_FAILURE, payload: error });
    }
  };
};

export const FetchItemMappingData = (strRequestBodyData, payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.POST_ORDER });
    try {
      const data = await PostItemMappingService(strRequestBodyData, payload);
      dispatch({ type: actions.POST_ORDER_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.POST_ORDER_FAILURE, payload: error });
    }
  };
};

export const FetchTemplatesData = (payload,requestBody) => {
  return async (dispatch) => {
    dispatch({ type: actions.TEMPLATES_DATA });
    try {
      const data = await handleEmailTemplate(payload,requestBody);
      dispatch({ type: actions.TEMPLATES_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.TEMPLATES_FAILURE, payload: error });
    }
  };
};

export const FetchEntityZone = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.ENTITY_ZONE_DATA });
    try {
      const data = await handleAdminEntityZone(payload);
      dispatch({ type: actions.ENTITY_ZONE_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.ENTITY_ZONE_FAILURE, payload: error });
    }
  };
};

export const FetchChildZone = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.CHILD_ZONE_DATA });
    try {
      const data = await handleAdminChildZone(payload);
      dispatch({ type: actions.CHILD_ZONE_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.CHILD_ZONE_FAILURE, payload: error });
    }
  };
};

export const FetchDMSDownloadFile = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.DMS_FILE_DATA });
    try {
      const data = await handleAdminDMSFileDownload(payload);
      dispatch({ type: actions.DMS_FILE_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.DMS_FILE_FAILURE, payload: error });
    }
  };
};

export const FetchDMSUploadFile = (payload,formData) => {
  return async (dispatch) => {
    dispatch({ type: actions.DMS_FILE_UPLOAD_DATA });
    try {
      const data = await handleAdminDMSFileUpload(payload,formData);
      dispatch({ type: actions.DMS_FILE_UPLOAD_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.DMS_FILE_UPLOAD_FAILURE, payload: error });
    }
  };
};

export const FetchItemMasterData = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.ITEM_MASTER_DATA });
    try {
      const data = await handleAdminItemMasters(payload);
      dispatch({ type: actions.ITEM_MASTER_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.ITEM_MASTER_FAILURE, payload: error });
    }
  };
};

export const FetchAdminUsers = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.USER_DATA_DATA });
    try {
      const data = await handleAdminShowUsers(payload);
      dispatch({ type: actions.USER_DATA_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.USER_DATA_FAILURE, payload: error });
    }
  };
};

export const FetchAdminEditUsers = (UserId, payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.USER_DATA_ID_DATA });
    try {
      const data = await handleAdminEditUsers(UserId, payload);
      dispatch({ type: actions.USER_DATA_ID_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.USER_DATA_ID_FAILURE, payload: error });
    }
  };
};

export const FetchAdminTaxMaster = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.USER_TAX_MASTER_DATA });
    try {
      const data = await handleAdminTaxData(payload);
      dispatch({ type: actions.USER_TAX_MASTER_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.USER_TAX_MASTER_FAILURE, payload: error });
    }
  };
};

export const FetchAdminAvialableZones = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.USER_TAX_MASTER_DATA });
    try {
      const data = await handleAdminAvailableZones(payload);
      dispatch({ type: actions.USER_TAX_MASTER_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.USER_TAX_MASTER_FAILURE, payload: error });
    }
  };
};

export const FetchAdminHierarchyData = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.ZONES_HIERARCHY_DATA });
    try {
      const data = await handleAdminZonesHierarchy(payload);
      dispatch({ type: actions.ZONES_HIERARCHY_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.ZONES_HIERARCHY_FAILURE, payload: error });
    }
  };
};

export const fetchSearchData = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.PRINT_TEXT_DATA });
    try {
      const data = await handleSearchData(payload);
      dispatch({ type: actions.PRINT_TEXT_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.PRINT_TEXT_FAILURE, payload: error });
    }
  };
};

export const FetchPrintInvoiceData = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.PRINT_INVOICE_DATA });
    try {
      const data = await postPrintInvoice(payload);
      dispatch({ type: actions.PRINT_INVOICE_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.PRINT_INVOICE_FAILURE, payload: error });
    }
  };
};

export const FetchMatchingItem = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.MATCHINGITEM_DATA });
    try {
      const data = await postFetchMatchingItem(payload);
      dispatch({ type: actions.MATCHINGITEM_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.MATCHINGITEM_FAILURE, payload: error });
    }
  };
};

export const FetchPendingItemData = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.PENDINGITEM_DATA });
    try {
      const data = await postFetchPendingItem(payload);
      dispatch({ type: actions.PENDINGITEM_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.PENDINGITEM_FAILURE, payload: error });
    }
  };
};

export const FetchOrggAddress = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.ORG_ADDRESS_DATA });
    try {
      const data = await handleOrgAddress(payload);
      dispatch({ type: actions.ORG_ADDRESS_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.ORG_ADDRESS_FAILURE, payload: error });
    }
  };
};

export const FetchMappedStockItemsService = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.MAPPED_STOCK_DATA });
    try {
      const data = await postFetchMappedStockItemsService(payload);
      dispatch({ type: actions.MAPPED_STOCK_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.MAPPED_STOCK_FAILURE, payload: error });
    }
  };
};

export const FetchAllStocksService = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.ALL_STOCKS_SERVICES_DATA });
    try {
      const data = await postFetchAllStocksService(payload);
      dispatch({ type: actions.ALL_STOCKS_SERVICES_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.ALL_STOCKS_SERVICES_FAILURE, payload: error });
    }
  };
};

export const FetchPurchaseList = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.PURCHASE_LIST_DATA });
    try {
      const data = await postFetchPurchaseList(payload);
      dispatch({ type: actions.PURCHASE_LIST_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error.message });
      // dispatch a different action type depending on the error code
      if (error.code === 404) {
        dispatch({
          type: actions.PURCHASE_LIST_NOT_FOUND,
          payload: error.message,
        });
      } else {
        dispatch({
          type: actions.PURCHASE_LIST_FAILURE,
          payload: error.message,
        });
      }
    }
  };
};

export const FetchCustomerReorder = (strRequestBodyData, payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.CUSTOMER_REORDER_DATA });
    try {
      const data = await postFetchCustomerData(strRequestBodyData, payload);
      dispatch({ type: actions.CUSTOMER_REORDER_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.CUSTOMER_REORDER_FAILURE, payload: error });
    }
  };
};

export const fetchInvoiceList = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.INVOICE_DATA });
    try {
      const data = await getInvoiceData(payload);
      dispatch({ type: actions.INVOICE_DATA_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.INVOICE_DATA_FAILURE, payload: error });
    }
  };
};

export const postCreateOrderData = (strRequestBodyData, payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.POST_ORDER });
    try {
      const data = await postCreateOrder(strRequestBodyData, payload);
      dispatch({ type: actions.POST_ORDER_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.POST_ORDER_FAILURE, payload: error });
    }
  };
};

export const fetchFailedTransactionList = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_ORDER_TRANSACTION_ID });
    try {
      const data = await getFailedTransaction(payload);
      dispatch({
        type: actions.FETCH_ORDER_SUCCES_TRANSACTION_ID,
        payload: data,
      });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({
        type: actions.FETCH_ORDER_FAILED_TRANSACTION_ID,

        payload: error,
      });
    }
  };
};

export const fetchCustomerList = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_CUSTOMER_LIST_START });
    try {
      const data = await getCustomersList(payload);
      dispatch({ type: actions.FETCH_CUSTOMER_LIST_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.FETCH_CUSTOMER_LIST_ERROR, payload: error });
    }
  };
};

export const fetchOrderList = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_ORDER_INFO_START });
    try {
      const data = await getOrderList(payload);
      dispatch({ type: actions.FETCH_ORDER_INFO_SUCCESS, payload: data });
      return data;
    } catch (error) {
      customToast({
        type: "error",
        message: error.message || "Failed to fetch order list",
      });

      dispatch({ type: actions.FETCH_ORDER_INFO_ERROR, payload: error });
      throw error;
    }
  };
};

export const fetchDataOrderId = (dataId, payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_ORDER_INFO_START_ID });
    try {
      const data = await getOrderListId(dataId, payload);
      dispatch({ type: actions.FETCH_ORDER_INFO_SUCCESS_ID, payload: data });
      return data;
    } catch (error) {
      console.error("Error fetching OrderList:", error);
      customToast({
        type: "error",
        message: error.message || "Failed to fetch order list",
      });

      dispatch({ type: actions.FETCH_ORDER_INFO_ERROR_ID, payload: error });
      throw error;
    }
  };
};

export const fetchSearchItems = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_SEARCH_ITEMS_START });
    try {
      const data = await getSearchItems(payload);
      dispatch({ type: actions.FETCH_SEARCH_ITEMS_SUCCESS, payload: data });
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.FETCH_SEARCH_ITEMS_ERROR, payload: error });
    }
  };
};

export const fetchItemDetails = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_ITEM_INFO_START });
    try {
      const data = await getItemInfo(payload);
      dispatch({ type: actions.FETCH_ITEM_INFO_SUCCESS, payload: data });
    } catch (error) {
      customToast({ type: "error", message: error });
      dispatch({ type: actions.FETCH_ITEM_INFO_ERROR, payload: error });
    }
  };
};
