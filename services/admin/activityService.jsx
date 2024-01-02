import axios from "axios";
import applyHeaders from "../../utils/applyHeaders";
import { showToastError } from "../../utils/toast";

export class ActivityService {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  get = async (id) =>
    this.instance
      .get(`/api/activity?activityId=${id}`, applyHeaders())
      .then((response) => response)
      .catch((error) => {
        showToastError(error.message);
      });

  save = async (params) =>
    this.instance
      .put("/api/admin/activity/update-name", params, applyHeaders())
      .then((response) => response)
      .catch((error) => {
        showToastError(error.message);
      });

  delete = async (id) =>
    this.instance
      .delete(`/api/admin/activity/delete?activityId=${id}`, applyHeaders())
      .then((response) => response)
      .catch((error) => {
        showToastError(error.message);
      });

  post = async (params) =>
    this.instance
      .post("/api/admin/activity/create", params, applyHeaders())
      .then((response) => response)
      .catch((error) => {
        showToastError(error.message);
      });

  update = async (id, pages, pageIndex, imageLength) =>
    this.instance
      .put(
        "/api/admin/activity/update-pages",
        { activityId: id, pages, pageIndex, imageLength },
        applyHeaders()
      )
      .then((response) => response)
      .catch((error) => {
        console.log(error);
        showToastError(error.message);
      });
}
