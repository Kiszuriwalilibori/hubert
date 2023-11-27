import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Categories, Category } from "types/index";
import Stack from "@mui/material/Stack";
import { useCallback, useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import useAxios from "hooks/useAxios";
import { URL_CATEGORIES } from "config";
import useMessage from "hooks/useMessage";
import useDispatchAction from "hooks/useDispatchAction";

interface Props {
    category: Category;
    handleEdit: (category: Category) => void;
}
export const CategoryListItem = (props: Props) => {
    const showMessage = useMessage();
    const { setCategories } = useDispatchAction();
    const { category, handleEdit } = props;
    const [ID, setID] = useState<undefined | number>(undefined);

    const handleRemove = useCallback(() => {
        setID(category.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { response, loading, error } = useAxios({
        method: "DELETE",
        url: `categories/${ID}`,
        data: ID,
    } as unknown as AxiosRequestConfig);

    useEffect(() => {
        if (response) {
            response && showMessage.success("Pomyślnie usunięto kategorię");
            setID(undefined);
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
                            showMessage.error("Podczas aktualizacji listy kategorii wystąpił błąd");
                        } else {
                            showMessage.error("Brak kategorii do pobrania");
                        }
                    }
                })
                .catch(error => {
                    showMessage.error(`Podczas aktualizacji listy kategorii wystąpił błąd ${error.message}`);
                });
        }
    }, [JSON.stringify(response)]);

    useEffect(() => {
        error && showMessage.error(`Podczas próby usunięcia kategorii wystąpił błąd ${error}`);
        setID(undefined);
    }, [JSON.stringify(error)]);

    return (
        <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <span>{category.name}</span>
            <Stack direction="row" spacing={2} sx={{ p: 1 }}>
                <Button onClick={handleRemove} variant="outlined" size="small" color="error" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
                <Button
                    onClick={() => handleEdit(category)}
                    variant="outlined"
                    size="small"
                    color="warning"
                    startIcon={<EditIcon />}
                >
                    Edit
                </Button>
            </Stack>
        </Stack>
    );
};

export default CategoryListItem;
