import axios from 'axios';
import { constants } from '@/app/utils/apiConstants';

export const saveTokenCardService = (body) => async () => {
  try {
    const URL = `${constants.BASE_URL}/tokenizar-credit`;
    const res = await axios.post(URL, body);
    console.log('res', res);

    if (res.status === 201) {
      const convertData = res.data;
      return {
        status: true,
        data: {
          idTokenCard: convertData.id,
        },
      };
    }

    return {
      status: false,
      data: null,
    };
  } catch (error) {
    console.log('*** REDUX -> saveTokenCardService ***', error);
    return {
      status: false,
      data: null,
    };
  }
};

export const acceptedTokenService = () => async () => {
  try {
    const URL = `${constants.BASE_URL}/accepted-token`;
    const res = await axios.get(URL);

    if (res.status === 200) {
      const convertData = res.data;
      return {
        status: true,
        data: {
          aceptedToken: convertData.acceptance_token,
          permalink: convertData.permalink,
        },
      };
    }

    return {
      status: false,
      data: null,
    };
  } catch (error) {
    console.log('*** REDUX -> acceptedTokenService ***', error);
    return {
      status: false,
      data: null,
    };
  }
};

export const createTransactionService = (body) => async () => {
  try {
    const URL = `${constants.BASE_URL}/create-transaction`;
    const res = await axios.post(URL, body);

    if (res.status === 201) {
      const convertData = res.data;
      return {
        status: true,
        data: {
          idTransaction: convertData.idTransaction,
        },
      };
    }

    return {
      status: false,
      data: null,
    };
  } catch (error) {
    console.log('*** REDUX -> createTransactionService ***', error);
    return {
      status: false,
      data: null,
    };
  }
};

export const createPaymentService = (body) => async () => {
  try {
    const URL = `${constants.BASE_URL}/create-payment`;
    const res = await axios.post(URL, body);
    console.log('res', res);

    if (res.status === 201) {
      const convertData = res.data;
      return {
        status: true,
        data: {
          idTransaction: convertData,
        },
      };
    }

    return {
      status: false,
      data: null,
    };
  } catch (error) {
    console.log('*** REDUX -> createPaymentService ***', error);
    return {
      status: false,
      data: null,
    };
  }
};
