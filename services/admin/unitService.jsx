import axios from "axios";
import applyHeaders from "../../utils/applyHeaders";
import { showToastError } from "../../utils/toast";

export class UnitService{
    constructor(url){
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: "Time out!"
        })
    }

    save = async(params) => this.instance.put("/api/admin/unit/update-name", params, applyHeaders())
        .then((response) => response)
        .catch((error) => {showToastError(error.message)});

    delete = async(id) => this.instance.delete(`/api/admin/unit/delete?unitId=${id}`, applyHeaders())
        .then((response) => response)
        .catch((error) => {showToastError(error.message)});

    post = async(params) => this.instance.post("/api/admin/unit/create", params, applyHeaders())
        .then((response) => response)
        .catch((error) => {showToastError(error.message)});
    
    update = async (id, newLessonsArray, lesson1id, lesson2id, lesson1n, lesson2n) => {
        try {
            const response = await this.instance.put(
            "/api/admin/unit/update-lessons",
            {
                unitId: id,
                newLessonsArray,
                lesson1id,
                lesson2id,
                lesson1n,
                lesson2n,
            },
            applyHeaders()
            );
            return response;
        } catch (error) {
            console.log(error);
            showToastError(error.message);
            throw error;
        }
        };
}