import axios from "axios";

const commonApi = async (method, url, reqBody,reqHeader) => {
  let configObj = {
    method: method,
    url: url,
    data: reqBody,
    // axios automatically provides application/json header, but if there is any change we need to provide it., also token is passed via header
    headers:reqHeader,
  };
  return await axios(configObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export default commonApi;
