/*
  Copyright 2015 Skippbox, Ltd

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import Colors from 'styles/Colors';
import SwipeOut from 'react-native-swipeout';
import EntityIcon from 'components/commons/EntityIcon';
import StatusView from 'components/commons/StatusView';

const {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} = ReactNative;

const { PropTypes } = React;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 50,
    paddingLeft: 15,
    paddingRight: 20,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
  },
  left: {
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 11,
  },
  detailTitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  arrow: {
    width: 10,
    height: 10,
    marginLeft: 7,
    marginTop: 6,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: '#c7c7cc',
    transform: [{
      rotate: '45deg',
    }],
  },
  separator: {
    position: 'absolute',
    bottom: 0, left: 15, right: 0,
    height: 1,
    backgroundColor: Colors.BORDER,
  },
});

export default class ListItem extends Component {

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    detailTitle: PropTypes.string,
    lastItem: PropTypes.bool,
    showArrow: PropTypes.bool,
    renderTitle: PropTypes.func,
    renderDetail: PropTypes.func,
    entity: PropTypes.instanceOf(Immutable.Map), // optional
  }

  render() {
    return (
      <SwipeOut autoClose={true} right={this.props.onDelete && [
        {text: 'Delete', backgroundColor: Colors.RED, underlayColor: Colors.RED, onPress: this.props.onDelete},
      ]}>
        <TouchableOpacity style={styles.item} onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
          <View style={styles.left}>
            {this.renderTitle()}
          </View>
          <View style={styles.right}>
            {this.renderDetail()}
            {this.props.showArrow && <View style={styles.arrow}/>}
          </View>
          <View style={[styles.separator, this.props.lastItem && {left: 0}]}/>
        </TouchableOpacity>
      </SwipeOut>
    );
  }

  renderTitle() {
    if (this.props.renderTitle) { return this.props.renderTitle(); }
    if (this.props.entity) {
      return (
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <EntityIcon type={this.props.entity.get('type')} />
          <Text style={{flex: 1, marginLeft: 10, fontSize: 16}} numberOfLines={1}>{this.props.entity.getIn(['metadata', 'name'])}</Text>
        </View>
      );
    }
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{this.props.title}</Text>
        {this.props.subtitle && <Text style={styles.subtitle}>{this.props.subtitle}</Text>}
      </View>
    );
  }

  renderDetail() {
    if (this.props.renderDetail) { return this.props.renderDetail(); }
    const { entity } = this.props;
    if (entity && entity.get('type') === 'pods') {
      const status = entity.get('status');
      if (status) {
        return <StatusView status={status} />;
      }
    }
    return this.props.detailTitle && <Text style={styles.detailTitle}>{this.props.detailTitle}</Text>;
  }
}