import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Category } from "types/index";
import Stack from "@mui/material/Stack";
import { useCallback } from "react";

interface Props {
    category: Category;
    handleEdit: (category: Category) => void;
}
export const CategoryListItem = (props: Props) => {
    const { category, handleEdit } = props;
    const handleDelete = useCallback(() => {}, [category]);

    // const handleEditClicked = useCallback(() => {
    //     handleEdit(category);
    // }, [category, handleEdit]);

    return (
        <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <span>{category.Name}</span>
            <Stack direction="row" spacing={2} sx={{ p: 1 }}>
                <Button onClick={handleDelete} variant="outlined" size="small" color="error" startIcon={<DeleteIcon />}>
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
