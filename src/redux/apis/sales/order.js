// sales/order.js

import { get } from "lodash";
import { API_URL, Messages } from "../../../shared/constants";
import Axios from "../../../configs/axiosInterceptor";

// Admin Pannel API_URL


export const handleCustomerItemEdit = async (payload,editDataId) => {
  try {
    const result = await Axios.get(`admin/customers/${editDataId}`, { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};

export const handleReportItemGroup = async (payload) => {
  try {
    const result = await Axios.get("admin/itemgroups", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};



export const handleReportItemCols = async (payload) => {
  try {
    const result = await Axios.get("reports/itemcols", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};


export const handleOrgDetailService = async (payload) => {
  try {
    const result = await Axios.get("admin/hierarchylevelorgdetails", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};  

export const handleOrgEntityService = async (payload) => {
  try {
    const result = await Axios.get("admin/childentity", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data found',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};  



export const handleAdminDeleteUser = async (payload) => {
  try {
    const result = await Axios.delete("admin/report-id", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};  

export const handleAdminCheckUser = async (payload) => {
  try {
    const result = await Axios.get("admin/users/checkuseravailability", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};  


export const handleAdminMyUniverse = async (payload) => {
  try {
    const result = await Axios.get("admin/myuniverse", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};

export const handleAdminEntityProfile = async (payload) => {
  try {
    const result = await Axios.get("admin/entityprofile", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};

export const handleAdminEntityLogs = async (payload) => {
  try {
    const result = await Axios.get("admin/entitylogs", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};

export const handleConnectorsData = async (payload) => {
  try {
    const result = await Axios.get("connector/connectors", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};

export const handleEmailTemplate = async (payload,requestBody) => {
  try {
      const result = await Axios.post("reports/emailtemplates",requestBody, { extraHeaders: payload } );
      if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};


export const handleAdminEntityZone = async (payload) => {
  try {
    const result = await Axios.get("admin/entityzones", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};

export const handleAdminChildZone = async (payload) => {
  try {
    const result = await Axios.get("admin/childzones", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};

export const handleAdminDMSFileDownload = async (payload) => {
  try {
    const result = await Axios.get("reports/filedownload", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 ||   error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    }else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
};
};

export const handleAdminDMSFileUpload = async (payload,formData) => {
  try {
    const result = await Axios.post("reports/fileupload", formData,  { extraHeaders: payload });
if (result.status === 200) {
  return result.data; 
} else if (result.status === 404) {
  let error = new Error("Data not found");
  error.code = 404;
  throw error;
} else {
  let error = { failed: "Failed to get customer list" };
  throw error;
}
} catch (error) {
if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
  console.log('no data gound',)
} else {
  const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
  throw err;
}
}
};

export const handleAdminItemMasters = async (payload) => {
  try {
    const result = await Axios.get("admin/itemmasters", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    }else if (result.status === 404) {
      // throw a custom error with a 404 message
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};

export const handleAdminShowUsers = async (payload) => {
  try {
    const result = await Axios.get("admin/users", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    }else if (result.status === 404) {
      // throw a custom error with a 404 message
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};

export const handleAdminEditUsers = async (UserId,payload) => {
  try {
    const result = await Axios.get(`admin/users/${UserId}`, { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    }else if (result.status === 404) {
      // throw a custom error with a 404 message
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};

export const handleAdminZonesHierarchy = async (UserId,payload) => {
  try {
    const result = await Axios.get(`admin/zonehierarchy`, { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    }else if (result.status === 404) {
      // throw a custom error with a 404 message
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};



export const handleAdminTaxData = async (payload) => {
  try {
    const result = await Axios.get(`admin/taxmasters`, { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    }else if (result.status === 404) {
      // throw a custom error with a 404 message
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};

export const handleAdminAvailableZones = async (payload) => {
  try {
    const result = await Axios.get(`admin/availablezones`, { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    }else if (result.status === 404) {
      // throw a custom error with a 404 message
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};




export const handleOrgAddress = async (payload) => {
  try {
    const result = await Axios.get("admin/orgaddress", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    }else if (result.status === 404) {
      // throw a custom error with a 404 message
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};





export const PostItemMappingService = async (payload) => {
  try {
        const result = await Axios.post("sales/itemmapping",  { extraHeaders: payload });
    if (result.status === 201) {
      return result.data; 
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};


export const postPrintInvoice = async (payload) => {
  try {
    const result = await Axios.get("sales/printinvoice", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};

export const handleSearchData = async (payload) => {
  try {
    const result = await Axios.get("sales/searchtext", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};

export const postFetchMatchingItem = async (payload) => {
  try {
    const result = await Axios.get("sales/matchingitemmasters", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};


export const handleAutoMapping = async (payload) => {
  try {
    const result = await Axios.get("connector/automappingschedulerflag", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};


export const postFetchPendingItem = async (payload) => {
  try {
    const result = await Axios.get("sales/pendingitemsinfos", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    }else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};

export const postFetchAllStocksService = async (payload) => {
  try {
    const result = await Axios.get("sales/stocks", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};

export const postFetchMappedStockItemsService = async (payload) => {
  try {
    const result = await Axios.get("connector/mappedstockitems", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    }else if (result.status === 404) {
      // throw a custom error with a 404 message
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};

export const postFetchPurchaseList = async (payload) => {
  try {
    const result = await Axios.get("sales/orders", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      // throw a custom error with a 404 message
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    // const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
 }
};


export const postCreateOrder = async (strRequestBodyData,payload) => {
  try {
    const mergedPayload = {
      ...strRequestBodyData,
      ...payload,
    };

    const result = await Axios.post("sales/orders", mergedPayload);
    if (result.status === 201) {
      return result.data; // Assuming the server responds with the created order details
    } else {
      let error = { failed: "Failed to create order" };
      throw error;
    }
  } catch (error) {
    const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
    throw err;
  }
};


export const getInvoiceData = async (payload) => {
  try {
    const result = await Axios.get("sales/invoices", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};

export const postFetchCustomerData = async (payload) => {
  try {
    const result = await Axios.get("sales/reorderitems", {
      headers: payload, 
    });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  }catch (error) {
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data found',)
    } else {
      // const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      // throw err;
    }
 }
};



export const getFailedTransaction = async (payload) => {
  try {
    const result = await Axios.get("sales/failedtxn", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};


export const getCustomersList = async (payload) => {
  try {
    const result = await Axios.get("admin/zonalcustomers", { extraHeaders: payload });

    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};

export const getOrderList = async (payload) => {
  try {
    const result = await Axios.get("sales/orders", { headers : payload });
    if (result.status === 200) {
      return result.data;
    }else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};

export const getOrderListId = async (dataId,payload) => {

  
  try {
    const { apiToken, txnSource } = payload;
    const result = await Axios.get(`sales/orders/${dataId}`, { headers :  {
      apiToken,
      txnSource,
    }, });

    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};

export const getItemInfo = async (payload) => {
  try {
    const result = await Axios.get("sales/itemdetails", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
  }
};

export const getSearchItems = async (payload) => {
  try {
    const result = await Axios.get("sales/searchtext", { extraHeaders: payload });
    if (result.status === 200) {
      return result.data;
    } else if (result.status === 404) {
      let error = new Error("Data not found");
      error.code = 404;
      throw error;
    } else {
      let error = { failed: "Failed to get customer list" };
      throw error;
    }
  } catch (error) {
    console.log(' errrorrrrr',error)
    if (error?.response?.status === 404 || error?.response?.data == 'No data found for null' ) {
      console.log('no data gound',)
    } else {
      const err = get(error, "message", Messages.SOMETHING_WENT_WRONG);
      throw err;
    }
    }
};
