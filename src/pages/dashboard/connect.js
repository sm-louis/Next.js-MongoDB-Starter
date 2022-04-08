import { useState } from 'react'
import { styled } from '@mui/material/styles';
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
import Layout from '../../layouts';
//component
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import InputStyle from '../../components/InputStyle';
import Avatar from '../../components/Avatar';

Connect.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

const MenuTab = styled(Tabs)(({ theme }) => ({
    overflow: 'auto',
    '.MuiTabs-scroller': {
        overflow: 'auto !important'
    }
}));

export default function Connect() {
    const [filterName, setFilterName] = useState('');
    const [value, setValue] = useState('producer')
    const handleFilterByName = (event, filterName) => {
        setFilterName(filterName);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const tabData = [
        { label: 'Producer', value: 'producer'},
        { label: 'Photographer', value: 'photographer'},
        { label: 'Music Video Production', value: 'production'},
        { label: 'Ads & Promotion', value: 'ads'},
        { label: 'Web Design', value: 'webDesign'},
        { label: 'Artist Collaboration', value: 'collaboration'},
        { label: 'Publicist', value: 'publicist'},
        { label: 'Venue/GIGS', value: 'venue'},
        { label: 'Manager', value: 'manager'},
        { label: 'Songwriter', value: 'songwriter'},
    ]

    return (
        <Page title="Connect">
            <Container>
                <Typography variant="h4" sx={{ mb:4 }}>Connect</Typography>
                <InputStyle
                    stretchStart={375}
                    value={filterName}
                    onChange={handleFilterByName}
                    placeholder="Search user..."
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                        </InputAdornment>
                        ),
                    }}
                />
                  <MenuTab
                        value={value}
                        onChange={handleChange}
                        sx={{ my:3 }}
                    >
                        {
                            tabData.map(data=> 
                                <Tab sx={{ fontSize:14, mr:0 }} key={data.value} value={data.value} label={data.label} />
                            )
                        }
                    </MenuTab>
                    <Card sx={{ p:3 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" alignItems="center" sx={{ gap:3 }}>
                                <Avatar alt='admin' src="/buddy.png" sx={{ width: '80px', height: '80px' }} />
                                <Box>
                                    <Typography variant="h5">Bobby k.9</Typography>
                                    <Typography variant="subtitle3">Singer - Major Artist</Typography>
                                    <Box>
                                        <Rating name="read-only" value={5} size="small" sx={{ verticalAlign:'middle', mr:1 }} readOnly />
                                        <Typography variant="subtitle3">30 Reviews</Typography> 
                                    </Box>
                                </Box>
                            </Stack>
                            <Button variant="contained" color="success">Follow</Button>
                        </Stack>
                    </Card>
            </Container>
        </Page>
    )
}