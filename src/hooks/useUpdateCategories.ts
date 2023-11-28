import axios from "axios";

import useDispatchAction from "./useDispatchAction";
import useMessage from "./useMessage";

import { URL_CATEGORIES } from "config";
import { Categories, Category } from "types";

export const useUpdateCategories = () => {
    const { setCategories } = useDispatchAction();
    const showMessage = useMessage();

    function updateCategories() {
        axios
            .get(URL_CATEGORIES)
            .then(response => {
                if (response.statusText === "OK" && response.data) {
                    const categories = [] as Categories;
                    (response.data as []).forEach((category: Category) => {
                        category = (({ id, name, color }) => ({ id, name, color }))(category);
                        categories.push(category);
                    });

                    setCategories(categories);
                } else {
                    if (response.statusText !== "OK") {
                        showMessage.error("Podczas pobierania kategorii wystapił błąd");
                    } else {
                        showMessage.error("Brak kategorii do pobrania");
                    }
                }
            })
            .catch(error => {
                showMessage.error(`Podczas aktualizacji listy kategorii wystąpił błąd ${error.message}`);
            });
    }

    return updateCategories;
};

export default useUpdateCategories;
