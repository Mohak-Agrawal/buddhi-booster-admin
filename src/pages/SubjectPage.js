// SubjectPage.js
import { Edit, Quiz } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryDialog from 'src/components/CategoryDialog';
import TableLayout from 'src/components/TableLayout';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import {
  useDeleteCategoryMutation,
  useGetCategoriesBySubjectQuery,
} from 'src/store/api/categoryApi';
import { useGetSubjectByIdQuery } from 'src/store/api/subjectsApi';
import { setCategories } from 'src/store/slices/categorySlice';

const SubjectPage = () => {
  const headers = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Category Name' },
    { id: 'level', numeric: false, disablePadding: false, label: 'Level Name' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  ];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState('');
  const { subjectId } = useParams();
  const {
    data: currentSubject,
    isLoading: isSubjectLoading,
    refetch: refetchSubject,
    isFetching: isSubjectFetching,
  } = useGetSubjectByIdQuery(subjectId);

  // Fetching categories by subject
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    refetch: refetchCategories,
    isFetching: isCategoriesFetching,
  } = useGetCategoriesBySubjectQuery(subjectId);

  console.log({ categories });

  const [deleteCategory, { isLoading: isDeleting, isError }] = useDeleteCategoryMutation();

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: currentSubject?.name,
    },
  ];

  const toggle = () => {
    setOpen(!open);
  };

  const handleDelete = (ids) => {
    console.log({ ids });

    const deletePromises = ids.map((id) =>
      deleteCategory(id)
        .unwrap()
        .then((deletedCategoryId) => {
          console.log(`Franchise with ID ${deletedCategoryId} deleted successfully`);
          return deletedCategoryId;
        }),
    );

    Promise.all(deletePromises)
      .then(() => {
        refetchCategories();
      })
      .catch((error) => {
        console.error('Failed to delete franchises:', error);
      });
  };

  const handleEdit = (id) => {
    setCategoryId(id);
    toggle();
    console.log('Edit clicked for categoryId:', id);
  };

  useEffect(() => {
    refetchSubject();
  }, [subjectId]);

  useEffect(() => {
    refetchCategories();
  }, [categoryId]);

  useEffect(() => {
    if (categories) {
      dispatch(setCategories(categories));
    }
  }, [dispatch, categories]);

  if (isSubjectLoading || isSubjectFetching || isCategoriesLoading || isCategoriesFetching) {
    return <h1>Loading</h1>;
  }

  return (
    <PageContainer title="Categories" description="this is Search Table page">
      {/* breadcrumb */}
      <Breadcrumb title={currentSubject?.name} items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <TableLayout
          headers={headers}
          rows={categories}
          handleSearch={(event) => console.log('Search:', event.target.value)}
          search=""
          searchPlaceholder={'Search Categories'}
          navigate={(path) => console.log('Navigate to:', path)}
          handleDelete={handleDelete}
          renderButton={
            <Box>
              <Button color="primary" variant="contained" fullWidth onClick={toggle}>
                Add New Category
              </Button>
            </Box>
          }
          renderActionItems={(row) => (
            <>
              <Tooltip title="Edit">
                <IconButton size="small" onClick={() => handleEdit(row.id)}>
                  <Edit size="1.1rem" />
                </IconButton>
              </Tooltip>
              <Tooltip title="View Questions">
                <IconButton
                  size="small"
                  onClick={() => {
                    navigate(`/dashboard/category-questions/${row.id}`);
                  }}
                >
                  <Quiz size="1.1rem" />
                </IconButton>
              </Tooltip>
            </>
          )}
        />
        <CategoryDialog
          categoryId={categoryId}
          open={open}
          setOpen={setOpen}
          toggle={toggle}
          refetch={refetchCategories}
          subjectId={subjectId}
        />
      </Box>
    </PageContainer>
  );
};

export default SubjectPage;
