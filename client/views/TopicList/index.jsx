import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { inject, observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Paging from '../Common/Paging';
import {
    TopicStore,
} from '../../store/store';
import TopicTab from './TopicTab';
import TopicItemContainer from './TopicItemContainer';

@inject(({ stores }) => ({
    appStore: stores.appStore,
    topicStore: stores.topicStore,
}))
@observer
class TopicList extends Component {
    componentDidMount() {
        this.getData();
    }

    componentWillReceiveProps(nextProps) { // props发生变化时触发
        const { location } = this.props;
        const { topicStore } = this.props;
        if (location.search !== nextProps.location.search) {
            const tab = queryString.parse(nextProps.location.search).tab || 'all';
            topicStore.fetchTopic(tab);
        }
    }


    getData() {
        const { location } = this.props;
        const tab = queryString.parse(location.search).tab || 'all';
        const { topicStore } = this.props;
        return topicStore.fetchTopic(tab);// 必须返回一个Promise 且resovled(true)
    }

    // 服务端渲染异步数据
    bootstrap() {
        return this.getData();
    }


    render() {
        const { topicStore } = this.props;
        const { tab, setTopicsItemCount } = topicStore;
        return (
            <Grid
                container
                justify="center"
                alignItems="center"
                alignContent="center"
            >
                <Grid item md={6}>
                    <TopicTab />
                    <TopicItemContainer hidden lists={topicStore.visibalTopics[tab]} />
                    <Paging count={10} lastClickHandle={(val) => { setTopicsItemCount(val * 10); }} nextClickHandle={(val) => { setTopicsItemCount(val * 10); }} />
                </Grid>
            </Grid>
        );
    }
}
TopicList.propTypes = {
    topicStore: PropTypes.instanceOf(TopicStore),
    location: PropTypes.object.isRequired,
};
export default TopicList;
