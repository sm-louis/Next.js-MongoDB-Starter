import NextLink from 'next/link';
//mui
import { 
    Typography, 
    Card, 
    Container, 
    Grid,
    Button,
    Stack
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

SocialMarket.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

const PostCard = styled(Card)(({ theme }) => ({
    padding: '30px',
}));

export default function SocialMarket() {
    return (
        <Page title="Market">
            <MarketPrice />
            <Container>
                <Grid sx={{ mt:6 }} container columns={{ xs: 4, md: 12 }}>
                    <Grid xs={7}>
                        <PostCard>
                            <Stack direction="row" justifyContent="space-between">
                                <Stack direction={{ md:"row" }} alignItems="center" sx={{ gap:6 }}>
                                    <MyAvatar 
                                        sx={{
                                            mx: 'auto',
                                            borderWidth: 2,
                                            borderStyle: 'solid',
                                            borderColor: 'common.primary',
                                            width: { xs: 80, md: 90 },
                                            height: { xs: 80, md: 90 },
                                        }}
                                    />
                                    <Typography variant='h5'>Share your tracks and videos</Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ gap:1 }}>
                                        <Image src="/video_player.svg" sx={{ width: '32px', height: '25px' }} alt="videoIcon"/>
                                        <Image src="/news_feed_post.svg" sx={{ width: '34px', height: '25px' }} alt="new feed icon"/>
                                        <NextLink href="/upload-media">
                                            <Button variant="contained" color="primary">
                                                Post now
                                            </Button>
                                        </NextLink>
                                </Stack>
                            </Stack>
                        </PostCard>
                        <Typography variant='h4' sx={{ textAlign: 'center', mt:3 }}>This artist has not yet uploaded any videos!</Typography>
                    </Grid>
                    <Grid xs={5} sx={{ px:4 }}>
                        <TrandingArtists />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}