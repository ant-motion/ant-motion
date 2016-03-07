import React, { PropTypes } from 'react';
import TweenOne from 'rc-tween-one';

class Blur extends React.Component {

  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <TweenOne
        animation={{ filter: 'blur(10px)', yoyo: true, repeat: -1, duration: 1000 }}
        paused={this.props.paused}
        className="code-box-shape"
      />
    );
  }
}
Blur.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  paused: PropTypes.bool,
};

const mdString = `import TweenOne from 'rc-tween-one'

ReactDOM.render(<TweenOne
  animation={{ filter: 'blur(10px)', yoyo: true, repeat: -1, duration: 1000 }}
/>, mountNode)`;
export default {
  Comp: Blur,
  mdString,
};
