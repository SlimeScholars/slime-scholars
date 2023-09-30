import axios from "axios";
import applyHeaders from "../../utils/applyHeaders";
import { showToastError } from "../../utils/toast";

export class CourseService{
    constructor(url){
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: "Time out!"
        })
    }

    save = async(params) => this.instance.put("/api/admin/course/update-name", params, applyHeaders())
        .then((response) => response)
        .catch((error) => {showToastError(error.message)});

    delete = async(id) => this.instance.delete(`/api/admin/course/delete?courseId=${id}`, applyHeaders())
        .then((response) => response)
        .catch((error) => {showToastError(error.message)});

    post = async(params) => this.instance.post("/api/admin/course/create", params, applyHeaders())
        .then((response) => response)
        .catch((error) => {showToastError(error.message)});
}