// @ts-nocheck

/* eslint-disable */
// import React, { PureComponent } from 'react';
// import { StyleSheet, View, ViewStyle } from 'react-native';
// import GapWrap from './GapWrap';
// interface Props {
//   containerStyle: ViewStyle;
//   horizontal: boolean;
//   gap: number;
//   outerGap: number;
// }
// export default class ContainerWithGap extends PureComponent<Props, null> {
//   static defaultProps = {
//     containerStyle: {},
//     horizontal: false,
//     gap: 7,
//     outerGap: 0,
//   };
//   getContents() {
//     const { children, horizontal, gap } = this.props;
//     if (!children) {
//       return null;
//     }
//     const length = children.length;
//     const lengtEdge = length - 1;
//     return children.map((child, index) => (
//       <GapWrap key={index} gap={index < lengtEdge ? gap : 0} horizontal={horizontal}>
//         {child}
//       </GapWrap>
//     ));
//   }
//   render(): React.ReactNode {
//     const contents = this.getContents();
//     const { containerStyle, horizontal, outerGap } = this.props;
//     if (!contents) {
//       return null;
//     }
//     return (
//       <View style={[Styles.container, {
//         [horizontal ? 'marginVertical' : 'marginHorizontal']: outerGap,
//       }, horizontal ? {
//         flexDirection: 'row',
//       } : null, containerStyle]}
//       >
//         {contents}
//       </View>
//     );
//   }
// }
// const Styles = StyleSheet.create({
//   container: {},
// });
import React, { PureComponent, Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

class GapWrap extends PureComponent {
  state = {
    shown: true
  };
  onLayout = e => {
    this.setState({
      shown: e.nativeEvent.layout.height > 0
    });
  };

  render() {
    let {
      gap,
      horizontal,
      children
    } = this.props;
    let {
      shown
    } = this.state;

    if (!children) {
      return null;
    }

    let gapSize = shown ? gap : 0;
    return <Fragment>
        <View style={horizontal ? {
        flex: 1
      } : null} onLayout={this.onLayout}>
          {children}
        </View>
        <View style={[StylesGap.gap, {
        [horizontal ? 'width' : 'height']: gapSize
      }]}></View>
      </Fragment>; // return (
    //   <View style={[StylesGap.container, {
    //     [horizontal ? 'marginRight' : 'marginBottom']: gapSize
    //   }, horizontal ? {
    //     flex: 1
    //   } : null]} onLayout={this.onLayout}>
    //     {children}
    //   </View>
    // );
  }

}

export default class ContainerWithGap extends PureComponent {
  static propTypes = {
    containerStyle: PropTypes.any,
    horizontal: PropTypes.bool,
    gap: PropTypes.number,
    outerGap: PropTypes.number
  };
  static defaultProps = {
    containerStyle: {},
    horizontal: false,
    gap: 7,
    outerGap: 0
  };

  getContents() {
    let {
      children,
      horizontal,
      gap
    } = this.props;

    if (!children) {
      return null;
    }

    let length = children.length;
    let lengtEdge = length - 1;
    return children.map((child, index) => {
      return <GapWrap key={index} gap={index < lengtEdge ? gap : 0} horizontal={horizontal}>
          {child}
        </GapWrap>;
    });
  }

  render() {
    let contents = this.getContents();
    let {
      containerStyle,
      horizontal,
      outerGap
    } = this.props;

    if (!contents) {
      return null;
    }

    return <View style={[Styles.container, {
      [horizontal ? 'marginVertical' : 'marginHorizontal']: outerGap
    }, horizontal ? {
      flexDirection: 'row'
    } : null, containerStyle]}>
        {contents}
      </View>;
  }

}
const Styles = StyleSheet.create({
  container: {}
});
const StylesGap = StyleSheet.create({
  gap: {
    alignSelf: 'stretch'
  }
});