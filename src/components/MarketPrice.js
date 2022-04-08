import { useState, useEffect } from 'react'
import axios from '../utils/axios';
import Marquee from "react-fast-marquee";
import Image from "./Image"
import { 
    Typography, 
    Tabs, 
    Tab, 
    Card, 
    Container, 
    TableContainer, 
    Table,
    TableBody,
    TableRow,
    TableCell,
    Avatar,
    TablePagination,
    Button,
    Stack
} from '@mui/material';


export default function MarketPrice() {
    const [coinPrice, setCoinPrice] = useState('')

    useEffect(() => {

        async function getCryptoPrice() {
            axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res => {
                setCoinPrice(res.data)
                console.log(res.data)
            })
        }

        getCryptoPrice()
    }, [])

    return (
        <Marquee>
            <Stack direction="row" alignItems="center">
                <Stack direction="row" alignItems="center" sx={{ gap:1, mx:5 }}>
                    <Image src="/logo/bitcoinlogo.svg" sx={{ width: '17px', height: '17px' }} alt="bitcoin" />
                    <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>
                        1 BITCOIN (BTC) = $ { coinPrice[0]?.current_price } USD 
                    </Typography>
                    <Typography 
                        sx={{ fontSize: '13px', fontWeight: 600 }}
                        color={(coinPrice[0]?.price_change_percentage_24h > 0) ? 'success.main' : 'primary'}
                    >
                        {
                            (coinPrice[0]?.price_change_percentage_24h > 0)? '+ ' : '- '
                        }
                        { coinPrice[0]?.price_change_percentage_24h } %
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" sx={{ gap:1, mx:5 }}>
                    <Image src="/logo/ethereum_logo.svg" sx={{ width: '13px', height: '21px' }} alt="bitcoin" />
                    <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>
                        1 ETHEREUM (ETH) = $ { coinPrice[1]?.current_price } USD 
                    </Typography>
                    <Typography 
                        sx={{ fontSize: '13px', fontWeight: 600 }}
                        color={(coinPrice[1]?.price_change_percentage_24h > 0) ? 'success.main' : 'primary'}
                    >
                        {
                            (coinPrice[1]?.price_change_percentage_24h > 0)? '+ ' : ' '
                        }
                        { coinPrice[1]?.price_change_percentage_24h } %
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" sx={{ gap:1, mx:5 }}>
                    <Image src="/logo/valyou_x_small.png" sx={{ width: '22px', height: '21px' }} alt="bitcoin" />
                    <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>
                        1 VALYOU X DOLLAR (VXD) = 0.99990000 USDC
                    </Typography>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600 }} color="primary" > -0.15% </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" sx={{ gap:1, mx:5 }}>
                    <Image src="/logo/valyou_x_small.png" sx={{ width: '22px', height: '21px' }} alt="bitcoin" />
                    <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>
                        1 VALYOU X MUSIC (VALYOU X) = $0.50 USDC
                    </Typography>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600 }} color="success.main" > 0.15% </Typography>
                </Stack>
            </Stack>
        </Marquee>
    )
}