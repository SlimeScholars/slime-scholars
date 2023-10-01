import axios from "axios";
import applyHeaders from "../../utils/applyHeaders";
import { showToastError } from "../../utils/toast";

export class SubjectService{
    constructor(url){
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: "Time out!"
        })
    }

    save = async(params) => this.instance.put("/api/admin/subject/update-name", params, applyHeaders())
        .then((response) => response)
        .catch((error) => {showToastError(error.message)});

    delete = async(id) => this.instance.delete(`/api/admin/subject/delete?subjectId=${id}`, applyHeaders())
        .then((response) => response)
        .catch((error) => {showToastError(error.message)});

    post = async(params) => this.instance.post("/api/admin/subject/create", params, applyHeaders())
        .then((response) => response)
        .catch((error) => {showToastError(error.message)});
}