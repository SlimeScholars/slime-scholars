import axios from "axios";
import applyHeaders from "../../utils/applyHeaders";
import { showToastError } from "../../utils/toast";

export class LessonService{
    constructor(url){
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: "Time out!"
        })
    }

    save = async(params) => this.instance.put("/api/admin/lesson/update-name", params, applyHeaders())
        .then((response) => response)
        .catch((error) => {showToastError(error.message)});

    delete = async(id) => this.instance.delete(`/api/admin/lesson/delete?lessonId=${id}`, applyHeaders())
        .then((response) => response)
        .catch((error) => {showToastError(error.message)});

    post = async(params) => this.instance.post("/api/admin/lesson/create", params, applyHeaders())
        .then((response) => response)
        .catch((error) => {showToastError(error.message)});
}