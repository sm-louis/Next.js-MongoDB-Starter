import { useState } from 'react'
import Page from "../../../components/Page"
//mui
import { styled } from '@mui/material/styles';
import { Container, Card, Typography, Select, MenuItem, InputLabel, FormControl} from "@mui/material"
//layout
import Layout from "../../../layouts";
//section
import { UploadVideoForm, FormProvider, UploadAudioForm } from "../../../sections/@dashboard/artist/uploadForm"
import { RHFSelect } from '../../../components/hook-form'

UploadMedia.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function UploadMedia() {
    const [value, setValue] = useState('video')

    const handleChange = (event) => {
        console.log(event.target.value)
        setValue(event.target.value)
    }

    return (
        <Container>
            <Card sx={{ p:3 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Is this an Music Video or Audio Track?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            label="Is this an Music Video or Audio Track?"
                            size="small"
                            onChange={handleChange}
                            sx={{ mb:3 }}
                        >
                            <MenuItem value="video">Music Video</MenuItem>
                            <MenuItem value="audio">Audio Track</MenuItem>
                        </Select>
                </FormControl>
                {
                    (value === "video") ? <UploadVideoForm /> : <UploadAudioForm />
                }
            </Card>
        </Container>
    )
}