import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NextLink from 'next/link';
import ReactPlayer from 'react-player'
//mui
import { 
    Typography, 
    Card, 
    Container, 
    Grid,
    Button,
    Stack,
    Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from '../../layouts';
//component
import Page from '../../components/Page';
import Image from '../../components/Image';
import MyAvatar from '../../components/MyAvatar';
//section
import TrandingArtists from '../../sections/@dashboard/TrandingArtists'
import MarketPrice from '../../components/MarketPrice'
//redux
import { getVideo } from '../../redux/slices/media'

Watch.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

const VideoSection = styled(Stack)(({ theme }) => ({
    padding: '10px',
    // boxShadow: '1px 1px 5px black',
    cursor: 'pointer'
}));

export default function Watch() {

    const dispatch = useDispatch()
    const { videos } = useSelector(state => state.media)
    console.log(videos)

    useEffect(() => {
        function fetchVideos() {
            dispatch(getVideo('video'))
        }
        fetchVideos()
    }, [])

    return(
        <Page title="Watch">
            <Container>
                <Grid container columns={{ xs:12 }}>
                    <Grid xs={7}>
                        
                    </Grid>
                    <Grid xs={5} sx={{ pl:3 }}>
                        <Card sx={{ p:3 }}>
                            <Typography variant="h5" sx={{ mb:2 }}>All Videos</Typography>
                            {
                                videos?.map((video, index) => 
                                    <>
                                        <VideoSection key={index} direction="row" sx={{ mb:2, gap:4 }}>
                                            <video src={video.data.fileURL} style={{ width: '50%', height: '125px', objectFit: 'cover' }} />
                                            <Box>
                                                <Typography variant="h5" sx={{ textTransform: 'capitalize' }}> {video.data.artistData.firstName + ' ' + video.data.artistData.lastName} </Typography>
                                            </Box>
                                        </VideoSection>
                                    </>
                                )
                            }
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}