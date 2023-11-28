import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

import { useCallback, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";

import { Category } from "types";
import { useAxios, useMessage, useUpdateCategories } from "hooks";

interface Props {
    category: Category;
    handleEdit: (category: Category) => void;
}
export const CategoryListItem = (props: Props) => {
    const showMessage = useMessage();

    const updateCategories = useUpdateCategories();
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
            updateCategories();
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
