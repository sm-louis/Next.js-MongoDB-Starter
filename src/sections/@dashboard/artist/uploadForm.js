import * as Yup from 'yup'
import { useState, useCallback, useEffect, useMemo } from 'react'
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux'
import { changeRole } from '../../../redux/slices/role'
import { useRouter } from 'next/router'

// form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
// @mui
import { Typography, Stack, Box, Card } from '@mui/material'
import useAuth from '../../../hooks/useAuth'
// components
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField, RHFRadioGroup, RHFUploadSingleFile } from '../../../components/hook-form'
import axios from '../../../utils/axios';
import { getAccountsByRole } from '../../../redux/slices/user'

export function UploadVideoForm() {
    const uploadSchema = Yup.object().shape({
        description: Yup.string().required('Description required'),
        fileURL: Yup.mixed().test('required', 'File is required', (value) => value !== ''),
        owner: Yup.string().required('This field is required'),
    });

    const ownerOption = ['Yes', 'No(Co-Owner)']
    const [ coOwnerShow, setCoOwnerShow ] = useState(false)
    const { user } = useAuth()
    const { allArtists } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const defaultValues = {
        description: '',
        fileURL: '',
        owner: '',
    };

    const methods = useForm({
        resolver: yupResolver(uploadSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        setValue,
        reset,
        formState: { isSubmitting },
    } = methods;

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

    const handleClick = (event, newValue) => {
        if(newValue === 'Yes') {
            setCoOwnerShow(false)
        }else {
            setCoOwnerShow(true)
        }
    }

    const fileUpload = async (file) => {
        const body = new FormData();
        body.append("file", file)
        return await fetch("/api/upload", {
          method: "POST",
          body
        }).then((res) => res.text()).then(async (data) => {
          let fileURL =  location.origin + '/uploads/'+JSON.parse(data).fileName;
          console.log(fileURL)
          return fileURL;
        })
    }

    const onSubmit = async (data) => {
        const uploadedPath = await fileUpload(data.fileURL)
        data.fileURL = uploadedPath
        const currentArtist = allArtists.find(artist => artist.uid === user._id)
        data.type="video"
        data.artistData = currentArtist
        console.log(data)
        axios.post('/api/media/insertData', {
            data
        }).then(() => {
            enqueueSnackbar('Upload successfully!', { variant: 'success' });
            reset()
        })
    }

    useEffect(() => {
        function fetchUser() {
            try {
                dispatch(getAccountsByRole('artist'))
            }catch(err) {
                console.log(err)
            }
        }
        fetchUser()
    }, [])

    return(
        <FormProvider methods={ methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField name="description" size="small" label="Description" multiline rows={3} sx={{ mb:3 }} />
            <RHFUploadSingleFile
                name="fileURL"
                accept="video/*"
                maxSize={15000000000}
                onDrop={handleDrop}
                sx={{ mb:3 }}
            />
            <Typography variant="subtitle3">Do you own the song in its entirety and with all of its copyrights; and are you entitled to 100% of earnings?</Typography>
            <RHFRadioGroup name="owner" size="small" sx={{ mb:2 }} options={ownerOption} onClick={(e) => handleClick(e, e.target.value)} row={true} />
            {   
                coOwnerShow ? 
                        <Typography variant="subtitle3" sx={{ fontWeight: 600 }}>Please enter their info if they already have a Valyou X account?</Typography>
                        // coOwnerNum.map(() => 
                        //     <div>asdf</div>
                        // ) 
                :''
            }
            <Box sx={{ textAlign: 'right', mt:3 }}>
                <LoadingButton type="submit" small="large" variant="contained" loading={isSubmitting}>
                    Submit
                </LoadingButton>
            </Box>
        </FormProvider>
    )
}

export function UploadAudioForm() {
    const uploadSchema = Yup.object().shape({
        type: Yup.string().required('This field is required'),
        description: Yup.string().required('Description required'),
        fileURL: Yup.mixed().test('required', 'File is required', (value) => value !== ''),
        owner: Yup.string().required('This field is required'),
        songTitle: Yup.string().required('This field is required'),
        singer: Yup.string().required('This field is required'),
        musicby: Yup.string().required('This field is required'),
        starCost: Yup.string().required('This field is required'),
    });

    const ownerOption = ['Yes', 'No(Co-Owner)']
    const [ coOwnerShow, setCoOwnerShow ] = useState(false)
    const { user } = useAuth()
    const { allArtists } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const defaultValues = {
        description: '',
        fileURL: '',
        owner: '',
        songTitle: '',
        singer: '',
        musicby: '',
        starCost: '',
    };

    const methods = useForm({
        resolver: yupResolver(uploadSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        setValue,
        reset,
        formState: { isSubmitting },
    } = methods;

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

    const handleClick = (event, newValue) => {
        if(newValue === 'Yes') {
            setCoOwnerShow(false)
        }else {
            setCoOwnerShow(true)
        }
    }

    const fileUpload = async (file) => {
        const body = new FormData();
        body.append("file", file)
        return await fetch("/api/upload", {
          method: "POST",
          body
        }).then((res) => res.text()).then(async (data) => {
          let fileURL =  location.origin + '/uploads/'+JSON.parse(data).fileName;
          console.log(fileURL)
          return fileURL;
        })
    }

    const onSubmit = async (data) => {
        const uploadedPath = await fileUpload(data.fileURL)
        data.fileURL = uploadedPath
        const currentArtist = allArtists.find(artist => artist.uid === user._id)
        data.artistData = currentArtist
        data.type = "audio"
        axios.post('/api/media/insertData', {
            data
        }).then(() => {
            enqueueSnackbar('Upload successfully!', { variant: 'success' });
            reset()
        })
    }

    useEffect(() => {
        function fetchUser() {
            try {
                dispatch(getAccountsByRole('artist'))
            }catch(err) {
                console.log(err)
            }
        }
        fetchUser()
    }, [])

    return(
        <FormProvider methods={ methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField name="songTitle" size="small" label="Song Title" sx={{ mb:3 }} />
            <RHFTextField name="singer" size="small" label="Signer" sx={{ mb:3 }} />
            <RHFTextField name="musicby" size="small" label="Music By" sx={{ mb:3 }} />
            <RHFTextField name="starCost" size="small" label="Star Cost" sx={{ mb:3 }} />
            <RHFTextField name="description" size="small" label="Description" multiline rows={3} sx={{ mb:3 }} />
            <RHFUploadSingleFile
                name="fileURL"
                accept="video/*"
                maxSize={15000000000}
                onDrop={handleDrop}
                sx={{ mb:3 }}
            />
            <Typography variant="subtitle3">Do you own the song in its entirety and with all of its copyrights; and are you entitled to 100% of earnings?</Typography>
            <RHFRadioGroup name="owner" size="small" sx={{ mb:2 }} options={ownerOption} onClick={(e) => handleClick(e, e.target.value)} row={true} />
            {   
                coOwnerShow ? 
                        <Typography variant="subtitle3" sx={{ fontWeight: 600 }}>Please enter their info if they already have a Valyou X account?</Typography>
                        // coOwnerNum.map(() => 
                        //     <div>asdf</div>
                        // ) 
                :''
            }
            <Box sx={{ textAlign: 'right', mt:3 }}>
                <LoadingButton type="submit" small="large" variant="contained" loading={isSubmitting}>
                    Submit
                </LoadingButton>
            </Box>
        </FormProvider>
    )
}

