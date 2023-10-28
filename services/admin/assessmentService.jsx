import axios from "axios";
import applyHeaders from "../../utils/applyHeaders";
import { showToastError } from "../../utils/toast";

export class AssessmentService{
    constructor(url){
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: "Time out!"
        })
    }

    get = async(id) => this.instance.get(`/api/admin/lesson?lessonId=${id}`, applyHeaders())
        .then((response) => response)
        .catch((error) => {showToastError(error.message)});

    save = async(params) => this.instance.put("/api/admin/lesson/update-name", params, applyHeaders())
        .then((response) => response)
        .catch((error) => {showToastError(error.message)});

    update = async(id, problemSet, pageIndex, imageLength) => this.instance.put("/api/admin/lesson/update-page", 
    {lessonId:id, problemSet, pageIndex, imageLength}, applyHeaders())
        .then((response) => response)
        .catch((error) => {console.log(error);showToastError(error.message)});
}