import { useState, useCallback } from 'react'
import { styled } from '@mui/material/styles';
import * as Yup from 'yup';
import { 
    Typography, 
    Tabs, 
    Tab, 
    Card, 
    Container, 
    Button,
    Box,
    Stack,
    InputAdornment,
    Rating
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Layout from '../../layouts';
//form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
//component
import Page from '../../components/Page';
import { FormProvider, RHFSelect, RHFTextField, RHFUploadSingleFile } from '../../components/hook-form';
//util
import { fData } from '../../utils/formatNumber';

const UploadContent = styled(Card)(({ theme }) => ({
    overflow: 'auto',
    maxWidth: '600px',
    padding: '20px',
    marginTop: '30px'
}));

Listen.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function Listen() {
    
    const fileUploadSchema = Yup.object().shape({
        description: Yup.string().required('Description is required'),
        fileURL: Yup.mixed().test('required', 'File is required', (value) => value !== ''),
    });

    const defaultValues = {
        description: '',
        fileURL: '',
    };

    const methods = useForm({
        resolver: yupResolver(fileUploadSchema),
        defaultValues,
    });
    
    const {
        reset,
        watch,
        control,
        setValue,
        getValues,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        console.log(data)
    }

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
            setValue(
                'fileURL',
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            }
        },
        [setValue]
    );

    return (
        <Page title="Listen:Learn">
            <Container>
                <Typography variant="h4">Videos</Typography>
                <UploadContent>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <RHFTextField name="description" label="Description" multiline rows={3} sx={{ mt:1, mb:3 }} />
                        <RHFUploadSingleFile
                            name="fileURL"
                            accept="video/*"
                            maxSize={15000000000}
                            onDrop={handleDrop}
                        />
                        <Box sx={{ textAlign: 'right' }}>
                            <LoadingButton type="submit" variant="contained" sx={{ mt:3 }} loading={isSubmitting}>
                                Submit
                            </LoadingButton>
                        </Box>
                    </FormProvider>
                </UploadContent>
            </Container>
        </Page>
    )
}