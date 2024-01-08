

import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { DotWave } from '@uiball/loaders';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Browser from "webextension-polyfill";
import { MESSAGING, SCRAPING_STATUS, EXPORT_HEADERS_NEW } from '../../common/constants';
import { changeStatus, getAllData } from '../../common/services';
import { mappedDataNew, downloadExcel, downloadCSV } from '../../common/utils';
import { MessagingMethods, activeTabData } from '../../common/browserMethods'
import { ActionButton } from '../../components'


const { runTimeMessage } = new MessagingMethods();

const ProgressCard = () => <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column', gridGap: 30 }}>
    <Box sx={{ backgroundColor: '#e07a5f', width: '100%', height: 150, borderRadius: 5, display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'white', gridGap: 40 }}>
        <DotWave size={100} color="white" />
        <Typography sx={{ color: "white" }}>  Collecting Data!  </Typography>
    </Box>
    <Typography>Emails are getting extracted, hold on!</Typography>
</Box>


const ExportCard = ({ count, text }: any) => <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gridGap: 30, backgroundColor: '#e07a5f', color: 'white', padding: 1, borderRadius: 2, width: '-webkit-fill-available' }}>
    <Typography sx={{ fontSize: 30, lineHeight: 1 }}>{count}</Typography>
    <Typography fontWeight={'bold'} sx={{ whiteSpace: 'nowrap', fontSize: '10px' }}>
        {text}
    </Typography>
</Box>


function ExportPage() {

    const [props, setProps] = useState([])
    const [status, setStatus] = useState(SCRAPING_STATUS.IDLE)



    const updateData = async () => {
        const allData = await getAllData()
        const exelData = mappedDataNew(allData.props)
        setProps(exelData)
        setStatus(allData.status)
    }

    const downloadData = async () => {
        if (props.length > 0) {
            downloadCSV(`zillow_props_${Date.now()}`, EXPORT_HEADERS_NEW, props)
            toast.success("Downloading File!", { autoClose: 2000, })
        }
        else {
            toast.info("Please run scrapper to download!", { autoClose: 2000 })
        }
    }

    const onStartHandle = async () => {
        const activeTab = await activeTabData()
        const onZillowSearch = activeTab.url.includes("https://www.zillow.com/")

        if (!onZillowSearch) {
            toast.error("Navigate to zillow search page.")
        } else {
            await changeStatus(SCRAPING_STATUS.COLLECTING)
            await updateData()
            await runTimeMessage({
                message: MESSAGING.START_DATA_COLLECTION,
            })
        }
    }

    const onStopHandle = async () => {
        await changeStatus(SCRAPING_STATUS.IDLE)
        await updateData()
        toast.info("Scrapper Stopped!", { autoClose: 2000, })
    }

    useEffect(() => {
        updateData()
        Browser.runtime.onMessage.addListener((request) => {
            const { message } = request
            if (message == MESSAGING.FETCH_REFRESH_DATA) {
                updateData()
            }
        })
    }, [])


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gridGap: '20px'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gridGap: 30
            }}>
                <Box sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(1, 100%)",
                    justifyContent: "space-between",
                    textAlign: "center",
                }}>
                    <ExportCard count={props.length} text='Data Collected' />
                </Box>
                {
                    status == SCRAPING_STATUS.COLLECTING ? <LinearProgress color="success" /> : null
                }
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}>
                    {
                        props.length > 0 ? <Button
                            onClick={downloadData}
                            variant='contained'
                            color='info'>
                            Export Data
                        </Button> : null
                    }
                    {
                        status == SCRAPING_STATUS.COLLECTING
                            ?
                            <Button
                                onClick={onStopHandle}
                                variant='contained'
                            >
                                Stop
                            </Button>
                            :
                            <Box sx={{
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                gridGap: 20
                            }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gridGap: '20px'
                                    }}
                                >
                                    <ActionButton
                                        label="Start"
                                        onClick={onStartHandle}
                                        disabled={false}
                                    />
                                </Box>
                            </Box>

                    }
                </Box>
            </Box >

        </Box>
    );
}

export default ExportPage;

