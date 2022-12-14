import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { topics } from '../../../data/topic';
import { Box, Button, Card, CardContent, Grid, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NewsFeed from '../../../commons/NewsFeed/NewsFeed';
import { getDetailTopic, getTopics } from '../../../api/topic';
import Post from '../../../commons/NewsFeed/Post';
import { getPostByTopicId } from '../../../api/post';

DetailTopic.propTypes = {

};
const useStyles = makeStyles((theme) => ({
    tagName: {
        color: 'rgb(64,64,64)',
        textDecoration: 'none',
        '& .MuiTypography-h3': {
            fontSize: '1.17rem !important',
            fontWeight: 'bold !important',
        }
    },
    tagContent: {
        textOverflow: 'ellipsis',
        '-webkit-line-clamp': 3,
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
    },
    card: {
        borderTop: '1rem solid',
        width: '100%',
    },
    tab: {
        marginBottom: '16px',
    }
}));
function DetailTopic(props) {
    const classes = useStyles();
    const { topicId } = useParams();
    const [posts, setPosts] = useState([]);
    const [topic, setTopic] = useState({});

    useEffect(() => {
        getDetailTopic(topicId)
            .then((res) => {
                setTopic(res.data.data[0]);
            })
            .catch((error) => {
                console.log(error.message);
            });
        getPostByTopicId({ sort: 'DESC', id_title_type: topicId })
            .then((res) => {
                setPosts(res.data.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [topicId]);


    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                <Toolbar />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Card className={classes.card} style={{ marginBottom: '1rem', borderTopColor: `${topic?.color}` }}>
                            <CardContent>
                                <Link to="#" className={classes.tagName}>
                                    <Typography sx={{ mb: 1 }} variant="h3">
                                        {topic?.type}
                                    </Typography>
                                </Link>
                                <Typography sx={{ mb: 1 }} variant="body2" className={classes.tagContent}>
                                    {topic?.description}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {topic?.amount_post} B??i Vi???t
                                </Typography>
                                <Button variant="contained" color="inherit">
                                    Theo d??i
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={0} md={3}>
                        <div><strong>N???i dung cho ph??p</strong></div>
                        <br />
                        <Typography>C??c n???i dung th??? hi???n g??c nh??n, quan ??i???m ??a chi???u v??? c??c v???n ????? {topic?.type}.</Typography>
                        <br />
                        <div><strong>Quy ?????nh</strong></div>
                        <ul>
                            <li>Nh???ng n???i dung kh??ng thu???c ph???m tr?? c???a danh m???c s??? b??? nh???c nh??? v?? xo?? (n???u kh??ng thay ?????i th??ch h???p).</li>
                            <li>Nghi??m c???m spam, qu???ng c??o.</li>
                            <li>
                                Nghi??m c???m post n???i dung 18+ hay nh???ng quan ??i???m c???c ??oan li??n quan t???i ch??nh tr??? - t??n gi??o.
                            </li>
                            <li>Nghi??m c???m ph??t ng??n thi???u v??n ho?? v?? ????? k??ch c?? nh??n.</li>
                            <li> Nghi??m c???m b??i ????ng kh??ng ghi r?? ngu???n n???u ??i c??p nh???t.</li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        {posts &&
                            posts.map((item) => {
                                return (
                                    <Post key={item.id} post={item} />
                                );
                            })}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default DetailTopic;