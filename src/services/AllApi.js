import { BaseUrl } from "./BaseUrl";
import commonApi from "./commonApi";

export const registerUser = async (reqBody) => {
  return await commonApi("post", `${BaseUrl}/registerUser`, reqBody);
};

export const loginUser = async (reqBody) => {
  return await commonApi("post", `${BaseUrl}/loginUser`, reqBody);
};

export const googleAuth = async (reqBody) => {
  return await commonApi("post", `${BaseUrl}/googleAuth`, reqBody);
};

export const addBook = async (reqBody, reqHeader) => {
  return await commonApi("post", `${BaseUrl}/addBook`, reqBody, reqHeader);
};

export const getAllBooks = async (reqHeader, search) => {
  return await commonApi(
    "get",
    `${BaseUrl}/getAllBooks?search=${search}`,
    "",
    reqHeader
  );
};

export const getLimitedBooks = async () => {
  return await commonApi("get", `${BaseUrl}/getLimitedBooks`, "");
};

export const getSingleBook = async (id, reqHeader) => {
  return await commonApi(
    "get",
    `${BaseUrl}/${id}/getSingleBook`,
    "",
    reqHeader
  );
};

export const updateProfile = async (id, reqBody, reqHeader) => {
  return await commonApi(
    "patch",
    `${BaseUrl}/${id}/updateProfile`,
    reqBody,
    reqHeader
  );
};

export const getAllUsers = async (reqHeader) => {
  return await commonApi("get", `${BaseUrl}/getAllUsers`, "", reqHeader);
};
export const getAllJobs = async () => {
  return await commonApi("get", `${BaseUrl}/getAllJobs`, "");
};

export const deleteJob = async(id,reqHeader)=>{
  return await commonApi('delete',`${BaseUrl}/${id}/deleteJob`,"",reqHeader)

}

export const addJob = async(reqBody,reqHeader)=>{
  return await commonApi("post",`${BaseUrl}/addJob`,reqBody,reqHeader)
}

export const getAllJobApplication = async(reqHeader)=>{
  return await commonApi("get",`${BaseUrl}/getAllJobApplications`,"",reqHeader)
}

export const applyJob = async(reqBody,reqHeader)=>{
  return await commonApi('post',`${BaseUrl}/applyJob`,reqBody,reqHeader)
}

export const makePayment = async(reqBody,reqHeader)=>{
  return await commonApi('post',`${BaseUrl}/makePayment`,reqBody,reqHeader)
}

export const getSoldBooks = async(reqHeader)=>{
  return await commonApi ('get',`${BaseUrl}/getSoldBooksByUser`,"",reqHeader)
}

export const getBuyBooks = async(reqHeader)=>{
  return await commonApi('get',`${BaseUrl}/getBuyBooksByUser`,"",reqHeader)
}
