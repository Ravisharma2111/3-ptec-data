import { get, size } from "lodash";
import { actions } from "../../actions/sales/order";
import { Messages } from "../../../shared/constants";

let initialState = {
  isLoadingCustomerList: false,
  customerList: [],
  customerListError: "",

  isLoadingOrderInfo: false,
  orderInfo: {},
  orderInfoError: "",

  isLoadingSearchItems: false,
  searchItems: [],
  searchItemsError: "",

  isLoadingItemInfo: false,
  itemInfo: {},
  itemInfoError: "",
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_CUSTOMER_LIST_START:
      return { ...state, isLoadingCustomerList: true, error: "" };

    case actions.FETCH_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        customerList: get(action, "payload", []),
        error: "",
        isLoadingCustomerList: false,
      };

    case actions.FETCH_CUSTOMER_LIST_ERROR:
      return {
        ...state,
        error: get(action, "payload", Messages.SOMETHING_WENT_WRONG),
        isLoadingCustomerList: false,
      };

    case actions.FETCH_ORDER_INFO_START:
      return { ...state, isLoadingOrderInfo: true, error: "" };

    case actions.FETCH_ORDER_INFO_SUCCESS:
      return {
        ...state,
        orderInfo: get(action, "payload", []),
        error: "",
        isLoadingOrderInfo: false,
      };

    case actions.FETCH_ORDER_INFO_ERROR:
      return {
        ...state,
        error: get(action, "payload", Messages.SOMETHING_WENT_WRONG),
        isLoadingOrderInfo: false,
      };

    case actions.FETCH_SEARCH_ITEMS_START:
      return { ...state, isLoadingSearchItems: true, searchItemsError: "" };

    case actions.FETCH_SEARCH_ITEMS_SUCCESS: {
      let simplifiedOptions = [];
      let result = get(action, "payload", []);
      if (size(result)) {
        result.forEach((opt) => {
          simplifiedOptions.push({
            value: get(opt, "itemcode", ""),
            label: get(opt, "itemname", ""),
          });
        });
      }

      return {
        ...state,
        searchItems: simplifiedOptions,
        searchItemsError: "",
        isLoadingSearchItems: false,
      };
    }
    case actions.FETCH_SEARCH_ITEMS_ERROR:
      return {
        ...state,
        searchItemsError: get(action, "payload", Messages.SOMETHING_WENT_WRONG),
        isLoadingSearchItems: false,
      };

    case actions.FETCH_ITEM_INFO_START:
      return { ...state, isLoadingItemInfo: true, itemInfoError: "" };

    case actions.FETCH_ITEM_INFO_SUCCESS: {
      return {
        ...state,
        itemInfo: get(action, "payload", {}),
        itemInfoError: "",
        isLoadingItemInfo: false,
      };
    }

    case actions.FETCH_ITEM_INFO_ERROR:
      return {
        ...state,
        itemInfoError: get(action, "payload", Messages.SOMETHING_WENT_WRONG),
        isLoadingItemInfo: false,
      };

    default:
      return state;
  }
};

export default orderReducer;
