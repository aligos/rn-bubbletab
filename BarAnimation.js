import React, { Component } from 'react'
import Animated from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native'
import { styles as s } from 'react-native-style-tachyons'
import { withNavigationFocus } from 'react-navigation'

const {
  set,
  cond,
  startClock,
  stopClock,
  clockRunning,
  block,
  spring,
  debug,
  Value,
  Clock,
} = Animated

function runSpring(clock, value, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  }

  const config = {
    toValue: new Value(0),
    damping: 100,
    mass: 0.5,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  }

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, -100),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ])
}

class BarAnimation extends Component {
  constructor(props) {
    super(props)
    const clock = new Clock()
    this._trans = runSpring(clock, 50, this.props.tabWidth)
  }
  componentDidUpdate() {
    if (this.props.isFocused) {
      const clock = new Clock()
      this._trans = runSpring(clock, 50, this.props.tabWidth)
    }
  }
  render() {
    const { color, label } = this.props
    return (
      <TouchableWithoutFeedback {...this.props}>
        <Animated.View
          style={[
            s.w1,
            s.h2,
            s.br4,
            s.jcc,
            s.aic,
            s.flx_row,
            {
              width: this._trans,
              backgroundColor: color + 20,
            },
          ]}
        >
          {this.props.renderIcon()}
          <Animated.Text
            style={[s.f3, s.ml2, s.jcc, s.aic, s.tc, { color: color }]}
            numberOfLines={1}
          >
            {label}
          </Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

export default withNavigationFocus(BarAnimation)
