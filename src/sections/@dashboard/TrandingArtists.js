import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
//mui
import { 
    Typography, 
    Tabs, 
    Tab, 
    Card, 
    Container, 
    Grid,
    Button,
    Stack,
    Box
} from '@mui/material';
//hook
import { getAccountsByRole, changeArtist } from '../../redux/slices/user'
import { useSelector, useDispatch } from 'react-redux';
//component
import Avatar from '../../components/Avatar';
import Iconify from '../../components/Iconify';
//mock
import TradeData from '../../_mock/trandeData';

const CountryTab = styled(Tabs)(({ theme }) => ({
    maxWidth: '400px',
    '.MuiTabs-scroller': {
        overflow: 'auto !important'
    }
}));

export default function TrandingArtists() {
    const {allArtists, artists} = useSelector(state => state.user)
    const [value, setValue] = useState('all');
    const handleChange = (event, newValue) => {
        setValue(newValue)
        let newArtists;
        console.log(newValue)
        if(newValue !== 'all') {
            newArtists = allArtists.filter(artist => (artist.country === newValue))
            console.log(artists)
        }else {
            newArtists = allArtists
        }

        try {
            dispatch(changeArtist(newArtists)) 
        }catch(err) {
            console.log(err)
        }
    }
    const dispatch = useDispatch();
    const flag = 0.75;

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

    return (
        <>
            <Stack>
                <Typography sx={{ fontSize: '20px', fontWeight: 500 }}>Trending Artists In Stock Market</Typography>
            </Stack>
            <CountryTab
                value={value}
                onChange={handleChange}
            >
                <Tab value="all" label="All" />
                <Tab value="United States" label="US" />
                <Tab value="Canada" label="Canada" />
                <Tab value="United Kingdom" label="UK" />
                <Tab value="Barbados" label="Bardados" />
                <Tab value="Korea, Republic of" label="Korea" />
                <Tab value="Puerto Rico" label="Puerto Rico" />
            </CountryTab>
            {
                artists.map((artist, index) => 
                    <Card key={artist.id} sx={{ p:3, mt:3 }}>
                        <Stack direction="row" sx={{ gap:7 }} alignItems="center">
                            <Avatar alt={artist.id} src={artist.avatar} sx={{ mr: 2, width: '60px', height: '60px' }} />
                            <Box>
                                <Typography variant="h5" sx={{ textTransform: 'capitalize' }}> {artist.firstName} </Typography>
                                <Stack direction="row" sx={{ mt:1, gap: 5 }}>
                                    <Typography variant="subtitle3">$ {TradeData[index].price}</Typography>
                                    {
                                        (flag > TradeData[index].changes) ? 
                                            <Typography variant="subtitle3" color="primary">
                                                <Iconify icon="ic:baseline-arrow-circle-down"sx={{ fontSize: 15, verticalAlign: 'text-bottom', mr:1 }} />$0.3479
                                            </Typography>
                                        :
                                            <Typography variant="subtitle3" color="success.main">
                                                <Iconify icon="ic:baseline-arrow-circle-up"sx={{ fontSize: 15, verticalAlign: 'text-bottom', mr:1 }} />$0.3479
                                            </Typography>
                                    }
                                </Stack>
                            </Box>
                        </Stack>
                    </Card>
                )
            }
        </>
    )
}