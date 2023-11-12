import { useSelector } from "react-redux";
import { getCategoriesSelector } from "reduxware/reducers/categoriesReducer";
import CategoriesListItem from "./CategoriesListItem";
import { Category } from "types";
import uuid from "react-uuid";
import EditCategoryForm from "./EditCategoryForm";
import { useState } from "react";
import { Divider, Stack } from "@mui/material";

export const CategoriesList = () => {
    const categories = useSelector(getCategoriesSelector);
    const [editedCategory, setEditedCategory] = useState(undefined as unknown as Category);

    const handleEdit = (category: Category) => setEditedCategory(category);

    return (
        <Stack divider={<Divider orientation="horizontal" flexItem sx={{ marginBottom: 2 }} />} spacing={2}>
            <>
                {categories.map((category: Category) => {
                    return <CategoriesListItem handleEdit={handleEdit} key={uuid()} category={category} />;
                })}
            </>
            {editedCategory && <EditCategoryForm category={editedCategory} />}
        </Stack>
    );
};

export default CategoriesList;
